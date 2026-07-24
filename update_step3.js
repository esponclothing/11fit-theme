const fs = require('fs');
let content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

const step3New = `        <!-- STEP 3: ADDRESS -->
        <div id="wa-step-3" style="display:none;">
          <h2 class="wa-section-title" style="font-size:20px; margin-bottom:4px;">Delivery Address</h2>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
            <p class="wa-section-desc" style="margin:0; font-size:12px; max-width:60%;">Enter accurate details for a smooth and timely delivery.</p>
            <button type="button" onclick="waUseMyLocation(event)" style="border:1px solid #bbf7d0; background:#f0fdf4; color:#16a34a; font-size:12px; padding:6px 12px; border-radius:20px; font-weight:600; display:flex; align-items:center; gap:4px; cursor:pointer;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg> Detect Location
            </button>
          </div>

          <!-- Address List (only shown if addresses exist) -->
          <div id="wa-address-list"></div>
          
          <button type="button" onclick="waShowNewAddressForm()" id="wa-add-addr-btn" style="width:100%;padding:13px;border:1.5px dashed #cbd5e1;background:transparent;border-radius:10px;font-size:14px;font-weight:600;color:#64748b;cursor:pointer;margin-bottom:20px;transition:0.2s;display:none;">
            + Add New Address
          </button>

          <!-- New Address Form -->
          <div id="wa-new-address-form">
            <div class="wa-addr-grid" style="display:flex; flex-direction:column; gap:12px;">
              
              <div class="wa-field-group" id="wa-email-field-wrap" style="margin:0; position:relative;">
                <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <div style="position:absolute; right:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                <input type="email" id="wa-email" class="wa-input" placeholder="ashishgoyal4545@gmail.com" style="padding:24px 40px 8px 40px; font-weight:600; font-size:14px;">
                <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">Email Address (Required)</label>
              </div>

              <div style="display:flex; gap:12px;">
                <div class="wa-field-group" style="margin:0; flex:1; position:relative;">
                  <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                  <input type="text" id="wa-addr-fname" class="wa-input" placeholder="Rahul" style="padding:24px 14px 8px 40px; font-weight:500; font-size:14px;">
                  <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">First Name</label>
                </div>
                <div class="wa-field-group" style="margin:0; flex:1; position:relative;">
                  <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                  <input type="text" id="wa-addr-lname" class="wa-input" placeholder="Sharma" style="padding:24px 14px 8px 40px; font-weight:500; font-size:14px;">
                  <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">Last Name</label>
                </div>
              </div>

              <div class="wa-field-group" style="margin:0; position:relative;">
                <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
                <input type="text" id="wa-addr-street" class="wa-input" placeholder="House No, Street, Locality" style="padding:24px 14px 8px 40px; font-weight:500; font-size:14px;">
                <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">Street Address</label>
              </div>

              <div style="display:flex; gap:12px;">
                <div class="wa-field-group" style="margin:0; flex:1; position:relative;">
                  <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
                  <input type="tel" id="wa-addr-zip" class="wa-input" placeholder="400001" maxlength="6" style="padding:24px 14px 8px 40px; font-weight:500; font-size:14px;" oninput="this.value=this.value.replace(/\\D/g,''); if(this.value.length===6) waLookupPincode(this.value)">
                  <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">PIN Code</label>
                  <span id="wa-pin-spinner" style="display:none;position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:12px;color:#64748b;">⟳</span>
                </div>
                <div class="wa-field-group" style="margin:0; flex:1; position:relative;">
                  <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                  <input type="text" id="wa-addr-state" class="wa-input" placeholder="Select State" readonly style="padding:24px 14px 8px 40px; font-weight:500; font-size:14px; cursor:not-allowed; background:#f8fafc;">
                  <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">State</label>
                </div>
              </div>

              <div style="display:flex; gap:12px;">
                <div class="wa-field-group" style="margin:0; flex:1; position:relative;">
                  <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg></div>
                  <input type="text" id="wa-addr-city-input" class="wa-input" placeholder="Enter City" style="padding:24px 14px 8px 40px; font-weight:500; font-size:14px;">
                  <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">City / Post Office</label>
                  <select id="wa-addr-city-select" class="wa-input" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:pointer;" onchange="document.getElementById('wa-addr-city-input').value = this.value;"></select>
                </div>
                <div class="wa-field-group" style="margin:0; flex:1; position:relative;">
                  <div style="position:absolute; left:14px; top:12px; color:#16a34a;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
                  <input type="text" id="wa-addr-district" class="wa-input" placeholder="Enter District" readonly style="padding:24px 14px 8px 40px; font-weight:500; font-size:14px; background:#f8fafc; cursor:not-allowed;">
                  <label style="position:absolute; left:40px; top:8px; font-size:10px; color:#64748b;">District</label>
                </div>
              </div>
            </div>

            <div id="wa-pin-error" style="display:none;font-size:12px;color:#dc2626;margin:12px 0;padding:8px 12px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca;"></div>

            <!-- Why we need your address Accordion -->
            <div style="margin:24px 0 16px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; overflow:hidden;">
              <div style="padding:12px 16px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">
                <div style="display:flex; align-items:center; gap:8px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <div style="font-size:13px; font-weight:600; color:#15803d;">Why we need your address?</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </div>
              <div style="display:block; padding:0 16px 12px 42px; font-size:12px; color:#15803d; font-weight:500;">
                To ensure safe delivery, faster returns & real-time order updates
              </div>
            </div>

            <button type="button" id="wa-save-addr-btn" class="wa-btn-primary" onclick="waGoToStep(4)" style="margin-bottom:12px; background:#0f172a; padding:18px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Save & Deliver to this Address
            </button>
            <div style="text-align:center; font-size:11px; color:#16a34a; font-weight:500; margin-bottom:24px; display:flex; justify-content:center; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              We respect your privacy. Your information is safe with us.
            </div>
          </div>

          <!-- Coupon -->
          <div class="wa-coupon-row" style="display:flex; gap:8px; margin-bottom:24px;">
            <div style="position:relative; flex:1;">
              <div style="position:absolute; left:14px; top:13px; color:#64748b;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></div>
              <input type="text" id="wa-coupon-code" class="wa-input" placeholder="Have a discount code?" style="padding-left:42px; text-transform:uppercase; font-size:13px; background:#f8fafc;">
            </div>
            <button type="button" class="wa-coupon-apply" onclick="waApplyCoupon()" style="padding:0 24px; background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0; border-radius:10px; font-weight:600; font-size:13px; cursor:pointer;">Apply</button>
          </div>

          <!-- Order Summary -->
          <div class="wa-order-summary" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
              <div class="wa-summary-title" style="font-size:16px; font-weight:700; color:#0f172a;">Order Summary</div>
              <div id="wa-summary-save-badge" style="display:none; font-size:11px; font-weight:600; color:#16a34a; background:#f0fdf4; padding:4px 8px; border-radius:20px; border:1px solid #bbf7d0;">You Save <span id="wa-summary-save-amt"></span>!</div>
            </div>
            
            <div class="wa-summary-row" style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; color:#475569;">
              <span>Subtotal (MRP)</span>
              <span id="wa-subtotal" style="font-weight:600; color:#0f172a;">Calculating...</span>
            </div>
            <div class="wa-summary-row" style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; color:#16a34a; font-weight:500;">
              <span>Cart Discounts</span>
              <span id="wa-discount-amt">-₹0.00</span>
            </div>
            <div class="wa-summary-row" style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:14px; color:#475569;">
              <span>Shipping</span>
              <span class="wa-free-label" style="color:#16a34a; font-weight:600; background:#f0fdf4; border:1px solid #bbf7d0; padding:2px 6px; border-radius:4px; font-size:12px;">FREE</span>
            </div>
            
            <div id="wa-yay-saving" style="display:none; background:#f0fdf4; border:1px solid #bbf7d0; color:#15803d; font-size:12px; font-weight:500; padding:10px; border-radius:8px; align-items:center; gap:8px;">
              <span>🎁</span> Yay! You are saving <span id="wa-yay-amt" style="font-weight:700;"></span> on this order 🎉
            </div>
          </div>
        </div>`;

const regex = /<!-- STEP 3: ADDRESS & PAYMENT -->[\s\S]*?<!-- STEP 4: PAYMENT -->/;
if (regex.test(content)) {
  content = content.replace(regex, step3New + '\n\n        <!-- STEP 4: PAYMENT -->');
  fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', content);
  console.log('Step 3 replacement successful.');
} else {
  console.error('Could not find Step 3 block.');
}
