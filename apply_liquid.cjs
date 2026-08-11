const fs = require('fs');
let liquid = fs.readFileSync('C:/Users/HP/Desktop/checkout-app/src/app/master-liquid.ts', 'utf8');
const code = liquid.replace('export const MASTER_LIQUID_TEMPLATE = ', 'module.exports = ');
fs.writeFileSync('temp.js', code);
const extractedString = require('./temp.js');
const finalLiquid = extractedString.replace(/{{MERCHANT_API_KEY}}/g, 'sk_live_11fit_106b31bb8dd7a7');
fs.writeFileSync('C:/Users/HP/Desktop/11fit theme/snippets/whatsapp-otp-modal.liquid', finalLiquid);
console.log('Successfully updated the Shopify theme snippet!');
