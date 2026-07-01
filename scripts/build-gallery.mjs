import fs from 'fs';
import path from 'path';

const SRC = 'C:/Users/FIC/Desktop/marcio estetica';
const ROOT = 'C:/Users/FIC/Desktop/FB-ESTETICA';
const IMG_OUT = path.join(ROOT, 'assets/gallery/images');
const VID_OUT = path.join(ROOT, 'assets/gallery/videos');

const CAPTIONS = {
  'WhatsApp Image 2026-07-01 at 12.21.27.jpeg': 'Lavagem detalhada · Chevrolet Corsa',
  'WhatsApp Image 2026-07-01 at 12.21.27 (1).jpeg': 'Higienização em andamento',
  'WhatsApp Image 2026-07-01 at 12.21.27 (2).jpeg': 'Acabamento externo premium',
  'WhatsApp Image 2026-07-01 at 12.21.28.jpeg': 'Volvo XC60 · vitrificação',
  'WhatsApp Image 2026-07-01 at 12.21.28 (1).jpeg': 'Chery Tiggo 8 · antes do serviço',
  'WhatsApp Image 2026-07-01 at 12.21.28 (2).jpeg': 'Detalhamento de pintura',
  'WhatsApp Image 2026-07-01 at 12.21.28 (3).jpeg': 'Honda City · finalização',
  'WhatsApp Image 2026-07-01 at 12.21.29.jpeg': 'Honda Fit · estúdio F&B',
  'WhatsApp Image 2026-07-01 at 12.21.29 (1).jpeg': 'Chevrolet Corsa MAXX · polimento',
  'WhatsApp Image 2026-07-01 at 12.21.29 (2).jpeg': 'Interior Volkswagen · higienização',
  'WhatsApp Image 2026-07-01 at 12.21.30.jpeg': 'Toyota SW4 · acabamento',
  'WhatsApp Image 2026-07-01 at 12.21.30 (1).jpeg': 'Restauração de faróis · antes',
  'WhatsApp Image 2026-07-01 at 12.21.30 (2).jpeg': 'Restauração de faróis · depois',
  'WhatsApp Image 2026-07-01 at 12.21.30 (3).jpeg': 'Volvo XC60 · brilho recuperado',
  'WhatsApp Image 2026-07-01 at 12.21.31.jpeg': 'Interior Toyota · detalhamento',
  'WhatsApp Image 2026-07-01 at 12.21.31 (1).jpeg': 'Chevrolet Spin · finalização',
  'WhatsApp Image 2026-07-01 at 12.21.31 (2).jpeg': 'Interior Honda · higienização',
  'WhatsApp Image 2026-07-01 at 12.21.31 (3).jpeg': 'Chevette clássico · interior',
  'WhatsApp Image 2026-07-01 at 12.21.31 (4).jpeg': 'Volkswagen · vitrificação',
  'WhatsApp Image 2026-07-01 at 12.21.32.jpeg': 'Pintura espelhada · detalhe',
  'WhatsApp Image 2026-07-01 at 12.21.32 (1).jpeg': 'Acabamento de alto padrão',
  'WhatsApp Image 2026-07-01 at 12.21.32 (2).jpeg': 'Lavagem técnica',
  'WhatsApp Image 2026-07-01 at 12.21.32 (3).jpeg': 'Proteção e brilho',
  'WhatsApp Image 2026-07-01 at 12.21.32 (4).jpeg': 'Estúdio F&B · iluminação',
  'WhatsApp Image 2026-07-01 at 12.21.33.jpeg': 'Resultado final · exterior',
  'WhatsApp Image 2026-07-01 at 12.21.33 (1).jpeg': 'Higienização completa',
  'WhatsApp Image 2026-07-01 at 12.21.33 (2).jpeg': 'Detalhe de acabamento',
  'WhatsApp Image 2026-07-01 at 12.21.33 (3).jpeg': 'Polimento profissional',
  'WhatsApp Image 2026-07-01 at 12.21.33 (4).jpeg': 'Cuidado com cada detalhe',
  'WhatsApp Image 2026-07-01 at 12.21.34.jpeg': 'Serviço em andamento',
  'WhatsApp Image 2026-07-01 at 12.21.34 (1).jpeg': 'Lavagem detalhada',
  'WhatsApp Image 2026-07-01 at 12.21.34 (2).jpeg': 'Finalização premium',
  'WhatsApp Image 2026-07-01 at 12.21.35.jpeg': 'Restauração de faróis',
  'WhatsApp Image 2026-07-01 at 12.21.35 (2).jpeg': 'Interior impecável',
  'WhatsApp Image 2026-07-01 at 12.21.35 (3).jpeg': 'Acabamento F&B',
  'WhatsApp Image 2026-07-01 at 12.21.36.jpeg': 'Dois veículos · estúdio',
  'WhatsApp Image 2026-07-01 at 12.21.36 (1).jpeg': 'Honda Civic · resultado',
  'WhatsApp Video 2026-07-01 at 12.21.29.mp4': 'Processo em ação',
  'WhatsApp Video 2026-07-01 at 12.21.29 (1).mp4': 'Detalhamento em vídeo',
  'WhatsApp Video 2026-07-01 at 12.21.30.mp4': 'Lavagem e acabamento',
  'WhatsApp Video 2026-07-01 at 12.21.34.mp4': 'Polimento em execução',
  'WhatsApp Video 2026-07-01 at 12.21.35.mp4': 'Higienização interna',
  'WhatsApp Video 2026-07-01 at 12.21.36.mp4': 'Finalização do serviço',
  'WhatsApp Video 2026-07-01 at 12.21.36 (1).mp4': 'Trabalho realizado · vídeo',
};

function sortKey(name) {
  const m = name.match(/(\d{2})\.(\d{2})\.(\d{2})/);
  const base = m ? `${m[1]}${m[2]}${m[3]}` : name;
  const n = name.match(/\((\d+)\)/);
  const suffix = n ? String(n[1]).padStart(2, '0') : '00';
  const isVideo = name.toLowerCase().endsWith('.mp4') ? '1' : '0';
  return `${isVideo}-${base}-${suffix}-${name}`;
}

const files = fs.readdirSync(SRC)
  .filter((f) => /^WhatsApp (Image|Video) 2026-07-01 at 12\.21\./.test(f))
  .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

const items = [];
let imgN = 0;
let vidN = 0;

for (const file of files) {
  const isVideo = file.toLowerCase().endsWith('.mp4');
  const cap = CAPTIONS[file] || (isVideo ? 'Processo em ação' : 'Trabalho realizado · F&B');

  if (isVideo) {
    vidN += 1;
    const dest = `video-${String(vidN).padStart(2, '0')}.mp4`;
    fs.copyFileSync(path.join(SRC, file), path.join(VID_OUT, dest));
    items.push({ type: 'video', src: `assets/gallery/videos/${dest}`, cap });
  } else {
    imgN += 1;
    const dest = `img-${String(imgN).padStart(2, '0')}.jpg`;
    fs.copyFileSync(path.join(SRC, file), path.join(IMG_OUT, dest));
    items.push({ type: 'image', src: `assets/gallery/images/${dest}`, cap });
  }
}

// Videos first in gallery for visual impact, then images
const videos = items.filter((i) => i.type === 'video');
const images = items.filter((i) => i.type === 'image');
const gallery = [...videos, ...images];

const manifest = `window.GALLERY_ITEMS=${JSON.stringify(gallery, null, 2)};\n`;
fs.writeFileSync(path.join(ROOT, 'assets/gallery/manifest.js'), manifest, 'utf8');

console.log(`Gallery built: ${images.length} images, ${videos.length} videos`);
