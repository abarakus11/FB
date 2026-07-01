import fs from 'fs';

const path = 'C:/Users/FIC/Desktop/FB-ESTETICA/index.html';
let c = fs.readFileSync(path, 'utf8');

const start = c.indexOf('<div class="about-media reveal">');
if (start === -1) {
  console.error('about-media not found');
  process.exit(1);
}

const imgStart = c.indexOf('<img', start);
const imgEnd = c.indexOf('>', imgStart) + 1;
const replacement =
  '<img src="assets/about/kia-sportage.jpg?v=1" alt="Kia Sportage · acabamento F&amp;B" data-parallax decoding="async" loading="lazy">';

c = c.slice(0, imgStart) + replacement + c.slice(imgEnd);
fs.writeFileSync(path, c, 'utf8');
console.log('About image replaced');
