const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

const switchCodeNew = `  function waSwitchAccount(e) {
    if (e) e.preventDefault();
    document.getElementById('wa-title-1').innerText = 'Swift Checkout';
    document.getElementById('wa-desc-1').innerText = 'Enter your WhatsApp number to receive an OTP and complete your order in seconds.';
    
    const pCont = document.getElementById('wa-phone-container'); if(pCont) pCont.style.display = 'block';
    const pSec = document.getElementById('wa-phone-input-section'); if(pSec) pSec.style.display = 'block';
    const midTb = document.getElementById('wa-mid-trust-badges'); if(midTb) midTb.style.display = 'flex';
    const greenBox = document.getElementById('wa-green-otp-box'); if(greenBox) greenBox.style.display = 'flex';
    
    const switchAcct = document.getElementById('wa-switch-account'); if (switchAcct) switchAcct.style.display = 'none';
    waPhone = null;
    
    const phoneInput = document.getElementById('wa-phone');
    if (phoneInput) {
      phoneInput.value = '';
      setTimeout(() => phoneInput.focus(), 100);
    }
    
    waGoToStep(1);
  }`;

content = content.replace(
  /function waSwitchAccount\(e\) \{[\s\S]*?document\.getElementById\('wa-phone'\)\.value = '';\n  \}/,
  switchCodeNew
);

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
console.log('Fixed waSwitchAccount back to step 1');
