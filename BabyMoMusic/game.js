/* Baby Mo Music – Mo Games (IBRAZ Group).
   Every instrument sound is made by the app itself with Web Audio (no sound files), so it works offline. */
'use strict';
const $=s=>document.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem('bmm.'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('bmm.'+k,JSON.stringify(v))}catch(e){}}};
const DPR=()=>Math.min(2.5,window.devicePixelRatio||1);
const rnd=(a,b)=>a+Math.random()*(b-a);

/* =================================================================
   Text (EN / ID)
   ================================================================= */
const TXT={
en:{tag:'Play Games the Islamic Way',legal:'No ads · No data collected · Works offline',inst:'Add to Home Screen',
 bismS:'Say Bismillah before we play',bismB:'Bismillah!',sayBism:'Bismillah',
 I:{piano:'Piano',xylo:'Xylophone',glock:'Glockenspiel',guitar:'Guitar',drums:'Drums',daff:'Daff',angklung:'Angklung',suling:'Flute',balloons:'Music Balloons'},
 songsT:'Songs',songsS:'Tap the one that shines and play the song!',free:'Free play',notesN:'{n} notes',
 alh:'Alhamdulillah!',sayAlh:'Alhamdulillah!',winSub:'You played “{s}”. MasyaAllah!',dyk:'Did you know?',again:'Again',more:'More songs',
 listenTip:'Listen to the song, then play it!',balTip:'Pop the balloons to play a song!',songDone:'MasyaAllah! You played “{s}”',
 cheer:['MasyaAllah!','SubhanAllah!','Allahu Akbar!','Barakallah!'],cheerM:['How wonderful!','Glory be to Allah!','Allah is the Greatest!','May Allah bless you!'],
 fallT:'Falling Notes',fallS:'Tap the key when its bar touches it!',little:'Little',littleS:'Ages 1–4 · bars wait for you',big:'Big Kid',bigS:'Ages 5+ · keep the beat',good:'Good!',perfect:'MasyaAllah!',fallDone:'You played “{s}”: {p} perfect, {g} good, {m} missed',
 S:{birthday:'Happy Birthday',farm:'Old MacDonald',twinkle:'Twinkle Little Star',lamb:'Little Lamb',row:'Row Your Boat',ode:'Ode to Joy',bridge:'London Bridge',lightly:'Lightly Row'},
 pray:'Time to pray',lockT:'It is time for {p}',lockB:"Let's stop for a moment and pray {p} first, at the masjid or at home. The music will wait for you.",lockWait:'The button opens in {m}',lockReady:'Done praying? Tap the button.',prayed:'I have prayed {p}',taq:'Taqabbalallahu minna wa minkum',sayPray:'It is time to pray {p}.',
 setT:'For parents',city:'City',customCity:'Custom location',wait:'Prayer pause lasts at least',today:'Prayer times today',preview:'Preview the prayer pause',method:'Kemenag RI method · Fajr 20° · Isha 18° · +2 min',nextP:'Next',
 P:{fajr:'Fajr',sunrise:'Sunrise',dhuhr:'Dhuhr',asr:'Asr',maghrib:'Maghrib',isha:'Isha'},gateT:'For grown-ups',gateS:'Hold the button for 3 seconds',
 instT:'Add Baby Mo Music to your Home Screen',instS:'It opens full screen like an app, and works offline.',
 iosA:'Tap the Share button in Safari',iosB:'Choose “Add to Home Screen”',iosC:'Tap “Add”, then open Baby Mo Music from your Home Screen',anA:'Tap the menu button of your browser',anB:'Choose “Add to Home screen” or “Install app”',anC:'Confirm, then open Baby Mo Music from your Home Screen',instOk:'Baby Mo Music is on your Home Screen!'},
id:{tag:'Bermain dengan Cara Islami',legal:'Tanpa iklan · Tanpa pengumpulan data · Bisa offline',inst:'Tambah ke Layar Utama',
 bismS:'Ucapkan Bismillah sebelum bermain',bismB:'Bismillah!',sayBism:'Bismillah',
 I:{piano:'Piano',xylo:'Xilofon',glock:'Glokenspil',guitar:'Gitar',drums:'Drum',daff:'Rebana',angklung:'Angklung',suling:'Suling',balloons:'Balon Musik'},
 songsT:'Lagu',songsS:'Ketuk yang bersinar dan mainkan lagunya!',free:'Main bebas',notesN:'{n} nada',
 alh:'Alhamdulillah!',sayAlh:'Alhamdulillah!',winSub:'Kamu sudah memainkan “{s}”. MasyaAllah!',dyk:'Tahukah kamu?',again:'Lagi',more:'Lagu lain',
 listenTip:'Dengarkan lagunya, lalu mainkan!',balTip:'Letuskan balonnya untuk memainkan lagu!',songDone:'MasyaAllah! Kamu memainkan “{s}”',
 cheer:['MasyaAllah!','SubhanAllah!','Allahu Akbar!','Barakallah!'],cheerM:['Indah sekali!','Maha Suci Allah!','Allah Maha Besar!','Semoga Allah memberkahimu!'],
 fallT:'Nada Jatuh',fallS:'Ketuk tutsnya saat baloknya menyentuh!',little:'Kecil',littleS:'Usia 1–4 · baloknya menunggu',big:'Anak Besar',bigS:'Usia 5+ · ikuti ketukan',good:'Bagus!',perfect:'MasyaAllah!',fallDone:'Kamu memainkan “{s}”: {p} sempurna, {g} bagus, {m} terlewat',
 S:{birthday:'Happy Birthday',farm:'Old MacDonald',twinkle:'Kelap-Kelip Bintang',lamb:'Anak Domba',row:'Dayung Perahu',ode:'Lagu Gembira',bridge:'Jembatan London',lightly:'Perahu Kecil'},
 pray:'Waktunya sholat',lockT:'Sudah masuk waktu {p}',lockB:'Berhenti sebentar, ayo sholat {p} dulu, di masjid atau di rumah. Musiknya akan menunggu.',lockWait:'Tombol terbuka dalam {m}',lockReady:'Sudah sholat? Ketuk tombolnya.',prayed:'Aku sudah sholat {p}',taq:'Taqabbalallahu minna wa minkum',sayPray:'Waktunya sholat {p}.',
 setT:'Untuk orang tua',city:'Kota',customCity:'Lokasi kustom',wait:'Jeda sholat minimal',today:'Jadwal sholat hari ini',preview:'Coba jeda sholat',method:'Metode Kemenag RI · Subuh 20° · Isya 18° · ihtiyat +2 menit',nextP:'Berikutnya',
 P:{fajr:'Subuh',sunrise:'Terbit',dhuhr:'Dzuhur',asr:'Ashar',maghrib:'Maghrib',isha:'Isya'},gateT:'Untuk orang tua',gateS:'Tahan tombol selama 3 detik',
 instT:'Tambahkan Baby Mo Music ke Layar Utama',instS:'Terbuka layar penuh seperti aplikasi, dan bisa dipakai offline.',
 iosA:'Ketuk tombol Bagikan di Safari',iosB:'Pilih “Tambah ke Layar Utama”',iosC:'Ketuk “Tambah”, lalu buka Baby Mo Music dari Layar Utama',anA:'Ketuk tombol menu di browser',anB:'Pilih “Tambahkan ke Layar utama” atau “Instal aplikasi”',anC:'Konfirmasi, lalu buka Baby Mo Music dari Layar Utama',instOk:'Baby Mo Music sudah ada di Layar Utama!'}};
let lang=store.get('lang',(()=>{try{const l=localStorage.getItem('moLang');if(l==='en'||l==='id')return l}catch(e){}return /^id\b|^id-/i.test(navigator.language||'')?'id':'en'})());
const t=k=>TXT[lang][k]??TXT.en[k];
const tf=(k,v)=>t(k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'');

/* "Did you know?" after a song. Qur'an and hadith references checked (sunnah.com numbering). */
const FACTS=[
 ['Allah said: "O mountains, repeat praises with him, and the birds too." The mountains and birds glorified Allah together with Prophet Dawud. (Qur\'an, Saba\' 34:10)','Allah berfirman: "Wahai gunung-gunung dan burung-burung, bertasbihlah berulang-ulang bersama Dawud." (QS Saba\': 10)'],
 ['Everything in the heavens and the earth glorifies Allah, but we do not understand how they glorify Him. (Qur\'an, Al-Isra\' 17:44)','Semua yang ada di langit dan di bumi bertasbih kepada Allah, tetapi kita tidak mengerti tasbih mereka. (QS Al-Isra\': 44)'],
 ['The birds spread their wings in rows, and each one knows its own prayer and glorification of Allah. (Qur\'an, An-Nur 24:41)','Burung-burung mengembangkan sayapnya, dan masing-masing tahu cara sholat dan tasbihnya kepada Allah. (QS An-Nur: 41)'],
 ['Even the thunder glorifies Allah with His praise. (Qur\'an, Ar-Ra\'d 13:13)','Guruh pun bertasbih memuji Allah. (QS Ar-Ra\'d: 13)'],
 ['The Prophet ﷺ said: "Beautify the Qur\'an with your voices." (Sunan Abi Dawud 1468)','Nabi ﷺ bersabda: "Hiasilah Al-Qur\'an dengan suara kalian." (HR. Abu Dawud 1468)'],
 ['Bilal had a strong voice that reached far, so the Prophet ﷺ asked him to call the adhan. (Sunan Abi Dawud 499)','Suara Bilal keras dan terdengar jauh, maka Nabi ﷺ memintanya mengumandangkan adzan. (HR. Abu Dawud 499)'],
 ['The Prophet ﷺ praised Abu Musa\'s beautiful Qur\'an recitation and said his voice was like the voice of the family of Prophet Dawud. (Sahih al-Bukhari 5048)','Nabi ﷺ memuji bacaan Al-Qur\'an Abu Musa yang indah, seindah suara keluarga Nabi Dawud. (HR. Bukhari 5048)']];
let factN=store.get('factN',0);
function nextFact(){const f=FACTS[factN%FACTS.length][lang==='id'?1:0];factN++;store.set('factN',factN);return f}

/* =================================================================
   Sound engine
   ================================================================= */
let AC=null,master=null,wet=null,noiseBuf=null;
function impulse(a,sec){const n=Math.floor(a.sampleRate*sec),b=a.createBuffer(2,n,a.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3)}return b}
function ac(){
  if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});
    const comp=AC.createDynamicsCompressor();comp.threshold.value=-12;comp.knee.value=12;comp.ratio.value=5;comp.attack.value=.003;comp.release.value=.25;
    master=AC.createGain();master.gain.value=.95;master.connect(comp).connect(AC.destination);
    const conv=AC.createConvolver();conv.buffer=impulse(AC,1.6);wet=AC.createGain();wet.gain.value=.5;wet.connect(conv).connect(master);
    const n=AC.sampleRate;noiseBuf=AC.createBuffer(1,n,n);const d=noiseBuf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1}catch(e){AC=null}}
  if(AC&&AC.state!=='running'){try{AC.resume()}catch(e){}}
  return AC}
