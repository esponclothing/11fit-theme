const fs = require('fs');
const file_path = 'c:/Users/HP/Desktop/11fit theme/sections/11fit-3d-deal.liquid';
let content = fs.readFileSync(file_path, 'utf-8');

content = content.replace("track.addEventListener('pointerdown', (e) => {", `
    // Prevent native image drag on PC so manual swiping works
    track.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    track.addEventListener('pointerdown', (e) => {`);

content = content.replace("track.addEventListener('mouseenter', stopAutoPlay);", "// removed mouseenter stopAutoPlay");
content = content.replace("track.addEventListener('mouseleave', () => { if(!isPriceUnlocked) startAutoPlay(); });", "// removed mouseleave startAutoPlay");

fs.writeFileSync(file_path, content, 'utf-8');
console.log('Successfully applied PC fixes!');
