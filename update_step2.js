const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

// 1. Move TOP TRUST BADGES into STEP 1
if (content.includes('<!-- TOP TRUST BADGES -->')) {
  // Extract TOP TRUST BADGES
  const tbRegex = /<!-- TOP TRUST BADGES -->[\s\S]*?<!-- CONTENT -->/;
  const match = content.match(tbRegex);
  if (match) {
    let trustBadges = match[0].replace('<!-- CONTENT -->', '');
    content = content.replace(tbRegex, '<!-- CONTENT -->');
    // Insert them just after <div id="wa-step-1">
    content = content.replace('<div id="wa-step-1">', '<div id="wa-step-1">\n' + trustBadges);
  }
}

const step2New = `        <!-- STEP 2: OTP -->
        <div id="wa-step-2" style="display:none; text-align:center;">
          <div style="display:flex; justify-content:center; margin-bottom:16px;">
            <div style="position:relative; width:64px; height:64px; background:#f0fdf4; border-radius:50%; display:flex; align-items:center; justify-content:center;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><rect x="9" y="9" width="6" height="8" rx="1" ry="1"/><path d="M12 9v-2"/></svg>
              <div style="position:absolute; bottom:0; right:0; background:#16a34a; color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; border:2px solid #fff;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbf7d0" stroke-width="2" style="position:absolute; top:-8px; left:-16px;"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbf7d0" stroke-width="2" style="position:absolute; top:8px; right:-16px;"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
            </div>
          </div>
          
          <h2 class="wa-section-title" style="font-size:24px; font-weight:800; margin-bottom:8px; color:#0f172a; letter-spacing:-0.5px;">Verify OTP</h2>
          <p class="wa-section-desc" style="font-size:14px; color:#475569; margin-bottom:4px;">Enter the 4-digit OTP sent to</p>
          <div style="font-size:16px; font-weight:700; color:#15803d; margin-bottom:20px; display:flex; justify-content:center; align-items:center; gap:8px;">
            <span id="wa-otp-desc">+91 MASKED</span>
            <button type="button" onclick="waSwitchAccount(event)" style="background:#f0fdf4; border:none; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#16a34a;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
          </div>

          <div style="background:#f8fafc; border-radius:8px; padding:10px; display:inline-flex; align-items:center; gap:6px; font-size:12px; color:#64748b; margin-bottom:24px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            OTP is valid for <span style="font-weight:700; color:#16a34a;">2 minutes</span> for your security
          </div>

          <div class="wa-otp-boxes" style="display:flex; justify-content:center; gap:12px; margin-bottom:12px;">
            <input type="tel" class="wa-otp-box" maxlength="1" oninput="waOtpInput(this,0)" onkeydown="waOtpKey(event,0)" style="width:56px; height:64px; font-size:24px; font-weight:700; text-align:center; border:1px solid #cbd5e1; border-radius:12px; color:#0f172a; outline:none; transition:0.2s;" onfocus="this.style.borderColor='#16a34a';this.style.boxShadow='0 0 0 4px #dcfce7'" onblur="this.style.borderColor='#cbd5e1';this.style.boxShadow='none'">
            <input type="tel" class="wa-otp-box" maxlength="1" oninput="waOtpInput(this,1)" onkeydown="waOtpKey(event,1)" style="width:56px; height:64px; font-size:24px; font-weight:700; text-align:center; border:1px solid #cbd5e1; border-radius:12px; color:#0f172a; outline:none; transition:0.2s;" onfocus="this.style.borderColor='#16a34a';this.style.boxShadow='0 0 0 4px #dcfce7'" onblur="this.style.borderColor='#cbd5e1';this.style.boxShadow='none'">
            <input type="tel" class="wa-otp-box" maxlength="1" oninput="waOtpInput(this,2)" onkeydown="waOtpKey(event,2)" style="width:56px; height:64px; font-size:24px; font-weight:700; text-align:center; border:1px solid #cbd5e1; border-radius:12px; color:#0f172a; outline:none; transition:0.2s;" onfocus="this.style.borderColor='#16a34a';this.style.boxShadow='0 0 0 4px #dcfce7'" onblur="this.style.borderColor='#cbd5e1';this.style.boxShadow='none'">
            <input type="tel" class="wa-otp-box" maxlength="1" oninput="waOtpInput(this,3)" onkeydown="waOtpKey(event,3)" style="width:56px; height:64px; font-size:24px; font-weight:700; text-align:center; border:1px solid #cbd5e1; border-radius:12px; color:#0f172a; outline:none; transition:0.2s;" onfocus="this.style.borderColor='#16a34a';this.style.boxShadow='0 0 0 4px #dcfce7'" onblur="this.style.borderColor='#cbd5e1';this.style.boxShadow='none'">
          </div>
          
          <div class="wa-error-msg" id="wa-otp-error" style="display:none; color:#dc2626; font-size:13px; margin-bottom:16px;"></div>

          <button type="button" class="wa-btn-primary" id="wa-verify-btn" onclick="verifyWaOtp()" style="background:#0f172a; padding:18px; margin-top:12px; margin-bottom:12px; display:flex; align-items:center; justify-content:center; gap:8px; border-radius:12px; width:100%;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            <span style="font-size:16px; font-weight:700;">Verify & Continue <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-3px; margin-left:4px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
          </button>

          <div style="background:#f0fdf4; color:#15803d; padding:12px; border-radius:8px; font-size:12px; font-weight:500; display:flex; align-items:center; justify-content:center; gap:6px; margin-bottom:24px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Didn't receive OTP? Check your <span style="font-weight:700;">WhatsApp</span>
          </div>

          <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px;">
            <div style="flex:1; height:1px; background:#e2e8f0;"></div>
            <div style="font-size:12px; font-weight:700; color:#0f172a; padding:6px 10px; border:1px solid #e2e8f0; border-radius:50px;">OR</div>
            <div style="flex:1; height:1px; background:#e2e8f0;"></div>
          </div>

          <div class="wa-resend" id="wa-resend-container" style="margin-bottom:24px;">
            <a href="#" id="wa-resend-link" onclick="sendWaOtp(); return false;" style="display:none; color:#16a34a; font-size:14px; font-weight:600; text-decoration:none;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-3px; margin-right:4px;"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              Resend OTP Now
            </a>
            <div id="wa-resend-timer-wrap" style="display:flex; flex-direction:column; align-items:center; gap:6px;">
              <div style="display:flex; align-items:center; gap:6px; font-size:14px; font-weight:600; color:#0f172a;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span id="wa-resend-timer">Resend OTP in 0:50</span>
              </div>
              <div style="font-size:12px; color:#64748b;">You can resend OTP up to 3 times</div>
            </div>
          </div>

          <!-- Bottom Badges -->
          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; border:1px solid #e2e8f0; border-radius:12px; margin-bottom:24px; background:#f8fafc; text-align:left;">
            <div style="display:flex; align-items:center; gap:8px; flex:1;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              <div>
                <div style="font-size:11px; font-weight:700; color:#0f172a;">100% Secure</div>
                <div style="font-size:9px; color:#64748b;">Your data is encrypted</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex:1; justify-content:center;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M22 12h-2"/><path d="M4 12H2"/></svg>
              <div>
                <div style="font-size:11px; font-weight:700; color:#0f172a;">Quick & Easy</div>
                <div style="font-size:9px; color:#64748b;">Takes less than 30s</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex:1; justify-content:flex-end;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
              <div>
                <div style="font-size:11px; font-weight:700; color:#0f172a;">Need Help?</div>
                <div style="font-size:9px; color:#64748b;">Support available 24/7</div>
              </div>
            </div>
          </div>

          <div style="text-align:center; font-size:11px; color:#475569; font-weight:600; display:flex; justify-content:center; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your security is our priority. We never share your details.
          </div>
        </div>`;

const regex = /<!-- STEP 2: OTP -->[\s\S]*?<!-- STEP 3: ADDRESS -->/;
if (regex.test(content)) {
  content = content.replace(regex, step2New + '\n\n        <!-- STEP 3: ADDRESS -->');
  fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
  console.log('Step 2 replacement successful.');
} else {
  console.error('Could not find Step 2 block.');
}
