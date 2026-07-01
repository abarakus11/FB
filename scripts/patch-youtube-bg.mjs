import fs from 'fs';

const path = 'C:/Users/FIC/Desktop/FB-ESTETICA/index.html';
let c = fs.readFileSync(path, 'utf8');

const cssOld = `/* youtube video background — scaled to always cover, no UI/hover */
.video-wrap{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.video-wrap iframe{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:100vw;height:56.25vw;min-width:177.78vh;min-height:100vh;border:0;pointer-events:none;
  filter:saturate(.9) contrast(1.05) brightness(.6)}`;

const cssNew = `/* youtube video background — scaled/cropped, zero player chrome */
.video-wrap{position:absolute;inset:0;overflow:hidden;pointer-events:none;isolation:isolate}
#ytBgMount{position:absolute;inset:0}
.video-wrap iframe{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(1.42);
  width:100vw;height:56.25vw;min-width:177.78vh;min-height:100vh;border:0;pointer-events:none!important;
  filter:saturate(.9) contrast(1.05) brightness(.6)}
.video-shield{position:absolute;inset:0;z-index:3;background:transparent;pointer-events:auto;cursor:default}`;

const scriptOld = `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`;
const scriptNew = `<script src="https://www.youtube.com/iframe_api"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`;

const ytOld = `/* ===== YouTube background — muted autoplay loop, no controls/title ===== */
(function(){
  if(REDUCED) return;                 // reduced motion -> keep the static poster
  const id='xX82iY1L9hg';
  const params='autoplay=1&mute=1&controls=0&loop=1&playlist='+id+
    '&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0&showinfo=0&cc_load_policy=0&enablejsapi=1';
  const f=document.createElement('iframe');
  f.src='https://www.youtube-nocookie.com/embed/'+id+'?'+params;
  f.allow='autoplay; encrypted-media; picture-in-picture';
  f.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
  f.setAttribute('frameborder','0'); f.setAttribute('tabindex','-1'); f.setAttribute('aria-hidden','true');
  document.getElementById('videoWrap').appendChild(f);
  window.resumeBgVideo=()=>{
    try{f.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}','*');}
    catch(e){}
  };
})();`;

const ytNew = `/* ===== YouTube background — API player, sem controles visíveis ===== */
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
    bgPlayer=new YT.Player('ytBgMount',{
      videoId:id,
      width:'100%',height:'100%',
      playerVars:{
        autoplay:1,mute:1,controls:0,modestbranding:1,rel:0,showinfo:0,
        iv_load_policy:3,playsinline:1,disablekb:1,fs:0,loop:1,playlist:id,
        cc_load_policy:0,autohide:1,origin:location.origin,widget_referrer:location.href
      },
      events:{
        onReady:(e)=>{e.target.mute();e.target.playVideo();},
        onStateChange:(e)=>{
          if(e.data===YT.PlayerState.PAUSED||e.data===YT.PlayerState.ENDED) e.target.playVideo();
        }
      }
    });
  };
  const mountEl=document.createElement('div');
  mountEl.id='ytBgMount';
  wrap.prepend(mountEl);
  if(window.YT&&YT.Player) mount();
  else{
    const prev=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{if(prev)prev();mount();};
  }
  addEventListener('visibilitychange',()=>{if(!document.hidden) keepPlaying();});
  setInterval(keepPlaying,4000);
})();`;

const replacements = [
  [cssOld, cssNew],
  [scriptOld, scriptNew],
  [ytOld, ytNew],
];

for (const [old, neu] of replacements) {
  if (!c.includes(old)) {
    console.error('Block not found:', old.slice(0, 100));
    process.exit(1);
  }
  c = c.replace(old, neu);
}

fs.writeFileSync(path, c, 'utf8');
console.log('YouTube UI fix applied');
