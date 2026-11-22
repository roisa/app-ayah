/* Mo Archery – Mo Games (IBRAZ Group). Physics by planck.js (MIT licence, lib/planck.min.js). */
'use strict';
const $=s=>document.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem('moar.'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('moar.'+k,JSON.stringify(v))}catch(e){}}};
const DPR=()=>Math.min(2.5,window.devicePixelRatio||1);
function seeded(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let q=Math.imul(s^s>>>15,1|s);q=q+Math.imul(q^q>>>7,61|q)^q;return((q^q>>>14)>>>0)/4294967296}}

/* =================================================================
   Text (EN / ID)
   ================================================================= */
const TXT={
en:{tag:'Play Games the Islamic Way',play:'Play',playS:'60 levels in 6 worlds',launchers:'Launchers',launchersS:'Bow, slingshot, cannon…',lauS:'Finish levels to unlock more!',
 little:'Little',littleS:'Ages 3+',big:'Big Kid',bigS:'Ages 6+',legal:'No ads · No data collected · Works offline',
 level:'Level {n}',holdR:'Hold to start again',bismS:'Say Bismillah before we start',bismB:'Bismillah!',
 gGift:'Open all the gift boxes!',gTrash:'Clean up all the rubbish!',gCage:'Free the animals from the cages!',gMix:'Open the gifts, clean up and free the animals!',
 alh:'Alhamdulillah!',dyk:'Did you know?',next:'Next',retry:'Try again',overT:'So close!',overP:"No more shots. Let's try again!",
 lvlDone:'Level {n} complete!',allDone:'You finished every level, MasyaAllah!',
 cheer:['MasyaAllah!','SubhanAllah!','Allahu Akbar!','Barakallah!'],cheerM:['How wonderful!','Glory be to Allah!','Allah is the Greatest!','May Allah bless you!'],
 thanks:['Thank you!','Jazakallah khair!','Yay, free!'],clean:['So clean!','Nice and tidy!'],gift:['A gift!','Surprise!'],
 L:{bow:'Bow',sling:'Slingshot',cannon:'Cannon',cata:'Catapult'},
 LD:{bow:'Fast arrows. Tap in the air to make three!',sling:'Bouncy balls that bounce around',cannon:'Heavy balls that push towers over',cata:'Big watermelons that go SPLASH!'},
 newL:'New launcher: {l}!',unlockAt:'Opens at level {n}',worldOpen:'{w} is now open!',
 W:['Green Garden','Sunny Beach','Shady Forest','Desert Oasis','Snowy Peaks','Lantern Night'],
 lockedW:'Finish {w} first',lockedLv:'Finish the level before to open this one',levelsR:'Levels {a}–{b}',
 sayBism:'Bismillah',sayAlh:'Alhamdulillah!',aimHint:'Pull back and let go!',splitHint:'Tap to split the arrow!',rot:'Turn sideways for a bigger view',pickHint:'Pick a launcher!',
 pray:'Time to pray',lockT:'It is time for {p}',lockB:"Let's stop for a moment and pray {p} first, at the masjid or at home. Your game will wait for you.",lockWait:'The button opens in {m}',lockReady:'Done praying? Tap the button.',prayed:'I have prayed {p}',taq:'Taqabbalallahu minna wa minkum',sayPray:'It is time to pray {p}.',
 setT:'For parents',city:'City',customCity:'Custom location',wait:'Prayer pause lasts at least',today:'Prayer times today',preview:'Preview the prayer pause',method:'Kemenag RI method · Fajr 20° · Isha 18° · +2 min',nextP:'Next',
 P:{fajr:'Fajr',sunrise:'Sunrise',dhuhr:'Dhuhr',asr:'Asr',maghrib:'Maghrib',isha:'Isha'},gateT:'For grown-ups',gateS:'Hold the button for 3 seconds'},
id:{tag:'Bermain dengan Cara Islami',play:'Main',playS:'60 level di 6 dunia',launchers:'Pelontar',launchersS:'Panah, ketapel, meriam…',lauS:'Selesaikan level untuk membuka yang lain!',
 little:'Kecil',littleS:'Usia 3+',big:'Besar',bigS:'Usia 6+',legal:'Tanpa iklan · Tanpa pengumpulan data · Bisa offline',
 level:'Level {n}',holdR:'Tahan untuk mulai lagi',bismS:'Ucapkan Bismillah sebelum mulai',bismB:'Bismillah!',
 gGift:'Buka semua kotak hadiah!',gTrash:'Bersihkan semua sampahnya!',gCage:'Bebaskan hewan-hewan dari kandang!',gMix:'Buka hadiah, bersihkan sampah, dan bebaskan hewan!',
 alh:'Alhamdulillah!',dyk:'Tahukah kamu?',next:'Lanjut',retry:'Coba lagi',overT:'Hampir!',overP:'Tembakannya habis. Ayo coba lagi!',
 lvlDone:'Level {n} selesai!',allDone:'Semua level sudah selesai, MasyaAllah!',
 cheer:['MasyaAllah!','SubhanAllah!','Allahu Akbar!','Barakallah!'],cheerM:['Indah sekali!','Maha Suci Allah!','Allah Maha Besar!','Semoga Allah memberkahimu!'],
 thanks:['Terima kasih!','Jazakallah khair!','Hore, bebas!'],clean:['Bersih sekali!','Rapi dan bersih!'],gift:['Hadiah!','Kejutan!'],
 L:{bow:'Panah',sling:'Ketapel',cannon:'Meriam',cata:'Pelontar Besar'},
 LD:{bow:'Anak panah cepat. Ketuk di udara jadi tiga!',sling:'Bola karet yang memantul ke mana-mana',cannon:'Bola berat yang mendorong menara',cata:'Semangka besar yang pecah BYUR!'},
 newL:'Pelontar baru: {l}!',unlockAt:'Terbuka di level {n}',worldOpen:'{w} sekarang terbuka!',
 W:['Taman Hijau','Pantai Cerah','Hutan Rindang','Oasis Gurun','Puncak Salju','Malam Lentera'],
 lockedW:'Selesaikan {w} dulu',lockedLv:'Selesaikan level sebelumnya untuk membuka level ini',levelsR:'Level {a}–{b}',
 sayBism:'Bismillah',sayAlh:'Alhamdulillah!',aimHint:'Tarik ke belakang, lalu lepaskan!',splitHint:'Ketuk untuk membelah panah!',rot:'Miringkan HP agar lebih besar',pickHint:'Pilih pelontar!',
 pray:'Waktunya sholat',lockT:'Sudah masuk waktu {p}',lockB:'Berhenti sebentar, ayo sholat {p} dulu, di masjid atau di rumah. Permainanmu akan menunggu.',lockWait:'Tombol terbuka dalam {m}',lockReady:'Sudah sholat? Ketuk tombolnya.',prayed:'Aku sudah sholat {p}',taq:'Taqabbalallahu minna wa minkum',sayPray:'Waktunya sholat {p}.',
 setT:'Untuk orang tua',city:'Kota',customCity:'Lokasi kustom',wait:'Jeda sholat minimal',today:'Jadwal sholat hari ini',preview:'Coba jeda sholat',method:'Metode Kemenag RI · Subuh 20° · Isya 18° · ihtiyat +2 menit',nextP:'Berikutnya',
 P:{fajr:'Subuh',sunrise:'Terbit',dhuhr:'Dzuhur',asr:'Ashar',maghrib:'Maghrib',isha:'Isya'},gateT:'Untuk orang tua',gateS:'Tahan tombol selama 3 detik'}};
let lang=store.get('lang',(()=>{try{const l=localStorage.getItem('moLang');if(l==='en'||l==='id')return l}catch(e){}return /^id\b|^id-/i.test(navigator.language||'')?'id':'en'})());
let soundOn=store.get('sound',true),musicPref=store.get('music',true);
let age=store.get('age','little');
const t=k=>TXT[lang][k]??TXT.en[k];
const tf=(k,v)=>t(k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'');
const pickT=k=>{const a=t(k);return a[Math.floor(Math.random()*a.length)]};

/* "Did you know?" facts. The archery and kindness ones come first and every third level shows one of them. */
const FACTS_A=[
 ['The Prophet ﷺ saw some people practising archery and said: "Shoot, O children of Isma\'il, for your father was an archer." (Sahih al-Bukhari 2899)','Nabi ﷺ melihat orang-orang berlatih memanah, lalu bersabda: "Memanahlah, wahai keturunan Isma\'il, karena bapak kalian adalah seorang pemanah." (HR. Bukhari 2899)'],
 ['When the Prophet ﷺ watched two teams in an archery contest, he said: "Shoot, and I am with all of you." (Sahih al-Bukhari 2899)','Saat Nabi ﷺ melihat dua kelompok berlomba memanah, beliau bersabda: "Memanahlah, aku bersama kalian semua." (HR. Bukhari 2899)'],
 ['A man gave water to a very thirsty dog, and Allah forgave him. The Prophet ﷺ said there is a reward for kindness to every living being. (Sahih al-Bukhari 2363)','Seorang laki-laki memberi minum anjing yang sangat kehausan, lalu Allah mengampuninya. Nabi ﷺ bersabda, ada pahala dalam berbuat baik kepada setiap makhluk hidup. (HR. Bukhari 2363)'],
 ['Moving something harmful out of the road is a sadaqah, a good deed. (Sahih al-Bukhari 2989)','Menyingkirkan sesuatu yang berbahaya dari jalan adalah sedekah. (HR. Bukhari 2989)'],
 ['Purity and cleanliness are half of faith. (Sahih Muslim 223)','Bersuci (kebersihan) adalah separuh dari iman. (HR. Muslim 223)'],
 ['Allah tells us to eat and drink, but not to waste. (Surah Al-A\'raf 7:31)','Allah memerintahkan kita makan dan minum, tetapi jangan berlebihan. (QS Al-A\'raf: 31)'],
 ['Prophet Sulaiman heard an ant warn the other ants, and he smiled. (Surah An-Naml 27:18-19)','Nabi Sulaiman mendengar seekor semut memperingatkan semut lainnya, lalu beliau tersenyum. (QS An-Naml: 18-19)'],
 ['There is a surah named after the bee: An-Nahl. Allah taught the bee how to make honey. (Surah An-Nahl 16:68-69)','Ada surah bernama lebah: An-Nahl. Allah mengajari lebah membuat madu. (QS An-Nahl: 68-69)']];
const FACTS=[
 ['Muslims pray five times a day: Fajr, Dhuhr, Asr, Maghrib and Isha.','Umat Islam sholat lima kali sehari: Subuh, Dzuhur, Ashar, Maghrib, dan Isya.'],
 ['When we pray, we face the Kaaba in Makkah. This direction is called the qibla.','Saat sholat, kita menghadap Ka\'bah di Makkah. Arah ini disebut kiblat.'],
 ['The Qur\'an was first sent down in the month of Ramadan. (Surah Al-Baqarah 2:185)','Al-Qur\'an pertama kali diturunkan pada bulan Ramadan. (QS Al-Baqarah: 185)'],
 ['The first word of the Qur\'an sent to Prophet Muhammad ﷺ was "Iqra", which means "Read!" (Surah Al-\'Alaq 96:1)','Kata pertama Al-Qur\'an yang diturunkan kepada Nabi Muhammad ﷺ adalah "Iqra", artinya "Bacalah!" (QS Al-\'Alaq: 1)'],
 ['The Qur\'an has 114 surahs.','Al-Qur\'an memiliki 114 surah.'],
 ['Prophet Muhammad ﷺ taught us to say Bismillah and eat with our right hand.','Nabi Muhammad ﷺ mengajarkan kita membaca Bismillah dan makan dengan tangan kanan.'],
 ['Smiling at your brother or sister is a sadaqah (a good deed). (Hadith, Tirmidhi)','Tersenyum kepada saudaramu adalah sedekah. (Hadits riwayat Tirmidzi)'],
 ['Islam has five pillars: the shahadah, salah, zakat, fasting in Ramadan and hajj.','Rukun Islam ada lima: syahadat, sholat, zakat, puasa Ramadan, dan haji.'],
 ['Prophet Nuh built a big ark, just as Allah told him to. (Surah Hud 11:37)','Nabi Nuh membuat bahtera besar sesuai perintah Allah. (QS Hud: 37)'],
 ['Before salah we make wudu: we wash our face and hands, wipe our head and wash our feet. (Surah Al-Ma\'idah 5:6)','Sebelum sholat kita berwudu: membasuh wajah dan tangan, mengusap kepala, dan membasuh kaki. (QS Al-Ma\'idah: 6)'],
 ['Prophet Ibrahim and his son Ismail built the Kaaba. (Surah Al-Baqarah 2:127)','Nabi Ibrahim dan putranya Ismail membangun Ka\'bah. (QS Al-Baqarah: 127)'],
 ['"Alhamdulillah" means "All praise is for Allah". We say it to thank Allah.','"Alhamdulillah" artinya "Segala puji bagi Allah". Kita mengucapkannya untuk bersyukur kepada Allah.'],
 ['"SubhanAllah" means "Glory be to Allah" and "Allahu Akbar" means "Allah is the Greatest".','"SubhanAllah" artinya "Maha Suci Allah" dan "Allahu Akbar" artinya "Allah Maha Besar".'],
 ['Allah made the camel strong enough to walk for days in the desert. Allah asks us to think about how it was made. (Surah Al-Ghashiyah 88:17)','Allah menjadikan unta kuat berjalan berhari-hari di gurun. Allah mengajak kita memperhatikan bagaimana ia diciptakan. (QS Al-Ghasyiyah: 17)'],
 ['Allah tells us to be kind and gentle to our parents. (Surah Al-Isra 17:23)','Allah memerintahkan kita berbuat baik dan lembut kepada orang tua. (QS Al-Isra: 23)'],
 ['The Prophet ﷺ liked to break his fast with dates.','Nabi ﷺ suka berbuka puasa dengan kurma.'],
 ['"Assalamu\'alaikum" means "Peace be upon you". We answer "Wa\'alaikumussalam".','"Assalamu\'alaikum" artinya "Semoga keselamatan untukmu". Kita menjawab "Wa\'alaikumussalam".'],
 ['The Islamic months follow the moon. A new month begins when the new crescent moon (hilal) is seen.','Bulan Islam mengikuti bulan di langit. Bulan baru dimulai saat hilal (bulan sabit) terlihat.'],
 ['Friday is called Jumu\'ah. It is a special day for Muslims, with the Jumu\'ah prayer at the masjid. (Surah Al-Jumu\'ah 62:9)','Hari Jumat adalah hari istimewa bagi umat Islam, dengan sholat Jumat di masjid. (QS Al-Jumu\'ah: 9)'],
 ['Surah Al-Ikhlas teaches us that Allah is One. (Surah 112)','Surah Al-Ikhlas mengajarkan bahwa Allah itu Esa. (QS Al-Ikhlas)']];