/* a bus per note: dry to the master, plus some reverb */
function bus(vol,rev){const g=AC.createGain();g.gain.value=vol;g.connect(master);if(rev){const s=AC.createGain();s.gain.value=rev;g.connect(s);s.connect(wet)}return g}
function part(t0,f,amp,ring,dest,type='sine',att=.004,f2=0,fT=0){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+(fT||ring));
  g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(amp,t0+att);g.gain.exponentialRampToValueAtTime(.0001,t0+att+ring);o.connect(g);g.connect(dest);o.start(t0);o.stop(t0+att+ring+.05)}
function nz(t0,ring,amp,type,freq,q,dest,att=.002){const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;f.type=type;f.frequency.value=freq;f.Q.value=q;
  g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(amp,t0+att);g.gain.exponentialRampToValueAtTime(.0001,t0+att+ring);s.connect(f);f.connect(g);g.connect(dest);s.start(t0,Math.random()*.5);s.stop(t0+att+ring+.05)}
const mf=m=>440*Math.pow(2,(m-69)/12);
const now=()=>AC.currentTime+.005;

const SND={
 piano(m){const f=mf(m),t0=now(),b=bus(.3,.25),ring=Math.min(4.5,2.4*Math.sqrt(262/f)+.8);
   [[1,1],[2,.42],[3,.2],[4,.11],[5,.06],[6,.035]].forEach(([n,a])=>part(t0,f*n*(1+.0004*n*n),a,ring/Math.pow(n,.75),b));
   part(t0,f*1.0025,.22,ring*.85,b);nz(t0,.035,.1,'bandpass',Math.min(7000,f*6),1.2,b)},
 xylo(m){const f=mf(m),t0=now(),b=bus(.42,.22),ring=Math.min(1.4,.75*Math.sqrt(523/f)+.15);
   part(t0,f,1,ring,b,'sine',.002);part(t0,f*3,.32,ring*.22,b,'sine',.002);part(t0,f*6.3,.08,ring*.1,b,'sine',.001);nz(t0,.018,.28,'highpass',3000,.7,b)},
 angklung(m){const f=mf(m),t0=now(),b=bus(.32,.18);
   for(let k=0;k<11;k++){const tt=t0+k*.068+Math.random()*.008,a=Math.pow(.8,k)*(k%2?.75:1);
     part(tt,f,a,.16,b,'sine',.003);part(tt,f*2,a*.55,.13,b,'sine',.003);part(tt,f*3.02,a*.12,.06,b,'triangle',.002);nz(tt,.012,a*.22,'bandpass',f*4,2,b)}},
 glock(m){const f=mf(m),t0=now(),b=bus(.3,.3),r=Math.min(2.6,1.5*Math.sqrt(1047/f)+.5);
   part(t0,f,1,r,b,'sine',.001);part(t0,f*2.756,.3,r*.25,b,'sine',.001);part(t0,f*5.404,.12,r*.1,b,'sine',.001);part(t0,f*8.933,.05,.07,b,'sine',.001);nz(t0,.012,.2,'highpass',6000,.7,b)},
 kalimba(m,vol){const f=mf(m),t0=now(),b=bus(.38*(vol||1),.3);part(t0,f,1,1.3,b,'sine',.002);part(t0,f*2,.12,.4,b);part(t0,f*5.9,.15,.12,b,'sine',.001);nz(t0,.01,.15,'highpass',2500,.8,b)},
 suling(m){const f=mf(m),t0=now(),b=bus(.34,.35),g=AC.createGain();g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(1,t0+.07);g.connect(b);
   const lfo=AC.createOscillator(),ld=AC.createGain();lfo.frequency.value=5.3;ld.gain.setValueAtTime(0,t0);ld.gain.linearRampToValueAtTime(f*.007,t0+.45);lfo.connect(ld);
   const oss=[[f,1,'sine'],[f*2,.16,'sine'],[f*3,.05,'sine'],[f,.12,'triangle']].map(([fr,a,ty])=>{const o=AC.createOscillator(),og=AC.createGain();o.type=ty;o.frequency.value=fr;ld.connect(o.frequency);og.gain.value=a*.55;o.connect(og);og.connect(g);o.start(t0);return o});
   const s=AC.createBufferSource(),bf=AC.createBiquadFilter(),ng=AC.createGain();s.buffer=noiseBuf;s.loop=true;bf.type='bandpass';bf.frequency.value=f*1.6;bf.Q.value=.9;
   ng.gain.setValueAtTime(.22,t0);ng.gain.exponentialRampToValueAtTime(.045,t0+.12);s.connect(bf);bf.connect(ng);ng.connect(g);s.start(t0);lfo.start(t0);
   let done=false;return{stop(){if(done)return;done=true;const t1=Math.max(AC.currentTime,t0+.22);g.gain.cancelScheduledValues(t1);g.gain.setValueAtTime(1,t1);g.gain.linearRampToValueAtTime(0,t1+.14);
     [...oss,s,lfo].forEach(o=>{try{o.stop(t1+.2)}catch(e){}})}}},
 guitar(m){const a=AC,src=a.createBufferSource(),lp=a.createBiquadFilter(),hp=a.createBiquadFilter(),b=bus(.6,.2);src.buffer=ksBuf(m);lp.type='lowpass';lp.frequency.value=3800;hp.type='highpass';hp.frequency.value=70;src.connect(hp);hp.connect(lp);lp.connect(b);src.start(now())},
 drum(k){const t0=now();
   if(k==='kick'){const b=bus(1,0);part(t0,160,1,.42,b,'sine',.002,45,.25);nz(t0,.012,.35,'highpass',2500,.7,b)}
   else if(k==='snare'){const b=bus(.7,.12);nz(t0,.22,.65,'highpass',1300,.7,b);part(t0,210,.5,.12,b,'triangle',.002,150)}
   else if(k==='hat'){const b=bus(.5,.06);nz(t0,.07,.5,'highpass',7500,.8,b);nz(t0,.05,.25,'bandpass',10500,1.5,b)}
   else if(k==='crash'){const b=bus(.5,.2);nz(t0,1.7,.55,'highpass',3800,.6,b,.004);nz(t0,1.2,.3,'bandpass',6500,.6,b)}
   else if(k==='ride'){const b=bus(.45,.2);nz(t0,1,.3,'bandpass',5200,1,b);part(t0,3150,.06,.9,b);part(t0,4730,.04,.7,b);part(t0,2080,.03,.6,b)}
   else{const p={tom1:[270,195,.38],tom2:[210,150,.42],floor:[135,92,.6]}[k]||[200,150,.4],b=bus(.85,.12);part(t0,p[0],1,p[2],b,'sine',.002,p[1],p[2]*.6);nz(t0,.05,.25,'lowpass',900,.7,b)}},
 daff(k){const t0=now();
   if(k==='dum'){const b=bus(.95,.15);part(t0,112,1,.62,b,'sine',.003,66,.35);nz(t0,.09,.4,'lowpass',380,.8,b);jingle(t0,.22)}
   else if(k==='tak'){const b=bus(.8,.15);nz(t0,.09,.75,'bandpass',2300,.9,b);part(t0,540,.28,.06,b,'triangle',.002,420);jingle(t0,.55)}
   else if(k==='mlo'){const b=bus(.8,.12);part(t0,250,1,.26,b,'sine',.002,195,.2);nz(t0,.04,.35,'bandpass',1200,1,b)}
   else{const b=bus(.8,.12);part(t0,360,1,.2,b,'sine',.002,290,.16);nz(t0,.035,.38,'bandpass',1800,1,b)}},
 pop(){const t0=now(),b=bus(.55,.08);nz(t0,.06,.8,'bandpass',1100,.7,b);nz(t0,.04,.4,'highpass',4500,.8,b)},
 sparkle(){const t0=now(),b=bus(.25,.4);[84,88,91,96].forEach((m,i)=>part(t0+i*.07,mf(m),.8,.5,b,'sine',.002))},
 fanfare(){const t0=now(),b=bus(.3,.35);[[72,0],[76,.12],[79,.24],[84,.36]].forEach(([m,w])=>{part(t0+w,mf(m),.9,.7,b,'triangle',.004);part(t0+w,mf(m)*2,.2,.4,b)});part(t0+.5,mf(88),.5,1.2,b)},
 tap(){const t0=now(),b=bus(.18,0);part(t0,660,1,.08,b,'triangle',.002)}};
/* every sound first makes sure the audio is switched on */
for(const k in SND){const f=SND[k];SND[k]=(...a)=>ac()?f(...a):null}
function jingle(t0,amp){const b=bus(amp,.15);for(let i=0;i<8;i++){const tt=t0+.003+i*.011+Math.random()*.008;nz(tt,.08+Math.random()*.05,.5*(1-i/10),'bandpass',6200+Math.random()*3200,5,b);part(tt,7000+Math.random()*2500,.04,.07,b)}}
/* plucked string (Karplus-Strong), made once per note */
const KS={};
function ksBuf(m){if(KS[m])return KS[m];const sr=AC.sampleRate,f=mf(m),N=Math.max(2,Math.round(sr/f)),len=Math.floor(sr*Math.min(3.2,1.4+1.8*Math.sqrt(196/f))),buf=AC.createBuffer(1,len,sr),d=buf.getChannelData(0);
  let p=0;for(let i=0;i<N;i++){p=p*.45+(Math.random()*2-1)*.55;d[i]=p}
  const damp=f>500?.993:.996;for(let i=N;i<len;i++)d[i]=damp*.5*(d[i-N]+(i-N-1>=0?d[i-N-1]:0));
  let mx=0;for(let i=0;i<len;i++)mx=Math.max(mx,Math.abs(d[i]));if(mx)for(let i=0;i<len;i++)d[i]/=mx;return KS[m]=buf}

