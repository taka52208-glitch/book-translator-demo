"""
Pydanticスキーマ定義
フロントエンドの types/index.ts と同期
"""

from pydantic import BaseModel, Field


class TranslateRequest(BaseModel):
    """翻訳リクエスト"""

    image: str = Field(..., description="Base64エンコードされた画像データ")
    previous_page_ending: str | None = Field(
        None,
        max_length=500,
        alias="previousPageEnding",
        description="前ページ末尾の英文（ページ跨ぎ対応）",
    )

    model_config = {"populate_by_name": True}


class TranslateResponse(BaseModel):
    """翻訳レスポンス"""

    translated_text: str = Field(..., alias="translatedText", description="翻訳された日本語テキスト")
    original_ending: str | None = Field(
        None,
        alias="originalEnding",
        description="原文末尾（次ページ用、ページ途中終了時）",
    )
    page_info: str | None = Field(None, alias="pageInfo", description="ページ番号文字列")
    has_image_marker: bool = Field(False, alias="hasImageMarker", description="[IMAGE_HERE]マーカーの有無")

    model_config = {"populate_by_name": True, "by_alias": True}


class HealthResponse(BaseModel):
    """ヘルスチェックレスポンス"""

    status: str = "ok"
    version: str = "0.1.0"
