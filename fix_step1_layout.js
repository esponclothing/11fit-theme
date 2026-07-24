const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

const step1New = `      <!-- TOP TRUST BADGES -->
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-bottom:1px solid #e2e8f0; margin:10px 16px; border:1px solid #f1f5f9; border-radius:12px; box-shadow:0 1px 2px rgba(0,0,0,0.02); gap:4px;">
        <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" style="flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          <div style="text-align:left;">
            <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">100% Secure</div>
            <div style="font-size:9px; color:#64748b; line-height:1.2;">Encrypted & Protected</div>
          </div>
        </div>
        <div style="width:1px; height:20px; background:#e2e8f0; flex-shrink:0;"></div>
        <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" style="flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div style="text-align:left;">
            <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">Privacy First</div>
            <div style="font-size:9px; color:#64748b; line-height:1.2;">We never share your data</div>
          </div>
        </div>
        <div style="width:1px; height:20px; background:#e2e8f0; flex-shrink:0;"></div>
        <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" style="flex-shrink:0;"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          <div style="text-align:left;">
            <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">24/7 Support</div>
            <div style="font-size:9px; color:#64748b; line-height:1.2;">We're here to help</div>
          </div>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="wa-content-area" style="padding: 0 16px 24px;">
        
        <!-- Step Indicator -->
        <div class="wa-steps" id="wa-steps-indicator" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
          <div style="display:flex; align-items:center;">
            <div class="wa-step-dot active" id="wa-dot-1" style="width:28px;height:28px;border-radius:50%;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">1</div>
            <div class="wa-step-line" id="wa-line-1" style="height:2px;background:#e2e8f0;width:24px;margin:0 4px;"></div>
            <div class="wa-step-dot" id="wa-dot-2" style="width:28px;height:28px;border-radius:50%;background:#f1f5f9;color:#64748b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">2</div>
            <div class="wa-step-line" id="wa-line-2" style="height:2px;background:#e2e8f0;width:24px;margin:0 4px;"></div>
            <div class="wa-step-dot" id="wa-dot-3" style="width:28px;height:28px;border-radius:50%;background:#f1f5f9;color:#64748b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">3</div>
            <div class="wa-step-line" id="wa-line-3" style="height:2px;background:#e2e8f0;width:24px;margin:0 4px;"></div>
            <div class="wa-step-dot" id="wa-dot-4" style="width:28px;height:28px;border-radius:50%;background:#f1f5f9;color:#64748b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">4</div>
          </div>
          <div id="wa-step-label" style="font-size:11px; font-weight:700; color:#16a34a; background:#fff; border:1px solid #bbf7d0; padding:4px 8px; border-radius:6px; white-space:nowrap;">STEP 1 OF 4</div>
        </div>

        <!-- STEP 1: PHONE -->
        <div id="wa-step-1">
          <div style="font-size:10px; font-weight:700; color:#16a34a; display:flex; align-items:center; gap:4px; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            FAST & EASY
          </div>
          <h2 class="wa-section-title" id="wa-title-1" style="font-size:22px; font-weight:800; margin-bottom:8px; color:#0f172a; letter-spacing:-0.5px;">Swift Checkout</h2>
          <p class="wa-section-desc" id="wa-desc-1" style="font-size:13px; color:#475569; margin-bottom:16px; line-height:1.5;">Enter your WhatsApp number to receive an OTP and complete your order in seconds.</p>
          
          <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-radius:12px; padding:10px; margin-bottom:20px; border:1px solid #f1f5f9; gap:4px;">
            <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2" style="flex-shrink:0;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <div>
                <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">OTP on WhatsApp</div>
                <div style="font-size:9px; color:#64748b; line-height:1.2;">Instant & Secure</div>
              </div>
            </div>
            <div style="width:1px; height:20px; background:#e2e8f0; flex-shrink:0;"></div>
            <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" style="flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              <div>
                <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">No Spam</div>
                <div style="font-size:9px; color:#64748b; line-height:1.2;">Only for order updates</div>
              </div>
            </div>
            <div style="width:1px; height:20px; background:#e2e8f0; flex-shrink:0;"></div>
            <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div>
                <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">One Time Only</div>
                <div style="font-size:9px; color:#64748b; line-height:1.2;">For this order</div>
              </div>
            </div>
          </div>

          <div id="wa-phone-input-section">
            <div class="wa-field-group" id="wa-phone-container" style="margin-bottom:12px;">
              <label class="wa-field-label" style="font-size:12px; font-weight:700; color:#0f172a; margin-bottom:8px;">WhatsApp Number</label>
              <div class="wa-phone-row" style="display:flex; border:1px solid #bbf7d0; border-radius:10px; overflow:hidden; background:#fff;">
                <div class="wa-phone-prefix" style="padding:14px; background:#f8fafc; border-right:1px solid #e2e8f0; font-weight:600; color:#0f172a; font-size:14px; display:flex; align-items:center; gap:6px;">
                  IN +91 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <input type="tel" id="wa-phone" class="wa-input" placeholder="98765 43210" maxlength="10" style="border:none; padding:14px; font-size:14px; font-weight:500; color:#0f172a; flex:1;" oninput="this.value=this.value.replace(/\\D/g,'')">
              </div>
            </div>
            
            <div style="display:flex; align-items:center; gap:6px; font-size:11px; color:#16a34a; font-weight:500; margin-bottom:20px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              We'll send an OTP to this number on <span style="font-weight:700;">WhatsApp</span>
            </div>
          </div>

          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; background:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 3px rgba(0,0,0,0.1); flex-shrink:0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <div style="text-align:left;">
                <div style="font-size:12px; font-weight:700; color:#0f172a; margin-bottom:2px;">OTP will be sent on your <span style="color:#16a34a;">WhatsApp</span></div>
                <div style="font-size:11px; color:#475569; line-height:1.3;">Make sure you have WhatsApp installed on this number.</div>
              </div>
            </div>
            <div style="width:24px; height:24px; background:#16a34a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
          
          <!-- FOOTER TRUST BADGES -->
          <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border:1px solid #e2e8f0; border-radius:12px; margin-bottom:20px; background:#fff; gap:4px;">
            <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" style="flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke-width="1.5"/></svg>
              <div style="text-align:left;">
                <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">Trusted by</div>
                <div style="font-size:9px; color:#64748b; line-height:1.2;">1M+ Customers</div>
              </div>
            </div>
            <div style="width:1px; height:24px; background:#e2e8f0; flex-shrink:0;"></div>
            <div style="text-align:center; flex:1.2;">
              <div style="color:#16a34a; display:flex; gap:2px; justify-content:center; margin-bottom:2px;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">4.8/5 Average Rating</div>
              <div style="font-size:9px; color:#64748b; line-height:1.2;">Across Platforms</div>
            </div>
            <div style="width:1px; height:24px; background:#e2e8f0; flex-shrink:0;"></div>
            <div style="display:flex; align-items:center; gap:6px; flex:1; justify-content:center;">
              <div style="background:#16a34a; color:#fff; font-size:10px; font-weight:800; padding:2px 4px; border-radius:4px; flex-shrink:0;">PCI</div>
              <div style="text-align:left;">
                <div style="font-size:10px; font-weight:700; color:#0f172a; white-space:nowrap; letter-spacing:-0.2px;">PCI DSS</div>
                <div style="font-size:9px; color:#64748b; line-height:1.2;">Certified</div>
              </div>
            </div>
          </div>

          <button type="button" class="wa-btn-primary" id="wa-send-btn" onclick="sendWaOtp()" style="background:#0f172a; padding:16px; margin-bottom:12px; display:flex; flex-direction:column; align-items:center; gap:2px; border-radius:12px; width:100%;">
            <div style="display:flex; align-items:center; gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              <span style="font-size:15px; font-weight:700;">Continue Securely <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-3px; margin-left:4px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
            </div>
            <span style="font-size:10px; font-weight:500; color:#94a3b8;">It only takes a few seconds</span>
          </button>
          
          <div style="text-align:center; font-size:10px; color:#475569; font-weight:600; display:flex; justify-content:center; align-items:center; gap:4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your security is our priority. We never share your details.
          </div>

          <!-- Switch Account fallback -->
          <div id="wa-switch-account" style="display:none; text-align:center; margin-top:20px;">
            <a href="#" onclick="waSwitchAccount(event)" style="color:#16a34a; font-size:13px; font-weight:600; text-decoration:none;">Not you? Switch account</a>
          </div>
        </div>`;

const regex = /<!-- TOP TRUST BADGES -->[\s\S]*?<!-- STEP 2: OTP -->/;
if (regex.test(content)) {
  content = content.replace(regex, step1New + '\n\n        <!-- STEP 2: OTP -->');
  fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
  console.log('Step 1 layout fixed for mobile.');
} else {
  console.error('Could not find Step 1 block.');
}
