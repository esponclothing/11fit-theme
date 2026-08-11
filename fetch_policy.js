fetch('https://11fit.in/policies/shipping-policy')
  .then(r => r.text())
  .then(html => {
    const match = html.match(/class="shopify-policy__body[^>]*>([\s\S]*?)<\/div>/);
    if (match) {
      console.log(match[1].substring(0, 1000));
    } else {
      console.log('Container not found');
    }
  });