/* Baby Mo's recorded voice (the same clips as Nur Connect and Mo Archery), with the phone's text-to-speech as fallback */
const TTS='speechSynthesis' in window;let voices=[];
function loadVoices(){try{voices=speechSynthesis.getVoices()||[]}catch(e){}}
if(TTS){loadVoices();try{speechSynthesis.addEventListener('voiceschanged',loadVoices)}catch(e){}}
function say(text){if(!TTS)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);const L=lang==='id'?'id':'en';u.lang=L==='id'?'id-ID':'en-US';const v=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(L));if(v)u.voice=v;u.rate=.95;u.pitch=1.2;speechSynthesis.speak(u)}catch(e){}}
const VKEYS=['bismillah','win','masya1','subhan','akbar','barak','taqabbal','pray-fajr','pray-dhuhr','pray-asr','pray-maghrib','pray-isha'],VRAW={},VBUF={},VDEC={};
['en','id'].forEach(l=>VKEYS.forEach(k=>{VRAW[l+'/'+k]=fetch(`voice/${l}/${k}.mp3`).then(r=>r.ok?r.arrayBuffer():null).catch(()=>null)}));
function vbuf(id){const a=ac();if(!a)return Promise.resolve(null);if(!VDEC[id])VDEC[id]=(VRAW[id]||Promise.resolve(null)).then(b=>b?new Promise((res,rej)=>a.decodeAudioData(b.slice(0),res,rej)):null).then(b=>VBUF[id]=b).catch(()=>null);return VDEC[id]}
let vSrc=null;
function voice(key,text){const id=(lang==='id'?'id':'en')+'/'+key,a=ac();
  const play=buf=>{try{if(vSrc)vSrc.stop()}catch(e){}try{speechSynthesis.cancel()}catch(e){}try{const s=a.createBufferSource(),g=a.createGain();g.gain.value=1.1;s.buffer=buf;s.connect(g);g.connect(master);s.start();vSrc=s}catch(e){}};
  if(a&&VBUF[id]){play(VBUF[id]);return}
  let done=false;setTimeout(()=>{if(!done){done=true;if(text)say(text)}},700);
  vbuf(id).then(b=>{if(done)return;done=true;if(b&&a)play(b);else if(text)say(text)})}

/* =================================================================
   Drawing helpers
   ================================================================= */
const RAINBOW=['#ff4b4b','#ff6a00','#ffd400','#00aa0c','#19c3c0','#2f7bff','#9b4bf0','#ff5fa8'];
const SCALE=[0,2,4,5,7,9,11,12];
const OUT='#4a2c14';
/* key numbers in not angka: 1 2 3 4 5 6 7, and high do is 1 with a dot above */
const lab=i=>i<0?`<i class="lo">${i+8}</i>`:i<7?String(i+1):'<i class="hi">1</i>';
/* key index -> colour and pitch. 0-7 = do..high do; -3,-2,-1 = low sol, la, si (only on the piano, for songs that need them) */
const colOf=i=>RAINBOW[i<0?i+7:i];
const midiOf=(base,i)=>i<0?base-12+SCALE[i+7]:base+SCALE[i];
function mk(tag,cls,parent,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(parent)parent.appendChild(e);return e}
function box(e,x,y,w,h){e.style.left=x+'px';e.style.top=y+'px';e.style.width=w+'px';e.style.height=h+'px';return e}
/* every instrument is laid out sideways (landscape); in portrait the whole instrument turns a quarter turn */
/* land: a landscape-only instrument (piano, xylophone, glockenspiel). In portrait it lies sideways as a whole,
   numbers included, so it reads right when the phone is turned. Other instruments keep their numbers upright. */
function canon(st,W,H,ccw,land){const port=H>W*1.05,L=port?H:W,S=port?W:H,el=mk('div','inst'+(port?' port':'')+(land?' land':''),st);box(el,(W-L)/2,(H-S)/2,L,S);if(port)el.style.transform=`rotate(${ccw?-90:90}deg)`;return{el,L,S,port}}
const noteSvg=c=>`<svg viewBox="0 0 40 40"><path d="M15 7 L33 3 L33 26 A6.5 5 0 1 1 28 21.5 L28 11 L20 12.8 L20 30 A6.5 5 0 1 1 15 25.5 Z" fill="${c}" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/></svg>`;

/* icons for the home tiles and the title chip */
/* instrument pictures: art/t-<instrument>.webp */
const tileImg=k=>`<img src="art/t-${k}.webp" alt="" draggable="false">`;
/* =================================================================
   Instruments
   ================================================================= */
const INST={
 piano:{c:['#ffe36b','#ffb000'],melodic:true,glide:true,
  /* art/i-piano.webp is 1204x516: the empty key area is 4-96% across and 35-86% down. It is drawn as a 9-slice frame
     (top 181, right 470, bottom 72, left 301 px), so the speaker and buttons keep their shape when the piano is wider. */
  build(st,W,H){const {el,L,S}=canon(st,W,H,false,true),F=fall.on,A=1204/516,bw=F?L-6:Math.min(L-6,(S-12)*A),bh=F?Math.min(S*.48,bw/A):bw/A,p=box(mk('div','piano',el),(L-bw)/2,F?S-bh-4:(S-bh)/2,bw,bh);
   const z=bh/516*(F?.62:1),bT=181*z,bR=470*z,bB=72*z,bL=301*z;p.style.borderWidth=`${bT}px ${bR}px ${bB}px ${bL}px`;
   const k=mk('div','keys',p);k.style.left=(1204*.048*z-bL)+'px';k.style.right=(1204*.048*z-bR)+'px';k.style.top=(516*.37*z-bT)+'px';k.style.bottom=(516*.16*z-bB)+'px';const low=needLow(),ids=low?[-3,-2,-1,0,1,2,3,4,5,6,7]:[0,1,2,3,4,5,6,7],n=ids.length,kw=(bw-1204*.096*z)/n,pc=100/n;stage.dataset.low=low?1:0;
   ids.forEach(i=>{const w=mk('div','wk'+(i<0?' low':''),k,`<span class="up">${lab(i)}</span>`);w.dataset.h=1;w.dataset.m=midiOf(60,i);w.dataset.i=i;w.dataset.c=colOf(i);w.style.setProperty('--k',colOf(i));w.style.setProperty('--fs',Math.min(34,Math.max(15,kw*.42))+'px')});
   /* black keys sit after these white keys (positions in the row) */
   (low?[[0,56],[1,58],[3,61],[4,63],[6,66],[7,68],[8,70]]:[[0,61],[1,63],[3,66],[4,68],[5,70]]).forEach(([j,m])=>{const b=mk('div','bk',k);b.dataset.h=1;b.dataset.m=m;b.dataset.c='#9b8ab0';b.style.left=`calc(${(j+1)*pc}% - ${pc*.29}%)`;b.style.width=(pc*.58)+'%'});
   if(F)fallGeo(el,p,k)},
  hit(el){SND.piano(+el.dataset.m)}},
 xylo:{c:['#8be27f','#1fae3c'],melodic:true,glide:true,
  build(st,W,H){const {el,L,S}=canon(st,W,H,false,true),gw=Math.min(L-10,S*2.2),x0=(L-gw)/2,gap=gw*.02,bwid=(gw-gap*7)/8,maxH=Math.min(S*.94,gw*.55),minH=maxH*.6,cy=S/2;
   const rail=(off)=>{const xa=x0-gap,ya=cy+off*maxH,xb=x0+gw+gap,yb=cy+off*minH,len=Math.hypot(xb-xa,yb-ya),r=mk('div','rail',el);box(r,xa,ya-S*.025,len,S*.05);r.style.transformOrigin='0 50%';r.style.transform=`rotate(${Math.atan2(yb-ya,xb-xa)}rad)`};
   rail(-.3);rail(.3);
   SCALE.forEach((d,i)=>{const h=maxH-(maxH-minH)*i/7,b=box(mk('div','bar8',el,`<span class="up">${lab(i)}</span>`),x0+i*(bwid+gap),cy-h/2,bwid,h);b.dataset.h=1;b.dataset.m=72+d;b.dataset.i=i;b.dataset.c=RAINBOW[i];b.style.setProperty('--k',RAINBOW[i]);b.style.setProperty('--fs',Math.min(34,Math.max(16,bwid*.4))+'px');
     const sc=bwid*.22;[.2,.8].forEach(f=>{const s=mk('span','sc',b);s.style.top=(h*f-sc/2-4)+'px'})})},
  hit(el){SND.xylo(+el.dataset.m)}},
 glock:{c:['#9ff0e6','#19b3a6'],melodic:true,glide:true,
  build(st,W,H){const {el,L,S}=canon(st,W,H,false,true),A=1200/638,cw=Math.min(L-8,(S-10)*A),chh=cw/A,cs=box(mk('div','gcase',el),(L-cw)/2,(S-chh)/2,cw,chh);
   const pad=cw*.08,gw=cw-pad*2,gap=gw*.025,bw=(gw-gap*7)/8,maxH=chh*.74,minH=maxH*.66,cy=chh*.495,rails=[chh*.345,chh*.645];
   SCALE.forEach((d,i)=>{const h=maxH-(maxH-minH)*i/7,top=cy-h/2,b=box(mk('div','gbar',cs,`<span class="dot" style="background:${RAINBOW[i]}"></span><span class="up">${lab(i)}</span>`),pad+i*(bw+gap),top,bw,h);
     b.dataset.h=1;b.dataset.m=84+d;b.dataset.i=i;b.dataset.c=RAINBOW[i];b.style.setProperty('--fs',Math.min(32,Math.max(15,bw*.38))+'px');
     const rv=bw*.2;rails.forEach(y=>{const r=mk('span','rv',b);r.style.top=(y-top-rv/2-3)+'px'})})},
  hit(el){SND.glock(+el.dataset.m)}},
 guitar:{c:['#ffb36b','#ff6a00'],glide:true,
  build(st,W,H){const port=H>W*1.05;let cb,cols,rows,ar;
   const n=chordList().length+1;
   if(port){cols=allCh?(W>=8*38+42?8:6):n;rows=Math.ceil(n/cols);cb=Math.min(58,(W-(cols-1)*6)/cols);const ph=rows*cb+(rows-1)*8+12;ar=[0,ph,W,H-ph]}
   else{cols=allCh?4:1;rows=Math.ceil(n/cols);cb=Math.min(58,(H-(rows-1)*8)/rows);const pw=cols*cb+(cols-1)*6+14;ar=[pw,0,W-pw,H]}
   const pan=box(mk('div','chords',st),0,0,port?W:ar[0]-14,port?ar[1]-12:H);pan.style.gridTemplateColumns=`repeat(${cols},${cb}px)`;pan.style.setProperty('--cb',cb+'px');renderChords(pan);
   pan.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();const b=e.target.closest('button');if(!b)return;ac();if(b.dataset.more!=null){allCh=!allCh;store.set('allCh',allCh);SND.tap();releaseAll();build();return}chord={r:+b.dataset.r,mn:b.dataset.mn==='1'};renderChords(pan);strumAll()});
   const area=box(mk('div','',st),ar[0],ar[1],ar[2],ar[3]);area.style.position='absolute';st=area;W=ar[2];H=ar[3];
   /* art/i-guitar.webp is 1200x538 */
   const {el,L,S}=canon(st,W,H,true),A=1200/538;let gl=Math.min(L-6,(S-6)*A),gh=gl/A;const g=box(mk('div','gtr',el),(L-gl)/2,(S-gh)/2,gl,gh);
   g.innerHTML='<img src="art/i-guitar.webp" alt="" draggable="false">';
   const ys=[.415,.448,.481,.514,.547,.58],th=[3.4,3.1,2.8,2.5,2.2,1.9];
   ys.forEach((y,k)=>{const top=k===0?0:(y+ys[k-1])/2,bot=k===5?1:(y+ys[k+1])/2,s=mk('div','str',g,'<i></i>');box(s,gl*.135,top*gh,gl*(.775-.135),(bot-top)*gh);
     s.firstChild.style.top=((y-top)*gh)+'px';s.firstChild.style.setProperty('--th',Math.max(1.5,th[k]*gh/300)+'px');s.dataset.h=1;s.dataset.s=k;s.dataset.c=RAINBOW[chord.r]});
   ksWarm()},
  hit(el){const m=chordNotes()[+el.dataset.s];SND.guitar(m);restart(el,'vib',500)}},
 drums:{c:['#7fd3ff','#2f7bff'],
  build(st,W,H){const {el,L,S}=canon(st,W,H),u=Math.min(L/4.45,S/2.4),cx=L/2,cy=S/2+u*.02;
   [['crash',-1.58,-.6,.5,'cym'],['ride',1.6,-.6,.5,'cym'],['hat',-1.64,.56,.42,'cym'],['tom1',-.5,-.66,.42,'#ff6a00'],['tom2',.5,-.66,.42,'#00aa0c'],['snare',-.74,.55,.45,'#2f7bff'],['kick',.32,.42,.6,'#ff4b4b'],['floor',1.56,.55,.46,'#9b4bf0']]
   .forEach(([k,x,y,r,col])=>{const R=r*u,d=box(mk('div','dr '+(col==='cym'?'cym':'drum'),el),cx+x*u-R,cy+y*u-R,R*2,R*2);d.dataset.h=1;d.dataset.d=k;d.dataset.c=col==='cym'?'#ffd400':col;d.style.setProperty('--r',R+'px');
     d.style.backgroundImage=`url(art/${{crash:'d-cymbal',ride:'d-cymbal',hat:'d-cymbal',tom1:'d-orange',tom2:'d-green',snare:'d-blue',kick:'d-red',floor:'d-purple'}[k]}.webp)`})},
  hit(el){SND.drum(el.dataset.d);if(el.classList.contains('cym'))restart(el,'down',600)}},
 daff:{c:['#b7f0a0','#00aa0c'],
  build(st,W,H){const {el,L,S}=canon(st,W,H),D=Math.min(S*.94,L*.54),R=D/2,dm=Math.min(S*.5,(L-D)/2*.88);
   const mkDaff=(cx,cy,r,cls,kind,inner)=>{const d=box(mk('div','daff'+cls,el),cx-r,cy-r,r*2,r*2);d.style.setProperty('--r',r+'px');d.dataset.h=1;d.dataset.d=kind;d.dataset.c=cls?'#ff6a00':'#c07a2c';
     d.style.backgroundImage=`url(art/${cls?'d-marawis':'d-rebana'}.webp)`;
     if(inner){const m=mk('div','dum',d);m.dataset.h=1;m.dataset.d='dum';m.dataset.c='#00aa0c'}return d};
   mkDaff(L/2,S/2,R,'','tak',true);
   mkDaff((L-D)/4,S/2,dm/2,' m','mlo',false);mkDaff(L-(L-D)/4,S/2,dm/2,' m','mhi',false)},
  hit(el){SND.daff(el.dataset.d);const f=el.closest('.daff');if(f&&el.dataset.d!=='mlo'&&el.dataset.d!=='mhi')restart(f,'jing',450)}},
 angklung:{c:['#ffd58a','#e8901a'],melodic:true,glide:true,
  build(st,W,H){let best=null;for(const cols of [8,4,2,1]){const rows=8/cols,cw=W/cols,ch=H/rows,h=Math.min(ch*.96,cw*.96/.612);if(!best||h>best.h)best={cols,rows,cw,ch,h}}
   const {cols,cw,ch,h}=best,w=h*.612;
   SCALE.forEach((d,i)=>{const c=i%cols,r=Math.floor(i/cols),a=box(mk('div','ang',st),c*cw+(cw-w)/2,r*ch+(ch-h)/2,w,h);a.dataset.h=1;a.dataset.m=72+d;a.dataset.i=i;a.dataset.c=RAINBOW[i];a.innerHTML=`<img src="art/a-${i+1}.webp" alt="" draggable="false"><b class="an">${lab(i)}</b>`;a.style.setProperty('--fs',Math.max(14,Math.min(30,w*.17))+'px')})},
  hit(el){SND.angklung(+el.dataset.m);restart(el,'shake',700)}},
 suling:{c:['#c9a7ff','#8a4dff'],melodic:true,glide:true,
  /* art/i-suling.webp is 1200x141 */
  build(st,W,H){const {el,L,S}=canon(st,W,H),A=1200/141,tl=Math.min(L-8,S*.5*A),th=tl/A,tb=box(mk('div','suling',el),(L-tl)/2,(S-th)/2,tl,th);
   const w=box(mk('div','wind',el),(L-tl)/2-th*.9,S/2-th*.4,th*.8,th*.8);w.innerHTML=`<svg viewBox="0 0 40 40" width="100%" height="100%"><path d="M4 12 H30 M8 20 H36 M4 28 H28" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`;
   const sp=tl*.725/8,dd=Math.min(th*.92,sp*.86);
   SCALE.forEach((d,i)=>{const hx=tl*.22+sp*(i+.5),h=box(mk('div','hole',tb,`<span class="up">${lab(i)}</span>`),hx-dd/2,(th-dd)/2-4,dd,dd);h.dataset.h=1;h.dataset.m=72+d;h.dataset.i=i;h.dataset.c=RAINBOW[i];h.style.setProperty('--k',RAINBOW[i]);h.style.setProperty('--fs',Math.min(30,Math.max(15,dd*.36))+'px')})},
  hit(el){const w=$('.wind');if(w)w.classList.add('on');return SND.suling(+el.dataset.m)},
  up(){if(!PT.size){const w=$('.wind');if(w)w.classList.remove('on')}}},
 balloons:{c:['#ff9ad5','#ff4fa0'],
  build(st){bal.list=[];bal.last=0;st.innerHTML=''},
  hit(el){popBalloon(el)}}};
