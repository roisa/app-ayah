// Baby Mo Music: offline support. Bump VERSION when files change.
const VERSION='bmm-v8';
const ASSETS=[
  './','index.html','game.js','game.js?v=8','manifest.webmanifest','art/a-1.webp','art/a-2.webp','art/a-3.webp','art/a-4.webp','art/a-5.webp','art/a-6.webp','art/a-7.webp',
  'art/a-8.webp','art/b-1.webp','art/b-2.webp','art/b-3.webp','art/b-4.webp','art/b-5.webp','art/b-6.webp','art/b-7.webp','art/b-8.webp','art/b-close.webp',
  'art/b-play.webp','art/b-star.webp','art/bg-land.webp','art/bg-port.webp','art/btn-green.webp','art/btn-yellow.webp','art/d-blue.webp','art/d-cymbal.webp',
  'art/d-green.webp','art/d-marawis.webp','art/d-orange.webp','art/d-purple.webp','art/d-rebana.webp','art/d-red.webp','art/i-glock.webp','art/i-guitar.webp',
  'art/i-piano.webp','art/i-suling.webp','art/lv-big.webp','art/lv-little.webp','art/mo-cheer.webp','art/mo-dance.webp','art/mo-drum.webp','art/mo-dua.webp',
  'art/mo-listen.webp','art/mo-piano.webp','art/p-window.webp','art/s-bridge.webp','art/s-farm.webp','art/s-lamb.webp','art/s-lightly.webp','art/s-ode.webp',
  'art/s-row.webp','art/s-twinkle.webp','art/star.webp','art/t-angklung.webp','art/t-balloons.webp','art/t-daff.webp','art/t-drums.webp','art/t-glock.webp',
  'art/t-guitar.webp','art/t-piano.webp','art/t-suling.webp','art/t-xylo.webp','art/ui-fall.webp','ui/back.webp','ui/close.webp','ui/games.webp','ui/gear.webp',
  'ui/hand.webp','ui/help.webp','ui/home.webp','ui/lang-en.webp','ui/lang-id.webp','ui/lock.webp','ui/masjid.webp','ui/music-on.webp','ui/ok.webp','ui/play.webp',
  'ui/star.webp','icons/apple-touch-icon.png','icons/card.webp','icons/cursor-hand.png','icons/cursor-hand@2x.png','icons/favicon-32.png','icons/icon-192.png',
  'icons/icon-512.png','voice/en/akbar.mp3','voice/en/barak.mp3','voice/en/bismillah.mp3','voice/en/masya1.mp3','voice/en/pray-asr.mp3','voice/en/pray-dhuhr.mp3',
  'voice/en/pray-fajr.mp3','voice/en/pray-isha.mp3','voice/en/pray-maghrib.mp3','voice/en/subhan.mp3','voice/en/taqabbal.mp3','voice/en/win.mp3','voice/id/akbar.mp3',
  'voice/id/barak.mp3','voice/id/bismillah.mp3','voice/id/masya1.mp3','voice/id/pray-asr.mp3','voice/id/pray-dhuhr.mp3','voice/id/pray-fajr.mp3','voice/id/pray-isha.mp3',
  'voice/id/pray-maghrib.mp3','voice/id/subhan.mp3','voice/id/taqabbal.mp3','voice/id/win.mp3','../NurConnect/fonts/fonts.css',
  '../NurConnect/fonts/lilita-one-latin-400-normal.woff2','../NurConnect/fonts/baloo-2-latin-600-normal.woff2','../NurConnect/fonts/baloo-2-latin-700-normal.woff2',
  '../NurConnect/fonts/baloo-2-latin-800-normal.woff2','../NurConnect/fonts/baloo-bhaijaan-2-arabic-800-normal.woff2'];
// each file is cached on its own, so one missing file does not stop the rest
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('bmm-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Network first (so updates show up), cache as fallback when offline.
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  // cache:'no-cache' asks the server every time (a quick 304 when nothing changed), so a new version shows on the next open
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const c=res.clone();caches.open(VERSION).then(ca=>ca.put(r,c))}return res}).catch(()=>caches.match(r,{ignoreSearch:true})));
});