function fact(n){const L=lang==='id'?1:0;if(n%3===1)return FACTS_A[Math.floor(n/3)%FACTS_A.length][L];return FACTS[(n*7)%FACTS.length][L]}

/* =================================================================
   Sound (synthesised, no files)
   ================================================================= */
let AC=null,noiseBuf=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();const n=AC.sampleRate;noiseBuf=AC.createBuffer(1,n,n);const d=noiseBuf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,dur,type='sine',vol=.15,when=0,slide=0){const a=ac();if(!a||!soundOn)return;const t0=a.currentTime+when,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t0+dur);g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+.01);g.gain.exponentialRampToValueAtTime(.001,t0+dur);o.connect(g).connect(a.destination);o.start(t0);o.stop(t0+dur+.05)}
function noise(freq,dur,vol,when=0,type='bandpass',q=1.2){const a=ac();if(!a||!soundOn)return;const t0=a.currentTime+when,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();
  s.buffer=noiseBuf;f.type=type;f.frequency.value=freq;f.Q.value=q;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+.005);g.gain.exponentialRampToValueAtTime(.001,t0+dur);s.connect(f).connect(g).connect(a.destination);s.start(t0,Math.random()*.5);s.stop(t0+dur+.05)}
let lastHit=0;
const sfx={
 tap(){tone(660,.08,'triangle',.12)},
 bad(){tone(240,.16,'sine',.12,0,170)},
 pull(){tone(220,.12,'triangle',.05,0,260)},
 shoot(L){if(L==='bow'){tone(190,.22,'triangle',.16,0,95);noise(3000,.12,.08,0,'highpass',.7)}
   else if(L==='sling'){noise(2200,.14,.12,0,'bandpass',1.5);tone(420,.12,'sine',.1,0,900)}
   else if(L==='cannon'){tone(110,.35,'sine',.25,0,45);noise(420,.4,.22,0,'lowpass',.7);tone(880,.1,'triangle',.05,.05,1320)}
   else{tone(160,.25,'triangle',.12,0,300);noise(900,.3,.1,0,'bandpass',.8)}},
 hit(m,s){const now=performance.now();if(now-lastHit<70)return;lastHit=now;const v=Math.min(.2,.04+s*.012);
   if(m==='ice'){tone(1700+Math.random()*500,.08,'sine',v*.8);noise(6500,.05,v*.6,0,'highpass',1)}
   else if(m==='stone'){tone(150,.1,'triangle',v);noise(500,.08,v*.8,0,'lowpass',1)}
   else if(m==='ground'){noise(300,.12,v*.7,0,'lowpass',.8)}
   else{tone(260+Math.random()*60,.08,'triangle',v);noise(900,.06,v*.7)}},
 brk(m){if(m==='ice'){[0,1,2,3].forEach(i=>tone(1800+Math.random()*1400,.12,'sine',.07,i*.03));noise(7000,.2,.12,0,'highpass',.8)}
   else if(m==='stone'){noise(380,.35,.22,0,'lowpass',.8);tone(95,.25,'triangle',.15,0,60)}
   else{noise(1200,.25,.18,0,'bandpass',.9);tone(180,.14,'triangle',.1,0,120)}},
 gift(){[784,988,1175,1568].forEach((f,i)=>tone(f,.25,'triangle',.11,i*.07))},
 clean(){[1047,1319,1568,2093].forEach((f,i)=>tone(f,.18,'sine',.09,i*.05));noise(8000,.3,.05,0,'highpass',.6)},
 free(){tone(2200,.09,'sine',.1,0,3000);tone(2400,.09,'sine',.1,.12,3300);tone(2000,.12,'sine',.08,.26,2900)},
 splash(){noise(900,.45,.22,0,'lowpass',.7);tone(300,.2,'sine',.08,0,120)},
 split(){tone(900,.08,'triangle',.1,0,1500);tone(1200,.08,'triangle',.08,.05,1800)},
 win(){[523,659,784,1047].forEach((f,i)=>tone(f,.35,'triangle',.14,i*.11));tone(1568,.6,'sine',.08,.45)},
 over(){[523,440,392,330].forEach((f,i)=>tone(f,.3,'triangle',.11,i*.13))},
 bism(){[392,523,659].forEach((f,i)=>tone(f,.4,'sine',.12,i*.09))},
 unlock(){[659,784,988,1319,1568].forEach((f,i)=>tone(f,.3,'triangle',.11,i*.09))}};

/* background music: an original tune made for Mo Archery and played by the game itself (no audio files).
   104 bpm, C - Am - F - G, kalimba melody, plucked bass, soft pad, light shaker. */
const MUS={bpm:104,on:false,t0:0,step:0,timer:0,gain:null};
const MN=n=>440*Math.pow(2,(n-69)/12);
const MEL=[
 72,0,76,0,79,0,76,0, 74,0,72,0,69,0,0,0,
 67,0,69,72,0,0,74,0, 76,0,74,0,72,0,0,0,
 72,0,76,0,79,0,81,0, 79,0,76,0,74,0,72,0,
 69,0,72,0,74,0,76,74, 72,0,0,0,67,0,0,0];
const MCH=[[48,[60,64,67]],[45,[57,60,64]],[41,[57,60,65]],[43,[55,59,62]]];
function mOsc(f,t0,d,v,type){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+.008);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(MUS.gain);o.start(t0);o.stop(t0+d+.05)}
function mKal(n,t0){const f=MN(n);mOsc(f,t0,.6,.14,'sine');mOsc(f*3,t0,.06,.03,'sine');mOsc(f*2,t0,.2,.025,'triangle')}
function mPad(ns,t0,d){ns.forEach(n=>{const o=AC.createOscillator(),g=AC.createGain(),lp=AC.createBiquadFilter();o.type='triangle';o.frequency.value=MN(n);lp.type='lowpass';lp.frequency.value=1100;
  g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.015,t0+.25);g.gain.setValueAtTime(.015,t0+d-.3);g.gain.linearRampToValueAtTime(.0001,t0+d);o.connect(lp);lp.connect(g);g.connect(MUS.gain);o.start(t0);o.stop(t0+d+.05)})}
function mHit(t0,freq,v,d){const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;f.type='highpass';f.frequency.value=freq;g.gain.setValueAtTime(v,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+d);s.connect(f);f.connect(g);g.connect(MUS.gain);s.start(t0,Math.random()*.5);s.stop(t0+d+.02)}
function mSchedule(){if(!AC||AC.state!=='running'||!MUS.on)return;const e=60/MUS.bpm/2;if(MUS.t0<AC.currentTime)MUS.t0=AC.currentTime+.05;
  while(MUS.t0<AC.currentTime+.35){const s=MUS.step%64,tt=MUS.t0,bar=Math.floor(s/8),beat=s%8;
    if(MEL[s])mKal(MEL[s],tt);
    const [bass,ch]=MCH[Math.floor(bar/2)%4];
    if(beat===0||beat===3||beat===6)mOsc(MN(beat===3?bass+7:bass),tt,.3,.11,'triangle');
    if(beat===0&&bar%2===0)mPad(ch,tt,e*16);
    mHit(tt,7000,beat%2?.03:.016,.04);
    MUS.t0+=e;MUS.step++}}
const musVol=()=>cur==='game'?.16:.28;
function musicOn(){const a=ac();if(!a||!musicPref||MUS.on||document.hidden||window.praying)return;MUS.on=true;
  MUS.gain=a.createGain();MUS.gain.gain.setValueAtTime(.0001,a.currentTime);MUS.gain.gain.exponentialRampToValueAtTime(musVol(),a.currentTime+1.2);MUS.gain.connect(a.destination);
  MUS.t0=a.currentTime+.1;MUS.step=0;mSchedule();MUS.timer=setInterval(mSchedule,90)}
function musicOff(){if(!MUS.on)return;MUS.on=false;clearInterval(MUS.timer);const g=MUS.gain;
  try{g.gain.cancelScheduledValues(AC.currentTime);g.gain.setValueAtTime(g.gain.value,AC.currentTime);g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.5)}catch(e){}
  setTimeout(()=>{try{g.disconnect()}catch(e){}},700)}
function musicLevel(){if(MUS.on&&MUS.gain){const g=MUS.gain.gain;g.cancelScheduledValues(AC.currentTime);g.setValueAtTime(Math.max(.0001,g.value),AC.currentTime);g.exponentialRampToValueAtTime(musVol(),AC.currentTime+.6)}}
function renderMus(){document.querySelectorAll('.rb.mus').forEach(b=>{b.classList.toggle('off',!musicPref);b.setAttribute('aria-pressed',musicPref)})}
document.querySelectorAll('.rb.mus').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();musicPref=!musicPref;store.set('music',musicPref);renderMus();if(musicPref)musicOn();else musicOff()}));
['pointerdown','touchend','keydown'].forEach(ev=>document.addEventListener(ev,()=>{const a=ac();if(!a)return;const p=a.resume&&a.resume();if(p&&p.then)p.then(musicOn).catch(()=>{});musicOn()},true));
document.addEventListener('visibilitychange',()=>{if(document.hidden)musicOff();else if(musicPref)setTimeout(musicOn,300)});
setInterval(()=>{if(!AC||!musicPref||document.hidden)return;if(AC.state!=='running'){try{AC.resume()}catch(e){}}if(!MUS.on&&AC.state==='running')musicOn()},1500);
const TTS='speechSynthesis' in window;let voices=[];
function loadVoices(){try{voices=speechSynthesis.getVoices()||[]}catch(e){}}
if(TTS){loadVoices();try{speechSynthesis.addEventListener('voiceschanged',loadVoices)}catch(e){}}
function say(text){if(!TTS||!soundOn)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);const L=lang==='id'?'id':'en';u.lang=L==='id'?'id-ID':'en-US';const v=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(L));if(v)u.voice=v;u.rate=.95;u.pitch=1.2;speechSynthesis.speak(u)}catch(e){}}

/* =================================================================
   Worlds, launchers, materials
   ================================================================= */
const OUT='#4a2c14';
const hexRgb=h=>{const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]};
const mix=(h,k)=>{const c=hexRgb(h);return 'rgb('+c.map(v=>Math.round(k>=0?v+(255-v)*k:v*(1+k))).join(',')+')'};
function rr(x,X,Y,W,H,r){r=Math.max(0,Math.min(r,W/2,H/2));x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+W,Y,X+W,Y+H,r);x.arcTo(X+W,Y+H,X,Y+H,r);x.arcTo(X,Y+H,X,Y,r);x.arcTo(X,Y,X+W,Y,r);x.closePath()}
const WORLDS=[
 {id:'garden',goals:['gift'],mats:['wood'],sky:['#6cc8ff','#c9f0ff'],hill:['#8fdc6a','#5fbf4a'],gr:['#7ad35a','#a4703f'],cap:'#7ad35a',animals:['bird']},
 {id:'beach',goals:['trash'],mats:['wood','wood','ice'],sky:['#4fc0ff','#d6f6ff'],hill:['#2fb8e0','#1590c8'],gr:['#ffe2a0','#e8b866'],cap:'#ffe2a0',animals:['bird']},
 {id:'forest',goals:['cage','cage','gift'],mats:['wood','wood','stone'],sky:['#7fd8c0','#e0fff0'],hill:['#3e9e5a','#2a7a44'],gr:['#5cbf4a','#8a5a30'],cap:'#5cbf4a',animals:['bird','bunny']},
 {id:'desert',goals:['gift','cage','trash'],mats:['wood','stone'],sky:['#ffb86a','#fff0c0'],hill:['#f0c070','#d89a48'],gr:['#f6cf84','#d89a48'],cap:'#f6cf84',animals:['kitten','bird']},
 {id:'snow',goals:['cage','trash','cage'],mats:['ice','ice','wood'],sky:['#9ccfff','#f0f8ff'],hill:['#ffffff','#cfe4f5'],gr:['#ffffff','#b9d6ee'],cap:'#ffffff',animals:['penguin','bunny']},
 {id:'night',goals:['gift','cage','trash'],mats:['wood','ice','stone'],sky:['#1a1650','#4b3a9a'],hill:['#2e2a6e','#201c52'],gr:['#2f7a52','#5a3a2a'],cap:'#3d9a66',animals:['bird','kitten','bunny']}];
const LEVELS=60,WN=10;
const worldOf=n=>Math.min(5,Math.floor((n-1)/WN));
const LX=2.75;   // where the launchers stand
const LAUNCH={
 bow:{v:17.5,proj:'arrow',unlock:1,oy:1.5,col:'#c97a2c'},
 sling:{v:16,proj:'ball',unlock:4,oy:1.55,col:'#ff5f5f'},
 cannon:{v:16.5,proj:'iron',unlock:8,oy:1.05,col:'#2f7bff'},
 cata:{v:15.5,proj:'melon',unlock:13,oy:1.5,col:'#3fcf5a'}};
const LORDER=['bow','sling','cannon','cata'];
const MAT={wood:{d:1,f:.7,r:.05,hp:6},ice:{d:.9,f:.35,r:.05,hp:2.6},stone:{d:2.4,f:.8,r:.02,hp:13}};
const GOALM={d:.7,f:.6,r:.05};
const GOALHP={gift:2.4,trash:2.4,cage:3.4};
const PROJ={arrow:{d:6,f:.4,r:.05},ball:{d:3,f:.5,r:.6,rad:.33},iron:{d:10,f:.5,r:.1,rad:.38},melon:{d:3,f:.6,r:.1,rad:.5}};
/* damage = impulse x this, by what was hit */
const MULT={arrow:{wood:1.1,ice:2,stone:.3,goal:1.6},ball:{wood:.9,ice:1.4,stone:.6,goal:1.3},iron:{wood:.5,ice:.7,stone:.5,goal:.7},melon:{wood:.6,ice:1,stone:.5,goal:.9}};

/* =================================================================
   Levels. All sizes in metres, y up, ground at y=0.
   ================================================================= */
