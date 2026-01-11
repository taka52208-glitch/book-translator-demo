"""
ヘルスチェックAPIルーター
"""

from fastapi import APIRouter

from app.schemas import HealthResponse

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """
    ヘルスチェックエンドポイント

    Cloud Run の liveness/readiness プローブで使用
    """
    return HealthResponse()
