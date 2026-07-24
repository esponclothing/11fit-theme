const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

// 1. Add IDs to the HTML elements
content = content.replace(
  /<div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-radius:12px; padding:10px; margin-bottom:20px; border:1px solid #f1f5f9; gap:4px;">/,
  '<div id="wa-mid-trust-badges" style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-radius:12px; padding:10px; margin-bottom:20px; border:1px solid #f1f5f9; gap:4px;">'
);

content = content.replace(
  /<div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">/,
  '<div id="wa-green-otp-box" style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">'
);

// 2. Update identify success logic
const identifyCodeNew = `
      if (data.identified && data.masked_phone) {
        document.getElementById('wa-title-1').innerText = 'Welcome Back!';
        document.getElementById('wa-desc-1').innerText = 'Continue as ' + data.masked_phone + '?';
        const pCont = document.getElementById('wa-phone-container'); if(pCont) pCont.style.display = 'none';
        const pSec = document.getElementById('wa-phone-input-section'); if(pSec) pSec.style.display = 'none';
        const midTb = document.getElementById('wa-mid-trust-badges'); if(midTb) midTb.style.display = 'none';
        const greenBox = document.getElementById('wa-green-otp-box'); if(greenBox) greenBox.style.display = 'none';
        document.getElementById('wa-switch-account').style.display = 'block';
        waPhone = 'MASKED';
        if (data.email) {
          document.getElementById('wa-email').value = data.email;
        }
      }`;
content = content.replace(
  /if \(data\.identified && data\.masked_phone\) \{[\s\S]*?if \(data\.email\) \{[\s\S]*?\}[\s\S]*?\}/,
  identifyCodeNew
);

// 3. Update waSwitchAccount logic
const switchCodeNew = `
  function waSwitchAccount(e) {
    if (e) e.preventDefault();
    document.getElementById('wa-title-1').innerText = 'Swift Checkout';
    document.getElementById('wa-desc-1').innerText = 'Enter your WhatsApp number to receive an OTP and complete your order in seconds.';
    
    const pCont = document.getElementById('wa-phone-container'); if(pCont) pCont.style.display = 'block';
    const pSec = document.getElementById('wa-phone-input-section'); if(pSec) pSec.style.display = 'block';
    const midTb = document.getElementById('wa-mid-trust-badges'); if(midTb) midTb.style.display = 'flex';
    const greenBox = document.getElementById('wa-green-otp-box'); if(greenBox) greenBox.style.display = 'flex';
    
    document.getElementById('wa-switch-account').style.display = 'none';
    waPhone = null;
    document.getElementById('wa-phone').value = '';
  }`;

content = content.replace(
  /function waSwitchAccount\(e\) \{[\s\S]*?document\.getElementById\('wa-phone'\)\.value = '';\n  \}/,
  switchCodeNew
);

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
console.log('Welcome back logic fixed.');