const PW=.42,PH=1.7,PT=.42,GS=1.1,CR=.9;
/* shots needed by the test bot for each level (Big Kid); Big Kid gets par+2 shots, Little gets par+4 */
/* PAR comes from the test bot (tests/bot.js): re-run the bot whenever the level maker changes */
const PAR=[1,1,1,1,2,2,2,1,1,1,1,1,2,1,2,4,3,3,3,4,1,1,2,2,2,2,3,3,2,3,2,1,1,2,1,2,1,3,3,4,1,2,3,3,3,1,2,3,3,4,1,1,2,3,3,2,3,2,3,3];
/* levels are made from a seed; a level whose towers would fall over by themselves is made again with the next seed */
const LVC={};
function genLevel(n){if(LVC[n])return LVC[n];let lv;for(let k=0;k<8;k++){lv=genRaw(n,k);if(stable(lv))break}return LVC[n]=lv}
function stable(lv){const S=makeSim(lv);for(let i=0;i<300;i++)simStep(S);return S.goalsLeft===lv.goals&&!S.ev.some(e=>e.e==='break')}
function genRaw(n,k){
  const w=worldOf(n),i=(n-1)%WN,R=seeded(n*9973+7+k*7919),WD=WORLDS[w];
  const pick=a=>a[Math.floor(R()*a.length)];
  const items=[];let gi=Math.floor(R()*WD.goals.length),ai=0,vi=0,top=0,nS=0;
  const goal=(x,y)=>{const g=WD.goals[gi++%WD.goals.length];let v=0;
    if(g==='cage')v=WD.animals[ai++%WD.animals.length];else if(g==='gift')v=w===5?'lantern':['pink','blue','purple','green'][vi++%4];else v=['bag','can'][vi++%2];
    items.push({k:'goal',g,v,x,y:y+GS/2,w:GS,h:GS});top=Math.max(top,y+GS)};
  const box=(mat,x,y,w2,h)=>{items.push({k:'box',mat,x,y,w:w2,h});top=Math.max(top,y+h/2)};
  const tri=(mat,x,y,w2,h)=>{items.push({k:'tri',mat,x,y,w:w2,h});top=Math.max(top,y+h)};
  const rock=(x,w2,h)=>items.push({k:'rock',x,y:h/2,w:w2,h});
  // one storey: two pillars and a plank (three pillars when wide); goals stand inside
  function frame(x,y,L,mat,inside){
    box(mat,x-L/2+PW/2,y+PH/2,PW,PH);box(mat,x+L/2-PW/2,y+PH/2,PW,PH);
    if(L>3.5)box(mat,x,y+PH/2,PW,PH);
    if(inside){if(L>3.5){goal(x-L/4-.02,y);goal(x+L/4+.02,y)}else goal(x,y)}
    box(mat,x,y+PH+PT/2,L,PT);return y+PH+PT}
  function tower(x,y,floors,L,mats,inside,topK){
    let yy=y;for(let f=0;f<floors;f++)yy=frame(x,yy,L,mats[f%mats.length],inside[f]);
    if(topK==='goal')goal(x,yy);else if(topK==='roof')tri(mats[0],x,yy,L,1);else if(topK==='crate')box('wood',x,yy+CR/2,CR,CR);
    return yy}
  function pile(x,y,rows,mat){let yy=y;for(let r=0;r<rows;r++){const k=rows-r+1;for(let c=0;c<k;c++)box(mat,x+(c-(k-1)/2)*(CR+.04),yy+CR/2,CR,CR);yy+=CR}goal(x,yy);return yy}
  let x;
  if(n===1){x=11;tower(x,0,1,2.3,['wood'],[1],null);nS=1}
  else if(n===2){x=12;tower(x,0,1,2.3,['wood'],[0],'goal');nS=1}
  else if(n===3){x=12;pile(x,0,2,'wood');nS=1}
  else{
    nS=i<2?1:i<5?2:(w>=1&&i>=7?3:2);if(n<8&&nS>2)nS=2;
    const maxF=Math.min(3,1+Math.floor((n-1)/14));
    x=9.6;
    for(let s=0;s<nS;s++){
      const floors=1+Math.floor(R()*maxF),wide=n>10&&R()<.3,L=wide?4.3:2.3;
      const ped=(w>=1&&R()<.35)?Math.round((.8+R()*1.2)*10)/10:0;
      const kind=n>5&&R()<.25?'pile':'tower';
      const span=kind==='pile'?CR*3+.2:L;
      if(s>0)x+=span/2+1.5;
      let base=0;if(ped){rock(x,span+.8,ped);base=ped}
      if(kind==='pile')pile(x,base,R()<.5?1:2,pick(WD.mats));
      else{const mats=[...Array(floors)].map(()=>pick(WD.mats));
        const inside=[...Array(floors)].map((_,f)=>f===0?R()<.7:R()<.5);
        let topK=pick(['goal','goal','roof','crate',null]);
        if(!inside.some(Boolean)&&topK!=='goal')inside[floors-1]=1;
        tower(x,base,floors,L,mats,inside,topK)}
      x+=span/2;
      if(s<nS-1)x+=.4}
  }
  // limit the number of goals for little hands
  let goals=items.filter(it=>it.k==='goal');
  while(goals.length>5){const g=goals.pop();items.splice(items.indexOf(g),1)}
  const right=Math.max(...items.map(it=>it.x+it.w/2));
  const par=PAR[n-1]||Math.max(1,Math.min(4,nS+(goals.length>nS+1?1:0)));
  return{n,w,items,width:Math.max(17,right+2.4),top:Math.max(top,4),goals:goals.length,par}}

/* =================================================================
   The physics world (also used by the test bot without drawing)
   ================================================================= */
const V=(x,y)=>planck.Vec2(x,y);
function makeSim(lv){
  const W=new planck.World({gravity:V(0,-10)});
  const S={W,lv,list:[],proj:[],ev:[],dmgOn:false,goalsLeft:0,turn:null,hitQ:new Set(),steps:0,maxImp:0,maxMat:''};
  W.createBody().createFixture(planck.Edge(V(-80,0),V(240,0)),{friction:.9});
  for(const it of lv.items){
    const u={...it,dmg:0};let b;
    if(it.k==='rock'){b=W.createBody({type:'static',position:V(it.x,it.y)});b.createFixture(planck.Box(it.w/2,it.h/2),{friction:.9})}
    else{const m=it.k==='goal'?GOALM:MAT[it.mat];b=W.createDynamicBody({position:V(it.x,it.y)});
      const sh=it.k==='tri'?planck.Polygon([V(-it.w/2,0),V(it.w/2,0),V(0,it.h)]):planck.Box(it.w/2,it.h/2);
      b.createFixture(sh,{density:m.d,friction:m.f,restitution:m.r});u.hp=it.k==='goal'?GOALHP[it.g]:m.hp;if(it.k==='goal')S.goalsLeft++}
    u.b=b;b.setUserData(u);S.list.push(u)}
  W.on('post-solve',(c,imp)=>onImpact(S,c,imp));
  W.on('begin-contact',c=>{const a=c.getFixtureA().getBody().getUserData(),b=c.getFixtureB().getBody().getUserData();if(a&&a.k==='proj')a.touched=1;if(b&&b.k==='proj')b.touched=1});
  for(let k=0;k<90;k++)W.step(1/60,8,3);
  for(const u of S.list)if(u.b.isDynamic()){u.b.setLinearVelocity(V(0,0));u.b.setAngularVelocity(0)}
  S.dmgOn=true;return S}
function onImpact(S,c,imp){
  if(!S.dmgOn)return;const n=c.getManifold().pointCount;let s=0;for(let i=0;i<n;i++)s+=imp.normalImpulses[i]||0;
  if(s<.3)return;
  const A=c.getFixtureA().getBody().getUserData(),B=c.getFixtureB().getBody().getUserData();
  const pa=A&&A.k==='proj'?A:null,pb=B&&B.k==='proj'?B:null;
  hurt(S,A,s,pb);hurt(S,B,s,pa);
  for(const p of [pa,pb])if(p&&p.pt==='melon'&&s>1.5)p.burstQ=1;
  if(s>S.maxImp){S.maxImp=s;const u=(A&&A.hp)?A:(B&&B.hp)?B:null;S.maxMat=u?(u.k==='goal'?'wood':u.mat):'ground'}}
function hurt(S,u,s,p){
  if(!u||!u.hp||u.dead)return;const key=u.k==='goal'?'goal':u.mat;
  const d=p?s*MULT[p.pt][key]:Math.max(0,s-.9);
  if(d<=0)return;u.dmg+=d;if(u.dmg>=u.hp)S.hitQ.add(u)}
function removeBody(S,u,lost){
  if(u.dead)return;u.dead=1;const q=u.b.getPosition();
  S.ev.push({e:u.k==='goal'?'goal':u.k==='proj'?'pgone':'break',u,x:q.x,y:q.y,a:u.b.getAngle(),lost:!!lost});
  S.W.destroyBody(u.b);if(u.k==='goal')S.goalsLeft--}
function splash(S,p){
  const q=p.b.getPosition(),R=2.6;
  for(const u of S.list){if(u.dead||!u.b.isDynamic())continue;const o=u.b.getPosition(),dx=o.x-q.x,dy=o.y-q.y,d=Math.hypot(dx,dy);if(d>R)continue;
    const k=1-d/R,m=u.b.getMass();u.b.applyLinearImpulse(V(dx/(d||1)*k*6*Math.min(m,3),(dy/(d||1)*k*6+k*2)*Math.min(m,3)),o,true);
    u.dmg+=3.2*k*MULT.melon[u.k==='goal'?'goal':u.mat];if(u.dmg>=u.hp)S.hitQ.add(u)}
  S.ev.push({e:'splash',x:q.x,y:q.y});p.splashed=1;removeBody(S,p)}
function simStep(S){
  S.maxImp=0;S.steps++;
  for(const p of S.proj)if(p.pt==='arrow'&&!p.touched&&!p.dead){const v=p.b.getLinearVelocity();p.b.setTransform(p.b.getPosition(),Math.atan2(v.y,v.x));p.b.setAngularVelocity(0)}
  S.W.step(1/60,8,3);
  for(const p of S.proj)if(p.burstQ&&!p.dead)splash(S,p);
  for(const u of S.hitQ)removeBody(S,u);S.hitQ.clear();
  const far=S.lv.width+30;
  for(const u of S.list)if(!u.dead&&u.b.isDynamic()){const q=u.b.getPosition();if(q.y<-4||q.x>far||q.x<-20)removeBody(S,u,true)}
  for(const p of S.proj)if(!p.dead){const q=p.b.getPosition();if(q.y<-4||q.x>far||q.x<-20)removeBody(S,p,true)}
  if(S.list.some(u=>u.dead))S.list=S.list.filter(u=>!u.dead);
  if(S.proj.some(u=>u.dead))S.proj=S.proj.filter(u=>!u.dead);
  if(S.maxImp>1.2)S.ev.push({e:'hit',s:S.maxImp,m:S.maxMat});
  if(S.turn)S.turn.t++}
function spawnProj(S,pt,x,y,vx,vy){
  const P=PROJ[pt],b=S.W.createDynamicBody({position:V(x,y),angle:Math.atan2(vy,vx),bullet:true});
  b.createFixture(pt==='arrow'?planck.Box(.5,.07):planck.Circle(P.rad),{density:P.d,friction:P.f,restitution:P.r});
  b.setLinearVelocity(V(vx,vy));const u={k:'proj',pt,b,born:S.steps};b.setUserData(u);S.proj.push(u);return u}
const clampAng=a=>Math.max(-.35,Math.min(1.45,a));
function launchVel(L,ang,pow){const o=LAUNCH[L],sp=o.v*Math.max(.15,Math.min(1,pow));return[Math.cos(ang)*sp,Math.sin(ang)*sp]}
function launchPos(L,ang){return[LX+Math.cos(ang)*.7,LAUNCH[L].oy+Math.sin(ang)*.7]}
function fire(S,L,ang,pow){ang=clampAng(ang);const [vx,vy]=launchVel(L,ang,pow),[x,y]=launchPos(L,ang);
  S.turn={t:0,quiet:0};return spawnProj(S,LAUNCH[L].proj,x,y,vx,vy)}
function splitArrow(S,p){if(!p||p.dead||p.touched||p.split||p.pt!=='arrow')return false;p.split=1;
  const v=p.b.getLinearVelocity(),q=p.b.getPosition(),sp=Math.hypot(v.x,v.y),a=Math.atan2(v.y,v.x);
  for(const da of [-.17,.17]){const u=spawnProj(S,'arrow',q.x,q.y+da*.6,Math.cos(a+da)*sp,Math.sin(a+da)*sp);u.split=1}return true}
function turnDone(S){const T=S.turn;if(!T)return false;let moving=false;
  for(const u of S.list)if(u.b.isDynamic()&&u.b.isAwake()){const v=u.b.getLinearVelocity();if(v.x*v.x+v.y*v.y>.04||Math.abs(u.b.getAngularVelocity())>.3){moving=true;break}}
  if(!moving)for(const p of S.proj){const v=p.b.getLinearVelocity();if(v.x*v.x+v.y*v.y>.12){moving=true;break}}
  T.quiet=moving?0:T.quiet+1;return(T.t>50&&T.quiet>25)||T.t>600}
function endTurn(S){for(const p of [...S.proj])removeBody(S,p);S.proj=[];S.turn=null}
/* the test bot plays a level from scratch: [{l,a,p}, ...] */
function simulate(n,shots){const S=makeSim(genLevel(n));let used=0;
  for(const sh of shots){if(S.goalsLeft<=0)break;fire(S,sh.l,sh.a,sh.p);used++;do{simStep(S)}while(!turnDone(S));endTurn(S);S.ev.length=0}
  return{left:S.goalsLeft,used,goals:S.lv.goals}}

/* =================================================================
   Drawing helpers (pixel space). s = pixels per metre.
   ================================================================= */
