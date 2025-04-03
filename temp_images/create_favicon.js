const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// Create a simple SVG representation of the image
const svgContent = `
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#ede0ce" />
  <circle cx="16" cy="16" r="12" fill="#ede0ce" stroke="#000" stroke-width="1" />
  <circle cx="10" cy="16" r="4" fill="#000" />
  <path d="M 10,16 Q 16,8 22,16" stroke="#000" stroke-width="1" fill="none" />
</svg>
`;

const svgBuffer = Buffer.from(svgContent);

// Create directories if they don't exist
const tempDir = path.join(__dirname);
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Create a PNG version first
sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toBuffer()
  .then(data => {
    fs.writeFileSync(path.join(tempDir, 'favicon.png'), data);
    console.log('PNG favicon created');
    
    // Now create the ICO file
    return sharp(data)
      .toFormat('ico')
      .toBuffer();
  })
  .then(data => {
    fs.writeFileSync(path.join(__dirname, '..', 'favicon.ico'), data);
    console.log('ICO favicon created and moved to project root');
  })
  .catch(err => console.error('Error creating favicon:', err));
