"""
翻訳APIルーター
"""

from fastapi import APIRouter, HTTPException

from app.schemas import TranslateRequest, TranslateResponse
from app.services.translator import translator_service

router = APIRouter(prefix="/api", tags=["translate"])


@router.post("/translate", response_model=TranslateResponse)
async def translate_image(request: TranslateRequest) -> TranslateResponse:
    """
    画像翻訳エンドポイント

    - Kindleスクリーンショット画像をアップロード
    - OpenAI Vision API で翻訳を実行
    - 翻訳結果を返却
    """
    try:
        result = await translator_service.translate_image(
            image_base64=request.image,
            previous_page_ending=request.previous_page_ending,
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # エラーメッセージから機密情報を除去
        error_message = "翻訳処理中にエラーが発生しました"
        if "api_key" in str(e).lower():
            error_message = "API設定に問題があります"
        raise HTTPException(status_code=500, detail=error_message)
