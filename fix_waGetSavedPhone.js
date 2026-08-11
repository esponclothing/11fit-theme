const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf-8');

const regex = /\/\/ 2\. Check localStorage & sessionStorage keys[\s\S]*?\/\/ 3\. Check base64 notifyph if present/;

const replacement = `// 2. Check localStorage & sessionStorage keys
    if (!phone) {
      const keys = [
        'wa_saved_phone',
        'wa_user_phone',
        'espon_user_phone',
        'fit11_user_phone',
        'tinkal_user_phone',
        'notify_phone_number',
        'wa_verified_phone',
        'fit11_verified_phone',
        'espon_verified_phone'
      ];
      for (let k of keys) {
        try {
          let v = localStorage.getItem(k) || sessionStorage.getItem(k);
          if (v && v !== 'undefined' && v !== 'null') {
            let digits = String(v).replace(/\\D/g, '');
            if (digits.length > 10 && (digits.startsWith('91') || digits.startsWith('0'))) {
              digits = digits.slice(-10);
            }
            if (digits.length === 10) { 
              phone = digits; 
              break; 
            }
          }
        } catch(e) {}
      }
    }

    // 3. Check base64 notifyph if present`;

content = content.replace(regex, replacement);

const regexCookies = /\/\/ 4\. Check Cookies[\s\S]*?\/\/ 5\. Check DOM inputs on the page \(autofilled or typed inputs\)/;

const replacementCookies = `// 4. Check Cookies
    if (!phone) {
      try {
        const cookies = document.cookie.split('; ');
        for (let c of cookies) {
          let [name, val] = c.split('=');
          if (name === 'wa_saved_phone' || name === 'notify_phone_number' || name === 'user_phone') {
            if (val && val !== 'undefined' && val !== 'null') { 
              let digits = String(decodeURIComponent(val)).replace(/\\D/g, '');
              if (digits.length > 10 && (digits.startsWith('91') || digits.startsWith('0'))) {
                digits = digits.slice(-10);
              }
              if (digits.length === 10) { 
                phone = digits; 
                break; 
              }
            }
          }
        }
      } catch(e) {}
    }

    // 5. Check DOM inputs on the page (autofilled or typed inputs)`;

content = content.replace(regexCookies, replacementCookies);

const regexEnd = /    if \(phone\) \{[\s\S]*?if \(digits\.length === 10\) return digits;[\s\S]*?\}[\s\S]*?return '';/;

const replacementEnd = `    if (phone) {
      let digits = String(phone).replace(/\\D/g, '');
      if (digits.length > 10 && (digits.startsWith('91') || digits.startsWith('0'))) {
        digits = digits.slice(-10);
      }
      digits = digits.slice(0, 10);
      if (digits.length === 10) return digits;
    }
    return '';`;

content = content.replace(regexEnd, replacementEnd);

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content, 'utf-8');
console.log('Replaced successfully');