const ORDER=['piano','xylo','glock','drums','guitar','daff','angklung','suling','balloons'];


/* guitar chords: strings low to high. A chord button tunes all six strings, so any strum sounds nice.
   The main chords are C, F, G and Am (the chords of most simple songs). The + button shows all 14 chords:
   C Cm D Dm E Em F Fm G Gm A Am B Bm, in the same colours as the piano keys. */
const ROOTS=[['C',0,[48,55,60,64,67,72]],['D',2,[50,57,62,66,69,74]],['E',4,[40,47,52,56,59,64]],['F',5,[53,57,60,65,69,72]],['G',7,[43,50,55,59,62,67]],['A',9,[45,52,57,61,64,69]],['B',11,[47,54,59,63,66,71]]];
const MAINCH=[{r:0,mn:false},{r:3,mn:false},{r:4,mn:false},{r:5,mn:true}];
let chord={r:0,mn:false},allCh=store.get('allCh',false);
const chordList=()=>allCh?ROOTS.flatMap((_,r)=>[{r,mn:false},{r,mn:true}]):MAINCH;
function chordNotes(i=chord.r,mn=chord.mn){const [,r,ms]=ROOTS[i];return mn?ms.map(m=>((m-r)%12+12)%12===4?m-1:m):ms}
function ksWarm(){if(!AC)return;let i=0;const all=[...new Set(ROOTS.flatMap((_,k)=>[...chordNotes(k,false),...chordNotes(k,true)]))];const step=()=>{if(i>=all.length)return;ksBuf(all[i++]);setTimeout(step,25)};step()}
function renderChords(pan){pan.innerHTML=chordList().map(c=>`<button data-r="${c.r}" data-mn="${c.mn?1:0}" class="${c.mn?'mi':''}${c.r===chord.r&&c.mn===chord.mn?' on':''}" style="background-color:${RAINBOW[c.r]}">${ROOTS[c.r][0]}${c.mn?'m':''}</button>`).join('')
  +`<button data-more class="more" aria-label="${allCh?'Main chords':'All chords'}">${allCh?'−':'+'}</button>`}
function strumAll(){const n=chordNotes();document.querySelectorAll('.str').forEach((s,k)=>{s.dataset.c=RAINBOW[chord.r];setTimeout(()=>{SND.guitar(n[k]);restart(s,'vib',500)},k*35)})}

function restart(el,cls,ms){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);clearTimeout(el['_'+cls]);el['_'+cls]=setTimeout(()=>el.classList.remove(cls),ms)}

/* =================================================================
   Songs (old folk and classical tunes, free to use). "i:d" = key i (0-7, do to high do), d beats.
   ================================================================= */
const SONGS=[
 {k:'twinkle',ms:430,n:'0 0 4 4 5 5 4:2 3 3 2 2 1 1 0:2 4 4 3 3 2 2 1:2 4 4 3 3 2 2 1:2 0 0 4 4 5 5 4:2 3 3 2 2 1 1 0:2'},
 {k:'lamb',ms:400,n:'2 1 0 1 2 2 2:2 1 1 1:2 2 4 4:2 2 1 0 1 2 2 2 2 1 1 2 1 0:4'},
 {k:'row',ms:210,n:'0:3 0:3 0:2 1:1 2:3 2:2 1:1 2:2 3:1 4:6 7:1 7:1 7:1 4:1 4:1 4:1 2:1 2:1 2:1 0:1 0:1 0:1 4:2 3:1 2:2 1:1 0:6'},
 {k:'ode',ms:400,n:'2 2 3 4 4 3 2 1 0 0 1 2 2:1.5 1:.5 1:2 2 2 3 4 4 3 2 1 0 0 1 2 1:1.5 0:.5 0:2'},
 {k:'bridge',ms:380,n:'4:1.5 5:.5 4 3 2 3 4:2 1 2 3:2 2 3 4:2 4:1.5 5:.5 4 3 2 3 4:2 1:2 4:2 2 0:2'},
 {k:'lightly',ms:400,n:'4 2 2:2 3 1 1:2 0 1 2 3 4 4 4:2 4 2 2:2 3 1 1:2 0 2 4 4 0:4'},
 /* Old MacDonald (traditional): played in F so the low notes fit the 8 keys (key 4 is do) */
 {k:'farm',ms:330,n:'3 3 3 0 1 1 0:2 5 5 4 4 3:3 0 3 3 3 0 1 1 0:2 5 5 4 4 3:2 0:.5 0:.5 3 3 3:2 0:.5 0:.5 3 3 3:2 3:.5 3:.5 3 3:.5 3:.5 3 3:.5 3:.5 3:.5 3:.5 3 3 3 3 3 0 1 1 0:2 5 5 4 4 3:4'}];
