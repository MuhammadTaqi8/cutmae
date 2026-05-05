const API_URL = 'https://api.cutmage.com/v1/remove-background';

const dropZone      = document.getElementById('dropZone');
const fileInput     = document.getElementById('fileInput');
const stateProcessing = document.getElementById('stateProcessing');
const stateResult   = document.getElementById('stateResult');
const resultImg     = document.getElementById('resultImg');
const downloadBtn   = document.getElementById('downloadBtn');
const resetBtn      = document.getElementById('resetBtn');
const errorBox      = document.getElementById('errorBox');

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) processFile(fileInput.files[0]);
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
});

resetBtn.addEventListener('click', showUpload);

async function processFile(file) {
  if (file.size > 10 * 1024 * 1024) {
    return showError('File is too large. Maximum size is 10 MB.');
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return showError('Unsupported format. Please use JPEG, PNG, or WebP.');
  }

  showProcessing();
  hideError();

  try {
    const form = new FormData();
    form.append('file', file);

    const res = await fetch(API_URL, { method: 'POST', body: form });
    if (!res.ok) throw new Error(`Server error (${res.status}). Try again.`);

    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);

    resultImg.src   = url;
    downloadBtn.href = url;
    showResult();

  } catch (err) {
    showUpload();
    showError(err.message || 'Something went wrong. Please try again.');
  }
}

function showUpload() {
  dropZone.style.display      = 'block';
  stateProcessing.classList.remove('active');
  stateResult.classList.remove('active');
  fileInput.value = '';
}

function showProcessing() {
  dropZone.style.display = 'none';
  stateProcessing.classList.add('active');
  stateResult.classList.remove('active');
}

function showResult() {
  dropZone.style.display = 'none';
  stateProcessing.classList.remove('active');
  stateResult.classList.add('active');
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.add('active');
}

function hideError() {
  errorBox.classList.remove('active');
}