const IMG={};[['mo','../home/mo.webp'],['jump','art/mo-jump.webp'],['star','ui/star.webp']].forEach(([k,src])=>{const i=new Image();i.onload=()=>{i.ok=1;if(typeof renderHomeArt==='function')renderHomeArt()};i.src=src;IMG[k]=i});
function lw(s){return Math.max(1.4,s*.055)}
function drawBlock(x,u,s){
  const W=u.w*s,H=u.h*s,m=u.mat,l=lw(s);x.lineJoin='round';
  if(u.k==='tri'){x.beginPath();x.moveTo(-W/2,0);x.lineTo(W/2,0);x.lineTo(0,-H);x.closePath();
    const g=x.createLinearGradient(0,-H,0,0);matStops(g,m);x.fillStyle=g;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
    if(m==='wood'){x.beginPath();x.moveTo(-W*.25,-H*.25);x.lineTo(W*.25,-H*.25);x.strokeStyle='rgba(120,60,10,.35)';x.lineWidth=l*.7;x.stroke()}
    cracks(x,u,-W/4,-H*.6,W/2,H*.5,s);return}
  rr(x,-W/2,-H/2,W,H,Math.min(W,H)*.22);
  const g=W>H?x.createLinearGradient(0,-H/2,0,H/2):x.createLinearGradient(-W/2,0,W/2,0);matStops(g,m);x.fillStyle=g;x.fill();
  x.save();x.clip();
  if(m==='wood'){x.strokeStyle='rgba(120,60,10,.32)';x.lineWidth=l*.6;const lng=Math.max(W,H),sh=Math.min(W,H);
    for(const k of [-.18,.2]){x.beginPath();if(W>H){x.moveTo(-W/2+sh*.4,k*H);x.lineTo(W/2-sh*.6,k*H)}else{x.moveTo(k*W,-H/2+sh*.4);x.lineTo(k*W,H/2-sh*.6)}x.stroke()}
    if(lng>sh*1.6){x.beginPath();x.ellipse(W>H?W*.22:0,W>H?0:H*.22,sh*.12,sh*.07,W>H?0:Math.PI/2,0,7);x.stroke()}}
  else if(m==='ice'){x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.moveTo(-W/2,-H/2+Math.min(W,H)*.25);x.lineTo(-W/2+Math.min(W,H)*.25,-H/2);x.lineTo(-W/2+Math.min(W,H)*.45,-H/2);x.lineTo(-W/2,-H/2+Math.min(W,H)*.45);x.fill()}
  else if(m==='stone'){x.fillStyle='rgba(70,55,90,.22)';[[-.25,-.15,.12],[.22,.2,.1],[.05,-.3,.07],[-.1,.28,.08]].forEach(([a,b,r])=>{x.beginPath();x.arc(a*W,b*H,r*Math.min(W,H)*1.6,0,7);x.fill()})}
  x.fillStyle='rgba(255,255,255,.28)';x.fillRect(-W/2,-H/2,W,Math.min(H*.22,s*.09));
  x.restore();
  rr(x,-W/2,-H/2,W,H,Math.min(W,H)*.22);x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  cracks(x,u,-W/2,-H/2,W,H,s)}
function matStops(g,m){if(m==='ice'){g.addColorStop(0,'rgba(205,245,255,.92)');g.addColorStop(1,'rgba(120,200,245,.92)')}
  else if(m==='stone'){g.addColorStop(0,'#d6d0e2');g.addColorStop(1,'#9488a8')}
  else{g.addColorStop(0,'#f8c46c');g.addColorStop(1,'#d48236')}}
function cracks(x,u,X,Y,W,H,s){const k=u.dmg/(u.hp||1);if(k<.3)return;const R=seeded(Math.floor(u.x*100+u.y*37));
  x.strokeStyle='rgba(60,30,10,.75)';x.lineWidth=Math.max(1,s*.03);x.lineCap='round';const n=k>.65?3:1;
  for(let i=0;i<n;i++){let px=X+W*(.2+R()*.6),py=Y+H*(.15+R()*.2);x.beginPath();x.moveTo(px,py);for(let j=0;j<4;j++){px+=(R()-.5)*W*.35;py+=H*.18;x.lineTo(px,py)}x.stroke()}}
const GIFTC={pink:'#ff5fa8',blue:'#3fa8ff',purple:'#a35bff',green:'#2fc46a'};
/* goals, centred at 0,0, size s (pixels) */
function drawGoal(x,g,v,s,dmg){
  const l=lw(s/GS),h=s/2;x.lineJoin='round';x.lineCap='round';
  if(g==='gift'){
    if(v==='lantern'){x.save();x.shadowColor='rgba(255,200,80,.9)';x.shadowBlur=s*.35;
      rr(x,-h*.62,-h*.6,h*1.24,h*1.35,h*.35);const gg=x.createLinearGradient(0,-h,0,h);gg.addColorStop(0,'#ffe27a');gg.addColorStop(1,'#ff9a1f');x.fillStyle=gg;x.fill();x.restore();
      x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
      x.strokeStyle='rgba(160,70,0,.55)';x.lineWidth=l*.7;for(const k of [-.25,.25]){x.beginPath();x.moveTo(k*h,-h*.58);x.lineTo(k*h,h*.72);x.stroke()}
      rr(x,-h*.45,-h*.92,h*.9,h*.34,h*.1);x.fillStyle='#c0392b';x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
      rr(x,-h*.45,h*.72,h*.9,h*.24,h*.1);x.fillStyle='#c0392b';x.fill();x.stroke();
      x.beginPath();x.arc(0,-h*1.04,h*.13,0,7);x.lineWidth=l*.8;x.stroke();return}
    const c=GIFTC[v]||'#ff5fa8';rr(x,-h*.9,-h*.6,h*1.8,h*1.5,h*.18);const gg=x.createLinearGradient(0,-h*.6,0,h);gg.addColorStop(0,mix(c,.35));gg.addColorStop(1,mix(c,-.2));x.fillStyle=gg;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
    rr(x,-h*1,-h*.78,h*2,h*.45,h*.14);x.fillStyle=mix(c,.15);x.fill();x.stroke();
    x.fillStyle='#ffd23f';x.fillRect(-h*.16,-h*.78,h*.32,h*1.68);x.strokeRect(-h*.16,-h*.78,h*.32,h*1.68);
    for(const k of [-1,1]){x.beginPath();x.ellipse(k*h*.3,-h*.92,h*.3,h*.18,k*.5,0,7);x.fillStyle='#ffd23f';x.fill();x.stroke()}
    x.beginPath();x.arc(0,-h*.88,h*.12,0,7);x.fill();x.stroke();
    x.fillStyle='rgba(255,255,255,.45)';x.beginPath();x.ellipse(-h*.55,-h*.2,h*.14,h*.28,0,0,7);x.fill();return}
  if(g==='trash'){
    if(v==='can'){rr(x,-h*.62,-h*.6,h*1.24,h*1.55,h*.18);const gg=x.createLinearGradient(-h,0,h,0);gg.addColorStop(0,'#9aa6b2');gg.addColorStop(.4,'#d9e1e8');gg.addColorStop(1,'#7d8a96');x.fillStyle=gg;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
      x.strokeStyle='rgba(60,70,80,.45)';x.lineWidth=l*.7;for(const k of [-.3,0,.3]){x.beginPath();x.moveTo(k*h,-h*.45);x.lineTo(k*h,h*.85);x.stroke()}
      rr(x,-h*.78,-h*.86,h*1.56,h*.32,h*.14);x.fillStyle='#b8c3cc';x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
      // a banana peel and a crumpled paper poking out
      x.beginPath();x.moveTo(-h*.3,-h*.86);x.quadraticCurveTo(-h*.45,-h*1.2,-h*.15,-h*1.12);x.quadraticCurveTo(-h*.1,-h*1.0,-h*.05,-h*.86);x.fillStyle='#ffd84a';x.fill();x.stroke();
      x.beginPath();x.arc(h*.3,-h*.95,h*.2,0,7);x.fillStyle='#f4f1e6';x.fill();x.stroke();return}
    x.beginPath();x.moveTo(-h*.2,-h*.62);x.bezierCurveTo(-h*1.05,-h*.4,-h*1.05,h*.95,0,h*.95);x.bezierCurveTo(h*1.05,h*.95,h*1.05,-h*.4,h*.2,-h*.62);x.closePath();
    const gg=x.createRadialGradient(-h*.3,-h*.1,h*.1,0,h*.2,h);gg.addColorStop(0,'#5a6a72');gg.addColorStop(1,'#25323a');x.fillStyle=gg;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
    x.beginPath();x.moveTo(-h*.2,-h*.62);x.lineTo(-h*.38,-h*.95);x.lineTo(0,-h*.78);x.lineTo(h*.38,-h*.95);x.lineTo(h*.2,-h*.62);x.fillStyle='#3a4a52';x.fill();x.stroke();
    x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=l*.8;x.beginPath();x.arc(-h*.35,h*.15,h*.4,3.6,4.6);x.stroke();return}
  // cage with an animal inside
  rr(x,-h*.95,-h*.95,h*1.9,h*1.9,h*.2);x.fillStyle='rgba(255,240,200,.45)';x.fill();
  drawAnimal(x,v,0,h*.12,h*.62,false);
  x.strokeStyle='#8a5a2a';x.lineWidth=Math.max(1.4,l*.85);for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(i*h*.36,-h*.8);x.lineTo(i*h*.36,h*.8);x.stroke()}
  x.strokeStyle=OUT;x.lineWidth=Math.max(1,l*.3);for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(i*h*.36+l*.3,-h*.8);x.lineTo(i*h*.36+l*.3,h*.8);x.stroke()}
  for(const yy of [-h*.95,h*.7]){rr(x,-h*.95,yy,h*1.9,h*.25,h*.1);x.fillStyle='#c97a2c';x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke()}
  rr(x,-h*.95,-h*.95,h*1.9,h*1.9,h*.2);x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  x.beginPath();x.arc(0,-h*1.08,h*.2,Math.PI,0);x.lineWidth=l*.9;x.stroke();
  rr(x,h*.45,h*.05,h*.32,h*.3,h*.06);x.fillStyle='#ffd23f';x.fill();x.lineWidth=l*.7;x.stroke()}
function drawAnimal(x,v,cx,cy,r,happy){
  const l=Math.max(1.2,r*.09);x.lineWidth=l;x.strokeStyle=OUT;x.lineJoin='round';
  const C={bird:['#4fb8ff','#e8f6ff'],bunny:['#f4f4f8','#ffd6e6'],kitten:['#ffae4a','#fff0dc'],penguin:['#2a3040','#ffffff']}[v]||['#ffd23f','#fff6c8'];
  if(v==='bunny'){for(const k of [-1,1]){x.beginPath();x.ellipse(cx+k*r*.32,cy-r*1.05,r*.2,r*.5,k*.15,0,7);x.fillStyle=C[0];x.fill();x.stroke();x.beginPath();x.ellipse(cx+k*r*.32,cy-r*1.02,r*.09,r*.34,k*.15,0,7);x.fillStyle=C[1];x.fill()}}
  if(v==='kitten'){for(const k of [-1,1]){x.beginPath();x.moveTo(cx+k*r*.75,cy-r*.35);x.lineTo(cx+k*r*.6,cy-r*1.05);x.lineTo(cx+k*r*.15,cy-r*.75);x.closePath();x.fillStyle=C[0];x.fill();x.stroke()}}
  x.beginPath();x.arc(cx,cy,r*.85,0,7);const g=x.createRadialGradient(cx-r*.3,cy-r*.35,r*.1,cx,cy,r);g.addColorStop(0,mix(C[0].length===7?C[0]:'#ffd23f',.35));g.addColorStop(1,C[0]);x.fillStyle=g;x.fill();x.stroke();
  x.beginPath();x.ellipse(cx,cy+r*.3,r*.5,r*.42,0,0,7);x.fillStyle=C[1];x.fill();
  if(v==='bird'||v==='penguin'){x.beginPath();x.ellipse(cx+r*.72,cy+r*.1,r*.22,r*.4,.5,0,7);x.fillStyle=mix(C[0],-.15);x.fill();x.stroke()}
  for(const k of [-1,1]){x.beginPath();x.arc(cx+k*r*.3,cy-r*.15,r*.16,0,7);x.fillStyle='#fff';x.fill();x.lineWidth=l*.6;x.stroke();x.beginPath();x.arc(cx+k*r*.3+r*.03,cy-r*.13,r*.09,0,7);x.fillStyle=OUT;x.fill();
    x.beginPath();x.arc(cx+k*r*.3+r*.06,cy-r*.18,r*.035,0,7);x.fillStyle='#fff';x.fill()}
  x.fillStyle='rgba(255,110,140,.45)';for(const k of [-1,1]){x.beginPath();x.ellipse(cx+k*r*.55,cy+r*.12,r*.13,r*.08,0,0,7);x.fill()}
  if(v==='bird'||v==='penguin'){x.beginPath();x.moveTo(cx-r*.13,cy+r*.02);x.lineTo(cx+r*.13,cy+r*.02);x.lineTo(cx,cy+r*.22);x.closePath();x.fillStyle='#ff9a1f';x.fill();x.lineWidth=l*.6;x.stroke()}
  else{x.beginPath();x.arc(cx,cy+r*.04,r*.07,0,7);x.fillStyle='#ff7aa8';x.fill();x.beginPath();x.arc(cx-r*.08,cy+r*.12,r*.08,.2,Math.PI-.2);x.arc(cx+r*.08,cy+r*.12,r*.08,.2,Math.PI-.2);x.lineWidth=l*.5;x.stroke()}
  if(happy){x.beginPath();x.arc(cx,cy+r*.28,r*.16,.2,Math.PI-.2);x.lineWidth=l*.6;x.stroke()}}
function drawProj(x,pt,s,ang){
  const l=lw(s);x.lineJoin='round';x.lineCap='round';
  if(pt==='arrow'){x.save();x.rotate(-ang);const L=s*.5;
    x.strokeStyle=OUT;x.lineWidth=Math.max(3,s*.11);x.beginPath();x.moveTo(-L,0);x.lineTo(L*.8,0);x.stroke();
    x.strokeStyle='#d48a3a';x.lineWidth=Math.max(1.6,s*.06);x.stroke();
    x.beginPath();x.moveTo(L*1.12,0);x.lineTo(L*.7,-s*.12);x.lineTo(L*.78,0);x.lineTo(L*.7,s*.12);x.closePath();x.fillStyle='#c8d2dc';x.fill();x.lineWidth=l*.7;x.strokeStyle=OUT;x.stroke();
    for(const k of [-1,1]){x.beginPath();x.moveTo(-L*.55,0);x.lineTo(-L*1.02,k*s*.15);x.lineTo(-L*.82,0);x.closePath();x.fillStyle=k<0?'#ff5f5f':'#ffd23f';x.fill();x.stroke()}
    x.restore();return}
  const r=PROJ[pt].rad*s;x.save();x.rotate(-ang);
  if(pt==='ball'){x.beginPath();x.arc(0,0,r,0,7);x.fillStyle='#ff4f5e';x.fill();x.save();x.clip();x.fillStyle='#ffd23f';x.fillRect(-r,-r*.28,r*2,r*.56);x.fillStyle='#3fa8ff';x.beginPath();x.arc(0,0,r*.25,0,7);x.fill();x.restore()}
  else if(pt==='iron'){const g=x.createRadialGradient(-r*.35,-r*.35,r*.1,0,0,r);g.addColorStop(0,'#9a7cff');g.addColorStop(1,'#3a2a9a');x.beginPath();x.arc(0,0,r,0,7);x.fillStyle=g;x.fill();
    x.fillStyle='#ffd23f';x.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,q=i%2?r*.2:r*.45;x.lineTo(Math.cos(a)*q,Math.sin(a)*q)}x.closePath();x.fill()}
  else{x.beginPath();x.ellipse(0,0,r,r*.9,0,0,7);x.fillStyle='#2f9e3a';x.fill();x.save();x.clip();x.strokeStyle='#bff07a';x.lineWidth=r*.16;for(const k of [-.55,0,.55]){x.beginPath();x.ellipse(k*r,0,r*.16,r,0,0,7);x.stroke()}x.restore()}
  x.beginPath();if(pt==='melon')x.ellipse(0,0,r,r*.9,0,0,7);else x.arc(0,0,r,0,7);x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  x.restore();x.beginPath();x.ellipse(-r*.35,-r*.4,r*.28,r*.15,-.6,0,7);x.fillStyle='rgba(255,255,255,.7)';x.fill()}
