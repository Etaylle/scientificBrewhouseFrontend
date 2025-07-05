const fs = require('fs');
const QRCode = require('qrcode'); 

const url = 'http://10.123.26.22/'; // currently on the VM

QRCode.toFile('./public/images/qr-code.png', url, {
  color: {
    dark: '#000',  // Schwarzer Code
    light: '#FFF'  // Weißer Hintergrund
  }
}, function (err) {
  if (err) throw err;
  console.log('QR code generated and saved to public/images/qr-code.png');
});
