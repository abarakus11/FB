import fs from 'fs';

const path = 'C:/Users/FIC/Desktop/FB-ESTETICA/index.html';
let c = fs.readFileSync(path, 'utf8');

// Remove YouTube API script
c = c.replace('<script src="https://www.youtube.com/iframe_api"></script>\n', '');

const cssOld = `/* youtube video — object-fit:cover em tela cheia */
.video-wrap{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none}
#ytBgMount{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none}
#ytBgMount iframe,.video-wrap iframe{position:absolute!important;top:50%!important;left:50%!important;
  width:max(100vw,177.78vh)!important;height:max(100vh,56.25vw)!important;max-width:none!important;max-height:none!important;
  transform:translate(-50%,-50%) scale(1.48)!important;border:0!important;pointer-events:none!important;
  filter:saturate(.9) contrast(1.05) brightness(.6)}
.video-shield{position:absolute;inset:0;z-index:3;background:transparent;pointer-events:auto;cursor:default}`;

const cssNew = `/* vídeo local — tela cheia, zero UI de player */
.video-wrap{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none}
.bg-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;
  pointer-events:none;filter:saturate(.9) contrast(1.05) brightness(.6);transform:scale(1.08);will-change:transform}`;

const htmlOld = '<div class="video-wrap" id="videoWrap"></div>';
const htmlNew = `<div class="video-wrap" id="videoWrap">
    <video class="bg-video" id="bgVideo" autoplay muted loop playsinline preload="auto" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback>
      <source src="assets/hero-bg.mp4?v=1" type="video/mp4">
    </video>
  </div>`;

const jsOld = `/* ===== YouTube background — API player, sem controles visíveis ===== */
(function(){
  if(REDUCED) return;
  const id='xX82iY1L9hg';
  const wrap=document.getElementById('videoWrap');
  if(!wrap) return;
  wrap.innerHTML='<div class="video-shield" aria-hidden="true"></div>';
  let bgPlayer=null;
  const keepPlaying=()=>{
    if(!bgPlayer||typeof bgPlayer.getPlayerState!=='function') return;
    const s=bgPlayer.getPlayerState();
    if(s===YT.PlayerState.PAUSED||s===YT.PlayerState.ENDED) bgPlayer.playVideo();
  };
  window.resumeBgVideo=()=>{ try{keepPlaying();}catch(e){} };
  const mount=()=>{
    const vw=Math.ceil(Math.max(window.innerWidth, window.innerHeight*16/9));
    const vh=Math.ceil(Math.max(window.innerHeight, window.innerWidth*9/16));
    bgPlayer=new YT.Player('ytBgMount',{
      videoId:id,
      width:vw,height:vh,
      playerVars:{
        autoplay:1,mute:1,controls:0,modestbranding:1,rel:0,showinfo:0,
        iv_load_policy:3,playsinline:1,disablekb:1,fs:0,loop:1,playlist:id,
        cc_load_policy:0,autohide:1,origin:location.origin,widget_referrer:location.href
      },
      events:{
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
  addEventListener('resize',fitBgIframe,{passive:true});
  if(window.YT&&YT.Player) mount();
  else{
    const prev=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{if(prev)prev();mount();};
  }
  addEventListener('visibilitychange',()=>{if(!document.hidden) keepPlaying();});
  setInterval(keepPlaying,4000);
})();`;

const jsNew = `/* ===== Background vídeo local — sem UI de player ===== */
(function(){
  if(REDUCED) return;
  const v=document.getElementById('bgVideo');
  const bg=document.getElementById('autoBg');
  if(!v) return;
  v.muted=true; v.playsInline=true; v.setAttribute('playsinline','');
  const play=()=>v.play().catch(()=>{});
  v.addEventListener('loadeddata',()=>{bg?.classList.add('is-video');play();},{once:true});
  v.addEventListener('canplay',play,{once:true});
  play();
  window.resumeBgVideo=play;
  addEventListener('visibilitychange',()=>{if(!document.hidden) play();});
})();`;

const gsapOld = `  gsap.to(['.auto-bg img','#videoWrap'],{yPercent:6,scale:1.08,ease:'none',`;
const gsapNew = `  gsap.to(['.auto-bg img','#bgVideo'],{yPercent:6,scale:1.08,ease:'none',`;

for (const [old, neu, label] of [
  [cssOld, cssNew, 'css'],
  [htmlOld, htmlNew, 'html'],
  [jsOld, jsNew, 'js'],
  [gsapOld, gsapNew, 'gsap'],
]) {
  if (!c.includes(old)) {
    console.error(`Not found: ${label}`);
    process.exit(1);
  }
  c = c.replace(old, neu);
}

fs.writeFileSync(path, c, 'utf8');
console.log('YouTube removed, local MP4 background active');
