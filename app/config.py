"""
app/config.py — Centralised settings via Pydantic v2 BaseSettings.
All values are overridable via environment variables or a .env file.
"""

from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── Auth ──────────────────────────────────────────────────────────────────
    # Set API_KEY to any non-empty string to enable Basic-Auth protection.
    # The client sends it as the HTTP Basic password (username can be anything).
    API_KEY: str = Field(default="", env="API_KEY")

    # ── Limits ────────────────────────────────────────────────────────────────
    MAX_FILE_SIZE: int = Field(default=10 * 1024 * 1024, env="MAX_FILE_SIZE")  # 10 MB
    MAX_IMAGE_WIDTH: int = Field(default=8000, env="MAX_IMAGE_WIDTH")
    MAX_IMAGE_HEIGHT: int = Field(default=8000, env="MAX_IMAGE_HEIGHT")
    MAX_MEGAPIXELS: float = Field(default=25.0, env="MAX_MEGAPIXELS")  # decompression bomb guard

    # ── Rate limiting ─────────────────────────────────────────────────────────
    RATE_LIMIT: str = Field(default="30/minute", env="RATE_LIMIT")

    # ── CORS ──────────────────────────────────────────────────────────────────
    CORS_ORIGINS: List[str] = Field(default=["*"], env="CORS_ORIGINS")

    # ── Model ─────────────────────────────────────────────────────────────────
    # rembg model name — see https://github.com/danielgatis/rembg#models
    REMBG_MODEL: str = Field(default="u2net", env="REMBG_MODEL")

    # ── Misc ──────────────────────────────────────────────────────────────────
    ENABLE_DOCS: bool = Field(default=False, env="ENABLE_DOCS")
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()
