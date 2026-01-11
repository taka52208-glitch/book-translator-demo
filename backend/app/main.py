"""
洋書自動翻訳システム デモ版 - FastAPI バックエンド
"""

import signal
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import health, translate


@asynccontextmanager
async def lifespan(app: FastAPI):
    """アプリケーションライフサイクル管理"""
    # 起動時の処理
    print(f"サーバー起動: http://{settings.host}:{settings.port}")

    # グレースフルシャットダウンのハンドラ
    def handle_sigterm(signum, frame):
        print("SIGTERM受信: グレースフルシャットダウン開始")
        sys.exit(0)

    signal.signal(signal.SIGTERM, handle_sigterm)

    yield

    # 終了時の処理
    print("サーバー終了")


app = FastAPI(
    title="洋書自動翻訳システム API",
    description="Kindle洋書スクリーンショットを日本語に翻訳するデモAPI",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ルーター登録
app.include_router(health.router)
app.include_router(translate.router)


@app.get("/")
async def root():
    """ルートエンドポイント"""
    return {"message": "洋書自動翻訳システム API", "docs": "/docs"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
