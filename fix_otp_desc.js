const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

// Update JS for wa-otp-desc
content = content.replace(
  /document\.getElementById\('wa-otp-desc'\)\.innerText = .*?;/g,
  "document.getElementById('wa-otp-desc').innerText = '+91 ' + waPhone;"
);

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
console.log('Fixed OTP desc JS');
