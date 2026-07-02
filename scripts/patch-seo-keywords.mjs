import fs from 'fs';
import path from 'path';

const INDEX = path.join('C:/Users/FIC/Desktop/FB-ESTETICA/index.html');
const SITE = 'https://fbestetica.vercel.app';
const TITLE = 'FB Estética Automotiva | Estética em Itapecerica da Serra';
const DESC = 'Especialistas em estética automotiva em Itapecerica da Serra. Polimento técnico, vitrificação, higienização interna, revitalização de faróis e detalhamento premium.';

let html = fs.readFileSync(INDEX, 'utf8');

html = html.replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`);
html = html.replace(
  /<meta name="description" content="[^"]*"\s*\/?>/,
  `<meta name="description" content="${DESC}">`
);
html = html.replace(
  /<meta property="og:title" content="[^"]*"\s*\/?>/,
  `<meta property="og:title" content="${TITLE}">`
);
html = html.replace(
  /<meta property="og:description" content="[^"]*"\s*\/?>/,
  `<meta property="og:description" content="${DESC}">`
);
html = html.replace(
  /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
  `<meta name="twitter:title" content="${TITLE}">`
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
  `<meta name="twitter:description" content="${DESC} Agende pelo WhatsApp (11) 92593-9170.">`
);

if (!html.includes('geo.region')) {
  html = html.replace(
    '<meta name="format-detection"',
    '<meta name="geo.region" content="BR-SP">\n<meta name="geo.placename" content="Itapecerica da Serra">\n<meta name="format-detection"'
  );
}

console.log('SEO keywords patch applied.');
fs.writeFileSync(INDEX, html, 'utf8');