/* a launcher with its foot on the ground at gx,gy and its pivot at px,py (pixels); ang = aim, pull 0..1 */
function drawLauncher(x,L,gx,gy,px,py,s,ang,pull,ammo){
  const l=lw(s);x.lineJoin='round';x.lineCap='round';const c=Math.cos(ang),sn=Math.sin(ang);
  const wood=(x0,y0,x1,y1,w)=>{x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.lineWidth=w+l*2;x.strokeStyle=OUT;x.stroke();x.lineWidth=w;x.strokeStyle='#c97a2c';x.stroke()};
  if(L==='bow'){
    // a little stand
    wood(gx-s*.35,gy,px,py+s*.15,s*.12);wood(gx+s*.35,gy,px,py+s*.15,s*.12);
    const R=s*.95,bx=px+c*s*.15,by=py-sn*s*.15,a0=-ang;   // bow centre in front of the pivot
    const tip=k=>[bx+Math.cos(a0+k*1.05)*R-c*R*.55,by+Math.sin(a0+k*1.05)*R+sn*R*.55];
    const [t1x,t1y]=tip(-1),[t2x,t2y]=tip(1),pb=s*(.15+pull*.65),nx=bx-c*R*.55-c*pb,ny=by+sn*R*.55+sn*pb;
    x.beginPath();x.moveTo(t1x,t1y);x.lineTo(nx,ny);x.lineTo(t2x,t2y);x.lineWidth=Math.max(1.2,s*.03);x.strokeStyle='#fff6e0';x.stroke();
    x.beginPath();x.arc(bx-c*R*.55,by+sn*R*.55,R,a0-1.05,a0+1.05);x.lineWidth=s*.16+l*2;x.strokeStyle=OUT;x.stroke();x.lineWidth=s*.16;x.strokeStyle='#d0782a';x.stroke();
    x.lineWidth=s*.05;x.strokeStyle='#ffd23f';x.beginPath();x.arc(bx-c*R*.55,by+sn*R*.55,R,a0-.12,a0+.12);x.stroke();
    if(ammo){x.save();x.translate(nx+c*s*.62,ny-sn*s*.62);drawProj(x,'arrow',s*1.25,ang);x.restore()}
    return}
  if(L==='sling'){
    const fy=py-s*.1;wood(gx,gy,gx,fy+s*.45,s*.2);wood(gx,fy+s*.45,gx-s*.32,fy-s*.15,s*.16);wood(gx,fy+s*.45,gx+s*.32,fy-s*.15,s*.16);
    const pb=s*(pull*.9),qx=px-c*pb,qy=py+sn*pb;
    x.strokeStyle='#7a3a1a';x.lineWidth=Math.max(2,s*.07);x.beginPath();x.moveTo(gx+s*.32,fy-s*.15);x.lineTo(qx,qy);x.stroke();
    if(ammo){x.save();x.translate(qx,qy);drawProj(x,'ball',s,0);x.restore()}
    x.beginPath();x.moveTo(gx-s*.32,fy-s*.15);x.lineTo(qx,qy);x.stroke();return}
  if(L==='cannon'){
    const rec=s*pull*.15;x.save();x.translate(px-c*rec,py+sn*rec);x.rotate(-ang);
    rr(x,-s*.45,-s*.32,s*1.35,s*.64,s*.28);const g=x.createLinearGradient(0,-s*.32,0,s*.32);g.addColorStop(0,'#7fc0ff');g.addColorStop(1,'#1f5fd0');x.fillStyle=g;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
    x.fillStyle='#ffd23f';x.fillRect(s*.1,-s*.32,s*.14,s*.64);x.strokeRect(s*.1,-s*.32,s*.14,s*.64);rr(x,s*.78,-s*.38,s*.2,s*.76,s*.08);x.fill();x.stroke();
    x.restore();
    x.beginPath();x.arc(gx,gy-s*.42,s*.42,0,7);x.fillStyle='#ff8a1f';x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
    x.beginPath();x.arc(gx,gy-s*.42,s*.14,0,7);x.fillStyle='#ffd23f';x.fill();x.stroke();
    for(let i=0;i<6;i++){const a=i*Math.PI/3;x.beginPath();x.moveTo(gx+Math.cos(a)*s*.14,gy-s*.42+Math.sin(a)*s*.14);x.lineTo(gx+Math.cos(a)*s*.38,gy-s*.42+Math.sin(a)*s*.38);x.lineWidth=l*.8;x.stroke()}
    return}
  // catapult
  rr(x,gx-s*.75,gy-s*.3,s*1.5,s*.3,s*.08);x.fillStyle='#c97a2c';x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  wood(gx-s*.4,gy-s*.25,gx,gy-s*.85,s*.14);wood(gx+s*.4,gy-s*.25,gx,gy-s*.85,s*.14);
  for(const k of [-1,1]){x.beginPath();x.arc(gx+k*s*.55,gy-s*.05,s*.18,0,7);x.fillStyle='#8a5a2a';x.fill();x.stroke()}
  const arm=-(.35+pull*.9)+Math.PI*.5-ang*.4,ax=gx,ay=gy-s*.85,ex=ax+Math.cos(Math.PI+arm)*s*.9,ey=ay-Math.sin(Math.PI+arm)*s*.9;
  wood(ax+Math.cos(arm)*s*.3,ay-Math.sin(arm)*s*.3,ex,ey,s*.13);
  x.beginPath();x.arc(ex,ey,s*.3,0,7);x.fillStyle='#a8662a';x.fill();x.stroke();
  if(ammo){x.save();x.translate(ex,ey-s*.18);drawProj(x,'melon',s*.8,0);x.restore()}
  x.beginPath();x.arc(ax,ay,s*.09,0,7);x.fillStyle='#ffd23f';x.fill();x.stroke()}

/* =================================================================
   Backgrounds (drawn in code until the owner's art arrives). gy = ground line in pixels.
   ================================================================= */
