"""
app/model.py — Singleton model loader for rembg.

rembg's `new_session()` downloads model weights on first call and caches
them in ~/.u2net (or $U2NET_HOME). We load once at startup so inference
requests never pay the cold-start cost.
"""

import threading
from typing import Optional

from app.logger import get_logger

logger = get_logger(__name__)


class ModelManager:
    """Thread-safe singleton that owns the rembg session."""

    def __init__(self):
        self._session = None
        self._lock = threading.Lock()

    def load(self) -> None:
        """Blocking load — called once from the lifespan coroutine."""
        with self._lock:
            if self._session is not None:
                return
            try:
                from app.config import settings
                import rembg

                logger.info("Loading rembg model", model=settings.REMBG_MODEL)
                self._session = rembg.new_session(model_name=settings.REMBG_MODEL)
                logger.info("rembg model loaded OK", model=settings.REMBG_MODEL)
            except Exception as exc:
                logger.exception("Failed to load rembg model", error=str(exc))
                raise

    def unload(self) -> None:
        with self._lock:
            self._session = None

    def is_loaded(self) -> bool:
        return self._session is not None

    @property
    def session(self):
        if self._session is None:
            raise RuntimeError("Model not loaded")
        return self._session
