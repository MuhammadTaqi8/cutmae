"""
app/processing.py — Pure CPU image processing pipeline.

Everything runs in-memory; no temporary files are written to disk.
This module is designed to be called from run_in_executor() so it
must be thread-safe (it is — rembg sessions are stateless per call).
"""

import io
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.model import ModelManager


def process_image_bytes(raw: bytes, model_manager: "ModelManager") -> bytes:
    """
    Remove background from raw image bytes and return transparent PNG bytes.

    Steps:
        1. Decode image via PIL (validates file integrity once more)
        2. Convert to RGBA so rembg always gets the right mode
        3. Run rembg inference on the PIL image
        4. Encode result as PNG in-memory
        5. Return PNG bytes

    Thread-safe: no shared mutable state.
    """
    import rembg
    from PIL import Image

    # ── Decode ────────────────────────────────────────────────────────────────
    input_image = Image.open(io.BytesIO(raw))
    # Convert once — rembg works best with RGBA input
    if input_image.mode != "RGBA":
        input_image = input_image.convert("RGBA")

    # ── Inference ─────────────────────────────────────────────────────────────
    output_image: Image.Image = rembg.remove(
        input_image,
        session=model_manager.session,
        # alpha_matting gives better edge quality at modest CPU cost
        alpha_matting=False,         # flip to True if quality > speed
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
        only_mask=False,
        post_process_mask=True,
    )

    # ── Encode PNG ────────────────────────────────────────────────────────────
    buf = io.BytesIO()
    # PNG compress level 1 = fastest encode, still smaller than raw
    output_image.save(buf, format="PNG", optimize=False, compress_level=1)
    buf.seek(0)
    return buf.read()