function paintWorld(x,w,W,H,gy,s){
  const WD=WORLDS[w],R=seeded(w*101+5);
  const g=x.createLinearGradient(0,0,0,gy);g.addColorStop(0,WD.sky[0]);g.addColorStop(1,WD.sky[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
  const u=Math.max(16,Math.min(s,H/9));
  if(w===5){x.fillStyle='#fff';for(let i=0;i<90;i++){const r=R()*1.6+.4;x.globalAlpha=.4+R()*.6;x.beginPath();x.arc(R()*W,R()*gy*.8,r,0,7);x.fill()}x.globalAlpha=1;
    x.beginPath();x.arc(W*.8,gy*.22,u*1.3,0,7);x.fillStyle='#fff3c0';x.fill();x.beginPath();x.arc(W*.8+u*.55,gy*.22-u*.3,u*1.15,0,7);x.fillStyle=WD.sky[0];x.fill()}
  else if(w!==2){x.save();x.shadowColor='rgba(255,240,150,.9)';x.shadowBlur=u*1.2;x.beginPath();x.arc(W*.82,gy*.2,u*1.1,0,7);x.fillStyle=w===4?'#fffbe0':'#ffe25a';x.fill();x.restore()}
  if(w!==5)for(let i=0;i<4;i++){const cx=R()*W,cy=gy*(.12+R()*.35),k=u*(.7+R()*.6);x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(cx,cy,k,0,7);x.arc(cx+k*.9,cy+k*.2,k*.8,0,7);x.arc(cx-k*.9,cy+k*.25,k*.7,0,7);x.arc(cx+k*.2,cy+k*.4,k*.85,0,7);x.fill()}
  const hills=(col,amp,base,f,ph)=>{x.beginPath();x.moveTo(0,gy);for(let X=0;X<=W+10;X+=10)x.lineTo(X,gy-base-Math.sin(X/W*f+ph)*amp-Math.sin(X/W*f*2.3+ph*2)*amp*.4);x.lineTo(W,gy);x.closePath();x.fillStyle=col;x.fill()};
  if(w===1){x.fillStyle='#3fc3e8';x.fillRect(0,gy-u*1.6,W,u*1.6);x.fillStyle='rgba(255,255,255,.6)';for(let i=0;i<12;i++){x.fillRect(R()*W,gy-u*(.3+R()*1.2),u*(.6+R()),2)}
    for(let i=0;i<3;i++)palm(x,W*(.1+i*.38)+R()*u*3,gy,u*(2.6+R()))}
  else if(w===4){for(let i=0;i<5;i++){const cx=R()*W,hh=u*(3+R()*3),ww=hh*1.2;x.beginPath();x.moveTo(cx-ww,gy);x.lineTo(cx,gy-hh);x.lineTo(cx+ww,gy);x.fillStyle=i%2?'#9fc4e6':'#b8d6f0';x.fill();
      x.beginPath();x.moveTo(cx-ww*.3,gy-hh*.7);x.lineTo(cx,gy-hh);x.lineTo(cx+ww*.3,gy-hh*.7);x.lineTo(cx+ww*.1,gy-hh*.62);x.lineTo(cx-ww*.08,gy-hh*.72);x.closePath();x.fillStyle='#fff';x.fill()}
    hills(WD.hill[1],u*.5,u*.6,5,1)}
  else if(w===2){for(let layer=0;layer<2;layer++)for(let i=0;i<14;i++){const cx=(i/13)*W+R()*u,hh=u*(2.5+R()*2.5)*(layer?1.2:1);x.fillStyle=layer?'#2a7a44':'#4aa868';
      x.beginPath();x.moveTo(cx-hh*.35,gy-u*.2*layer);x.lineTo(cx,gy-hh);x.lineTo(cx+hh*.35,gy-u*.2*layer);x.fill()}}
  else if(w===3){hills(WD.hill[0],u*.8,u*1.4,3,2);masjid(x,W*.66,gy-u*1.35,u*1.3);hills(WD.hill[1],u*.5,u*.5,4,0);palm(x,W*.12,gy,u*3)}
  else if(w===5){hills(WD.hill[0],u*.6,u*1.2,3,1);masjid(x,W*.35,gy-u*1.1,u*1.4,'#141040');hills(WD.hill[1],u*.4,u*.4,5,2);
    for(let i=0;i<7;i++){const lx=W*(.05+i*.15),ly=gy*(.18+.06*Math.sin(i*1.7));x.strokeStyle='rgba(255,230,160,.5)';x.lineWidth=1;x.beginPath();x.moveTo(lx,0);x.lineTo(lx,ly);x.stroke();
      x.save();x.shadowColor='#ffd060';x.shadowBlur=u*.6;rr(x,lx-u*.18,ly,u*.36,u*.5,u*.12);x.fillStyle=['#ffd23f','#ff8a1f','#ff5fa8'][i%3];x.fill();x.restore()}}
  else{hills(WD.hill[0],u*.7,u*1.3,3,.5);hills(WD.hill[1],u*.5,u*.5,4,2)}
  // ground
  const gg=x.createLinearGradient(0,gy,0,H);gg.addColorStop(0,WD.gr[0]);gg.addColorStop(.12,WD.gr[0]);gg.addColorStop(.14,WD.gr[1]);gg.addColorStop(1,mix(WD.gr[1],-.25));x.fillStyle=gg;x.fillRect(0,gy,W,H-gy);
  x.strokeStyle=OUT;x.lineWidth=2;x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke();
  if(w===0||w===2)for(let i=0;i<16;i++){const fx=R()*W,fy=gy+u*.12;x.fillStyle=['#ff5fa8','#ffd23f','#fff','#a35bff'][i%4];for(let k=0;k<5;k++){x.beginPath();x.arc(fx+Math.cos(k*1.26)*u*.09,fy-u*.15+Math.sin(k*1.26)*u*.09,u*.06,0,7);x.fill()}}}
function palm(x,px,gy,h){x.strokeStyle='#8a5a2a';x.lineWidth=h*.07;x.lineCap='round';x.beginPath();x.moveTo(px,gy);x.quadraticCurveTo(px+h*.15,gy-h*.5,px+h*.05,gy-h);x.stroke();
  x.fillStyle='#2fa84a';for(let i=0;i<6;i++){const a=-Math.PI/2+(i-2.5)*.55;x.beginPath();x.ellipse(px+h*.05+Math.cos(a)*h*.28,gy-h+Math.sin(a)*h*.18+h*.08,h*.32,h*.08,a,0,7);x.fill()}}
function masjid(x,cx,by,u,col='rgba(200,120,50,.55)'){x.fillStyle=col;x.fillRect(cx-u*1.4,by-u*.2,u*2.8,u*1.4);x.beginPath();x.arc(cx,by-u*.2,u*.9,Math.PI,0);x.fill();
  x.beginPath();x.moveTo(cx-u*.1,by-u*1.1);x.lineTo(cx,by-u*1.45);x.lineTo(cx+u*.1,by-u*1.1);x.fill();
  for(const k of [-1,1]){x.fillRect(cx+k*u*1.7-u*.14,by-u*1.6,u*.28,u*2.8);x.beginPath();x.moveTo(cx+k*u*1.7-u*.2,by-u*1.6);x.lineTo(cx+k*u*1.7,by-u*2);x.lineTo(cx+k*u*1.7+u*.2,by-u*1.6);x.fill()}}
function rockDraw(x,u,s,w){const W=u.w*s,H=u.h*s;rr(x,-W/2,-H/2,W,H+s*.2,s*.35);
  const g=x.createLinearGradient(0,-H/2,0,H/2);g.addColorStop(0,'#b0a08c');g.addColorStop(1,'#7a6a58');x.fillStyle=g;x.fill();x.lineWidth=lw(s);x.strokeStyle=OUT;x.stroke();
  x.fillStyle='rgba(60,40,20,.2)';for(const [a,b,r] of [[-.3,.1,.08],[.25,.25,.06],[.1,-.05,.05]]){x.beginPath();x.arc(a*W,b*H,r*s*2,0,7);x.fill()}
  rr(x,-W/2-s*.05,-H/2-s*.08,W+s*.1,s*.3,s*.15);x.fillStyle=WORLDS[w].cap;x.fill();x.lineWidth=lw(s)*.8;x.stroke()}

/* =================================================================
   Game state, layout and drawing
   ================================================================= */
const cv=$('#cv'),cx=cv.getContext('2d'),fxc=$('#fx'),fxx=fxc.getContext('2d');
let G=null,cam={s:30,ox:0,oy:0,W:0,H:0},bgCache=null,parts=[],flyers=[],texts=[],conf=[];
let prog=store.get('prog',{open:1,stars:{}});
const totalStars=()=>Object.values(prog.stars).reduce((a,b)=>a+b,0);
const sx=X=>cam.ox+X*cam.s,sy=Y=>cam.oy-Y*cam.s;
function layout(){
  const W=innerWidth,H=innerHeight,d=DPR();[cv,fxc].forEach(c=>{c.width=Math.round(W*d);c.height=Math.round(H*d)});cam.W=W;cam.H=H;
  const land=W>H;$('#game').classList.toggle('land',land);document.body.classList.toggle('land',land);
  if(!G)return;const lv=G.lv,vw=lv.width+.8,vh=Math.max(lv.top+2.2,8.5),gr=1.2;
  const pick=unlockedAt(G.n).length>1,left=land&&pick?Math.min(84,W*.1):0,top=land?64:132,botP=land?0:pick?112:64;
  const s=Math.min((W-left)/vw,(H-top-botP)/(vh+gr));cam.s=s;
  cam.ox=left+(W-left-vw*s)/2+.4*s;cam.oy=H-Math.max(gr*s,botP);
  bgCache=null}
function drawBg(){const d=DPR();if(!bgCache||bgCache.w!==cv.width||bgCache.h!==cv.height||bgCache.world!==G.lv.w){const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d');x.scale(d,d);paintWorld(x,G.lv.w,cam.W,cam.H,cam.oy,cam.s);bgCache={c,w:cv.width,h:cv.height,world:G.lv.w}}
  cx.drawImage(bgCache.c,0,0)}
function drawGame(now){
  const d=DPR(),x=cx,s=cam.s;x.setTransform(1,0,0,1,0,0);drawBg();x.setTransform(d,0,0,d,0,0);
  const S=G.sim;
  for(const u of S.list){if(u.k!=='rock')continue;x.save();x.translate(sx(u.x),sy(u.y));rockDraw(x,u,s,G.lv.w);x.restore()}
  // Mo
  const mo=G.won&&IMG.jump.ok?IMG.jump:IMG.mo;if(mo.ok){const h=2.05*s*(mo===IMG.jump?1.12:1),w=h*mo.naturalWidth/mo.naturalHeight;let hop=0;
    if(G.won)hop=Math.abs(Math.sin(now/180))*s*.3;else if(G.shotT&&now-G.shotT<350)hop=Math.sin((now-G.shotT)/350*Math.PI)*s*.12;
    x.drawImage(mo,sx(1.05)-w/2,sy(0)-h-hop,w,h)}
  // aim dots
  const L=G.lsel,aim=G.aim;
  if(aim&&aim.p>.08){const [vx,vy]=launchVel(L,aim.a,aim.p),[px,py]=launchPos(L,aim.a),T=age==='little'?2.4:.42;
    for(let tt=.05,i=0;tt<T;tt+=.07,i++){const X=px+vx*tt,Y=py+vy*tt-5*tt*tt;if(Y<0)break;const r=Math.max(2,s*(.13-i*.002));
      x.beginPath();x.arc(sx(X),sy(Y),r,0,7);x.fillStyle='#fff';x.globalAlpha=Math.max(.35,1-tt/T*.6);x.fill();x.lineWidth=1.5;x.strokeStyle=OUT;x.stroke();x.globalAlpha=1}}
  // bodies
  for(const u of S.list){if(u.k==='rock')continue;const q=u.b.getPosition(),a=u.b.getAngle();x.save();x.translate(sx(q.x),sy(q.y));x.rotate(-a);
    if(u.k==='goal'){drawGoal(x,u.g,u.v,u.w*s,u.dmg);if(u.dmg>.25*u.hp)cracks(x,u,-u.w*s/2,-u.h*s/2,u.w*s,u.h*s,s)}else drawBlock(x,u,s);x.restore()}
  // launcher
  const ready=G.state==='ready'||G.state==='aim',ang=aim?clampAng(aim.a):.55;
  drawLauncher(x,L,sx(LX),sy(0),sx(LX),sy(LAUNCH[L].oy),s,ang,aim?aim.p:0,ready&&G.shots>0);
  for(const p of S.proj){const q=p.b.getPosition();x.save();x.translate(sx(q.x),sy(q.y));drawProj(x,p.pt,s,p.b.getAngle());x.restore()}
  drawParts(x,now,s)}
/* particles in world units */
function drawParts(x,now,s){
  const dt=1/60;
  parts=parts.filter(p=>{p.t+=dt;if(p.t>p.life)return false;p.vy-=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;const k=1-p.t/p.life;
    x.save();x.translate(sx(p.x),sy(p.y));x.rotate(p.r);x.globalAlpha=Math.min(1,k*2);
    if(p.k==='star'&&IMG.star.ok){const z=p.z*s;x.drawImage(IMG.star,-z/2,-z/2,z,z)}
    else if(p.k==='heart'){const z=p.z*s;x.fillStyle='#ff5f8a';x.beginPath();x.moveTo(0,z*.3);x.bezierCurveTo(-z*.6,-z*.1,-z*.3,-z*.6,0,-z*.25);x.bezierCurveTo(z*.3,-z*.6,z*.6,-z*.1,0,z*.3);x.fill();x.lineWidth=1.5;x.strokeStyle=OUT;x.stroke()}
    else if(p.k==='dot'){x.beginPath();x.arc(0,0,p.z*s*k+1,0,7);x.fillStyle=p.c;x.fill()}
    else{const z=p.z*s;x.fillStyle=p.c;x.fillRect(-z/2,-z/3,z,z*.66);x.lineWidth=1.2;x.strokeStyle=OUT;x.strokeRect(-z/2,-z/3,z,z*.66)}
    x.restore();return true});
  flyers=flyers.filter(f=>{f.t+=dt;if(f.t>4)return false;f.x+=f.vx*dt;f.y+=1.6*dt+Math.sin(f.t*9)*.02;x.save();x.translate(sx(f.x),sy(f.y));x.scale(f.vx<0?-1:1,1);drawAnimal(x,f.v,0,0,s*.4,true);x.restore();return true});
  texts=texts.filter(tx=>{tx.t+=dt;if(tx.t>1.6)return false;const k=tx.t/1.6;x.save();x.globalAlpha=k>.7?(1-k)/.3:1;x.font=`400 ${Math.max(16,s*.62)}px "Lilita One",sans-serif`;x.textAlign='center';
    x.lineWidth=4;x.strokeStyle=OUT;x.lineJoin='round';const X=sx(tx.x),Y=sy(tx.y+k*1.4);x.strokeText(tx.s,X,Y);x.fillStyle=tx.c;x.fillText(tx.s,X,Y);x.restore();return true})}
function debris(X,Y,mat,n,big){const col={wood:'#e09a4a',ice:'#bfeaff',stone:'#a89cb8',goal:'#ffd23f'}[mat]||'#e09a4a';
  for(let i=0;i<n;i++){const a=Math.random()*6.283,v=1.5+Math.random()*(big?6:4);parts.push({x:X,y:Y,vx:Math.cos(a)*v,vy:Math.sin(a)*v+2,g:12,t:0,life:.8+Math.random()*.5,r:Math.random()*6,vr:(Math.random()-.5)*12,z:.12+Math.random()*.16,c:col,k:'chip'})}}
function sparkle(X,Y,k,n,cols){for(let i=0;i<n;i++){const a=Math.random()*6.283,v=1+Math.random()*4;parts.push({x:X,y:Y,vx:Math.cos(a)*v,vy:Math.sin(a)*v+2.5,g:k==='dot'?3:5,t:0,life:1+Math.random()*.6,r:0,vr:(Math.random()-.5)*4,z:k==='star'?.45+Math.random()*.25:k==='heart'?.4:.14,c:cols?cols[i%cols.length]:'#fff',k})}}
/* confetti on the fx canvas (screen pixels) */
function confetti(){const W=innerWidth,H=innerHeight,cols=['#ff3b30','#ffd60a','#1fa64a','#3fc6f5','#9b4bf0','#ff5fa8','#ff8a00'];
  for(let i=0;i<150;i++)conf.push({x:W/2+(Math.random()-.5)*W*.4,y:H*.35,vx:(Math.random()-.5)*900,vy:-Math.random()*900-200,s:Math.random()*8+7,c:cols[i%cols.length],r:Math.random()*6,t:-Math.random()*.2})}
function drawConf(){const d=DPR();fxx.setTransform(1,0,0,1,0,0);fxx.clearRect(0,0,fxc.width,fxc.height);if(!conf.length)return;fxx.setTransform(d,0,0,d,0,0);const dt=1/60;
  conf=conf.filter(p=>{p.t+=dt;if(p.t<0)return true;if(p.t>2.6)return false;p.vy+=900*dt;p.vx*=.99;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*6;fxx.save();fxx.translate(p.x,p.y);fxx.rotate(p.r);fxx.globalAlpha=Math.min(1,(2.6-p.t)*2);fxx.fillStyle=p.c;fxx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);fxx.restore();return true})}

/* =================================================================
   Playing a level
   ================================================================= */
const unlockedAt=n=>LORDER.filter(L=>LAUNCH[L].unlock<=n);
function shotsFor(lv){return lv.par+(age==='little'?4:2)}
function startGame(n){
  const lv=genLevel(n);G={n,lv,sim:makeSim(lv),state:'bism',shots:0,used:0,aim:null,won:false,shotT:0,last:null,idle:0};
  G.shots=shotsFor(lv);
  const av=unlockedAt(n),pref=store.get('lsel','bow');G.lsel=av.includes(pref)?pref:'bow';
  const nw=store.get('newL',null);if(nw&&av.includes(nw)){G.lsel=nw;store.set('newL',null);G.newL=nw}
  parts=[];flyers=[];texts=[];
  show('game');layout();renderHud();renderPicker();
  $('#lvlChip').textContent=tf('level',{n});
  const kinds=[...new Set(lv.items.filter(i=>i.k==='goal').map(i=>i.g))];
  $('#bismGoal').textContent=kinds.length>1?t('gMix'):t({gift:'gGift',trash:'gTrash',cage:'gCage'}[kinds[0]]);
  $('#bismGoals').innerHTML='';goalCounts(lv).forEach(([g,v,c])=>{const sp=document.createElement('span');sp.append(goalIcon(g,v,88),document.createTextNode('× '+c));$('#bismGoals').appendChild(sp)});
  ov('bism',true);
  if(innerHeight>innerWidth*1.15){const r=$('#rot');r.classList.remove('on');void r.offsetWidth;r.classList.add('on')}}
function goalCounts(lv){const m=new Map();lv.items.filter(i=>i.k==='goal').forEach(i=>{const k=i.g+'|'+(i.g==='cage'?i.v:i.g==='gift'&&i.v==='lantern'?'lantern':'');m.set(k,(m.get(k)||0)+1)});
  return[...m].map(([k,c])=>{const [g,v]=k.split('|');return[g,v||(g==='gift'?'pink':g==='trash'?'bag':'bird'),c]})}
function goalIcon(g,v,px){const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d');x.translate(px/2,px/2+px*.04);drawGoal(x,g,v,px*.72,0);return c}
function launcherIcon(L,px,ammo=true){const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d'),s=px/2.7;
  const gx=px*.45,gy=px*.94;drawLauncher(x,L,gx,gy,gx,gy-LAUNCH[L].oy*s,s,.55,.35,ammo);return c}
function projIcon(pt,px){const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d');x.translate(px/2,px/2);drawProj(x,pt,pt==='arrow'?px*.85:px*.95/(PROJ[pt].rad*2.2),pt==='arrow'?.6:0);return c}
$('#bismBtn').onclick=()=>{ov('bism',false);sfx.bism();say(t('sayBism'));if(!G)return;G.state='ready';G.idle=performance.now();
  if(G.n<=2||!store.get('hinted',0))setTimeout(showHint,700);
  if(G.newL)setTimeout(()=>{if(G&&G.state==='ready'){toast(tf('newL',{l:t('L')[G.newL]}))}},500)};
function renderHud(){
  const el=$('#goals');el.innerHTML='';const left=new Map();G.sim.list.forEach(u=>{if(u.k==='goal'){const k=u.g+'|'+(u.g==='cage'?u.v:u.v==='lantern'?'lantern':'');left.set(k,(left.get(k)||0)+1)}});
  goalCounts(G.lv).forEach(([g,v,c])=>{const k=g+'|'+(g==='cage'?v:v==='lantern'?'lantern':''),n=left.get(k)||0;const d=document.createElement('div');d.className='goal'+(n?'':' done');d.dataset.k=k;
    d.append(goalIcon(g,v,76));d.insertAdjacentHTML('beforeend',`<b>${n?n:'✓'}</b>`);el.appendChild(d)});
  const sh=$('#shots');sh.innerHTML='';sh.append(projIcon(LAUNCH[G.lsel].proj,68));sh.insertAdjacentHTML('beforeend',`<b>${G.shots}</b>`)}
function bumpGoal(){document.querySelectorAll('#goals .goal').forEach(g=>{g.classList.add('bump');setTimeout(()=>g.classList.remove('bump'),180)})}
function renderPicker(){const p=$('#picker'),av=unlockedAt(G.n);p.innerHTML='';p.classList.toggle('off',av.length<2);
  av.forEach(L=>{const b=document.createElement('button');b.className=(L===G.lsel?'on':'')+(L===G.newL?' new':'');b.setAttribute('aria-label',t('L')[L]);b.append(launcherIcon(L,120));
    b.onclick=e=>{e.stopPropagation();if(G.state!=='ready'&&G.state!=='bism')return;G.lsel=L;store.set('lsel',L);G.newL=null;sfx.tap();toast(t('L')[L]);renderPicker();renderHud()};p.appendChild(b)})}

/* aiming: press anywhere, pull back, let go */
let aimStart=null;
const maxPull=()=>Math.max(90,Math.min(220,Math.min(cam.W,cam.H)*.32));
function aimFrom(e){const dx=aimStart.x-e.clientX,dy=aimStart.y-e.clientY,dist=Math.hypot(dx,dy);
  let a=Math.atan2(-dy,dx);if(dist<8)a=G.aim?G.aim.a:.55;
  return{a:clampAng(a),p:Math.min(1,dist/maxPull())}}
cv.addEventListener('pointerdown',e=>{if(!G||window.praying)return;hideHint();G.idle=performance.now();
  if(G.state==='fly'){const p=G.sim.proj[0];if(p&&splitArrow(G.sim,p)){sfx.split();sparkle(p.b.getPosition().x,p.b.getPosition().y,'dot',10,['#fff','#ffd23f'])}return}
  if(G.state!=='ready'||G.shots<=0)return;aimStart={x:e.clientX,y:e.clientY,id:e.pointerId};G.state='aim';G.aim={a:.55,p:0};try{cv.setPointerCapture(e.pointerId)}catch(_){}sfx.pull()});
cv.addEventListener('pointermove',e=>{if(!G||G.state!=='aim'||!aimStart||e.pointerId!==aimStart.id)return;const o=G.aim.p;G.aim=aimFrom(e);if(Math.floor(G.aim.p*5)!==Math.floor(o*5)&&G.aim.p>o)tone(200+G.aim.p*300,.05,'triangle',.05)});
function release(e){if(!G||G.state!=='aim'||!aimStart||e.pointerId!==aimStart.id)return;const A=aimFrom(e);aimStart=null;
  if(A.p<.12||window.praying){G.state='ready';G.aim=null;return}shoot(A.a,A.p)}
cv.addEventListener('pointerup',release);cv.addEventListener('pointercancel',e=>{if(G&&G.state==='aim'){G.state='ready';G.aim=null;aimStart=null}});
function shoot(a,p){const L=G.lsel;fire(G.sim,L,a,p);G.state='fly';G.shots--;G.used++;G.aim=null;G.shotT=performance.now();sfx.shoot(L);renderHud();
  if(L==='bow'&&G.n>=4&&!store.get('splitTip',0)){store.set('splitTip',1);setTimeout(()=>toast(t('splitHint')),250)}}

let cheerN=0;
function cheer(){const c=document.createElement('div');const i=cheerN++%4;c.className='cheer c'+(i+1);c.innerHTML=`<b>${t('cheer')[i]}</b><small>${t('cheerM')[i]}</small>`;document.body.appendChild(c);setTimeout(()=>c.remove(),1450);if(Math.random()<.6)say(t('cheer')[i])}
function handleEvents(){
  const S=G.sim;let goalsNow=0;
  for(const ev of S.ev){
    if(ev.e==='hit')sfx.hit(ev.m,ev.s);
    else if(ev.e==='break'){sfx.brk(ev.u.mat);debris(ev.x,ev.y,ev.u.mat,ev.lost?0:10,ev.u.w>1.5)}
    else if(ev.e==='splash'){sfx.splash();sparkle(ev.x,ev.y,'dot',26,['#ff5f7a','#ff8aa0','#2f9e3a','#3a2410']);debris(ev.x,ev.y,'ice',6)}
    else if(ev.e==='goal'){goalsNow++;const u=ev.u,X=ev.x,Y=Math.max(.6,ev.y);
      if(u.g==='gift'){sfx.gift();sparkle(X,Y,'star',8);debris(X,Y,'goal',8);texts.push({x:X,y:Y+.6,s:pickT('gift'),c:'#ffe14a',t:0})}
      else if(u.g==='trash'){sfx.clean();sparkle(X,Y,'dot',22,['#7df0c2','#fff','#9fe2ff','#3fcf5a']);texts.push({x:X,y:Y+.6,s:pickT('clean'),c:'#7df0c2',t:0})}
      else{sfx.free();debris(X,Y,'wood',8);flyers.push({v:u.v,x:X,y:Y,vx:(Math.random()<.5?-1:1)*(1.4+Math.random()),t:0});sparkle(X,Y,'heart',5);texts.push({x:X,y:Y+.7,s:pickT('thanks'),c:'#ff9ad5',t:0})}}}
  S.ev.length=0;
  if(goalsNow){renderHud();bumpGoal();if(goalsNow>=2||S.goalsLeft===0)cheer()}
  if(S.goalsLeft<=0&&!G.won&&!G.winAt)G.winAt=performance.now()+1300}
function levelWin(){
  const n=G.n,par=G.lv.par,st=G.used<=par?3:G.used<=par+1?2:1;G.won=true;G.state='end';
  const before=prog.open;prog.stars[n]=Math.max(prog.stars[n]||0,st);prog.open=Math.max(prog.open,Math.min(LEVELS,n+1));store.set('prog',prog);
  sfx.win();say(t('sayAlh'));confetti();
  setTimeout(()=>{if(!G||cur!=='game')return;
    $('#winSub').textContent=n>=LEVELS?t('allDone'):tf('lvlDone',{n});
    const is=$('#winStars').children;[...is].forEach((i,k)=>{i.className='';if(k<st)setTimeout(()=>{i.className='on';tone(880+k*220,.25,'triangle',.12)},400+k*300)});
    $('#winFact').textContent=fact(n);$('#winUnl').innerHTML='';
    const nl=LORDER.find(L=>LAUNCH[L].unlock===n+1);
    if(nl&&before<n+1){store.set('newL',nl);setTimeout(sfx.unlock,1300);$('#winUnl').innerHTML='<div class="unl"></div>';$('#winUnl .unl').append(launcherIcon(nl,128),document.createTextNode(tf('newL',{l:t('L')[nl]})+' '+t('LD')[nl]))}
    else if(n%WN===0&&n<LEVELS&&before<=n){$('#winUnl').innerHTML=`<div class="unl">${tf('worldOpen',{w:t('W')[n/WN]})}</div>`}
    $('#winNext').style.display=n>=LEVELS?'none':'';ov('win',true)},1100)}
$('#winNext').onclick=()=>{ov('win',false);startGame(G.n+1)};
$('#winAgain').onclick=()=>{ov('win',false);startGame(G.n)};
$('#winMap').onclick=()=>{ov('win',false);G=null;openMap()};
$('#overAgain').onclick=()=>{ov('over',false);startGame(G.n)};
$('#overMap').onclick=()=>{ov('over',false);G=null;openMap()};
function outOfShots(){G.state='end';sfx.over();setTimeout(()=>{if(!G||cur!=='game')return;$('#overFact').textContent=fact(G.n+Math.floor(Math.random()*9));ov('over',true)},500)}

/* hint: a hand shows "press, pull back, let go" */
let hintAnim=null;
function showHint(){if(!G||G.state!=='ready'||cur!=='game')return;const x0=sx(LX)+cam.s*1.2,y0=sy(LAUNCH[G.lsel].oy)-cam.s*.2,dx=-Math.min(120,cam.s*2.6),dy=Math.min(90,cam.s*1.6);
  const h=$('#hint');h.style.display='block';toast(t('aimHint'));
  hintAnim=h.animate([{transform:`translate(${x0-14}px,${y0}px) scale(1)`,opacity:0},{transform:`translate(${x0-14}px,${y0}px) scale(.85)`,opacity:1,offset:.15},
    {transform:`translate(${x0-14+dx}px,${y0+dy}px) scale(.85)`,opacity:1,offset:.6},{transform:`translate(${x0-14+dx}px,${y0+dy}px) scale(1)`,opacity:0,offset:.75},{transform:`translate(${x0-14+dx}px,${y0+dy}px) scale(1)`,opacity:0}],{duration:2400,iterations:Infinity});
  // the launcher pulls back with the hand
  G.demo=performance.now()}
function hideHint(){if(hintAnim){hintAnim.cancel();hintAnim=null;$('#hint').style.display='none';store.set('hinted',1)}if(G)G.demo=0}

/* main loop: fixed 60 Hz physics */
let acc=0,lastT=0;
function loop(now){requestAnimationFrame(loop);
  const dt=Math.min(.1,(now-(lastT||now))/1000);lastT=now;
  if(cur==='game'&&G){
    if(!window.praying&&G.state!=='bism'){acc+=dt;let n=0;while(acc>=1/60&&n<4){simStep(G.sim);acc-=1/60;n++;
        if(G.state==='fly'&&turnDone(G.sim)){endTurn(G.sim);
          if(G.sim.goalsLeft>0){if(G.shots>0){G.state='ready';G.idle=now}else outOfShots()}}}
      if(acc>1/60)acc=0;handleEvents();
      if(G.winAt&&now>G.winAt&&!G.won&&G.state!=='aim'){G.winAt=0;levelWin()}
      if(G.state==='ready'&&age==='little'&&!hintAnim&&now-G.idle>9000){G.idle=now;showHint()}}
    if(G.demo&&G.state==='ready'){const k=((now-G.demo)%2400)/2400,p=k<.15?0:k<.6?(k-.15)/.45*.8:k<.75?.8:0;G.aim=p?{a:.6,p}:null}
    else if(G.demo===0&&G.state==='ready'&&G.aim&&!aimStart)G.aim=null;
    drawGame(now)}
  if(conf.length||fxDirty){drawConf();fxDirty=conf.length>0}}
let fxDirty=false;
requestAnimationFrame(loop);
addEventListener('resize',()=>{layout();if(cur==='home')renderHome()});

/* =================================================================
   Screens, navigation (house button = main menu; no swipe-back inside the game)
   ================================================================= */
function ov(id,on){$('#'+id).classList.toggle('on',on);if(on)fxDirty=true}
let toastT;function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('on'),2200)}
let cur='home';
function show(s,push=true){
  document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id===s));cur=s;document.body.classList.toggle('ing',s==='game');try{musicLevel()}catch(e){}
  if(s!=='game'){hideHint();conf=[];fxDirty=true}
  $('#bg').style.display=s==='game'?'none':'';if(s!=='game')paintBg();
  if(push){try{history.pushState({s,i:((history.state&&history.state.i)||0)+1},'')}catch(e){}}}
