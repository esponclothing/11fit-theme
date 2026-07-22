const fs = require('fs');
fetch('https://11fit.in/products.json?limit=1')
  .then(r => r.json())
  .then(data => {
    const p = data.products[0];
    fetch('https://11fit.in/recommendations/products.json?product_id=' + p.id + '&limit=1')
      .then(r => r.json())
      .then(data2 => console.log(JSON.stringify(data2, null, 2)));
  });
