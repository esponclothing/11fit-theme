const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf-8');

function replaceRegex(content, regex, replacement) {
    if (regex.test(content)) {
        return content.replace(regex, replacement);
    }
    console.log("Failed to match: " + regex);
    return content;
}

// 1. Add Cancel button HTML
const saveBtnRegex = /<!-- Save Address Button -->[\s\S]*?<\/button>/;
const saveBtnMatch = saveBtnRegex.exec(content);
if (saveBtnMatch) {
    const newHtml = saveBtnMatch[0] + `
            <!-- Cancel Button -->
            <button type="button" id="wa-cancel-addr-btn" onclick="renderAddresses()"
              style="display:none; width:100%; padding:14px; background:transparent; color:#64748b; border:none; font-size:14px; font-weight:600; cursor:pointer; margin-bottom:12px;">
              Cancel
            </button>`;
    content = content.replace(saveBtnMatch[0], newHtml);
} else {
    console.log("Failed to match saveBtnRegex");
}

// 2. Hide wa-address-list and show Cancel button in waShowAddressForm
const showAddressFormRegex = /const formEl2 = document\.getElementById\('wa-new-address-form'\); if\(formEl2\) formEl2\.style\.display = 'block';/;
const showAddressFormMatch = showAddressFormRegex.exec(content);
if (showAddressFormMatch) {
    const newJs = showAddressFormMatch[0] + `
    const al = document.getElementById('wa-address-list'); if (al) al.style.display = 'none';
    const cancelBtn = document.getElementById('wa-cancel-addr-btn');
    if (cancelBtn) {
      if (typeof waAddresses !== 'undefined' && waAddresses && waAddresses.length > 0) {
        cancelBtn.style.display = 'block';
      } else {
        cancelBtn.style.display = 'none';
      }
    }`;
    content = content.replace(showAddressFormMatch[0], newJs);
} else {
    console.log("Failed to match showAddressFormRegex");
}

// 3. Show wa-address-list in renderAddresses
const renderAddressesRegex = /const formEl = document\.getElementById\('wa-new-address-form'\);\s*if \(formEl\) formEl\.style\.display = 'none';/;
const renderAddressesMatch = renderAddressesRegex.exec(content);
if (renderAddressesMatch) {
    const newJs = renderAddressesMatch[0] + `
    const alList = document.getElementById('wa-address-list'); if (alList) alList.style.display = 'block';`;
    content = content.replace(renderAddressesMatch[0], newJs);
} else {
    console.log("Failed to match renderAddressesRegex");
}

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content, 'utf-8');
console.log('Replaced successfully');