try{history.replaceState({s:'home',i:0},'')}catch(e){}
let btnNav=false;
window.addEventListener('popstate',e=>{
  if(!btnNav&&cur!=='home'){try{history.pushState({s:cur,i:((e.state&&e.state.i)||0)+1},'')}catch(_){}return}
  btnNav=false;['bism','win','over','lauOv','gate'].forEach(id=>ov(id,false));
  const s=(e.state&&e.state.s)||'home';if(s==='game'&&!G){show('home',false);renderHome();return}
  show(s,false);if(s==='home'){G=null;renderHome()}if(s==='map'){G=null;renderMap()}});
function goBack(){if(history.state&&history.state.s!=='home'){btnNav=true;history.back()}else{show('home');renderHome()}}
function goHome(){const i=(history.state&&history.state.i)||0;G=null;if(i>0&&history.state.s!=='home'){btnNav=true;history.go(-i)}else{show('home',false);renderHome()}}
document.querySelectorAll('.back').forEach(b=>b.addEventListener('click',()=>{sfx.tap();goBack()}));
$('#gHome').onclick=()=>{sfx.tap();['bism','win','over'].forEach(id=>ov(id,false));goHome()};
document.addEventListener('touchstart',e=>{if(cur!=='game'||!e.touches.length)return;const x=e.touches[0].clientX;if((x<28||x>innerWidth-28)&&!e.target.closest('button'))e.preventDefault()},{passive:false});
document.addEventListener('contextmenu',e=>e.preventDefault());
function holdable(el,ms,done,onTap){
  let tm=0,start=0,raf=0;const ring=el.querySelector('.ring'),tip=el.querySelector('.tip');
  const stop=()=>{cancelAnimationFrame(raf);tm=0;ring&&ring.style.setProperty('--p','0%')};
  el.addEventListener('pointerdown',e=>{e.preventDefault();start=performance.now();tm=1;
    const step=now=>{if(!tm)return;const p=Math.min(1,(now-start)/ms);ring&&ring.style.setProperty('--p',(p*100)+'%');if(p>=1){stop();done();return}raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>el.addEventListener(ev,()=>{if(tm&&performance.now()-start<300){onTap&&onTap();if(tip){tip.classList.add('on');setTimeout(()=>tip.classList.remove('on'),1500)}}stop()}))}
holdable($('#restartBtn'),1000,()=>{sfx.tap();if(!G)return;['win','over','bism'].forEach(id=>ov(id,false));startGame(G.n)});

/* ---------- home ---------- */
function paintBg(){const c=$('#bg'),d=DPR(),W=innerWidth,H=innerHeight;c.width=Math.round(W*d);c.height=Math.round(H*d);const x=c.getContext('2d');x.scale(d,d);
  const w=cur==='map'?0:0;paintWorld(x,w,W,H,H*.88,Math.min(W,H)/12)}
function renderHomeArt(){
  const a=$('#cvAdv');if(a){const x=a.getContext('2d'),W=a.width,H=a.height,s=W/7.2;x.clearRect(0,0,W,H);
    const gy=H*.9;x.fillStyle='#7ad35a';x.fillRect(0,gy,W,H-gy);x.strokeStyle=OUT;x.lineWidth=2;x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke();
    const bx=W*.68;const blk=(X,Y,w,h,m)=>{x.save();x.translate(X,Y);drawBlock(x,{w,h,mat:m,dmg:0,hp:1,x:X,y:Y,k:'box'},s);x.restore()};
    blk(bx-s*.95,gy-s*.85,PW,PH,'wood');blk(bx+s*.95,gy-s*.85,PW,PH,'wood');blk(bx,gy-s*1.9,2.3,PT,'wood');
    x.save();x.translate(bx,gy-s*.55);drawGoal(x,'cage','bird',s*1.1,0);x.restore();
    x.save();x.translate(bx,gy-s*2.66);drawGoal(x,'gift','pink',s*1.1,0);x.restore();
    if(IMG.mo.ok){const h=s*2.2,w=h*IMG.mo.naturalWidth/IMG.mo.naturalHeight;x.drawImage(IMG.mo,W*.05,gy-h,w,h)}
    drawLauncher(x,'bow',W*.3,gy,W*.3,gy-s*1.5,s*.9,.45,.6,true);
    x.setLineDash([4,7]);x.strokeStyle='#fff';x.lineWidth=3;x.beginPath();x.moveTo(W*.38,gy-s*1.9);x.quadraticCurveTo(W*.5,gy-s*3.6,W*.6,gy-s*2.9);x.stroke();x.setLineDash([])}
  const b=$('#cvLau');if(b){const x=b.getContext('2d'),W=b.width,H=b.height;x.clearRect(0,0,W,H);const av=LORDER;
    const q=Math.min(W,H)*.5;av.forEach((L,i)=>{const c=launcherIcon(L,160,true),cx0=W/2+(i%2?0:-q)+4*(i%2?1:-1),cy0=H/2+(i<2?-q:0);x.globalAlpha=LAUNCH[L].unlock<=prog.open?1:.4;x.drawImage(c,cx0,cy0,q,q);x.globalAlpha=1})}}
let idleT=0,idleI=0,idleN=0;
function stopNudge(){clearTimeout(idleT);clearInterval(idleI);document.querySelectorAll('.mode.nudge').forEach(m=>m.classList.remove('nudge'))}
function armNudge(){stopNudge();if(cur!=='home')return;idleT=setTimeout(()=>{const step=()=>{if(cur!=='home'||document.querySelector('.ov.on')){stopNudge();return}
  const ms=[$('#goAdv'),$('#goAdv'),$('#goLau')];ms.forEach(m=>m.classList.remove('nudge'));ms[idleN%3].classList.add('nudge');idleN++};step();idleI=setInterval(step,3200)},4000)}
['pointerdown','keydown','wheel'].forEach(ev=>document.addEventListener(ev,()=>{if(cur==='home')armNudge();else stopNudge()},true));
function renderHome(){armNudge();paintBg();renderHomeArt();
  $('#advBadge').innerHTML=`<img src="ui/star.webp" alt=""> ${totalStars()}`;
  $('#lauBadge').textContent=`${unlockedAt(prog.open).length}/${LORDER.length}`;
  document.querySelectorAll('#age button').forEach(b=>b.classList.toggle('on',b.dataset.a===age))}
$('#age').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;age=b.dataset.a;store.set('age',age);sfx.tap();renderHome()});
let picking=false;
function pickMode(btn,go){if(picking)return;picking=true;btn.classList.add('pick');sfx.tap();setTimeout(()=>{btn.classList.remove('pick');picking=false;go()},420)}
$('#goAdv').onclick=e=>pickMode(e.currentTarget,openMap);
$('#goLau').onclick=e=>pickMode(e.currentTarget,()=>{renderLau();ov('lauOv',true)});
$('#lauClose').onclick=()=>ov('lauOv',false);
function renderLau(){const el=$('#lauList');el.innerHTML='';LORDER.forEach(L=>{const open=LAUNCH[L].unlock<=prog.open,d=document.createElement('div');d.className=open?'':'lock';
  d.append(launcherIcon(L,144));d.insertAdjacentHTML('beforeend',`<b>${t('L')[L]}</b><small>${open?t('LD')[L]:tf('unlockAt',{n:LAUNCH[L].unlock})}</small>`);el.appendChild(d)})}
