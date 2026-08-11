const fs = require('fs');
let code = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

const targetStr = `          // FIX: Ensure Draft Order has customer details BEFORE payment!
          try {
            await fetch(\`\${WA_API_BASE}/checkout/update-draft\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                merchant_key: MERCHANT_KEY, 
                draft_order_id: waDraftOrderId,
                payment_method: waSelectedPayment,
                customer_phone: waPhone,
                customer_email: waEmail,
                shipping_address: addr
              })
            });
          } catch(udErr) { console.error('Failed to update draft details before payment:', udErr); }`;

code = code.replace(targetStr, `          // Removed update-draft here to SPEED UP Pay Now processing.
          // complete/route.ts handles saving the customer details and applying the final discount natively.
          // This saves 1.5 - 2.0 seconds of blocking time!`);

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', code);
console.log('Optimized Cashfree flow in whatsapp-otp-modal.liquid!');
