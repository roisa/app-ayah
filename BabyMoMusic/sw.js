// Baby Mo Music: offline support. Bump VERSION when files change.
const VERSION='bmm-v3';
const ASSETS=[
  './','index.html','game.js','manifest.webmanifest','art/b-close.webp','art/b-home.webp','art/b-play.webp','art/b-restart.webp','art/btn-green.webp','art/btn-yellow.webp',
  'art/mo-dua.webp','art/mo-head-happy.webp','art/mo-head.webp','art/mo-jump.webp','art/mo-point.webp','art/mo-win.webp','art/mo.webp','art/p-window.webp','art/star.webp',
  'ui/back.webp','ui/close.webp','ui/games.webp','ui/gear.webp','ui/hand.webp','ui/help.webp','ui/home.webp','ui/lang-en.webp','ui/lang-id.webp','ui/lock.webp','ui/masjid.webp',
  'ui/music-on.webp','ui/ok.webp','ui/play.webp','ui/star.webp','icons/apple-touch-icon.png','icons/cursor-hand.png','icons/cursor-hand@2x.png','icons/favicon-32.png',
  'icons/icon-192.png','icons/icon-512.png','voice/en/akbar.mp3','voice/en/barak.mp3','voice/en/bismillah.mp3','voice/en/masya1.mp3','voice/en/pray-asr.mp3',
  'voice/en/pray-dhuhr.mp3','voice/en/pray-fajr.mp3','voice/en/pray-isha.mp3','voice/en/pray-maghrib.mp3','voice/en/subhan.mp3','voice/en/taqabbal.mp3','voice/en/win.mp3',
  'voice/id/akbar.mp3','voice/id/barak.mp3','voice/id/bismillah.mp3','voice/id/masya1.mp3','voice/id/pray-asr.mp3','voice/id/pray-dhuhr.mp3','voice/id/pray-fajr.mp3',
  'voice/id/pray-isha.mp3','voice/id/pray-maghrib.mp3','voice/id/subhan.mp3','voice/id/taqabbal.mp3','voice/id/win.mp3','../NurConnect/fonts/fonts.css',
  '../NurConnect/fonts/lilita-one-latin-400-normal.woff2','../NurConnect/fonts/baloo-2-latin-600-normal.woff2','../NurConnect/fonts/baloo-2-latin-700-normal.woff2',
  '../NurConnect/fonts/baloo-2-latin-800-normal.woff2','../NurConnect/fonts/baloo-bhaijaan-2-arabic-800-normal.woff2'];
// each file is cached on its own, so one missing file does not stop the rest
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('bmm-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Network first (so updates show up), cache as fallback when offline.
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(VERSION).then(ca=>ca.put(r,c))}return res}).catch(()=>caches.match(r,{ignoreSearch:true})));
});