const parseSong=s=>s.split(/\s+/).map(x=>{const [i,d]=x.split(':');return[+i,d?+d:1]});
const usesLow=i=>parseSong(SONGS[i].n).some(([k])=>k<0);
function needLow(){return !!((song&&usesLow(song.i))||(fall.on&&usesLow(fall.si)))}
function pianoSync(){if(cur==='piano'&&(stage.dataset.low==='1')!==needLow()){releaseAll();build()}}
/* Happy Birthday: the traditional melody (Mildred and Patty Hill, 1893), free to use; played in C with low sol, la and si (piano only) */
SONGS.push({k:'birthday',ms:420,pic:false,n:'-3:.5 -3:.5 -2 -3 0 -1:2 -3:.5 -3:.5 -2 -3 1 0:2 -3:.5 -3:.5 4 2 0 -1 -2:2 3:.5 3:.5 2 0 1 0:3'});
const SONGCOL=['#ffd400','#00aa0c','#2f7bff','#ff6a00','#ff5fa8','#9b4bf0','#19c3c0','#ff4b4b'];
let done=store.get('done',{});

/* =================================================================
   Screens
   ================================================================= */
const stage=$('#stage');
let scr='home',cur=null;
function show(id){document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id===id));scr=id}
function ov(id,on){$('#'+id).classList.toggle('on',on)}
let toastT;function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('on'),2400)}
function renderHome(){$('#tiles').innerHTML=ORDER.map(k=>`<button class="tile" data-k="${k}" style="--c1:${INST[k].c[0]};--c2:${INST[k].c[1]}"><span class="in">${tileImg(k)}<span class="lbl">${t('I')[k]}</span></span></button>`).join('')}
$('#tiles').addEventListener('click',e=>{const b=e.target.closest('.tile');if(!b||b.classList.contains('pick'))return;ac();SND.tap();goFull();b.classList.add('pick');setTimeout(()=>{b.classList.remove('pick');openInst(b.dataset.k)},330)});
function renderTitle(){$('#ttl').innerHTML=tileImg(cur)+`<b>${t('I')[cur]}</b>`}
function openInst(k){fallOff();cur=k;show('play');renderTitle();stopSong();
  $('#songsBtn').hidden=!INST[k].melodic;$('#fallBtn').hidden=k!=='piano';moBase=k==='piano'?'art/mo-piano.webp':(k==='drums'||k==='daff')?'art/mo-drum.webp':'art/mo-dance.webp';$('#dancer').src=moBase;
  build();
  if(k==='balloons'){balStart();toast(t('balTip'))}}
function build(){stage.innerHTML='';clearTarget();const W=stage.clientWidth,H=stage.clientHeight;if(!W||!H||!cur)return;INST[cur].build(stage,W,H);setTarget()}
function goHome(){releaseAll();fallOff();stopSong();balStop();cur=null;stage.innerHTML='';show('home');armIdle()}
$('#backBtn').onclick=()=>{SND.tap();goHome()};
let rzT;addEventListener('resize',()=>{clearTimeout(rzT);rzT=setTimeout(()=>{fitFx();if(scr==='play'&&cur!=='balloons'){releaseAll();build()}if(song&&song.demo)stopDemo()},120)});

/* ---------- touching the instruments (many fingers at once, slide across keys) ---------- */
const PT=new Map();
function hitAt(x,y){const e=document.elementFromPoint(x,y);if(!e)return null;const h=e.closest('[data-h]');return h&&stage.contains(h)?h:null}
stage.addEventListener('pointerdown',e=>{if(!cur||window.praying)return;e.preventDefault();ac();const h=hitAt(e.clientX,e.clientY);PT.set(e.pointerId,{el:null,hd:null,t:0});
  try{stage.setPointerCapture(e.pointerId)}catch(_){}if(h)press(e.pointerId,h,e.clientX,e.clientY)});
stage.addEventListener('pointermove',e=>{const p=PT.get(e.pointerId);if(!p||!cur||!INST[cur].glide)return;const h=hitAt(e.clientX,e.clientY);if(h!==p.el){unpress(e.pointerId);if(h)press(e.pointerId,h,e.clientX,e.clientY)}});
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>stage.addEventListener(ev,e=>{if(!PT.has(e.pointerId))return;unpress(e.pointerId);PT.delete(e.pointerId);if(cur&&INST[cur].up)INST[cur].up()}));
function press(id,el,x,y){const p=PT.get(id);if(!p)return;p.el=el;p.t=performance.now();el.classList.add('down');const r=INST[cur].hit(el);p.hd=r&&r.stop?r:null;afterNote(el,x,y)}
function unpress(id){const p=PT.get(id);if(!p||!p.el)return;const el=p.el,hd=p.hd,wait=Math.max(0,90-(performance.now()-p.t));p.el=null;p.hd=null;if(hd)hd.stop();
  if(!el.classList.contains('cym'))setTimeout(()=>{if(![...PT.values()].some(q=>q.el===el))el.classList.remove('down')},wait)}
function releaseAll(){[...PT.keys()].forEach(unpress);PT.clear();if(cur&&INST[cur].up)INST[cur].up()}
/* no zooming: double tap and pinch do nothing */
stage.addEventListener('touchstart',e=>{if(e.cancelable)e.preventDefault()},{passive:false});
document.addEventListener('dblclick',e=>e.preventDefault());
['gesturestart','gesturechange','gestureend'].forEach(ev=>document.addEventListener(ev,e=>e.preventDefault()));
/* keyboard (computers): 1-8 play the keys in order */
addEventListener('keydown',e=>{if(scr!=='play'||!cur||e.repeat||document.querySelector('.ov.on'))return;const n=+e.key;if(!(n>=1&&n<=8))return;
  const els=[...stage.querySelectorAll('[data-h]')],el=stage.querySelector(`[data-i="${n-1}"]`)||els[n-1];if(!el)return;ac();const r=el.getBoundingClientRect(),id='k'+n;
  PT.set(id,{el:null,hd:null,t:0});press(id,el,r.left+r.width/2,r.top+r.height/2);const up=ev=>{if(ev.key!==e.key)return;removeEventListener('keyup',up);unpress(id);PT.delete(id);if(cur&&INST[cur].up)INST[cur].up()};addEventListener('keyup',up)});

/* ---------- after every note: a flying note, Baby Mo dances, the song moves on ---------- */
let noteCount=0,lastCheer=0,burst=[],moT=0,moBase='art/mo-dance.webp';
function afterNote(el,x,y){
  flyNote(x,y,el.dataset.c||'#ffd400');
  const d=$('#dancer');d.classList.remove('bop');void d.offsetWidth;d.classList.add('bop');
  const n=performance.now();burst=burst.filter(v=>n-v<2200);burst.push(n);
  if(burst.length>=7&&!d.src.includes('mo-cheer'))d.src='art/mo-cheer.webp';
  clearTimeout(moT);moT=setTimeout(()=>{d.src=moBase},1300);
  if(fall.on){if(el.dataset.i!=null)fallHit(+el.dataset.i);return}
  if(song&&!song.demo&&el.dataset.i!=null&&+el.dataset.i===song.notes[song.pos][0])songStep();
  else if(!song&&cur!=='balloons'){noteCount++;if(noteCount>=60&&n-lastCheer>60000){noteCount=0;lastCheer=n;cheer()}}}
function flyNote(x,y,c){const L=$('#notes');if(L.childElementCount>26)L.firstElementChild.remove();const w=mk('div','',L,noteSvg(c)),s=w.firstChild;w.remove();
  s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--dx',rnd(-50,50)+'px');L.appendChild(s);setTimeout(()=>s.remove(),1150)}
let cheerN=0;
function cheer(){const i=cheerN++%4,c=mk('div','cheer',document.body,`<b>${t('cheer')[i]}</b><small>${t('cheerM')[i]}</small>`);voice(['masya1','subhan','akbar','barak'][i],t('cheer')[i]);setTimeout(()=>c.remove(),1700)}

/* =================================================================
   Song mode: the key to play shines, with a star above it
   ================================================================= */
let song=null,idleH=0;
const tstar=mk('img','tstar',document.body);tstar.src='art/star.webp';tstar.alt='';tstar.style.position='fixed';tstar.style.display='none';
let songsMode='song';
function renderSongs(mode){if(mode)songsMode=mode;const F=songsMode==='fall';$('#songsTitle').textContent=t(F?'fallT':'songsT');$('#songsSub').textContent=t(F?'fallS':'songsS');
  $('#lvlSeg').hidden=!F;$('#lvlSeg').innerHTML=['little','big'].map(l=>`<button data-l="${l}" class="${fall.lvl===l?'on':''}"><img src="art/lv-${l}.webp" alt="">${t(l)}<small>${t(l+'S')}</small></button>`).join('');
  $('#slist').innerHTML=(F?'':`<button class="free" data-s="-1"><i style="--k:#00aa0c">${noteSvg('#ffff01')}</i>${t('free')}</button>`)+
  SONGS.map((s,i)=>cur!=='piano'&&usesLow(i)?'':`<button data-s="${i}" class="${(F?fallStars[s.k]:done[s.k])?'done':''}"><i class="pic">${s.pic===false?noteSvg(SONGCOL[i%SONGCOL.length]):`<img src="art/s-${s.k}.webp" alt="">`}</i><span>${t('S')[s.k]}<small>${tf('notesN',{n:parseSong(s.n).length})}</small></span><span class="st"></span></button>`).join('')}
$('#songsBtn').onclick=()=>{SND.tap();renderSongs('song');ov('songsOv',true)};
$('#fallBtn').onclick=()=>{SND.tap();renderSongs('fall');ov('songsOv',true)};
$('#lvlSeg').addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b)return;SND.tap();fall.lvl=b.dataset.l;store.set('fallLvl',fall.lvl);renderSongs()});
$('#songsClose').onclick=()=>ov('songsOv',false);
$('#slist').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;SND.tap();ov('songsOv',false);const i=+b.dataset.s;if(songsMode==='fall'){startFall(i);return}fallOff();if(i<0)stopSong();else startSong(i)});
function startSong(i){fallOff();stopSong();const s=SONGS[i];song={i,notes:parseSong(s.n),pos:0,demo:false};pianoSync();$('#play').classList.add('song');$('#songBar').classList.add('on');
  $('#listenBtn').hidden=false;$('#stopSong').hidden=false;renderSongBar();setTarget();toast(t('listenTip'))}
function renderSongBar(){if(fall.on){$('#songName').textContent=t('S')[SONGS[fall.si].k];$('#songProg').style.width=(fall.notes.filter(o=>o.st).length/fall.notes.length*100)+'%';return}
  if(cur==='balloons'){$('#songName').textContent=t('S')[SONGS[bal.si].k];$('#songProg').style.width=(bal.pos/bal.notes.length*100)+'%';return}
  if(!song)return;$('#songName').textContent=t('S')[SONGS[song.i].k];$('#songProg').style.width=(song.pos/song.notes.length*100)+'%'}
