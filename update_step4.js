const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

const step4New = `        <!-- STEP 4: PAYMENT -->
        <div id="wa-step-4" style="display:none;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <h2 class="wa-section-title" style="font-size:24px; margin:0; letter-spacing:-0.5px;">Payment Method</h2>
              </div>
              <p class="wa-section-desc" style="margin:0; font-size:13px; color:#64748b;">Choose the safest and most convenient way to pay.</p>
            </div>
            <div style="display:flex; align-items:center; gap:4px; font-size:11px; color:#16a34a; background:#f0fdf4; border:1px solid #bbf7d0; padding:4px 10px; border-radius:20px; font-weight:600; flex-shrink:0;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Safe & Secure
            </div>
          </div>

          <div id="wa-payment-error" style="color: #ef4444; font-size: 13px; font-weight: 500; margin-bottom: 12px; display: none; padding:10px; background:#fef2f2; border:1px solid #fecaca; border-radius:8px;"></div>
          
          <div id="wa-payment-methods-container" style="display:flex; flex-direction:column; gap:16px; margin-bottom:24px;">
            <!-- Rendered dynamically by waGoToStep(4) -->
          </div>
          
          <!-- Trust Badges Footer -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:16px 0; border-top:1px dashed #e2e8f0; margin-bottom:24px;">
            <div style="text-align:center; flex:1;">
              <div style="display:flex; justify-content:center; margin-bottom:6px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <div style="font-size:11px; font-weight:700; color:#0f172a; margin-bottom:2px;">Best Price</div>
              <div style="font-size:10px; color:#64748b;">You're getting the best deal!</div>
            </div>
            <div style="text-align:center; flex:1; border-left:1px solid #f1f5f9; border-right:1px solid #f1f5f9;">
              <div style="display:flex; justify-content:center; margin-bottom:6px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg></div>
              <div style="font-size:11px; font-weight:700; color:#0f172a; margin-bottom:2px;">Easy Returns</div>
              <div style="font-size:10px; color:#64748b;">7-day easy return policy</div>
            </div>
            <div style="text-align:center; flex:1;">
              <div style="display:flex; justify-content:center; margin-bottom:6px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 10h.01"/><path d="M15 10h.01"/></svg></div>
              <div style="font-size:11px; font-weight:700; color:#0f172a; margin-bottom:2px;">24/7 Support</div>
              <div style="font-size:10px; color:#64748b;">We're here to help you anytime</div>
            </div>
          </div>

          <button type="button" class="wa-btn-primary" id="wa-cod-btn" onclick="waPayNow()" style="background:#0f172a; padding:18px; margin-bottom:12px; display:flex; flex-direction:column; align-items:center; gap:2px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span id="wa-pay-btn-text" style="font-size:16px;">Pay Securely Now →</span>
            </div>
            <span id="wa-pay-btn-subtext" style="font-size:11px; font-weight:500; color:rgba(255,255,255,0.8);">Complete your order and save ₹45</span>
          </button>
          
          <button type="button" class="wa-btn-secondary" onclick="waBackToAddress()" style="width:100%; padding:16px; background:#fff; border:1px solid #e2e8f0; border-radius:10px; color:#475569; font-weight:600; font-size:14px; cursor:pointer; margin-bottom:24px; transition:0.2s;">
            ← Back to Address
          </button>

          <div style="text-align:center; font-size:11px; color:#64748b; margin-bottom:24px; display:flex; justify-content:center; align-items:center; gap:4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Your security is our priority. We never share your details.
          </div>
        </div>`;

const regex = /<!-- STEP 4: PAYMENT -->[\s\S]*?<!-- SUCCESS SCREEN -->/;
if (regex.test(content)) {
  content = content.replace(regex, step4New + '\n\n        <!-- SUCCESS SCREEN -->');
  fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
  console.log('Step 4 replacement successful.');
} else {
  console.error('Could not find Step 4 block.');
}
