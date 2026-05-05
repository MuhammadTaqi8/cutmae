const API_URL = 'https://api.cutmage.com/v1/remove-background';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'cutmage-remove-bg',
    title: 'Remove Background with Cutmage',
    contexts: ['image'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'cutmage-remove-bg') return;
  await processImage(info.srcUrl, tab.id);
});

async function processImage(imageUrl, tabId) {
  notify('processing', 'Removing background…', 'This takes a few seconds.');

  try {
    await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });

    chrome.tabs.sendMessage(tabId, { type: 'SHOW_OVERLAY', src: imageUrl });

    const response = await chrome.tabs.sendMessage(tabId, { type: 'FETCH_IMAGE', url: imageUrl });
    if (!response?.ok) throw new Error(response?.error || 'Could not load image from page.');

    const blob = dataUrlToBlob(response.dataUrl);
    if (blob.size > 10 * 1024 * 1024) throw new Error('Image is too large (max 10 MB).');

    const form = new FormData();
    form.append('file', blob, 'image.jpeg');

    const res = await fetch(API_URL, { method: 'POST', body: form });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`API error ${res.status}: ${body || 'try again'}`);
    }

    const resultBlob = await res.blob();
    const dataUrl = await blobToDataUrl(resultBlob);
    await chrome.downloads.download({ url: dataUrl, filename: 'cutmage-result.png', saveAs: false });

    chrome.tabs.sendMessage(tabId, { type: 'SHOW_DONE', src: imageUrl });

  } catch (err) {
    chrome.tabs.sendMessage(tabId, { type: 'REMOVE_OVERLAY' }).catch(() => {});
    notify('error', 'Cutmage — Error', err.message || 'Something went wrong.');
    console.error('[Cutmage]', err);
  }
}

function dataUrlToBlob(dataUrl) {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

async function blobToDataUrl(blob) {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return `data:image/png;base64,${btoa(binary)}`;
}

function notify(id, title, message) {
  chrome.notifications.create(`cutmage-${id}`, {
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title,
    message,
  });
}
