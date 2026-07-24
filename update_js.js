const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

// Update waSetStep and add waGoToStep
const newWaSetStep = `
  function waSetStep(step) {
    [1,2,3,4].forEach(i => {
      const dot = document.getElementById('wa-dot-' + i);
      if (dot) {
        if(i < step) { 
          dot.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
          dot.style.background = '#16a34a'; dot.style.color = '#fff'; dot.style.border = 'none'; 
        } else if(i === step) { 
          dot.innerHTML = i;
          dot.style.background = '#0f172a'; dot.style.color = '#fff'; dot.style.border = 'none'; 
        } else { 
          dot.innerHTML = i;
          dot.style.background = '#fff'; dot.style.color = '#94a3b8'; dot.style.border = '1px solid #e2e8f0'; 
        }
      }
    });
    [1,2,3].forEach(i => {
      const line = document.getElementById('wa-line-' + i);
      if (line) line.style.background = i < step ? '#16a34a' : '#e2e8f0';
    });
    const lbl = document.getElementById('wa-step-label');
    if (lbl) lbl.innerText = 'STEP ' + step + ' OF 4';
  }

  function waGoToStep(step) {
    document.getElementById('wa-step-1').style.display = 'none';
    document.getElementById('wa-step-2').style.display = 'none';
    document.getElementById('wa-step-3').style.display = 'none';
    document.getElementById('wa-step-4').style.display = 'none';
    document.getElementById('wa-step-' + step).style.display = 'block';
    waSetStep(step);
    if (step === 4) waRenderPaymentMethods();
  }
`;

