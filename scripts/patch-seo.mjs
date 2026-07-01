import fs from 'fs';
import path from 'path';

const ROOT = 'C:/Users/FIC/Desktop/FB-ESTETICA';
const INDEX = path.join(ROOT, 'index.html');
const SITE = 'https://fbestetica.vercel.app';
const TODAY = new Date().toISOString().slice(0, 10);

let html = fs.readFileSync(INDEX, 'utf8');

const SEO_HEAD = `<!-- SEO & Social -->
<meta name="author" content="F&amp;B Estética Automotiva">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
<meta name="google-site-verification" content="sjY7iCVlrdLo-8D_aAl7u33xKkFV6QtUZ-psCsKGVJs">
<meta name="theme-color" content="#050506">
<meta name="format-detection" content="telephone=yes">
<link rel="canonical" href="${SITE}/">
<link rel="alternate" hreflang="pt-BR" href="${SITE}/">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/og-image.jpg">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:locale" content="pt_BR">
<meta property="og:type" content="website">
<meta property="og:site_name" content="F&amp;B Estética Automotiva">
<meta property="og:title" content="F&amp;B Estética Automotiva — Polimento, Vitrificação e Lavagem Detalhada">
<meta property="og:description" content="Estética automotiva premium em Itapecerica da Serra. Polimento técnico, vitrificação, higienização interna e lavagem detalhada. Agende pelo WhatsApp.">
<meta property="og:url" content="${SITE}/">
<meta property="og:image" content="${SITE}/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Kia Sportage finalizada no estúdio F&amp;B Estética Automotiva">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="F&amp;B Estética Automotiva — Polimento, Vitrificação e Lavagem Detalhada">
<meta name="twitter:description" content="Estética automotiva premium em Itapecerica da Serra. Agende pelo WhatsApp (11) 92593-9170.">
<meta name="twitter:image" content="${SITE}/assets/og-image.jpg">
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
<link rel="preload" href="assets/hero-bg.mp4" as="video" type="video/mp4">
<link rel="preload" href="assets/og-image.jpg" as="image" type="image/jpeg">
`;

