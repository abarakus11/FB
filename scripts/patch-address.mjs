import fs from 'fs';

const path = 'C:/Users/FIC/Desktop/FB-ESTETICA/index.html';
let c = fs.readFileSync(path, 'utf8');

const ADDRESS = 'Rod. José Simões Louro Júnior, 15360, Crispim, Itapecerica da Serra, SP';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&hl=pt-BR&z=16&output=embed`;

const cssOld = `.foot-bottom{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:50px;padding-top:24px;border-top:1px solid var(--line);
  font-size:12px;color:var(--steel-dim);letter-spacing:.04em}`;

const cssNew = `.foot-map{margin-top:50px}
.foot-map-link{position:relative;display:block;border-radius:16px;overflow:hidden;border:1px solid var(--line-2);
  background:var(--panel);transition:border-color .35s,box-shadow .35s}
.foot-map-link:hover{border-color:rgba(230,0,18,.45);box-shadow:0 18px 50px rgba(0,0,0,.35)}
.foot-map-link iframe{width:100%;height:clamp(220px,36vw,360px);border:0;display:block;pointer-events:none;
  filter:saturate(.85) contrast(1.04) brightness(.72)}
.foot-map-overlay{position:absolute;inset:0;z-index:2}
.foot-map-cap{position:absolute;inset:auto 0 0 0;z-index:3;display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;
  padding:22px clamp(18px,4vw,28px);background:linear-gradient(180deg,transparent,rgba(5,5,6,.88) 38%,rgba(5,5,6,.96))}
.foot-map-cap strong{display:block;font-family:var(--ff-display);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--steel);margin-bottom:8px;font-weight:600}
.foot-map-cap p{color:var(--chrome-hi);font-size:clamp(15px,2vw,18px);line-height:1.45;font-weight:500;max-width:36ch}
.foot-map-open{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-display);font-size:12px;font-weight:700;
  letter-spacing:.12em;text-transform:uppercase;color:#fff;background:rgba(230,0,18,.18);border:1px solid rgba(230,0,18,.45);
  padding:12px 18px;border-radius:40px;white-space:nowrap}
.foot-map-link:hover .foot-map-open{background:rgba(230,0,18,.32);border-color:var(--red-lo)}
.foot-bottom{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:50px;padding-top:24px;border-top:1px solid var(--line);
  font-size:12px;color:var(--steel-dim);letter-spacing:.04em}`;

const contactOld = `    <div class="foot-col">
      <h4>Contato</h4>
      <a href="https://wa.me/5511925939170" target="_blank" rel="noopener">WhatsApp (11) 92593-9170</a>
      <p>Grande São Paulo · SP</p>
      <p>Seg a Sáb · com agendamento</p>
    </div>
  </div>
  <div class="foot-bottom">`;

const contactNew = `    <div class="foot-col">
      <h4>Contato</h4>
      <a href="https://wa.me/5511925939170" target="_blank" rel="noopener">WhatsApp (11) 92593-9170</a>
      <a href="${mapsUrl}" target="_blank" rel="noopener">Rod. José Simões Louro Júnior, 15360<br>Crispim · Itapecerica da Serra · SP</a>
      <p>Seg a Sáb · com agendamento</p>
    </div>
  </div>
  <div class="foot-map reveal">
    <a class="foot-map-link" href="${mapsUrl}" target="_blank" rel="noopener" aria-label="Abrir endereço no Google Maps">
      <iframe src="${embedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa — F&amp;B Estética Automotiva" tabindex="-1"></iframe>
      <span class="foot-map-overlay" aria-hidden="true"></span>
      <div class="foot-map-cap">
        <div>
          <strong>Como chegar</strong>
          <p>Rod. José Simões Louro Júnior, 15360<br>Crispim · Itapecerica da Serra · SP</p>
        </div>
        <span class="foot-map-open">Abrir no Google Maps</span>
      </div>
    </a>
  </div>
  <div class="foot-bottom">`;

for (const [old, neu, label] of [
  [cssOld, cssNew, 'css'],
  [contactOld, contactNew, 'footer html'],
]) {
  if (!c.includes(old)) {
    console.error(`Block not found: ${label}`);
    process.exit(1);
  }
  c = c.replace(old, neu);
}

fs.writeFileSync(path, c, 'utf8');
console.log('Address + map added');
