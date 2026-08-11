import re

with open('snippets/whatsapp-otp-modal.liquid', 'r', encoding='utf-8') as f:
    content = f.read()

target1 = """          <!-- Store Credit / Wallet Section (shown only if store_credit_enabled) -->
          <div id="wa-wallet-section" style="display:none; margin-bottom:12px;">
             <div class="wa-payment-option wa-pay-opt" id="wa-wallet-card" style="margin-top:0; padding:10px 14px; cursor: pointer; transition: 0.2s; border:1.5px dashed #cbd5e1; background:#f8fafc;" onclick="waToggleWalletCredit()">
                <div style="display:flex; width:100%; align-items:center; gap:12px;">
                   <div class="wa-checkbox-btn" id="wa-wallet-checkbox" style="width:18px; height:18px; border-radius:4px; border:2px solid #94a3b8; display:flex; align-items:center; justify-content:center; transition:0.2s;">
                      <svg id="wa-wallet-check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" style="display:none;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                   </div>
                   <div style="flex:1; display:flex; justify-content:space-between; align-items:center;">
                      <div style="display:flex; gap:10px; align-items:center;">
                         <div class="wa-icon-circ" style="background:#e0e7ff; width:28px; height:28px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 2-2h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5H5a2 2 0 0 1-2-2z"/></svg>
                         </div>
                         <div>
                           <div style="font-weight:700; color:#1e293b; font-size:14px;">Store Credit Wallet</div>
                           <div style="font-size:11px; color:#64748b; margin-top:2px;">Available: <strong id="wa-wallet-balance-display">₹0</strong></div>
                         </div>
                      </div>
                      <div id="wa-wallet-applied-row" style="display:none; font-size:12px; font-weight:700; color:#4f46e5;">
                         <span id="wa-wallet-applied-amt">-₹0</span>
                      </div>
                   </div>
                </div>
                <div id="wa-wallet-usable-text" style="display:none; font-size:11px; color:#64748b; margin-top:6px; margin-left:30px;">Max usable: ₹0</div>
             </div>
          </div>"""

rep1 = """          <!-- Store Credit / Wallet Section (shown only if store_credit_enabled) -->
          <div id="wa-wallet-section" style="display:none; margin-bottom:12px;">
             <div class="wa-pay-opt" id="wa-wallet-card" style="margin-top:0; padding:12px 14px; cursor: pointer; transition: 0.2s; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; display:flex; align-items:center; justify-content:space-between;" onclick="waToggleWalletCredit()">
                
                <div style="display:flex; align-items:center; gap:10px; flex:1;">
                   <div style="background:#e0e7ff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>
                   </div>
                   <div style="display:flex; flex-direction:column;">
                     <div style="display:flex; align-items:center; gap:6px;">
                       <span style="font-weight:700; color:#0f172a; font-size:13px;">Use Store Credit</span>
                       <div id="wa-wallet-applied-row" style="display:none; font-size:10px; font-weight:800; color:#4f46e5; background:#eff6ff; padding:2px 6px; border-radius:12px;">
                          <span id="wa-wallet-applied-amt">-₹0</span>
                       </div>
                     </div>
                     <span style="font-size:11px; color:#64748b; font-weight:500;">Balance: <strong id="wa-wallet-balance-display" style="color:#0f172a;">₹0</strong></span>
                     <div id="wa-wallet-usable-text" style="display:none;"></div>
                   </div>
                </div>

                <!-- Toggle Switch Checkbox replacement -->
                <div id="wa-wallet-checkbox" style="position:relative; width:34px; height:20px; background:#cbd5e1; border-radius:20px; transition:0.3s; display:flex; align-items:center; padding:2px; flex-shrink:0; border:none;">
                   <div id="wa-wallet-check-icon" style="width:16px; height:16px; background:#fff; border-radius:50%; box-shadow:0 1px 3px rgba(0,0,0,0.15); transition:0.3s; transform:translateX(0); display:block;"></div>
                </div>
                
             </div>
          </div>"""

content = content.replace(target1, rep1)

target2 = """    if (waWalletApplied) {
      waWalletAppliedAmt = Math.round(computeWalletUsable() * 100) / 100;
      if (card) { card.style.borderColor = 'var(--wa-primary, #0f172a)'; card.style.background = '#f0f9ff'; }
      if (checkbox) { checkbox.style.borderColor = 'var(--wa-primary, #0f172a)'; checkbox.style.background = 'var(--wa-primary, #0f172a)'; }
      if (checkIcon) checkIcon.style.display = 'block';
      if (appliedRow) { appliedRow.style.display = 'flex'; appliedRow.style.background = '#eff6ff'; }
      if (appliedAmt) appliedAmt.innerText = `-₹${waWalletAppliedAmt.toFixed(2)}`;
    } else {
      if (card) { card.style.borderColor = '#cbd5e1'; card.style.background = '#f8fafc'; }
      if (checkbox) { checkbox.style.borderColor = '#94a3b8'; checkbox.style.background = 'transparent'; }
      if (checkIcon) checkIcon.style.display = 'none';
      if (appliedRow) appliedRow.style.display = 'none';
    }"""

rep2 = """    if (waWalletApplied) {
      waWalletAppliedAmt = Math.round(computeWalletUsable() * 100) / 100;
      if (card) { card.style.borderColor = 'var(--wa-primary, #0f172a)'; card.style.background = '#f0f9ff'; }
      if (checkbox) { checkbox.style.background = 'var(--wa-primary, #0f172a)'; }
      if (checkIcon) { checkIcon.style.transform = 'translateX(14px)'; }
      if (appliedRow) { appliedRow.style.display = 'flex'; }
      if (appliedAmt) appliedAmt.innerText = `-₹${waWalletAppliedAmt.toFixed(2)}`;
    } else {
      if (card) { card.style.borderColor = '#e2e8f0'; card.style.background = '#f8fafc'; }
      if (checkbox) { checkbox.style.background = '#cbd5e1'; }
      if (checkIcon) { checkIcon.style.transform = 'translateX(0)'; }
      if (appliedRow) appliedRow.style.display = 'none';
    }"""
content = content.replace(target2, rep2)
with open('snippets/whatsapp-otp-modal.liquid', 'w', encoding='utf-8') as f:
    f.write(content)
