const fs = require('fs');
let code = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

// 1. Fix the submit event listener
code = code.replace(
  `const isShopifyCheckout = (action.includes('/cart') || action.includes('/checkout')) && !action.includes('cashfree');`,
  `if (action.includes('/cart/add')) return;\n    const isShopifyCheckout = (action.includes('/cart') || action.includes('/checkout')) && !action.includes('cashfree');\n    // Cart forms should only be intercepted if submitted by checkout button\n    if (action.endsWith('/cart') || action.endsWith('/cart/')) {\n      if (e.submitter && e.submitter.name !== 'checkout') return;\n    }`
);

// 2. Fix the HTMLFormElement.prototype.submit
code = code.replace(
  `    if (action.includes('cashfree') || action.includes('razorpay') || action.includes('paytm')) {\r\n      _origSubmit.apply(this, arguments);\r\n      return;\r\n    }`,
  `    if (action.includes('cashfree') || action.includes('razorpay') || action.includes('paytm')) {\r\n      _origSubmit.apply(this, arguments);\r\n      return;\r\n    }\r\n    if (action.includes('/cart/add')) {\r\n      _origSubmit.apply(this, arguments);\r\n      return;\r\n    }`
);

// 3. Fix the global interceptor selector
code = code.replace(
  `let target = e.target.closest('button[name="checkout"], a[href*="/checkout"], input[name="checkout"], #checkout, .cart__checkout-button, .checkout-btn, .cart-drawer__checkout, .cart__submit, [data-checkout], form[action*="/cart"] [type="submit"], form[action*="/checkout"] [type="submit"]');`,
  `let target = e.target.closest('button[name="checkout"], a[href*="/checkout"], input[name="checkout"], #checkout, .cart__checkout-button, .checkout-btn, .cart-drawer__checkout, .cart__submit[name="checkout"], [data-checkout], form[action*="/checkout"] [type="submit"]');`
);

// 4. Fix txt.includes
code = code.replace(
  `          if (txt.includes('checkout') || txt.includes('check out') || href.includes('/checkout')) {`,
  `          if (btnEl.name === 'checkout' || href.includes('/checkout')) {`
);

fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', code);
console.log('Fixed interceptors!');
