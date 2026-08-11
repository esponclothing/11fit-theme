const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf-8');

function replaceRegex(content, regex, replacement) {
    if (regex.test(content)) {
        return content.replace(regex, replacement);
    }
    console.log("Failed to match: " + regex);
    return content;
}

// Fix 1: Visa Icon URL
content = content.replace(
    /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/a\/a4\/Visa_Logo_2012_color\.svg/g,
    'https://cdn.shopify.com/s/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg'
);

// Fix 2: Trust Badge Padding
content = content.replace(
    /<div class="wa-trust-badge-container" id="wa-mid-trust-badges" style="display:flex; justify-content:space-between; align-items:center; padding:16px; border:1px solid #e2e8f0; border-radius:12px; margin-bottom:24px; background:#fff; gap:4px;">/,
    '<div class="wa-trust-badge-container" id="wa-mid-trust-badges" style="display:flex; justify-content:space-between; align-items:center; padding:12px 6px; border:1px solid #e2e8f0; border-radius:12px; margin-bottom:24px; background:#fff; gap:2px;">'
);

// Fix 3: Lock icon text wrapper (Step 1)
content = content.replace(
    /<div style="text-align:center; font-size:11px; color:#475569; font-weight:600; display:flex; justify-content:center; align-items:center; gap:6px;">\s*<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"\/><path d="M7 11V7a5 5 0 0 1 10 0v4"\/><\/svg>\s*Your security is our priority\. We never share your details\.\s*<\/div>/,
    `<div style="text-align:center; font-size:11px; color:#475569; font-weight:600; display:flex; justify-content:center; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Your security is our priority. We never share your details.</span>
          </div>`
);

// Fix 4: sendWaOtp button innerHTML reset
let sendWaOtpRegex = /async function sendWaOtp\(\) \{[\s\S]*?btn\.innerHTML = 'Sending OTP\.\.\.';[\s\S]*?finally \{[\s\S]*?btn\.innerHTML = 'Continue[^']*';\s*\}\s*\}/;
let sendWaOtpHit = sendWaOtpRegex.exec(content);
if (sendWaOtpHit) {
    let matchStr = sendWaOtpHit[0];
    matchStr = matchStr.replace("const btn = document.getElementById('wa-send-btn');\n    btn.disabled = true; btn.innerHTML = 'Sending OTP...';", 
        "const btn = document.getElementById('wa-send-btn');\n    const originalBtnHTML = btn.innerHTML;\n    btn.disabled = true; btn.innerHTML = '<span style=\"color:#fff; font-size:16px; font-weight:700;\">Sending OTP...</span>';");
    matchStr = matchStr.replace(/btn\.innerHTML = 'Continue[^']*';/, "btn.innerHTML = originalBtnHTML;");
    content = content.replace(sendWaOtpHit[0], matchStr);
} else {
    console.log("Failed to match sendWaOtp logic");
}

// Fix 5: verifyWaOtp button innerHTML reset
let verifyWaOtpRegex = /async function verifyWaOtp\(\) \{[\s\S]*?btn\.innerHTML = 'Verifying\.\.\.';[\s\S]*?finally \{[\s\S]*?btn\.innerHTML = 'Verify & Continue[^']*';\s*\}\s*\}/;
let verifyWaOtpHit = verifyWaOtpRegex.exec(content);
if (verifyWaOtpHit) {
    let matchStr = verifyWaOtpHit[0];
    matchStr = matchStr.replace("const btn = document.getElementById('wa-verify-btn');\n    if (btn.disabled) return; // Prevent double-submit\n    const otp = waGetOtp();\n    if (otp.length < 4) return;\n    const errEl = document.getElementById('wa-otp-error');\n    btn.disabled = true;\n    btn.innerHTML = 'Verifying...';", 
        "const btn = document.getElementById('wa-verify-btn');\n    if (btn.disabled) return; // Prevent double-submit\n    const otp = waGetOtp();\n    if (otp.length < 4) return;\n    const errEl = document.getElementById('wa-otp-error');\n    const originalBtnHTML = btn.innerHTML;\n    btn.disabled = true;\n    btn.innerHTML = '<span style=\"color:#fff; font-size:16px; font-weight:700;\">Verifying...</span>';");
    matchStr = matchStr.replace(/btn\.innerHTML = 'Verify & Continue[^']*';/, "btn.innerHTML = originalBtnHTML;");
    content = content.replace(verifyWaOtpHit[0], matchStr);
} else {
    console.log("Failed to match verifyWaOtp logic");
}

// Fix 6: waPayNow hardcoded reset
// In the catch blocks inside waPayNow, there are hardcoded resets.
// Let's just blindly replace them if they exist.
content = content.replace(/btn\.innerHTML = '<span id="wa-pay-btn-text">Pay Now<\/span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><path d="M5 12h14M12 5l7 7-7 7"\/><\/svg>';/g, "btn.innerHTML = originalBtnHTML;");

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content, 'utf-8');
console.log('Replaced successfully');