function stopSong(){stopDemo();song=null;clearTarget();$('#play').classList.remove('song');$('#songBar').classList.remove('on');pianoSync()}
$('#stopSong').onclick=()=>{SND.tap();if(fall.on)stopFall();else stopSong()};
function clearTarget(){document.querySelectorAll('.tgt').forEach(e=>e.classList.remove('tgt'));tstar.style.display='none';hideHint();clearTimeout(idleH)}
function targetEl(){return song&&stage.querySelector(`[data-i="${song.notes[song.pos][0]}"]`)}
function setTarget(){clearTarget();if(!song||song.demo)return;const el=targetEl();if(!el)return;el.classList.add('tgt');
  const r=el.getBoundingClientRect(),sz=Math.max(30,Math.min(56,Math.min(r.width,r.height)*.5));tstar.style.width=tstar.style.height=sz+'px';tstar.style.margin=(-sz/2)+'px 0 0 '+(-sz/2)+'px';
  tstar.style.left=(r.left+r.width/2)+'px';tstar.style.top=(r.top+Math.min(r.height*.3,r.height/2))+'px';tstar.style.display='block';
  idleH=setTimeout(()=>showHint(el),3800)}
function songStep(){song.pos++;renderSongBar();if(song.pos>=song.notes.length){const i=song.i;clearTarget();song.pos=song.notes.length;setTimeout(()=>songDone(i),500);song=null;return}setTarget()}
function songDone(i){const k=SONGS[i].k;done[k]=1;store.set('done',done);$('#songBar').classList.remove('on');$('#play').classList.remove('song');
  SND.fanfare();confetti();setTimeout(()=>voice('win',t('sayAlh')),600);
  $('#winSub').textContent=tf('winSub',{s:t('S')[k]});$('#winFact').textContent=nextFact();lastSong=i;lastMode='song';winStars(3);ov('win',true)}
let lastSong=0,lastMode='song';
function winStars(n){document.querySelectorAll('.stars3 i').forEach((s,k)=>s.classList.toggle('off',k>=n))}
$('#winAgain').onclick=()=>{SND.tap();ov('win',false);if(lastMode==='fall')startFall(lastSong);else startSong(lastSong)};
$('#winMore').onclick=()=>{SND.tap();ov('win',false);renderSongs(lastMode);ov('songsOv',true)};
/* =================================================================
   Falling Notes (piano): coloured bars fall onto the keys; tap the key when its bar touches it.
   Little: the bar stops on its key and waits, no failing. Big Kid: the bars keep the beat; perfect, good or missed.
   ================================================================= */
const fall={on:false,lvl:store.get('fallLvl','little'),si:0,notes:[],t:0,end:0,raf:0,last:0,geo:null,perfect:0,good:0,miss:0,waitK:null,hintT:0};
let fallStars=store.get('fallStars',{});
const fallLead=()=>fall.lvl==='big'?2:2.6;
/* where the lanes and keys are, in the piano's own (unturned) coordinates */
function fallGeo(el,p,k){const x0=p.offsetLeft+p.clientLeft+k.offsetLeft,hitY=p.offsetTop+p.clientTop+k.offsetTop,keys=[...k.querySelectorAll('.wk')],lanes=box(mk('div','lanes',el),x0,0,k.offsetWidth,hitY);
  const kx={},keyEls={};keys.forEach((w,n)=>{const i=+w.dataset.i;kx[i]={x:w.offsetLeft,w:w.offsetWidth};keyEls[i]=w;if(n)box(mk('i','ln',lanes),w.offsetLeft-3,0,2,hitY)});
  fall.geo={lanes,hitY,kx,keyEls,bars:new Map()};fall.waitK=null}
function startFall(i){stopSong();releaseAll();const s=SONGS[i],beat=s.ms/1000*(fall.lvl==='big'?1:1.2);let tt=0;
  fall.notes=parseSong(s.n).map(([k,d])=>{const o={k,d,t:tt,len:d*beat,st:0};tt+=d*beat;return o});
  Object.assign(fall,{on:true,si:i,t:-fallLead()-.5,end:tt,perfect:0,good:0,miss:0,last:performance.now(),waitK:null});
  $('#play').classList.add('song');$('#songBar').classList.add('on');$('#listenBtn').hidden=true;$('#stopSong').hidden=false;
  build();renderSongBar();cancelAnimationFrame(fall.raf);fall.raf=requestAnimationFrame(fallLoop)}
function fallOff(){if(!fall.on)return;fall.on=false;cancelAnimationFrame(fall.raf);clearTimeout(fall.hintT);hideHint();fall.geo=null;$('#play').classList.remove('song');$('#songBar').classList.remove('on')}
function stopFall(){fallOff();if(cur==='piano'){releaseAll();build()}}
function fallLoop(n){if(!fall.on)return;fall.raf=requestAnimationFrame(fallLoop);let dt=Math.min(.05,(n-fall.last)/1000);fall.last=n;
  if(window.praying||document.hidden||document.querySelector('.ov.on'))dt=0;
  const nx=fall.notes.find(o=>!o.st);
  if(fall.lvl==='little'&&nx)fall.t=Math.min(fall.t+dt,nx.t);else fall.t+=dt;
  if(fall.lvl==='big')fall.notes.forEach(o=>{if(!o.st&&fall.t>o.t+.22){o.st=3;fall.miss++;renderSongBar()}});
  drawFall();
  if(fall.lvl==='little'){const w=nx&&fall.t>=nx.t-.001?nx.k:null;if(w!==fall.waitK)fallWait(w)}
  if(!nx&&fall.t>fall.end+.5)fallDone()}
function fallWait(k){const g=fall.geo;fall.waitK=k;clearTimeout(fall.hintT);hideHint();if(!g)return;Object.values(g.keyEls).forEach(e=>e.classList.remove('tgt'));
  if(k===null)return;const el=g.keyEls[k];el.classList.add('tgt');fall.hintT=setTimeout(()=>{if(fall.on&&fall.waitK===k)showHint(el)},3500)}
function drawFall(){const g=fall.geo;if(!g)return;const v=g.hitY/fallLead();
  fall.notes.forEach((o,i)=>{let b=g.bars.get(i);const bot=g.hitY-(o.t-fall.t)*v,h=Math.max(16,o.len*v*.86),top=bot-h,show=(o.st===0||o.st===3)&&bot>0&&top<g.hitY;
    if(!show){if(b)b.style.display='none';return}
    if(!b){const q=g.kx[o.k];b=mk('div','fbar',g.lanes,`<b>${lab(o.k)}</b>`);b.style.left=(q.x+q.w*.1)+'px';b.style.width=(q.w*.8)+'px';b.style.setProperty('--k',colOf(o.k));b.style.setProperty('--fs',Math.min(30,Math.max(14,q.w*.34))+'px');g.bars.set(i,b)}
    b.style.display='';b.style.height=h+'px';b.style.transform=`translateY(${top}px)`;b.classList.toggle('miss',o.st===3)})}
function fallHit(k){const g=fall.geo;if(!g)return;let o=null,dt=0;
  if(fall.lvl==='little'){const nx=fall.notes.find(q=>!q.st);if(nx&&nx.k===k&&fall.t>=nx.t-.6){o=nx;o.st=1;fall.perfect++}}
  else{for(const q of fall.notes){if(q.st||q.k!==k)continue;const d=Math.abs(q.t-fall.t);if(d<.22){o=q;dt=d;break}if(q.t>fall.t+.22)break}
    if(o){if(dt<.1){o.st=1;fall.perfect++}else{o.st=2;fall.good++}}}
  if(!o)return;const q=g.kx[k],cx=q.x+q.w/2;
  const fx=mk('div','popfx',g.lanes);fx.style.left=cx+'px';fx.style.top=(g.hitY-6)+'px';fx.style.setProperty('--k',colOf(k));let h='<b></b>';for(let j=0;j<10;j++){const a=-j/9*3.14,d=rnd(30,60);h+=`<i style="--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px"></i>`}fx.innerHTML=h;setTimeout(()=>fx.remove(),700);
  if(fall.lvl==='big'){const f=mk('div','ffb',g.lanes,t(o.st===1?'perfect':'good'));f.style.left=cx+'px';setTimeout(()=>f.remove(),800)}
  renderSongBar();drawFall()}
function fallDone(){const i=fall.si,k=SONGS[i].k,n=fall.notes.length,{perfect:p,good:gd,miss:m}=fall,big=fall.lvl==='big';
  const acc=(p+gd*.6)/n,stars=big?(acc>=.85?3:acc>=.6?2:1):3;fallStars[k]=Math.max(fallStars[k]||0,stars);store.set('fallStars',fallStars);
  fallOff();if(cur==='piano'){releaseAll();build()}
  SND.fanfare();confetti();setTimeout(()=>voice('win',t('sayAlh')),600);
  $('#winSub').textContent=big?tf('fallDone',{s:t('S')[k],p,g:gd,m}):tf('winSub',{s:t('S')[k]});$('#winFact').textContent=nextFact();lastSong=i;lastMode='fall';winStars(stars);ov('win',true)}

/* listen: Baby Mo plays the song first */
let demoT=[];
$('#listenBtn').onclick=()=>{if(!song)return;ac();if(song.demo){stopDemo();return}
  song.demo=true;clearTarget();$('#dancer').src='art/mo-listen.webp';let at=250;const ms=SONGS[song.i].ms;
  song.notes.forEach(([i,d])=>{demoT.push(setTimeout(()=>{const el=stage.querySelector(`[data-i="${i}"]`);if(!el)return;const r=el.getBoundingClientRect(),hd=INST[cur].hit(el);el.classList.add('down');
    afterDemo(el,r);setTimeout(()=>{el.classList.remove('down');if(hd)hd.stop();if(INST[cur].up)INST[cur].up()},Math.max(120,d*ms*.8))},at));at+=d*ms});
  demoT.push(setTimeout(()=>{$('#dancer').src=moBase;if(song){song.demo=false;song.pos=0;renderSongBar();setTarget()}},at+300))};
function afterDemo(el,r){flyNote(r.left+r.width/2,r.top+r.height/2,el.dataset.c);const d=$('#dancer');d.classList.remove('bop');void d.offsetWidth;d.classList.add('bop')}
function stopDemo(){demoT.forEach(clearTimeout);demoT=[];stage.querySelectorAll('.down').forEach(e=>e.classList.remove('down'));if(cur&&INST[cur]&&INST[cur].up)INST[cur].up();if(song&&song.demo){song.demo=false;setTarget()}}
function showHint(el){const r=el.getBoundingClientRect(),h=$('#hint');h.style.left=(r.left+r.width/2-10)+'px';h.style.top=(r.top+r.height/2)+'px';h.style.display='block'}
function hideHint(){$('#hint').style.display='none'}

/* =================================================================
   Music balloons: each balloon you pop plays the next note of a song
   ================================================================= */