function openMap(){renderMap();show('map');const c=$('#worlds .lv.cur')||[...document.querySelectorAll('#worlds .lv:not(.lock)')].pop();if(c)setTimeout(()=>c.scrollIntoView({block:'center'}),60)}
function renderMap(){
  $('#mapSum').innerHTML=`<img src="ui/star.webp" alt=""><span>${totalStars()}/${LEVELS*3}</span>`;
  const el=$('#worlds');el.innerHTML='';
  WORLDS.forEach((WD,w)=>{const first=w*WN+1,last=first+WN-1,lockW=first>prog.open;let st=0;for(let n=first;n<=last;n++)st+=prog.stars[n]||0;
    const sec=document.createElement('div');sec.className='world w'+w+(lockW?' lock':'');
    const th=document.createElement('canvas');th.width=th.height=132;{const x=th.getContext('2d');paintWorld(x,w,132,132,104,14);x.save();x.translate(66,80);drawGoal(x,WD.goals[0],WD.goals[0]==='cage'?WD.animals[0]:w===5?'lantern':'pink',52,0);x.restore()}
    sec.innerHTML=`<div class="wh"><span class="thc"></span><div><b>${t('W')[w]}</b><small>${tf('levelsR',{a:first,b:last})}</small></div><span class="ws"><img src="ui/star.webp" alt=""> ${st}/${WN*3}</span></div><div class="lvls"></div>`;
    sec.querySelector('.thc').replaceWith(th);
    const g=sec.querySelector('.lvls');
    for(let n=first;n<=last;n++){const lk=n>prog.open,sn=prog.stars[n]||0,cu=n===prog.open&&!sn,b=document.createElement('button');b.className='lv'+(lk?' lock':cu?' cur':'');b.dataset.n=n;b.setAttribute('aria-label',tf('level',{n}));
      b.innerHTML=lk?'<img src="ui/lock.webp" alt="">':`${n}<span class="st">${[0,1,2].map(k=>`<i class="${k<sn?'on':''}"></i>`).join('')}</span>`;
      const nl=LORDER.find(L=>LAUNCH[L].unlock===n&&n>1);if(nl){const s=document.createElement('span');s.className='ln';s.append(launcherIcon(nl,80));b.appendChild(s)}
      g.appendChild(b)}
    if(lockW)sec.insertAdjacentHTML('beforeend',`<div class="wlock"><img src="ui/lock.webp" alt="">${tf('lockedW',{w:t('W')[w-1]})}</div>`);
    el.appendChild(sec)})}
$('#worlds').addEventListener('click',e=>{const b=e.target.closest('.lv');if(!b)return;const n=+b.dataset.n;if(n>prog.open){sfx.bad();toast(t('lockedLv'));b.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300});return}sfx.tap();startGame(n)});

/* ---------- language, sound ---------- */
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t(el.dataset.t)});$('#langIco').src='ui/lang-'+lang+'.webp';renderHome()}
function renderSnd(){$('#sndIco').src=soundOn?'ui/sound-on.webp':'ui/sound-off.webp'}
$('#langBtn').onclick=()=>{lang=lang==='en'?'id':'en';store.set('lang',lang);try{localStorage.setItem('moLang',lang)}catch(e){}applyLang();sfx.tap()};
$('#sndBtn').onclick=()=>{soundOn=!soundOn;store.set('sound',soundOn);renderSnd();sfx.tap()};
let gateFn=null;
function gate(fn){gateFn=fn;ov('gate',true)}
holdable($('#gHold'),3000,()=>{ov('gate',false);const f=gateFn;gateFn=null;f&&f()});
$('#gClose').onclick=()=>{ov('gate',false);gateFn=null};
/* tap effect: a pointing hand and a little firework (not on the play field, where kids aim) */
const FX_COLS=['#ff3b30','#ff8a00','#ffd60a','#1fa64a','#3fc6f5','#2f5bea','#9b4bf0','#ff5fa8'];
function tapFx(x,y,hand){const w=document.createElement('div');w.className='tapfx';w.style.left=x+'px';w.style.top=y+'px';let h='<b></b>';const n=14;
  for(let i=0;i<n;i++){const a=i/n*6.283+Math.random()*.4,d=34+Math.random()*30,c=FX_COLS[(Math.random()*FX_COLS.length)|0];
    h+=`<i class="${i%3===0?'st':''}" style="--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px;--r:${(Math.random()*360)|0}deg;background:${c};animation-delay:${(Math.random()*60)|0}ms"></i>`}
  if(hand)h+=`<em><img src="ui/hand.webp" alt="" style="width:100%;height:100%"></em>`;w.innerHTML=h;document.body.appendChild(w);setTimeout(()=>w.remove(),900)}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#cv'))return;tapFx(e.clientX,e.clientY,e.pointerType!=='mouse')},true);

/* =================================================================
   Prayer pause (same calculation as the other Mo games: Kemenag RI, Fajr 20°, Isha 18°, Asr Shafi'i,
   +2 min ihtiyat). Worked out on the device; nothing is sent anywhere. The city and the
   "I have prayed" record are shared with the other Mo games (nur:settings, nur:prayed).
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
function activePrayer(now){const td=sched(0),T0=td.t;
  if(T0.fajr&&now<T0.fajr){const yd=sched(-1);return yd.t.isha?{p:'isha',start:yd.t.isha,key:yd.key+':isha'}:null}
  if(T0.sunrise&&now<T0.sunrise)return{p:'fajr',start:T0.fajr,key:td.key+':fajr'};
  let a=null;for(const p of ['dhuhr','asr','maghrib','isha'])if(T0[p]&&now>=T0[p])a={p,start:T0[p],key:td.key+':'+p};return a}
function nextPrayer(now){const td=sched(0).t;for(const p of FIVE)if(td[p]&&td[p]>now)return{p,at:td[p]};return{p:'fajr',at:sched(1).t.fajr}}
const prayedNow=()=>nurGet('prayed',{})||{};
function markPrayed(key){const pr=prayedNow();pr[key]=1;const keep={},today=sched(0).key,yest=sched(-1).key;for(const k in pr)if(k.startsWith(today)||k.startsWith(yest))keep[k]=1;nurSet('prayed',keep)}
function dur(ms){const m=Math.max(0,Math.ceil(ms/60000)),h=Math.floor(m/60);return h?`${h}h ${m%60}m`:`${m}m`}
const pn=p=>t('P')[p];
let lock=null,lastCheck=0;window.praying=false;
function tickPrayer(now){
  if(now-lastCheck>5000||lock){if(!lock||!lock.demo){lastCheck=now;const a=activePrayer(now);
    if(a&&!prayedNow()[a.key]){if(!lock||lock.key!==a.key){lock={...a,demo:false};openLock()}}else if(lock)closeLock(false)}}
  if(lock)renderLock(now);
  if(cur==='home')renderChip(now)}
function bell(){[[1046,0],[784,.35],[1046,.7]].forEach(([f,w])=>{tone(f,1.6,'sine',.16,w);tone(f*2.01,.8,'sine',.04,w)})}
function openLock(){
  window.praying=true;musicOff();try{speechSynthesis.cancel()}catch(e){}
  if(G&&G.state==='aim'){G.state='ready';G.aim=null;aimStart=null}hideHint();
  ov('lock',true);bell();const pName=pn(lock.p);setTimeout(()=>{if(lock)say(tf('sayPray',{p:pName}))},900);renderLock(Date.now())}
function renderLock(now){const p=pn(lock.p);$('#lockRib').textContent=t('pray');$('#lockTitle').textContent=tf('lockT',{p});$('#lockBody').textContent=tf('lockB',{p});
  const ready=lock.demo?lock.readyAt:lock.start+(+PS.wait||10)*60000,rem=ready-now,b=$('#bPrayed');b.textContent='✓ '+tf('prayed',{p});
  if(rem>0){b.disabled=true;const s=Math.ceil(rem/1000);$('#lockCount').textContent=tf('lockWait',{m:Math.floor(s/60)+':'+String(s%60).padStart(2,'0')})}else{b.disabled=false;$('#lockCount').textContent=t('lockReady')}}
function closeLock(thanks){ov('lock',false);lock=null;window.praying=false;
  if(thanks){say(t('taq'));toast(t('taq'));confetti();fxDirty=true;sfx.win()}
  setTimeout(()=>{if(musicPref)musicOn()},1500);renderChip(Date.now())}
$('#bPrayed').onclick=()=>{if(!lock||$('#bPrayed').disabled)return;if(!lock.demo)markPrayed(lock.key);closeLock(true);lastCheck=0};
function renderChip(now){try{const a=activePrayer(now),nx=nextPrayer(now),c=cityInfo();
  $('#pchip').innerHTML=(a&&prayedNow()[a.key]?'✓ '+pn(a.p)+' · ':'')+`<img src="ui/masjid.webp" alt=""> ${t('nextP')}: <b>${pn(nx.p)}</b> ${nx.at?fmtT(nx.at,c.tz):'—'} · ${nx.at?dur(nx.at-now):''} · ${c.name}`}catch(e){}}
function renderSettings(){
  $('#citySel').innerHTML=CITIES.map(c=>`<option value="${c[0]}"${c[0]===PS.city?' selected':''}>${c[0]==='custom'?t('customCity'):c[1]}</option>`).join('');
  $('#llRow').classList.toggle('on',PS.city==='custom');$('#latIn').value=PS.lat||'';$('#lngIn').value=PS.lng||'';
  $('#segWait').innerHTML=[5,10,15,20].map(m=>`<button data-v="${m}" class="${+PS.wait===m?'on':''}">${m} min</button>`).join('');
  const now=Date.now(),T0=sched(0).t,c=cityInfo(),a=activePrayer(now);
  $('#ptimes').innerHTML=FIVE.map(p=>`<div class="${a&&a.p===p&&a.key.startsWith(sched(0).key)?'now':''}"><b>${T0[p]?fmtT(T0[p],c.tz):'—'}</b>${pn(p)}</div>`).join('')}
$('#setBtn').onclick=()=>gate(()=>{renderSettings();ov('settings',true)});
$('#sClose').onclick=()=>{ov('settings',false);lastCheck=0;renderChip(Date.now())};
$('#citySel').onchange=e=>{PS.city=e.target.value;savePS();renderSettings()};
['latIn','lngIn'].forEach(id=>$('#'+id).addEventListener('change',()=>{PS.lat=$('#latIn').value.trim();PS.lng=$('#lngIn').value.trim();savePS();renderSettings()}));
$('#segWait').addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;PS.wait=+b.dataset.v;savePS();renderSettings()});
$('#bPreview').onclick=()=>{ov('settings',false);lock={p:'asr',demo:true,readyAt:Date.now()+10000,key:'demo'};openLock()};
setInterval(()=>tickPrayer(Date.now()),1000);

/* start */
renderSnd();renderMus();applyLang();layout();setTimeout(()=>tickPrayer(Date.now()),300);
document.fonts&&document.fonts.ready.then(()=>renderHome());
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
/* for automated tests only */
window.__moa={get G(){return G},genLevel,makeSim,simulate,fire,simStep,turnDone,endTurn,LAUNCH,LORDER,PAR,startGame,shoot,
  get prog(){return prog},setProg(p){prog=p;store.set('prog',p)},cam};
