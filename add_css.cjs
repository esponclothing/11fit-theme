const fs = require('fs');

let themeCode = fs.readFileSync('layout/theme.liquid', 'utf8');

if (!themeCode.includes('.policy-container')) {
  const css = `
  <style>
    .policy-container {
      max-width: 800px;
      margin: 0 auto;
      font-family: inherit;
      line-height: 1.8;
      color: #333;
    }
    .policy-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .policy-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: #111;
    }
    .policy-header p {
      font-size: 1.1rem;
      color: #555;
      max-width: 600px;
      margin: 0 auto;
    }
    .policy-section {
      background: #fff;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      padding: 30px 35px;
      margin-bottom: 25px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    }
    .policy-section h2, .policy-section h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 15px;
      color: #111;
    }
    .policy-section p, .policy-section ul {
      margin-bottom: 15px;
      font-size: 1.05rem;
    }
    .policy-section ul {
      padding-left: 20px;
    }
    .policy-section li {
      margin-bottom: 8px;
    }
    .payment-card {
      background: #fdfdfd;
      border: 1px solid #e0e0e0;
      padding: 20px;
      border-radius: 6px;
      margin-bottom: 15px;
    }
    .payment-card h3 {
      font-size: 1.15rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 10px;
      color: #111;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .highlight-box {
      background: #f9f9f9;
      border-left: 4px solid #111;
      padding: 20px;
      margin: 25px 0;
      font-weight: 500;
      font-size: 1.1rem;
      color: #222;
      font-style: italic;
    }
  </style>
  `;
  themeCode = themeCode.replace('</head>', css + '</head>');
  fs.writeFileSync('layout/theme.liquid', themeCode);
  console.log('Appended CSS to theme.liquid');
} else {
  console.log('CSS already exists in theme.liquid');
}
