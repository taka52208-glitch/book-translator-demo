"""
アプリケーション設定
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """アプリケーション設定"""

    # OpenAI API
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"

    # サーバー設定
    host: str = "0.0.0.0"
    port: int = 8432
    debug: bool = False

    # CORS設定（環境変数 CORS_ORIGINS でカンマ区切りで指定可能）
    cors_origins: list[str] = [
        "http://localhost:3247",
        "http://127.0.0.1:3247",
    ]

    model_config = {
        "env_file": "../.env.local",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
        "env_ignore_empty": True,
    }


settings = Settings()
