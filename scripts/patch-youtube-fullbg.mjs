import fs from 'fs';

const path = 'C:/Users/FIC/Desktop/FB-ESTETICA/index.html';
let c = fs.readFileSync(path, 'utf8');

const cssOld = `/* ============================ AUTOMOTIVE BG (real car) ============================ */
.auto-bg{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.auto-bg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;
  transform:scale(1.08);will-change:transform;filter:saturate(.86) contrast(1.06) brightness(.6)}
/* youtube video background — scaled/cropped, zero player chrome */
.video-wrap{position:absolute;inset:0;overflow:hidden;pointer-events:none;isolation:isolate}
#ytBgMount{position:absolute;inset:0}
.video-wrap iframe{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(1.42);
  width:100vw;height:56.25vw;min-width:177.78vh;min-height:100vh;border:0;pointer-events:none!important;
  filter:saturate(.9) contrast(1.05) brightness(.6)}
.video-shield{position:absolute;inset:0;z-index:3;background:transparent;pointer-events:auto;cursor:default}`;

const cssNew = `/* ============================ AUTOMOTIVE BG (full-page cover) ============================ */
.auto-bg{position:fixed;top:0;left:0;width:100vw;height:100vh;height:100dvh;min-height:100%;z-index:0;overflow:hidden;pointer-events:none}
.auto-bg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;
  transform:scale(1.08);will-change:transform;filter:saturate(.86) contrast(1.06) brightness(.6);transition:opacity .6s}
.auto-bg.is-video img{opacity:0}
/* youtube video — object-fit:cover em tela cheia */
.video-wrap{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none}
#ytBgMount{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none}
#ytBgMount iframe,.video-wrap iframe{position:absolute!important;top:50%!important;left:50%!important;
  width:max(100vw,177.78vh)!important;height:max(100vh,56.25vw)!important;max-width:none!important;max-height:none!important;
  transform:translate(-50%,-50%) scale(1.48)!important;border:0!important;pointer-events:none!important;
  filter:saturate(.9) contrast(1.05) brightness(.6)}
.video-shield{position:absolute;inset:0;z-index:3;background:transparent;pointer-events:auto;cursor:default}`;

const bg3dOld = `#bg3d{position:fixed;inset:0;z-index:0;pointer-events:none}
.vignette{position:fixed;inset:0;z-index:1;pointer-events:none`;
const bg3dNew = `#bg3d{position:fixed;inset:0;z-index:1;pointer-events:none}
.vignette{position:fixed;inset:0;z-index:2;pointer-events:none`;

const ytOld = `      events:{
        onReady:(e)=>{e.target.mute();e.target.playVideo();},
        onStateChange:(e)=>{
          if(e.data===YT.PlayerState.PAUSED||e.data===YT.PlayerState.ENDED) e.target.playVideo();
        }
      }
    });
  };
  const mountEl=document.createElement('div');
  mountEl.id='ytBgMount';
  wrap.prepend(mountEl);`;

const ytNew = `      events:{
        onReady:(e)=>{
          e.target.mute(); e.target.playVideo();
          document.getElementById('autoBg')?.classList.add('is-video');
          fitBgIframe();
        },
        onStateChange:(e)=>{
          if(e.data===YT.PlayerState.PAUSED||e.data===YT.PlayerState.ENDED) e.target.playVideo();
        }
      }
    });
  };
  const fitBgIframe=()=>{
    const iframe=wrap.querySelector('iframe');
    if(!iframe) return;
    iframe.setAttribute('tabindex','-1');
    iframe.setAttribute('aria-hidden','true');
  };
  const mountEl=document.createElement('div');
  mountEl.id='ytBgMount';
  wrap.prepend(mountEl);
  addEventListener('resize',fitBgIframe,{passive:true});`;

const gsapOld = `  gsap.to(['.auto-bg img','#videoWrap'],{yPercent:9,scale:1.16,ease:'none',
    scrollTrigger:{trigger:'#topo',start:'top top',end:'bottom top',scrub:true,invalidateOnRefresh:true}});`;
const gsapNew = `  gsap.to(['.auto-bg img','#videoWrap'],{yPercent:6,scale:1.08,ease:'none',
    scrollTrigger:{trigger:'#topo',start:'top top',end:'bottom top',scrub:true,invalidateOnRefresh:true}});`;

const reducedOld = `  .auto-bg{position:absolute;height:100svh}`;
const reducedNew = `  .auto-bg{position:fixed;height:100dvh}`;

for (const [old, neu, label] of [
  [cssOld, cssNew, 'auto-bg css'],
  [bg3dOld, bg3dNew, 'z-index'],
  [ytOld, ytNew, 'youtube js'],
  [gsapOld, gsapNew, 'gsap'],
  [reducedOld, reducedNew, 'reduced motion'],
]) {
  if (!c.includes(old)) {
    console.error(`Not found: ${label}`);
    process.exit(1);
  }
  c = c.replace(old, neu);
}

fs.writeFileSync(path, c, 'utf8');
console.log('Full-page background fix applied');