content = content.replace(/function waSetStep\(step\) \{[\s\S]*?function closeWaModal/m, newWaSetStep + '\n  function closeWaModal');

// Update waRenderPaymentMethods
const newRenderPayment = `
  function waRenderPaymentMethods() {
    const container = document.getElementById('wa-payment-methods-container');
    const isCodOnly = waPaymentSettings.payment_methods === 'cod_only';
    const isOnlineOnly = waPaymentSettings.payment_methods === 'online_only';
    
    // Calculate final total (total - discount)
    const originalTotal = (calculateCartSubtotal() + calculateShipping()).toFixed(2);
    let finalTotal = originalTotal;
    let discountAmount = 0;
    
    if (waAppliedDiscountCode && waAppliedDiscountCode.value > 0) {
      if (waAppliedDiscountCode.type === 'percentage') {
        discountAmount = calculateCartSubtotal() * (waAppliedDiscountCode.value / 100);
      } else {
        discountAmount = waAppliedDiscountCode.value;
      }
      finalTotal = Math.max(0, originalTotal - discountAmount).toFixed(2);
    }
    
    // Default selection
    if (!window.waSelectedPaymentMethod) {
      window.waSelectedPaymentMethod = isCodOnly ? 'cod' : 'online';
    }

    let html = '';
    
    // 1. ONLINE PAYMENT (RECOMMENDED)
    if (!isCodOnly) {
      const isOnlineSelected = window.waSelectedPaymentMethod === 'online';
      html += \`
        <div class="wa-payment-option" style="cursor:pointer; display:flex; flex-direction:column; background:\${isOnlineSelected ? '#f8fafc' : '#fff'}; border:2px solid \${isOnlineSelected ? '#16a34a' : '#e2e8f0'}; border-radius:12px; padding:20px; position:relative; transition:0.2s;" onclick="waSelectPayment('online')">
          \${isOnlineSelected ? '<div style="position:absolute; top:-12px; left:20px; background:#16a34a; color:#fff; font-size:10px; font-weight:700; padding:4px 10px; border-radius:20px; letter-spacing:0.5px;">RECOMMENDED</div>' : ''}
          <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%;">
            <div style="display:flex; gap:16px;">
              <div class="wa-payment-radio" style="width:22px; height:22px; border-radius:50%; border:2px solid \${isOnlineSelected ? '#16a34a' : '#cbd5e1'}; display:flex; align-items:center; justify-content:center; background:#fff; margin-top:2px;">
                \${isOnlineSelected ? '<div style="width:10px; height:10px; border-radius:50%; background:#16a34a;"></div>' : ''}
              </div>
              <div>
                <div style="font-size:16px; font-weight:700; color:#0f172a; display:flex; align-items:center; gap:8px;">
                  <div style="width:40px; height:40px; background:#f1f5f9; border-radius:50%; display:flex; align-items:center; justify-content:center; position:relative;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <div style="position:absolute; bottom:-2px; right:-2px; background:#16a34a; color:#fff; border-radius:50%; width:16px; height:16px; display:flex; align-items:center; justify-content:center;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                  </div>
                  <div>
                    Pay Online (UPI, Cards)
                    <div style="font-size:12px; color:#64748b; font-weight:500; margin-top:2px;">Fast, secure & hassle-free</div>
                    <div style="display:inline-block; font-size:10px; font-weight:700; color:#15803d; background:#f0fdf4; padding:2px 8px; border-radius:10px; margin-top:6px; border:1px solid #bbf7d0;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-1px; margin-right:2px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> YOU SAVE ₹45</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:18px; font-weight:800; color:#0f172a;">₹\${finalTotal}</div>
              <div style="font-size:13px; color:#94a3b8; text-decoration:line-through;">₹\${originalTotal}</div>
            </div>
          </div>
          
          <div style="display:\${isOnlineSelected ? 'block' : 'none'}; margin-top:20px; padding-top:20px; border-top:1px dashed #e2e8f0;">
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:12px 16px; border-radius:8px; display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <div style="font-size:11px;">
                  <div style="font-weight:700; color:#15803d; margin-bottom:2px;">100% Secure Payment</div>
                  <div style="color:#16a34a;">Your payment details are encrypted and protected.</div>
                </div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
              <img src="https://cdn.razorpay.com/static/assets/upi/upi-logo.svg" style="height:18px; opacity:0.8;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" style="height:18px; opacity:0.8;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" style="height:14px; opacity:0.8;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" style="height:16px; opacity:0.8;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" style="height:14px; opacity:0.8;">
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:#64748b; font-weight:600; padding-top:12px; border-top:1px solid #e2e8f0;">
              <div style="display:flex; align-items:center; gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> Trusted by 1M+ customers ★★★★★</div>
              <div style="display:flex; align-items:center; gap:4px; color:#0f172a;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> PCI DSS Certified</div>
            </div>
          </div>
        </div>
      \`;
    }

    // 2. CASH ON DELIVERY
    if (!isOnlineOnly) {
      const isCodSelected = window.waSelectedPaymentMethod === 'cod';
      html += \`
        <div class="wa-payment-option" style="cursor:pointer; display:flex; flex-direction:column; background:\${isCodSelected ? '#f8fafc' : '#fff'}; border:2px solid \${isCodSelected ? '#0f172a' : '#e2e8f0'}; border-radius:12px; padding:20px; transition:0.2s;" onclick="waSelectPayment('cod')">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%;">
            <div style="display:flex; gap:16px;">
              <div class="wa-payment-radio" style="width:22px; height:22px; border-radius:50%; border:2px solid \${isCodSelected ? '#0f172a' : '#cbd5e1'}; display:flex; align-items:center; justify-content:center; background:#fff; margin-top:2px;">
                \${isCodSelected ? '<div style="width:10px; height:10px; border-radius:50%; background:#0f172a;"></div>' : ''}
              </div>
              <div>
                <div style="font-size:16px; font-weight:700; color:#0f172a; display:flex; align-items:center; gap:8px;">
                  <div style="width:40px; height:40px; background:#f1f5f9; border-radius:50%; display:flex; align-items:center; justify-content:center; position:relative;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                    <div style="position:absolute; bottom:-2px; right:-2px; background:#16a34a; color:#fff; border-radius:50%; width:16px; height:16px; display:flex; align-items:center; justify-content:center;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                  </div>
                  <div>
                    Cash on Delivery
                    <div style="font-size:12px; color:#64748b; font-weight:500; margin-top:2px;">Pay when your order arrives</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:18px; font-weight:800; color:#0f172a;">₹\${originalTotal}</div>
            </div>
          </div>
          
          <div style="display:\${isCodSelected ? 'block' : 'none'}; margin-top:20px; padding-top:20px; border-top:1px dashed #e2e8f0;">
             <div style="background:#f0fdf4; color:#15803d; font-size:11px; font-weight:600; padding:8px 12px; border-radius:6px; display:inline-flex; align-items:center; gap:6px;">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
               Open box delivery • Pay only if you're satisfied
             </div>
          </div>
        </div>
      \`;
    }

    container.innerHTML = html;
  }
  
  function waSelectPayment(method) {
    window.waSelectedPaymentMethod = method;
    waRenderPaymentMethods();
  }
`;

content = content.replace(/function waRenderPaymentMethods\(\) \{[\s\S]*?\n  \}\n/m, newRenderPayment + '\n');
content = content.replace(/function waSaveNewAddress\(e\)/g, 'function xwaSaveNewAddress');

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
console.log('JS replacement successful.');