const bal={list:[],on:false,last:0,raf:0,si:0,pos:0,notes:[],n:0};
const balImg=(i,star)=>`<img src="art/${star?'b-star':'b-'+(i+1)}.webp" alt="" draggable="false">`;
function balSong(i){bal.si=i%SONGS.length;bal.notes=parseSong(SONGS[bal.si].n);bal.pos=0;renderSongBar()}
function balStart(){bal.on=true;bal.list=[];$('#songBar').classList.add('on');$('#listenBtn').hidden=true;$('#stopSong').hidden=true;balSong(store.get('balSong',0));cancelAnimationFrame(bal.raf);let lt=performance.now();
  const loop=n=>{if(!bal.on)return;const dt=Math.min(.05,(n-lt)/1000);lt=n;if(!window.praying&&!document.hidden)balTick(n,dt);bal.raf=requestAnimationFrame(loop)};bal.raf=requestAnimationFrame(loop)}
function balStop(){bal.on=false;cancelAnimationFrame(bal.raf);bal.list=[];$('#songBar').classList.remove('on')}
function balTick(n,dt){const W=stage.clientWidth,H=stage.clientHeight,sz=Math.max(70,Math.min(150,Math.min(W,H)*.24)),max=Math.max(4,Math.min(9,Math.round(W*H/(sz*sz*2.2))));
  if(bal.list.length<max&&n-bal.last>650){bal.last=n;const star=bal.n++%9===8,s=sz*rnd(.8,1.02),ci=(Math.random()*8)|0,c=RAINBOW[ci];
    const el=mk('div','bal',stage,balImg(ci,star));el.dataset.h=1;el.dataset.c=star?'#ffd400':c;el.style.width=s+'px';el.style.height=s/(star?.83:.567)+'px';
    bal.list.push({el,x:rnd(0,Math.max(1,W-s)),y:H+10,vy:rnd(55,95)*(H/600+.4),ph:rnd(0,6.28),s,star})}
  bal.list=bal.list.filter(b=>{if(!b.el.isConnected)return false;b.y-=b.vy*dt;b.ph+=dt*1.6;const x=b.x+Math.sin(b.ph)*14;b.el.style.transform=`translate(${x}px,${b.y}px) rotate(${Math.sin(b.ph)*6}deg)`;
    if(b.y<-b.s*1.6){b.el.remove();return false}return true})}
function popBalloon(el){const b=bal.list.find(v=>v.el===el);if(!b)return;const r=el.getBoundingClientRect(),sr=stage.getBoundingClientRect(),cx=r.left+r.width/2-sr.left,cy=r.top+r.height*.33-sr.top;
  el.remove();SND.pop();const fx=mk('div','popfx',stage);fx.style.left=cx+'px';fx.style.top=cy+'px';fx.style.setProperty('--k',el.dataset.c);let h='<b></b>';
  for(let i=0;i<12;i++){const a=i/12*6.283,d=rnd(40,80);h+=`<i style="--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px"></i>`}fx.innerHTML=h;setTimeout(()=>fx.remove(),700);
  if(b.star){SND.sparkle();confetti(.35)}
  const [i]=bal.notes[bal.pos];setTimeout(()=>SND.kalimba(midiOf(72,i)),30);bal.pos++;renderSongBar();
  if(bal.pos>=bal.notes.length){const k=SONGS[bal.si].k;done[k]=1;store.set('done',done);setTimeout(()=>{SND.fanfare();confetti();cheer();toast(tf('songDone',{s:t('S')[k]}))},500);
    const nx=(bal.si+1)%SONGS.length;store.set('balSong',nx);setTimeout(()=>balSong(nx),900)}}

/* =================================================================
   Effects: confetti
   ================================================================= */
const fxc=$('#fx'),fxx=fxc.getContext('2d');let conf=[],fxRaf=0;
function fitFx(){const d=DPR();fxc.width=innerWidth*d;fxc.height=innerHeight*d}fitFx();
function confetti(k=1){const W=innerWidth,H=innerHeight,cols=['#00aa0c','#ff6a00','#ffd400','#ff5fa8','#2f7bff','#9b4bf0'];
  for(let i=0;i<150*k;i++)conf.push({x:W/2+(Math.random()-.5)*W*.4,y:H*.35,vx:(Math.random()-.5)*900,vy:-Math.random()*900-200,s:Math.random()*8+7,c:cols[i%cols.length],r:Math.random()*6,t:-Math.random()*.2});
  if(!fxRaf)fxRaf=requestAnimationFrame(drawConf)}
function drawConf(){const d=DPR();fxx.setTransform(1,0,0,1,0,0);fxx.clearRect(0,0,fxc.width,fxc.height);if(!conf.length){fxRaf=0;return}fxx.setTransform(d,0,0,d,0,0);const dt=1/60;
  conf=conf.filter(p=>{p.t+=dt;if(p.t<0)return true;if(p.t>2.6)return false;p.vy+=900*dt;p.vx*=.99;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*6;fxx.save();fxx.translate(p.x,p.y);fxx.rotate(p.r);fxx.globalAlpha=Math.min(1,(2.6-p.t)*2);fxx.fillStyle=p.c;fxx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);fxx.restore();return true});
  fxRaf=requestAnimationFrame(drawConf)}


/* ---------- hold-to-confirm buttons ---------- */
function holdable(el,ms,fin){let tm=0,start=0,raf=0;const ring=el.querySelector('.ring');const stop=()=>{cancelAnimationFrame(raf);tm=0;ring&&ring.style.setProperty('--p','0%')};
  el.addEventListener('pointerdown',e=>{e.preventDefault();start=performance.now();tm=1;const step=n=>{if(!tm)return;const p=Math.min(1,(n-start)/ms);ring&&ring.style.setProperty('--p',(p*100)+'%');if(p>=1){stop();fin();return}raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>el.addEventListener(ev,stop))}

/* ---------- language ---------- */
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t(el.dataset.t)});$('#langIco').src='ui/lang-'+lang+'.webp';renderHome();renderChip(Date.now())}
$('#langBtn').onclick=()=>{lang=lang==='en'?'id':'en';store.set('lang',lang);try{localStorage.setItem('moLang',lang)}catch(e){}SND.tap();applyLang()};
let gateFn=null;
function gate(fn){gateFn=fn;ov('gate',true)}
holdable($('#gHold'),3000,()=>{ov('gate',false);const f=gateFn;gateFn=null;f&&f()});
$('#gClose').onclick=()=>{ov('gate',false);gateFn=null};

/* ---------- Bismillah when the app opens (this first tap also switches the sound on) ---------- */
$('#bismBtn').onclick=()=>{ac();goFull();ov('bism',false);voice('bismillah',t('sayBism'));const a=ac();if(a){VKEYS.forEach(k=>vbuf((lang==='id'?'id':'en')+'/'+k))}armIdle()};

/* ---------- home: after a while without touching, a tile wiggles ---------- */
let idleHome=0;
function armIdle(){clearTimeout(idleHome);idleHome=setTimeout(()=>{if(scr!=='home'||document.querySelector('.ov.on'))return armIdle();const ts=[...document.querySelectorAll('.tile')];const b=ts[(Math.random()*ts.length)|0];if(b)b.animate([{transform:'scale(1)'},{transform:'scale(1.08) rotate(-3deg)'},{transform:'scale(1.08) rotate(3deg)'},{transform:'scale(1)'}],{duration:700});armIdle()},7000)}
document.addEventListener('pointerdown',()=>{if(scr==='home')armIdle()},true);

/* ---------- add to home screen + full screen ---------- */
const isApp=()=>matchMedia('(display-mode: fullscreen)').matches||matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
let instEv=null;
function showInst(){$('#goInst').hidden=isApp()}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();instEv=e;showInst()});
addEventListener('appinstalled',()=>{instEv=null;showInst();toast(t('instOk'))});
showInst();
$('#goInst').onclick=async()=>{SND.tap();if(instEv){const e=instEv;instEv=null;try{e.prompt();const r=await e.userChoice;if(r&&r.outcome==='accepted')toast(t('instOk'))}catch(_){}showInst();return}
  $('#stIOS').hidden=!isIOS;$('#stAnd').hidden=isIOS;ov('instOv',true)};
$('#instClose').onclick=()=>ov('instOv',false);
function goFull(){if(isApp()||!matchMedia('(pointer:coarse)').matches)return;const el=document.documentElement,d=document;
  if(d.fullscreenElement||d.webkitFullscreenElement)return;try{const f=el.requestFullscreen||el.webkitRequestFullscreen;if(f){const r=f.call(el,{navigationUI:'hide'});if(r&&r.catch)r.catch(()=>{})}}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.hidden){releaseAll();stopDemo()}});

/* =================================================================
   Prayer pause (same as the other Mo games: Kemenag RI, Fajr 20°, Isha 18°, Asr Shafi'i, +2 min ihtiyat).
   Worked out on the device; nothing is sent anywhere. The city and the "I have prayed" record are shared
   with the other Mo games (nur:settings, nur:prayed).
   ================================================================= */
