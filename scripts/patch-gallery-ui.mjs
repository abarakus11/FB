import fs from 'fs';

const path = 'C:/Users/FIC/Desktop/FB-ESTETICA/index.html';
let c = fs.readFileSync(path, 'utf8');

// CSS: video gallery + lightbox
const cssOld = `.gitem img{width:100%;height:auto;transition:transform .9s var(--ease),filter .6s;filter:saturate(.92) contrast(1.02)}
.gitem::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(5,5,6,.7));opacity:.6;transition:opacity .5s}`;

const cssNew = `.gitem img,.gitem video{width:100%;height:auto;display:block;transition:transform .9s var(--ease),filter .6s;filter:saturate(.92) contrast(1.02)}
.gitem--video video{aspect-ratio:16/10;object-fit:cover;background:#000}
.gitem .play-ico{position:absolute;inset:0;z-index:2;display:grid;place-items:center;pointer-events:none;
  font-size:0}
.gitem .play-ico::before{content:"";width:54px;height:54px;border-radius:50%;border:1px solid rgba(255,255,255,.35);
  background:rgba(5,5,6,.55);backdrop-filter:blur(6px);box-shadow:0 8px 28px rgba(0,0,0,.45)}
.gitem .play-ico::after{content:"";position:absolute;width:0;height:0;border-style:solid;border-width:9px 0 9px 15px;
  border-color:transparent transparent transparent #fff;margin-left:4px}
.gitem::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(5,5,6,.7));opacity:.6;transition:opacity .5s}`;

const cssOld2 = `.gitem:hover img{transform:scale(1.06);filter:saturate(1.05) contrast(1.05)}`;
const cssNew2 = `.gitem:hover img,.gitem:hover video{transform:scale(1.06);filter:saturate(1.05) contrast(1.05)}`;

const cssOld3 = `.lb img{max-width:min(1100px,92vw);max-height:88vh;border-radius:12px;border:1px solid var(--line-2);
  box-shadow:0 40px 120px rgba(0,0,0,.8);transform:scale(.94);transition:transform .5s var(--ease)}
.lb.open img{transform:scale(1)}`;
const cssNew3 = `.lb-media{max-width:min(1100px,92vw);max-height:88vh;display:flex;align-items:center;justify-content:center}
.lb img,.lb video{max-width:min(1100px,92vw);max-height:88vh;border-radius:12px;border:1px solid var(--line-2);
  box-shadow:0 40px 120px rgba(0,0,0,.8);transform:scale(.94);transition:transform .5s var(--ease);background:#000}
.lb.open img,.lb.open video{transform:scale(1)}
.lb video{width:100%}`;

// Lightbox HTML
const lbOld = `<div class="lb" id="lb"><button class="lb-x" id="lbx" data-hov><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button><img id="lbimg" src="" alt=""></div>`;
const lbNew = `<div class="lb" id="lb"><button class="lb-x" id="lbx" data-hov><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button><div class="lb-media" id="lbmedia"><img id="lbimg" src="" alt="" hidden><video id="lbvid" controls playsinline preload="metadata" hidden></video></div></div>`;

// Script tag before main inline script
const scriptOld = `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`;
const scriptNew = `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="assets/gallery/manifest.js?v=1"></script>`;

// Gallery array + build
const galleryOld = `const gallery = [
  {src:IMG.PORSCHE,   cap:"Porsche Macan · finalização"},
  {src:IMG.KIA_FRONT, cap:"Kia Sportage · finalização"},
  {src:IMG.CLASSIC_F, cap:"Clássico · brilho recuperado"},
  {src:IMG.KIA_INT,   cap:"Higienização interna"},
  {src:IMG.STUDIO,    cap:"Estúdio F&B"},
  {src:IMG.KIA_REAR,  cap:"Detalhe traseiro"},
  {src:IMG.CLASSIC_R, cap:"Marajó · cuidado de coleção"}
];`;

const galleryNew = `const gallery = window.GALLERY_ITEMS || [];`;

const buildOld = `/* build gallery */
const gal=document.getElementById('gal');
gallery.forEach(g=>{
  const el=document.createElement('div');
  el.className='gitem'; el.dataset.hov='';
  el.innerHTML=\`<img src="\${g.src}" alt="\${g.cap}" loading="lazy" decoding="async"><div class="cap">\${g.cap}</div>\`;
  el.addEventListener('click',()=>openLB(g.src,g.cap));
  gal.appendChild(el);
});`;

const buildNew = `/* build gallery */
const gal=document.getElementById('gal');
gallery.forEach(g=>{
  const el=document.createElement('div');
  const isVideo=g.type==='video';
  el.className='gitem'+(isVideo?' gitem--video':''); el.dataset.hov='';
  if(isVideo){
    el.innerHTML=\`<video src="\${g.src}" muted playsinline preload="metadata" aria-label="\${g.cap}"></video><div class="play-ico" aria-hidden="true"></div><div class="cap">\${g.cap}</div>\`;
    el.addEventListener('click',()=>openLB(g));
  } else {
    el.innerHTML=\`<img src="\${g.src}" alt="\${g.cap}" loading="lazy" decoding="async"><div class="cap">\${g.cap}</div>\`;
    el.addEventListener('click',()=>openLB(g));
  }
  gal.appendChild(el);
});`;

const lbJsOld = `const lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg');
function openLB(src,alt){lbimg.src=src;lbimg.alt=alt||'';lb.classList.add('open');document.body.style.overflow='hidden';}
function closeLB(){lb.classList.remove('open');document.body.style.overflow='';}`;

const lbJsNew = `const lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg'),lbvid=document.getElementById('lbvid');
function openLB(item){
  const isVideo=typeof item==='object'&&item.type==='video';
  const src=typeof item==='object'?item.src:item;
  const alt=typeof item==='object'?(item.cap||''): (arguments[1]||'');
  if(isVideo){
    lbimg.hidden=true; lbimg.removeAttribute('src');
    lbvid.hidden=false; lbvid.src=src; lbvid.currentTime=0;
    lbvid.play().catch(()=>{});
  } else {
    lbvid.hidden=true; lbvid.pause(); lbvid.removeAttribute('src');
    lbimg.hidden=false; lbimg.src=src; lbimg.alt=alt;
  }
  lb.classList.add('open'); document.body.style.overflow='hidden';
}
function closeLB(){
  lb.classList.remove('open'); document.body.style.overflow='';
  lbvid.pause(); lbvid.removeAttribute('src'); lbvid.hidden=true;
  lbimg.removeAttribute('src'); lbimg.hidden=true;
}`;

const replacements = [
  [cssOld, cssNew],
  [cssOld2, cssNew2],
  [cssOld3, cssNew3],
  [lbOld, lbNew],
  [scriptOld, scriptNew],
  [galleryOld, galleryNew],
  [buildOld, buildNew],
  [lbJsOld, lbJsNew],
];

for (const [old, neu] of replacements) {
  if (!c.includes(old)) {
    console.error('Block not found:', old.slice(0, 80));
    process.exit(1);
  }
  c = c.replace(old, neu);
}

fs.writeFileSync(path, c, 'utf8');
console.log('index.html patched');
