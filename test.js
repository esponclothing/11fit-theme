const fs = require('fs');
let js = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf-8');
const scriptMatch = js.match(/<script>([\s\S]*?)<\/script>/);
let script = scriptMatch ? scriptMatch[1] : '';
script = script.replace(/\{%[\s\S]*?%\}/g, '').replace(/\{\{[\s\S]*?\}\}/g, '\"\"');
fs.writeFileSync('test2.js', script);
