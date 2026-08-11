const fs = require('fs');
const content = fs.readFileSync('snippets/whatsapp-otp-modal.liquid', 'utf8');

let styleContent = '';
let jsContent = '';
let htmlContent = content;

const styleRegex = /({%\s*style\s*%}|<style>)([\s\S]*?)({%\s*endstyle\s*%}|<\/style>)/gi;
let match;
while ((match = styleRegex.exec(content)) !== null) {
  styleContent += match[2] + '\n';
  htmlContent = htmlContent.replace(match[0], '');
}

const scriptRegex = /<script.*?>([\s\S]*?)<\/script>/gi;
while ((match = scriptRegex.exec(content)) !== null) {
  if (match[0].includes('src=')) {
     continue;
  }
  jsContent += match[1] + '\n';
  htmlContent = htmlContent.replace(match[0], '');
}

htmlContent = `
{{ 'whatsapp-checkout.css' | asset_url | stylesheet_tag }}
` + htmlContent.trim() + `
<script src="{{ 'whatsapp-checkout.js' | asset_url }}" defer="defer"></script>
`;

fs.writeFileSync('assets/whatsapp-checkout.css', styleContent.trim());
fs.writeFileSync('assets/whatsapp-checkout.js', jsContent.trim());
fs.writeFileSync('snippets/whatsapp-otp-modal.liquid', htmlContent);

console.log('Split complete!');
