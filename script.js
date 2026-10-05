let qrcodeInstance = null;

function generateQR() {
  const content = document.getElementById('qrContent').value.trim();
  const fgColor = document.getElementById('fgColor').value;
  const bgColor = document.getElementById('bgColor').value;
  const size = parseInt(document.getElementById('qrSize').value, 10);
  const container = document.getElementById('qrcode');

  if (!content) return;

  // Clear previous QR code
  container.innerHTML = '';

  // Generate new QR code using QRCode.js
  qrcodeInstance = new QRCode(container, {
    text: content,
    width: size,
    height: size,
    colorDark: fgColor,
    colorLight: bgColor,
    correctLevel: QRCode.CorrectLevel.H
  });
}

document.getElementById('qrForm').addEventListener('submit', (e) => {
  e.preventDefault();
  generateQR();
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const qrCanvas = document.querySelector('#qrcode canvas');
  const qrImg = document.querySelector('#qrcode img');

  let imageSrc = '';
  if (qrCanvas) {
    imageSrc = qrCanvas.toDataURL('image/png');
  } else if (qrImg) {
    imageSrc = qrImg.src;
  }

  if (imageSrc) {
    const link = document.createElement('a');
    link.download = 'qr-pulse-code.png';
    link.href = imageSrc;
    link.click();
  } else {
    alert('Please generate a QR code first!');
  }
});

// Initial load generator
window.addEventListener('DOMContentLoaded', () => {
  generateQR();
});