const CITIES=[
['malang','Malang',-7.9797,112.6304,'Asia/Jakarta'],['jakarta','Jakarta',-6.2088,106.8456,'Asia/Jakarta'],['bandung','Bandung',-6.9175,107.6191,'Asia/Jakarta'],
['semarang','Semarang',-6.9667,110.4167,'Asia/Jakarta'],['yogyakarta','Yogyakarta',-7.7956,110.3695,'Asia/Jakarta'],['surabaya','Surabaya',-7.2575,112.7521,'Asia/Jakarta'],
['medan','Medan',3.5952,98.6722,'Asia/Jakarta'],['bandaaceh','Banda Aceh',5.5483,95.3238,'Asia/Jakarta'],['palembang','Palembang',-2.9761,104.7754,'Asia/Jakarta'],
['pekanbaru','Pekanbaru',0.5071,101.4478,'Asia/Jakarta'],['pontianak','Pontianak',-0.0263,109.3425,'Asia/Jakarta'],['banjarmasin','Banjarmasin',-3.3194,114.5908,'Asia/Makassar'],
['balikpapan','Balikpapan',-1.2379,116.8529,'Asia/Makassar'],['makassar','Makassar',-5.1477,119.4327,'Asia/Makassar'],['denpasar','Denpasar',-8.6705,115.2126,'Asia/Makassar'],
['mataram','Mataram',-8.5833,116.1167,'Asia/Makassar'],['manado','Manado',1.4748,124.8421,'Asia/Makassar'],['ambon','Ambon',-3.6954,128.1814,'Asia/Jayapura'],
['jayapura','Jayapura',-2.5337,140.7181,'Asia/Jayapura'],['kl','Kuala Lumpur',3.139,101.6869,'Asia/Kuala_Lumpur'],['singapore','Singapore',1.3521,103.8198,'Asia/Singapore'],
['bsb','Bandar Seri Begawan',4.9031,114.9398,'Asia/Brunei'],['makkah','Makkah',21.3891,39.8579,'Asia/Riyadh'],['madinah','Madinah',24.5247,39.5692,'Asia/Riyadh'],
['dubai','Dubai',25.2048,55.2708,'Asia/Dubai'],['istanbul','Istanbul',41.0082,28.9784,'Europe/Istanbul'],['custom','',0,0,'']];
const nurGet=(k,d)=>{try{const v=localStorage.getItem('nur:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}};
const nurSet=(k,v)=>{try{localStorage.setItem('nur:'+k,JSON.stringify(v))}catch(e){}};
const PS=(()=>{const n=nurGet('settings',{})||{};const o=Object.assign({city:n.city,lat:n.lat,lng:n.lng,wait:n.wait||10},store.get('prayer',{}));
  if(n.city)Object.assign(o,{city:n.city,lat:n.lat,lng:n.lng});
  if(!o.city){let tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}const c=CITIES.find(x=>x[4]===tz);o.city=c?c[0]:'malang'}
  return o})();
function savePS(){store.set('prayer',PS);const n=nurGet('settings',null);if(n){n.city=PS.city;n.lat=PS.lat;n.lng=PS.lng;nurSet('settings',n)}pCache={}}
const R2D=180/Math.PI,D2R=Math.PI/180,sn=d=>Math.sin(d*D2R),cs=d=>Math.cos(d*D2R),tn=d=>Math.tan(d*D2R),fix=(a,b)=>a-b*Math.floor(a/b);
function julian(y,m,d){if(m<=2){y--;m+=12}const A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5}
function sunPos(jd){const D=jd-2451545,g=fix(357.529+.98560028*D,360),q=fix(280.459+.98564736*D,360),L=fix(q+1.915*sn(g)+.02*sn(2*g),360),e=23.439-.00000036*D;
  const RA=Math.atan2(cs(e)*sn(L),cs(L))*R2D/15;return{decl:Math.asin(sn(e)*sn(L))*R2D,eqt:q/15-fix(RA,24)}}
function prayerTimes(y,m,d,lat,lng){
  const jd=julian(y,m,d)-lng/(15*24),mid=p=>fix(12-sunPos(jd+p).eqt,24);
  const ang=(a,p,ccw)=>{const dc=sunPos(jd+p).decl,n=mid(p),T=Math.acos((-sn(a)-sn(dc)*sn(lat))/(cs(dc)*cs(lat)))*R2D/15;return n+(ccw?-T:T)};
  const asr=p=>{const dc=sunPos(jd+p).decl,a=-Math.atan(1/(1+tn(Math.abs(lat-dc))))*R2D;return ang(a,p)};
  let h={fajr:5,sunrise:6,dhuhr:12,asr:13,maghrib:18,isha:18};
  for(let i=0;i<2;i++){const p=k=>h[k]/24;h={fajr:ang(20,p('fajr'),1),sunrise:ang(.833,p('sunrise'),1),dhuhr:mid(p('dhuhr')),asr:asr(p('asr')),maghrib:ang(.833,p('maghrib')),isha:ang(18,p('isha'))}}
  const base=Date.UTC(y,m-1,d),out={};
  for(const k in h){const adj=k==='sunrise'?-2/60:2/60;out[k]=isFinite(h[k])?base+(h[k]-lng/15+adj)*3600e3:null}
  return out}
function cityInfo(){const c=CITIES.find(x=>x[0]===PS.city)||CITIES[0];
  if(c[0]==='custom'){let tz='UTC';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'}catch(e){}return{name:t('customCity'),lat:+PS.lat||0,lng:+PS.lng||0,tz}}
  return{name:c[1],lat:c[2],lng:c[3],tz:c[4]}}
function localYMD(tz,off){const s=new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(Date.now()));
  const [y,m,d]=s.split('-').map(Number);const dt=new Date(Date.UTC(y,m-1,d+(off||0)));return[dt.getUTCFullYear(),dt.getUTCMonth()+1,dt.getUTCDate()]}
const fmtT=(ms,tz)=>new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit'}).format(new Date(ms));
let pCache={};
function sched(off){const c=cityInfo(),ymd=localYMD(c.tz,off),k=PS.city+PS.lat+PS.lng+ymd.join('-');if(!pCache[k])pCache[k]={key:ymd.join('-'),t:prayerTimes(ymd[0],ymd[1],ymd[2],c.lat,c.lng)};return pCache[k]}
const FIVE=['fajr','dhuhr','asr','maghrib','isha'];
function activePrayer(n){const td=sched(0),T0=td.t;
  if(T0.fajr&&n<T0.fajr){const yd=sched(-1);return yd.t.isha?{p:'isha',start:yd.t.isha,key:yd.key+':isha'}:null}
  if(T0.sunrise&&n<T0.sunrise)return{p:'fajr',start:T0.fajr,key:td.key+':fajr'};
  let a=null;for(const p of ['dhuhr','asr','maghrib','isha'])if(T0[p]&&n>=T0[p])a={p,start:T0[p],key:td.key+':'+p};return a}
function nextPrayer(n){const td=sched(0).t;for(const p of FIVE)if(td[p]&&td[p]>n)return{p,at:td[p]};return{p:'fajr',at:sched(1).t.fajr}}
const prayedNow=()=>nurGet('prayed',{})||{};
function markPrayed(key){const pr=prayedNow();pr[key]=1;const keep={},today=sched(0).key,yest=sched(-1).key;for(const k in pr)if(k.startsWith(today)||k.startsWith(yest))keep[k]=1;nurSet('prayed',keep)}
function dur(ms){const m=Math.max(0,Math.ceil(ms/60000)),h=Math.floor(m/60);return h?`${h}h ${m%60}m`:`${m}m`}
const pn=p=>t('P')[p];
let lock=null,lastCheck=0;window.praying=false;
function tickPrayer(n){
  if(n-lastCheck>5000||lock){if(!lock||!lock.demo){lastCheck=n;const a=activePrayer(n);
    if(a&&!prayedNow()[a.key]){if(!lock||lock.key!==a.key){lock={...a,demo:false};openLock()}}else if(lock)closeLock(false)}}
  if(lock)renderLock(n);
  if(scr==='home')renderChip(n)}
function bell(){const a=ac();if(!a)return;const t0=now(),b=bus(.3,.3);[[1046,0],[784,.35],[1046,.7]].forEach(([f,w])=>{part(t0+w,f,.5,1.6,b);part(t0+w,f*2.01,.12,.8,b)})}
function openLock(){window.praying=true;releaseAll();stopDemo();try{speechSynthesis.cancel()}catch(e){}hideHint();
  ov('lock',true);bell();const pName=pn(lock.p);setTimeout(()=>{if(lock)voice('pray-'+lock.p,tf('sayPray',{p:pName}))},900);renderLock(Date.now())}
function renderLock(n){const p=pn(lock.p);$('#lockRib').textContent=t('pray');$('#lockTitle').textContent=tf('lockT',{p});$('#lockBody').textContent=tf('lockB',{p});
  const ready=lock.demo?lock.readyAt:lock.start+(+PS.wait||10)*60000,rem=ready-n,b=$('#bPrayed');b.textContent='✓ '+tf('prayed',{p});
  if(rem>0){b.disabled=true;const s=Math.ceil(rem/1000);$('#lockCount').textContent=tf('lockWait',{m:Math.floor(s/60)+':'+String(s%60).padStart(2,'0')})}else{b.disabled=false;$('#lockCount').textContent=t('lockReady')}}
function closeLock(thanks){ov('lock',false);lock=null;window.praying=false;
  if(thanks){voice('taqabbal',t('taq'));toast(t('taq'));confetti()}
  renderChip(Date.now());if(song)setTarget()}
$('#bPrayed').onclick=()=>{if(!lock||$('#bPrayed').disabled)return;if(!lock.demo)markPrayed(lock.key);closeLock(true);lastCheck=0};
function renderChip(n){try{const a=activePrayer(n),nx=nextPrayer(n),c=cityInfo();
  $('#pchip').innerHTML=(a&&prayedNow()[a.key]?'✓ '+pn(a.p)+' · ':'')+`<img src="ui/masjid.webp" alt=""> ${t('nextP')}: <b>${pn(nx.p)}</b> ${nx.at?fmtT(nx.at,c.tz):'—'} · ${nx.at?dur(nx.at-n):''} · ${c.name}`}catch(e){}}
function renderSettings(){
  $('#citySel').innerHTML=CITIES.map(c=>`<option value="${c[0]}"${c[0]===PS.city?' selected':''}>${c[0]==='custom'?t('customCity'):c[1]}</option>`).join('');
  $('#llRow').classList.toggle('on',PS.city==='custom');$('#latIn').value=PS.lat||'';$('#lngIn').value=PS.lng||'';
  $('#segWait').innerHTML=[5,10,15,20].map(m=>`<button data-v="${m}" class="${+PS.wait===m?'on':''}">${m} min</button>`).join('');
  const n=Date.now(),T0=sched(0).t,c=cityInfo(),a=activePrayer(n);
  $('#ptimes').innerHTML=FIVE.map(p=>`<div class="${a&&a.p===p&&a.key.startsWith(sched(0).key)?'now':''}"><b>${T0[p]?fmtT(T0[p],c.tz):'—'}</b>${pn(p)}</div>`).join('')}
$('#setBtn').onclick=()=>gate(()=>{renderSettings();ov('settings',true)});
$('#sClose').onclick=()=>{ov('settings',false);lastCheck=0;renderChip(Date.now())};
$('#citySel').onchange=e=>{PS.city=e.target.value;savePS();renderSettings()};
['latIn','lngIn'].forEach(id=>$('#'+id).addEventListener('change',()=>{PS.lat=$('#latIn').value.trim();PS.lng=$('#lngIn').value.trim();savePS();renderSettings()}));
$('#segWait').addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;PS.wait=+b.dataset.v;savePS();renderSettings()});
$('#bPreview').onclick=()=>{ov('settings',false);lock={p:'asr',demo:true,readyAt:Date.now()+10000,key:'demo'};openLock()};
setInterval(()=>tickPrayer(Date.now()),1000);

/* start */
applyLang();ov('bism',true);setTimeout(()=>tickPrayer(Date.now()),300);
if('serviceWorker' in navigator&&location.protocol==='https:'){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});
  /* a new version was installed: reload once, when the child is not in the middle of playing */
  const had=!!navigator.serviceWorker.controller;let reloaded=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!had||reloaded)return;const go=()=>{if(reloaded)return;if(scr==='home'&&!document.querySelector('.ov.on')){reloaded=true;location.reload()}else setTimeout(go,3000)};go()})}
/* for automated tests only */
window.__bmm={INST,SONGS,parseSong,openInst,startSong,startFall,fall,get song(){return song},bal,goHome};