const SCHEMA = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "AutoRepair"],
      "@id": "${SITE}/#business",
      "name": "F&B Estética Automotiva",
      "description": "Polimento técnico, vitrificação, higienização interna e lavagem detalhada em Itapecerica da Serra.",
      "url": "${SITE}/",
      "telephone": "+55-11-92593-9170",
      "image": "${SITE}/assets/og-image.jpg",
      "logo": "${SITE}/assets/favicon.svg",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rod. José Simões Louro Júnior, 15360, Crispim",
        "addressLocality": "Itapecerica da Serra",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -23.717,
        "longitude": -46.849
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      }],
      "sameAs": [
        "https://www.instagram.com/esteticaautomotiva_fb/",
        "https://wa.me/5511925939170"
      ],
      "areaServed": { "@type": "AdministrativeArea", "name": "Grande São Paulo" }
    },
    {
      "@type": "WebSite",
      "@id": "${SITE}/#website",
      "url": "${SITE}/",
      "name": "F&B Estética Automotiva",
      "publisher": { "@id": "${SITE}/#business" },
      "inLanguage": "pt-BR"
    },
    {
      "@type": "WebPage",
      "@id": "${SITE}/#webpage",
      "url": "${SITE}/",
      "name": "F&B Estética Automotiva — Polimento, Vitrificação e Lavagem Detalhada",
      "isPartOf": { "@id": "${SITE}/#website" },
      "about": { "@id": "${SITE}/#business" },
      "inLanguage": "pt-BR"
    }
  ]
}
</script>`;

html = html.replace(
  /<title>[^<]*<\/title>/,
  '<title>F&amp;B Estética Automotiva — Polimento, Vitrificação e Lavagem Detalhada | Itapecerica da Serra</title>'
);
html = html.replace(
  /<meta name="description" content="[^"]*"\s*\/?>/,
  '<meta name="description" content="F&amp;B Estética Automotiva em Itapecerica da Serra: polimento técnico, vitrificação, higienização interna e lavagem detalhada. Agende pelo WhatsApp (11) 92593-9170.">'
);

if (!html.includes('rel="canonical"')) {
  html = html.replace(/<meta name="viewport"[^>]+>\s*/, (m) => m + SEO_HEAD);
}
if (!html.includes('application/ld+json')) {
  html = html.replace('</head>', `${SCHEMA}\n</head>`);
}

const a11yCss = `
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
:focus-visible{outline:2px solid var(--red-lo);outline-offset:3px}
.skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:999}
.skip-link:focus{left:16px;top:16px;width:auto;height:auto;padding:12px 18px;background:#050506;color:#fff;border:1px solid var(--red-lo);border-radius:8px;font-family:var(--ff-display);font-size:13px;font-weight:600}
`;
if (!html.includes('.sr-only')) {
  html = html.replace('</style>', `${a11yCss}\n</style>`);
}

if (!html.includes('href="#conteudo"')) {
  html = html.replace('<body>', '<body>\n<a class="skip-link" href="#conteudo">Ir para o conteúdo principal</a>');
}

html = html.replace(
  '<header class="header" id="header">',
  '<header class="header" id="header" role="banner">'
);
html = html.replace(
  '<div class="side" id="navL">',
  '<nav class="side" id="navL" aria-label="Navegação principal">'
);
html = html.replace(
  '</div>\n  <div class="side" id="navR" style="justify-content:flex-end">',
  '</nav>\n  <nav class="side" id="navR" style="justify-content:flex-end" aria-label="Contato e agendamento">'
);
html = html.replace(
  /(<a class="btn-mini"[^>]+>Agendar<\/a>)\s*\n  <\/div>\s*\n<\/header>/,
  '$1\n  </nav>\n</header>'
);

if (!html.includes('id="conteudo"')) {
  html = html.replace('<!-- HERO -->', '<main id="conteudo">\n<!-- HERO -->');
  html = html.replace('<!-- FOOTER -->', '</main>\n\n<!-- FOOTER -->');
}

html = html.replace(
  '<h1 class="hero-title chrome-text" data-split>F&amp;B</h1>\n    <div class="hero-sub" data-split-sub>Estética Automotiva</div>',
  '<h1 class="hero-title"><span class="chrome-text" data-split aria-hidden="true">F&amp;B</span><span class="sr-only">F&amp;B Estética Automotiva — polimento e vitrificação em Itapecerica da Serra</span></h1>\n    <p class="hero-sub" data-split-sub>Estética Automotiva</p>'
);

html = html.replace('<div class="about-media reveal">', '<figure class="about-media reveal">');
html = html.replace(
  /<img src="assets\/about\/kia-sportage\.jpg\?v=1" alt="[^"]*" data-parallax decoding="async" loading="lazy">/,
  '<img src="assets/about/kia-sportage.jpg?v=1" alt="Kia Sportage com acabamento premium no estúdio F&amp;B Estética Automotiva" title="Kia Sportage · acabamento F&amp;B" width="800" height="1000" data-parallax decoding="async" loading="lazy">'
);
html = html.replace(
  '<div class="about-frame"></div>\n    </div>\n  </div>\n</section>\n\n<div class="hexrule"></div>\n\n<!-- SERVIÇOS -->',
  '<div class="about-frame" aria-hidden="true"></div>\n    </figure>\n  </div>\n</section>\n\n<div class="hexrule"></div>\n\n<!-- SERVIÇOS -->'
);

html = html.replace(
  '<div class="foot-col">\n      <h4>Contato</h4>',
  '<address class="foot-col">\n      <h4>Contato</h4>'
);
html = html.replace(
  '<p>Seg a Sáb · com agendamento</p>\n    </div>\n  </div>\n  <div class="foot-map reveal">',
  '<p>Seg a Sáb · com agendamento</p>\n    </address>\n  </div>\n  <div class="foot-map reveal">'
);
html = html.replace('<footer class="footer">', '<footer class="footer" role="contentinfo">');
html = html.replace(/target="_blank" rel="noopener"/g, 'target="_blank" rel="noopener noreferrer"');

html = html.replace(
  '<video class="bg-video" id="bgVideo" autoplay muted loop playsinline preload="auto" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback>',
  '<video class="bg-video" id="bgVideo" autoplay muted loop playsinline preload="metadata" poster="assets/og-image.jpg" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback>'
);

html = html.replace(
  /<img src="data:image\/jpeg;base64,[^"]+"[^>]*>/,
  '<img src="assets/og-image.jpg" alt="" width="1200" height="800" decoding="async" fetchpriority="low" aria-hidden="true">'
);

html = html.replace(
  /(<div class="brandmark" id="brandmark"><img src="data:image\/png;base64,[^"]+")(\/?>)/,
  '$1 alt="Logo F&amp;B Estética Automotiva" width="400" height="400" decoding="async"$2'
);

html = html.replace(/\nconst IMG = \{[\s\S]*?\};\n/, '\n');

html = html.replace(
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>'
);

html = html.replace(
  '/* ============================================================\n   THREE.JS',
  `function loadScript(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.defer=true;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}\n\n/* ============================================================\n   THREE.JS`
);

html = html.replace(
  '(function(){\n  if(REDUCED || !window.THREE) return;',
  `(function initThree(){\n  if(REDUCED) return;\n  loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js').then(()=>{\n  if(!window.THREE) return;`
);
html = html.replace('  tick();\n})();', '  tick();\n}).catch(()=>{});\n})();');

html = html.replace(
  'el.innerHTML=`<img src="${g.src}" alt="${g.cap}" loading="lazy" decoding="async"><div class="cap">${g.cap}</div>`;',
  'el.innerHTML=`<img src="${g.src}" alt="${g.cap}" title="${g.cap}" loading="lazy" decoding="async" width="340" height="260"><div class="cap">${g.cap}</div>`;'
);
html = html.replace(
  "el.className='gitem'+(isVideo?' gitem--video':''); el.dataset.hov='';",
  "el.className='gitem'+(isVideo?' gitem--video':''); el.dataset.hov=''; el.setAttribute('role','button'); el.setAttribute('tabindex','0'); el.setAttribute('aria-label',`Abrir ${g.cap}`);"
);

if (!html.includes("galTrack?.addEventListener('keydown'")) {
  html = html.replace(
    'if(galTrack){\n  initGalMarquee();',
    `galTrack?.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const item=e.target.closest('.gitem');if(!item)return;e.preventDefault();item.click();});\nif(galTrack){\n  initGalMarquee();`
  );
}

html = html.replace(
  '<div class="lb" id="lb">',
  '<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Visualização ampliada">'
);
html = html.replace(
  '<button class="lb-x" id="lbx" data-hov>',
  '<button class="lb-x" id="lbx" data-hov type="button" aria-label="Fechar visualização">'
);
html = html.replace(
  "el.className='svc'; el.dataset.tilt='';",
  "el.className='svc'; el.dataset.tilt=''; el.setAttribute('role','article');"
);
html = html.replace(
  "el.className='proc-row reveal';",
  "el.className='proc-row reveal'; el.setAttribute('role','article');"
);

fs.writeFileSync(path.join(ROOT, 'site.webmanifest'), JSON.stringify({
  name: 'F&B Estética Automotiva',
  short_name: 'F&B Estética',
  description: 'Polimento, vitrificação e lavagem detalhada em Itapecerica da Serra',
  start_url: '/',
  display: 'standalone',
  background_color: '#050506',
  theme_color: '#050506',
  lang: 'pt-BR',
  icons: [
    { src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: '/assets/og-image.jpg', sizes: '512x512', type: 'image/jpeg' }
  ]
}, null, 2));

fs.writeFileSync(path.join(ROOT, 'scripts/generate-sitemap.mjs'), `import fs from 'fs';
const SITE = 'https://fbestetica.vercel.app';
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync('sitemap.xml', \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>\${SITE}/</loc><lastmod>\${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>\`);
console.log('sitemap.xml updated', today);
`);

const sitemapPath = path.join(ROOT, 'sitemap.xml');
fs.writeFileSync(
  sitemapPath,
  fs.readFileSync(sitemapPath, 'utf8').replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${TODAY}</lastmod>`)
);

fs.writeFileSync(INDEX, html, 'utf8');
console.log('SEO patch applied. index.html size:', (fs.statSync(INDEX).size / 1024 / 1024).toFixed(2), 'MB');
