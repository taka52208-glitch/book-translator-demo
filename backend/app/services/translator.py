"""
翻訳サービス - OpenAI Vision API を使用した画像翻訳
"""

import base64
import re

from openai import AsyncOpenAI

from app.config import settings
from app.prompts import TRANSLATION_SYSTEM_PROMPT, build_user_prompt
from app.schemas import TranslateResponse


class TranslatorService:
    """翻訳サービス"""

    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)
        self.model = settings.openai_model

    async def translate_image(
        self,
        image_base64: str,
        previous_page_ending: str | None = None,
    ) -> TranslateResponse:
        """画像を翻訳する"""
        # Base64データのプレフィックスを処理
        if "," in image_base64:
            image_base64 = image_base64.split(",")[1]

        # 画像データのバリデーション
        try:
            base64.b64decode(image_base64)
        except Exception as e:
            raise ValueError(f"無効な画像データです: {e}")

        # OpenAI Vision API を呼び出し
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": TRANSLATION_SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": build_user_prompt(previous_page_ending)},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}",
                                "detail": "high",
                            },
                        },
                    ],
                },
            ],
            max_tokens=4096,
        )

        # レスポンスを解析
        content = response.choices[0].message.content or ""
        return self._parse_response(content)

    def _parse_response(self, content: str) -> TranslateResponse:
        """OpenAI レスポンスを解析"""
        translated_text = ""
        original_ending = None
        page_info = None
        has_image_marker = "[IMAGE_HERE]" in content

        # TRANSLATED_TEXT セクションを抽出
        translated_match = re.search(
            r"TRANSLATED_TEXT:\s*(.*?)(?=ORIGINAL_ENDING:|PAGE_INFO:|$)",
            content,
            re.DOTALL,
        )
        if translated_match:
            translated_text = translated_match.group(1).strip()
        else:
            # フォーマットに従っていない場合は全体を翻訳テキストとして扱う
            translated_text = content.strip()

        # ORIGINAL_ENDING セクションを抽出
        ending_match = re.search(
            r"ORIGINAL_ENDING:\s*(.*?)(?=PAGE_INFO:|$)",
            content,
            re.DOTALL,
        )
        if ending_match:
            ending = ending_match.group(1).strip()
            if ending and ending.lower() not in ["なし", "none", ""]:
                original_ending = ending

        # PAGE_INFO セクションを抽出
        page_match = re.search(r"PAGE_INFO:\s*(.+?)(?:\n|$)", content)
        if page_match:
            page = page_match.group(1).strip()
            if page and page.lower() not in ["なし", "none", ""]:
                page_info = page

        return TranslateResponse(
            translated_text=translated_text,
            original_ending=original_ending,
            page_info=page_info,
            has_image_marker=has_image_marker,
        )


# シングルトンインスタンス
translator_service = TranslatorService()
