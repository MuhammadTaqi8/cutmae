// ── Overlay helpers ──────────────────────────────────────────────────────────
function showOverlay(imgEl) {
  const rect = imgEl.getBoundingClientRect();
  const overlay = document.createElement('div');
  overlay.id = '__cutmage_overlay__';
  overlay.style.cssText = `
    position:fixed;
    top:${rect.top}px;left:${rect.left}px;
    width:${rect.width}px;height:${rect.height}px;
    background:rgba(0,0,0,0.55);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:10px;z-index:2147483647;border-radius:8px;
    font-family:system-ui,sans-serif;color:#fff;font-size:13px;font-weight:600;
    pointer-events:none;
  `;
  overlay.innerHTML = `
    <div style="width:32px;height:32px;border:3px solid rgba(255,255,255,0.3);
      border-top-color:#fff;border-radius:50%;animation:__cm_spin__ .7s linear infinite;"></div>
    <span>Removing background…</span>
  `;
  if (!document.getElementById('__cutmage_style__')) {
    const s = document.createElement('style');
    s.id = '__cutmage_style__';
    s.textContent = '@keyframes __cm_spin__{to{transform:rotate(360deg)}}';
    document.head.appendChild(s);
  }
  document.body.appendChild(overlay);
  return overlay;
}

function showDoneOverlay(imgEl) {
  removeOverlay();
  const rect = imgEl.getBoundingClientRect();
  const overlay = document.createElement('div');
  overlay.id = '__cutmage_overlay__';
  overlay.style.cssText = `
    position:fixed;
    top:${rect.top}px;left:${rect.left}px;
    width:${rect.width}px;height:${rect.height}px;
    background:rgba(22,163,74,0.75);
    display:flex;align-items:center;justify-content:center;
    gap:8px;z-index:2147483647;border-radius:8px;
    font-family:system-ui,sans-serif;color:#fff;font-size:14px;font-weight:700;
    pointer-events:none;
  `;
  overlay.innerHTML = `<span style="font-size:22px">✓</span><span>Saved to Downloads</span>`;
  document.body.appendChild(overlay);
  setTimeout(removeOverlay, 2000);
}

function removeOverlay() {
  document.getElementById('__cutmage_overlay__')?.remove();
}

// ── Message handler ───────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'SHOW_DONE') {
    const img = document.querySelector(`img[src="${msg.src}"]`);
    if (img) showDoneOverlay(img); else removeOverlay();
    return;
  }
  if (msg.type === 'REMOVE_OVERLAY') { removeOverlay(); return; }
  if (msg.type === 'SHOW_OVERLAY') {
    const img = document.querySelector(`img[src="${msg.src}"]`);
    if (img) showOverlay(img);
    return;
  }
  if (msg.type !== 'FETCH_IMAGE') return;

  const img = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    exportCompressed(canvas, sendResponse);
  };

  img.onerror = () => {
    // crossOrigin failed — try without it (works for same-origin images)
    const img2 = new Image();
    img2.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img2.naturalWidth;
      canvas.height = img2.naturalHeight;
      canvas.getContext('2d').drawImage(img2, 0, 0);
      try {
        exportCompressed(canvas, sendResponse);
      } catch {
        sendResponse({ ok: false, error: 'CORS blocked — try downloading the image first.' });
      }
    };
    img2.onerror = () => sendResponse({ ok: false, error: 'Could not load image from this page.' });
    img2.src = msg.url;
  };

  img.src = msg.url;
  return true; // keep channel open for async response
});

function exportCompressed(canvas, sendResponse) {
  // Scale down if larger than 2000px on longest side (keeps file small)
  const MAX = 2000;
  let { width, height } = canvas;
  if (width > MAX || height > MAX) {
    const ratio = Math.min(MAX / width, MAX / height);
    const scaled = document.createElement('canvas');
    scaled.width  = Math.round(width * ratio);
    scaled.height = Math.round(height * ratio);
    scaled.getContext('2d').drawImage(canvas, 0, 0, scaled.width, scaled.height);
    canvas = scaled;
  }

  // Export as JPEG (much smaller than PNG, API accepts it)
  canvas.toBlob((blob) => {
    if (!blob) return sendResponse({ ok: false, error: 'Could not export image.' });
    const reader = new FileReader();
    reader.onloadend = () => sendResponse({ ok: true, dataUrl: reader.result });
    reader.onerror   = () => sendResponse({ ok: false, error: 'FileReader failed.' });
    reader.readAsDataURL(blob);
  }, 'image/jpeg', 0.88);
}
