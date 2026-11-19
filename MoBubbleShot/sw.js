// Mo Bubble Shot: offline support. Bump VERSION when files change.
const VERSION='mobs-v3';
const ASSETS=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/favicon-32.png','icons/cursor-hand.png','icons/cursor-hand@2x.png',
  'ui/back.webp','ui/close.webp','ui/games.webp','ui/gear.webp','ui/gift.webp','ui/hand.webp','ui/help.webp','ui/home.webp','ui/lang-en.webp','ui/lang-id.webp',
  'ui/lock.webp','ui/masjid.webp','ui/music-off.webp','ui/music-on.webp','ui/ok.webp','ui/play.webp','ui/sound-off.webp','ui/sound-on.webp','ui/star.webp',
  'items/star.webp','items/moon.webp','items/lantern.webp','items/palm.webp','items/masjid.webp','items/camel.webp',
  '../home/mo.webp',
  'art/b-clear.webp','art/b-rainbow.webp','art/b0.webp','art/b1.webp','art/b2.webp','art/b3.webp','art/b4.webp','art/b5.webp','art/badge-green.webp','art/badge-orange.webp','art/badge-purple.webp','art/bg-landscape.webp','art/bg-portrait.webp','art/bush-l.webp','art/bush-r.webp','art/crescent.webp','art/frame.webp','art/icon-target.webp','art/icon-trio.webp','art/launcher-barrel.webp','art/launcher-base.webp','art/launcher-stone.webp','art/logo.webp','art/mo-dua.webp','art/mo-jump.webp','art/mo-point.webp','art/sign.webp','art/soap.webp','art/star.webp','art/vine-l.webp','art/vine-r.webp','../NurConnect/fonts/fonts.css',
  '../NurConnect/fonts/lilita-one-latin-400-normal.woff2','../NurConnect/fonts/baloo-2-latin-600-normal.woff2',
  '../NurConnect/fonts/baloo-2-latin-700-normal.woff2','../NurConnect/fonts/baloo-2-latin-800-normal.woff2',
  '../NurConnect/fonts/baloo-bhaijaan-2-arabic-800-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('mobs-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Network first (so updates show up), cache as fallback when offline.
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(VERSION).then(ca=>ca.put(r,c))}return res}).catch(()=>caches.match(r,{ignoreSearch:true})));
});
