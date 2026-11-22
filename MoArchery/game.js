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
en:{tag:'Play Games the Islamic Way',play:'Play',playS:'60 levels in 6 worlds',
 little:'Little',littleS:'Ages 3+',big:'Big Kid',bigS:'Ages 6+',legal:'No ads · No data collected · Works offline',
 level:'Level {n}',holdR:'Hold to start again',bismS:'Say Bismillah before we start',bismB:'Bismillah!',
 mGoal:'Break the barriers and collect every treasure!',
 alh:'Alhamdulillah!',dyk:'Did you know?',next:'Next',retry:'Try again',overT:'So close!',overP:"No more arrows. Let's try again!",
 lvlDone:'Level {n} complete!',allDone:'You finished every level, MasyaAllah!',
 cheer:['MasyaAllah!','SubhanAllah!','Allahu Akbar!','Barakallah!'],cheerM:['How wonderful!','Glory be to Allah!','Allah is the Greatest!','May Allah bless you!'],
 thanks:['Thank you!','Jazakallah khair!','Yay, free!'],got:['Got it!','Yay!','Treasure!','MasyaAllah!'],
 W:['Green Garden','Sunny Beach','Shady Forest','Desert Oasis','Snowy Peaks','Lantern Night'],
 lockedW:'Finish {w} first',lockedLv:'Finish the level before to open this one',levelsR:'Levels {a}–{b}',worldOpen:'{w} is now open!',
 sayBism:'Bismillah',sayAlh:'Alhamdulillah!',aimHint:'Pull back and let go!',rot:'Turn sideways for a bigger view',
 pray:'Time to pray',lockT:'It is time for {p}',lockB:"Let's stop for a moment and pray {p} first, at the masjid or at home. Your game will wait for you.",lockWait:'The button opens in {m}',lockReady:'Done praying? Tap the button.',prayed:'I have prayed {p}',taq:'Taqabbalallahu minna wa minkum',sayPray:'It is time to pray {p}.',
 setT:'For parents',city:'City',customCity:'Custom location',wait:'Prayer pause lasts at least',today:'Prayer times today',preview:'Preview the prayer pause',method:'Kemenag RI method · Fajr 20° · Isha 18° · +2 min',nextP:'Next',
 P:{fajr:'Fajr',sunrise:'Sunrise',dhuhr:'Dhuhr',asr:'Asr',maghrib:'Maghrib',isha:'Isha'},gateT:'For grown-ups',gateS:'Hold the button for 3 seconds',
 AR:{normal:'Arrow',flame:'Fire arrow',heavy:'Heavy arrow',triple:'Triple arrow',diamond:'Diamond arrow',firework:'Firework arrow'},
 ARD:{normal:'Breaks glass, ice and wood. Too weak for brick and stone',flame:'Sets wood on fire and melts ice',heavy:'Strong and heavy. Breaks bricks',triple:'Three arrows at once',diamond:'Sharp diamond tip. The only arrow that breaks stone',firework:'Bursts into fireworks and breaks things nearby'},
 newA:'New arrow: {a}!',tough:'Too strong!',toughT:'Too strong for this arrow! Try the {a}.',toughL:'Too strong for this arrow! You will get the {a} at level {n}.',lookTip:'Drag on the right side to look around!',coinTip:'Coins buy upgrades in the Bow Workshop on the home screen!',unlockAt:'Opens at level {n}',moreA:'Here are 3 more arrows!',bonusA:'+1 arrow!',
 IT:{chest:'Treasure chest',gift:'Gift box',star:'Star',cage:'Bird cage',gem:'Jewel',gold:'Gold bars',pearl:'Pearl',crown:'Crown',ring:'Jewellery box',lantern:'Lantern',crystal:'Ice crystal'},
 tipM:{wood:'Wood breaks with arrows, and the fire arrow burns it!',glass:'Glass breaks with just one arrow!',brick:'Bricks are strong. Try the heavy arrow!',stone:'Stone is very strong. The diamond arrow breaks it!',iron:'Iron never breaks. Knock it over instead!',ice:'Ice is slippery. Things slide on it!',barrel:'Hit the firework barrel to break everything around it!'},
 wind:'Wind! It pushes your arrows.',
 workshop:'Bow Workshop',workshopS:'Make your bow stronger with coins',coinsWon:'+{n} coins',buy:'Buy',maxed:'Best!',needC:'Open more treasures to get coins!',upDone:'Upgraded: {u}!',arrowsT:'Arrows',
 UP:{bow:'Bow',quiver:'Quiver',sight:'Aim sight'},
 UPD:{bow:'Arrows hit harder',quiver:'+1 arrow in every level',sight:'Longer aim line'},
 BOWT:['Wooden bow','Bamboo bow','Silver bow','Golden bow'],
 village:'My Village',villageS:'Build it with your stars',
 vNext:'Next: {b} at {n} stars',vDone:'Your village is complete, MasyaAllah!',vBuilt:'New in your village: {b}!',
 B:{house:'Mo\'s house',garden:'Flower garden',well:'Water well',palms:'Date palms',swing:'Playground',school:'Qur\'an school',market:'Market',pond:'Pond and bridge',fountain:'Wudu place',masjid:'Masjid',minaret:'Minaret',lights:'Ramadan lights'},
 birds:'Birds I Freed',birdsS:'Birds in the Qur\'an and hadith',lockedB:'Free me from a cage in a level!',newB:'New bird friend: {b}!',
 BD:{hoopoe:'Hoopoe',sparrow:'Sparrow',finch:'Yellow finch',dove:'White dove',swallow:'Swallow',parrot:'Parrot',owl:'Owl',redbird:'Little red bird',robin:'Robin'},
 BF:{hoopoe:'The hoopoe (hud-hud) brought news to Prophet Sulaiman. (Surah An-Naml 27:20-22)',
  sparrow:'The Prophet ﷺ was kind to a little boy, Abu Umair, and asked him: "O Abu Umair, what did the little bird (nughair) do?" (Sahih al-Bukhari 6129)',
  finch:'The birds gathered around Prophet Dawud and praised Allah together with him. (Surah Sad 38:19)',
  dove:'The birds with their wings spread out praise Allah. Each one knows its own way to pray. (Surah An-Nur 24:41)',
  swallow:'Allah sent flocks of birds (ababil) to protect the Kaaba. (Surah Al-Fil 105:3-4)',
  parrot:'Birds spread and fold their wings above us. Only Ar-Rahman holds them up. (Surah Al-Mulk 67:19)',
  owl:'Birds fly high in the sky, and only Allah holds them up there. (Surah An-Nahl 16:79)',
  redbird:'A little red bird was upset because her chicks were taken. The Prophet ﷺ said: "Who has upset this bird by taking her young? Give them back to her." (Sunan Abi Dawud 2675)',
  robin:'If we truly trust Allah, He provides for us as He provides for the birds: they fly out hungry in the morning and come back full in the evening. (Jami\' at-Tirmidhi 2344)'}},
id:{tag:'Bermain dengan Cara Islami',play:'Main',playS:'60 level di 6 dunia',
 little:'Kecil',littleS:'Usia 3+',big:'Besar',bigS:'Usia 6+',legal:'Tanpa iklan · Tanpa pengumpulan data · Bisa offline',
 level:'Level {n}',holdR:'Tahan untuk mulai lagi',bismS:'Ucapkan Bismillah sebelum mulai',bismB:'Bismillah!',
 mGoal:'Hancurkan penghalangnya dan kumpulkan semua hartanya!',
 alh:'Alhamdulillah!',dyk:'Tahukah kamu?',next:'Lanjut',retry:'Coba lagi',overT:'Hampir!',overP:'Anak panahnya habis. Ayo coba lagi!',
 lvlDone:'Level {n} selesai!',allDone:'Semua level sudah selesai, MasyaAllah!',
 cheer:['MasyaAllah!','SubhanAllah!','Allahu Akbar!','Barakallah!'],cheerM:['Indah sekali!','Maha Suci Allah!','Allah Maha Besar!','Semoga Allah memberkahimu!'],
 thanks:['Terima kasih!','Jazakallah khair!','Hore, bebas!'],got:['Dapat!','Hore!','Harta karun!','MasyaAllah!'],
 W:['Taman Hijau','Pantai Cerah','Hutan Rindang','Oasis Gurun','Puncak Salju','Malam Lentera'],
 lockedW:'Selesaikan {w} dulu',lockedLv:'Selesaikan level sebelumnya untuk membuka level ini',levelsR:'Level {a}–{b}',worldOpen:'{w} sekarang terbuka!',
 sayBism:'Bismillah',sayAlh:'Alhamdulillah!',aimHint:'Tarik ke belakang, lalu lepaskan!',rot:'Miringkan HP agar lebih besar',
 pray:'Waktunya sholat',lockT:'Sudah masuk waktu {p}',lockB:'Berhenti sebentar, ayo sholat {p} dulu, di masjid atau di rumah. Permainanmu akan menunggu.',lockWait:'Tombol terbuka dalam {m}',lockReady:'Sudah sholat? Ketuk tombolnya.',prayed:'Aku sudah sholat {p}',taq:'Taqabbalallahu minna wa minkum',sayPray:'Waktunya sholat {p}.',
 setT:'Untuk orang tua',city:'Kota',customCity:'Lokasi kustom',wait:'Jeda sholat minimal',today:'Jadwal sholat hari ini',preview:'Coba jeda sholat',method:'Metode Kemenag RI · Subuh 20° · Isya 18° · ihtiyat +2 menit',nextP:'Berikutnya',
 P:{fajr:'Subuh',sunrise:'Terbit',dhuhr:'Dzuhur',asr:'Ashar',maghrib:'Maghrib',isha:'Isya'},gateT:'Untuk orang tua',gateS:'Tahan tombol selama 3 detik',
 AR:{normal:'Anak panah',flame:'Panah api',heavy:'Panah berat',triple:'Panah tiga',diamond:'Panah berlian',firework:'Panah kembang api'},
 ARD:{normal:'Memecahkan kaca, es, dan kayu. Tidak kuat untuk bata dan batu',flame:'Membakar kayu dan mencairkan es',heavy:'Kuat dan berat. Bisa memecah bata',triple:'Tiga anak panah sekaligus',diamond:'Ujung berlian yang tajam. Satu-satunya panah yang memecah batu',firework:'Meletus jadi kembang api dan memecahkan yang di dekatnya'},
 newA:'Panah baru: {a}!',tough:'Terlalu kuat!',toughT:'Terlalu kuat untuk panah ini! Coba {a}.',toughL:'Terlalu kuat untuk panah ini! Kamu akan mendapat {a} di level {n}.',lookTip:'Geser di sisi kanan untuk melihat sekeliling!',coinTip:'Koin bisa dipakai untuk meningkatkan busur di Bengkel Busur di layar utama!',unlockAt:'Terbuka di level {n}',moreA:'Ini 3 anak panah lagi!',bonusA:'+1 anak panah!',
 IT:{chest:'Peti harta',gift:'Kotak hadiah',star:'Bintang',cage:'Sangkar burung',gem:'Permata',gold:'Emas batangan',pearl:'Mutiara',crown:'Mahkota',ring:'Kotak perhiasan',lantern:'Lentera',crystal:'Kristal es'},
 tipM:{wood:'Kayu bisa dipecah dengan panah, dan panah api bisa membakarnya!',glass:'Kaca pecah hanya dengan satu anak panah!',brick:'Bata itu kuat. Coba panah berat!',stone:'Batu sangat kuat. Panah berlian bisa memecahkannya!',iron:'Besi tidak bisa pecah. Jatuhkan saja!',ice:'Es itu licin. Benda bisa meluncur!',barrel:'Tembak tong kembang api untuk memecahkan semua di sekitarnya!'},
 wind:'Ada angin! Anak panahmu akan terdorong.',
 workshop:'Bengkel Busur',workshopS:'Buat busurmu lebih kuat dengan koin',coinsWon:'+{n} koin',buy:'Beli',maxed:'Terbaik!',needC:'Buka lebih banyak harta untuk mendapat koin!',upDone:'Ditingkatkan: {u}!',arrowsT:'Anak panah',
 UP:{bow:'Busur',quiver:'Tabung panah',sight:'Bidikan'},
 UPD:{bow:'Anak panah lebih kuat',quiver:'+1 anak panah di setiap level',sight:'Garis bidik lebih panjang'},
 BOWT:['Busur kayu','Busur bambu','Busur perak','Busur emas'],
 village:'Desaku',villageS:'Bangun dengan bintangmu',
 vNext:'Berikutnya: {b} di {n} bintang',vDone:'Desamu sudah lengkap, MasyaAllah!',vBuilt:'Baru di desamu: {b}!',
 B:{house:'Rumah Mo',garden:'Taman bunga',well:'Sumur',palms:'Pohon kurma',swing:'Taman bermain',school:'TPA (sekolah Al-Qur\'an)',market:'Pasar',pond:'Kolam dan jembatan',fountain:'Tempat wudu',masjid:'Masjid',minaret:'Menara',lights:'Lampu Ramadan'},
 birds:'Burung Sahabatku',birdsS:'Burung dalam Al-Qur\'an dan hadits',lockedB:'Bebaskan aku dari sangkar di sebuah level!',newB:'Sahabat burung baru: {b}!',
 BD:{hoopoe:'Burung Hud-hud',sparrow:'Burung pipit',finch:'Burung kenari',dove:'Merpati putih',swallow:'Burung layang-layang',parrot:'Burung beo',owl:'Burung hantu',redbird:'Burung merah kecil',robin:'Burung robin'},
 BF:{hoopoe:'Burung hud-hud membawa kabar kepada Nabi Sulaiman. (QS An-Naml: 20-22)',
  sparrow:'Nabi ﷺ menyayangi anak kecil bernama Abu Umair dan bertanya kepadanya: "Wahai Abu Umair, apa yang dilakukan burung kecilmu (nughair)?" (HR. Bukhari 6129)',
  finch:'Burung-burung berkumpul di sekitar Nabi Dawud dan bertasbih kepada Allah bersama beliau. (QS Shad: 19)',
  dove:'Burung-burung yang mengembangkan sayapnya bertasbih kepada Allah. Masing-masing tahu cara sholat dan tasbihnya. (QS An-Nur: 41)',
  swallow:'Allah mengirim burung-burung yang berbondong-bondong (ababil) untuk melindungi Ka\'bah. (QS Al-Fil: 3-4)',
  parrot:'Burung-burung mengembangkan dan mengatupkan sayapnya di atas kita. Hanya Ar-Rahman yang menahannya. (QS Al-Mulk: 19)',
  owl:'Burung-burung terbang tinggi di langit, dan hanya Allah yang menahannya di sana. (QS An-Nahl: 79)',
  redbird:'Seekor burung merah kecil gelisah karena anak-anaknya diambil. Nabi ﷺ bersabda: "Siapa yang membuat burung ini sedih karena anaknya? Kembalikan anak-anaknya kepadanya." (HR. Abu Dawud 2675)',
  robin:'Jika kita benar-benar bertawakal kepada Allah, Allah akan memberi rezeki seperti Dia memberi rezeki kepada burung: pagi pergi dalam keadaan lapar, sore pulang dalam keadaan kenyang. (HR. Tirmidzi 2344)'}}};
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
 shoot(at){tone(at==='heavy'?140:190,.22,'triangle',.16,0,95);noise(3000,.12,.08,0,'highpass',.7);
   if(at==='triple'){tone(240,.15,'triangle',.08,.04,120);tone(220,.15,'triangle',.08,.08,110)}
   if(at==='firework')tone(700,.25,'sine',.06,0,1400);if(at==='flame')noise(1500,.3,.08,0,'bandpass',.6);if(at==='diamond')tone(2400,.15,'sine',.05,0,3200)},
 hit(m,s){const now=performance.now();if(now-lastHit<70)return;lastHit=now;const v=Math.min(.2,.04+s*.012);
   if(m==='ice'||m==='glass'){tone(1700+Math.random()*500,.08,'sine',v*.8);noise(6500,.05,v*.6,0,'highpass',1)}
   else if(m==='stone'||m==='brick'){tone(m==='brick'?200:150,.1,'triangle',v);noise(500,.08,v*.8,0,'lowpass',1)}
   else if(m==='iron'){tone(520,.25,'sine',v*.7);tone(1310,.2,'sine',v*.3)}
   else if(m==='ground'){noise(300,.12,v*.7,0,'lowpass',.8)}
   else{tone(260+Math.random()*60,.08,'triangle',v);noise(900,.06,v*.7)}},
 burn(){noise(900,.5,.06,0,'bandpass',.5)},
 brk(m){if(m==='ice'||m==='glass'){[0,1,2,3].forEach(i=>tone(1800+Math.random()*1400,.12,'sine',.07,i*.03));noise(7000,.2,.12,0,'highpass',.8)}
   else if(m==='stone'||m==='brick'){noise(m==='brick'?600:380,.35,.22,0,'lowpass',.8);tone(95,.25,'triangle',.15,0,60)}
   else{noise(1200,.25,.18,0,'bandpass',.9);tone(180,.14,'triangle',.1,0,120)}},
 gift(){[784,988,1175,1568].forEach((f,i)=>tone(f,.25,'triangle',.11,i*.07))},
 coin(){tone(1319,.07,'square',.05);tone(1976,.18,'square',.05,.07)},
 free(){tone(2200,.09,'sine',.1,0,3000);tone(2400,.09,'sine',.1,.12,3300);tone(2000,.12,'sine',.08,.26,2900)},
 boom(){noise(700,.5,.25,0,'lowpass',.7);tone(120,.3,'sine',.18,0,50);[0,1,2,3,4].forEach(i=>tone(900+Math.random()*1200,.1,'sine',.05,.12+i*.06))},
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
   Worlds, arrows, barriers and treasures
   ================================================================= */
const OUT='#4a2c14';
const hexRgb=h=>{const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]};
const mix=(h,k)=>{const c=hexRgb(h);return 'rgb('+c.map(v=>Math.round(k>=0?v+(255-v)*k:v*(1+k))).join(',')+')'};
function rr(x,X,Y,W,H,r){r=Math.max(0,Math.min(r,W/2,H/2));x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+W,Y,X+W,Y+H,r);x.arcTo(X+W,Y+H,X,Y+H,r);x.arcTo(X,Y+H,X,Y,r);x.arcTo(X,Y,X+W,Y,r);x.closePath()}
const WORLDS=[
 {id:'garden',items:['gift','star','cage','chest'],mats:['wood','wood','glass'],sky:['#6cc8ff','#c9f0ff'],hill:['#8fdc6a','#5fbf4a'],gr:['#7ad35a','#a4703f'],cap:'#7ad35a',birds:['sparrow','hoopoe','finch']},
 {id:'beach',items:['pearl','chest','gift','cage'],mats:['wood','glass','brick'],sky:['#4fc0ff','#d6f6ff'],hill:['#2fb8e0','#1590c8'],gr:['#ffe2a0','#e8b866'],cap:'#ffe2a0',birds:['dove','swallow','sparrow']},
 {id:'forest',items:['gem','cage','star','chest'],mats:['wood','brick','stone'],sky:['#7fd8c0','#e0fff0'],hill:['#3e9e5a','#2a7a44'],gr:['#5cbf4a','#8a5a30'],cap:'#5cbf4a',birds:['parrot','owl','hoopoe']},
 {id:'desert',items:['gold','ring','chest','cage'],mats:['brick','stone','wood'],sky:['#ffb86a','#fff0c0'],hill:['#f0c070','#d89a48'],gr:['#f6cf84','#d89a48'],cap:'#f6cf84',birds:['hoopoe','swallow','redbird']},
 {id:'snow',items:['crystal','gift','cage','star'],mats:['ice','ice','wood','stone'],sky:['#9ccfff','#f0f8ff'],hill:['#ffffff','#cfe4f5'],gr:['#ffffff','#b9d6ee'],cap:'#ffffff',birds:['robin','owl','sparrow']},
 {id:'night',items:['lantern','crown','gem','cage','chest'],mats:['stone','brick','glass','wood'],sky:['#1a1650','#4b3a9a'],hill:['#2e2a6e','#201c52'],gr:['#2f7a52','#5a3a2a'],cap:'#3d9a66',birds:['owl','redbird','finch','dove']}];
const BIRDS=['hoopoe','sparrow','finch','dove','swallow','parrot','owl','redbird','robin'];
const LEVELS=60,WN=10;
const worldOf=n=>Math.min(5,Math.floor((n-1)/WN));
const LX=2.75,OY=1.5,BOWV=17.5;   // where the bow stands, its height and how fast a full pull shoots
/* arrows: v = speed factor, d = density */
const ARROWS={normal:{unlock:1,d:6,v:1},flame:{unlock:6,d:6,v:1},heavy:{unlock:11,d:15,v:.9},triple:{unlock:16,d:6,v:1},diamond:{unlock:21,d:8,v:1},firework:{unlock:34,d:6,v:1}};
const AORDER=['normal','flame','heavy','triple','diamond','firework'];
const MAT={glass:{d:.8,f:.4,r:.05,hp:1.6},ice:{d:.9,f:.3,r:.05,hp:2.6},wood:{d:1,f:.7,r:.05,hp:6},brick:{d:1.8,f:.8,r:.02,hp:10},stone:{d:2.4,f:.8,r:.02,hp:16},iron:{d:3.4,f:.6,r:.02,hp:0}};
/* damage = impulse x this, by what was hit (iron has no hp, so it never breaks) */
/* each arrow only breaks the materials it is made for (0 = too strong: the block just shakes) */
const MULT={normal:{glass:2.6,ice:2,wood:1.1,brick:0,stone:0,goal:1.6,barrel:3},
 heavy:{glass:2.6,ice:2.2,wood:1.5,brick:1.15,stone:0,goal:1.6,barrel:3},
 diamond:{glass:2.6,ice:2.2,wood:1.2,brick:1.3,stone:1.15,goal:1.6,barrel:3}};
MULT.triple=MULT.normal;MULT.firework=MULT.normal;
/* the fire arrow lights wood instead of smashing it (the fire does the work) */
MULT.flame={...MULT.normal,wood:.05};
/* which arrow to suggest when a block is too strong */
const NEEDS={brick:'heavy',stone:'diamond'};
/* blocks knocked over break only if they are weak; bricks and stone never break by falling */
const FALLK={glass:1.6,ice:1,wood:1,brick:0,stone:0,goal:1,barrel:1};
const BLAST={glass:2,ice:2,wood:1.3,brick:1,stone:0,goal:1.2,barrel:3};
/* the treasures: hp to break them open and how many coins they give */
const ITEM={chest:{hp:3.4,c:20},gift:{hp:2.4,c:6},star:{hp:2,c:6},cage:{hp:3.4,c:8},gem:{hp:2.6,c:15},gold:{hp:3,c:15},pearl:{hp:2.6,c:12},crown:{hp:3,c:25},ring:{hp:2.6,c:15},lantern:{hp:2,c:6},crystal:{hp:2.4,c:12}};
/* workshop upgrades (bought with coins) */
const UPS={bow:{cost:[80,200,400]},quiver:{cost:[50,150,300]},sight:{cost:[40,120,250]}};
const BOWK=[1,1.2,1.4,1.65],SIGHT=[.45,.8,1.3,2.4];
const upLv=k=>(prog.up&&prog.up[k])||0;

/* =================================================================
   Levels. Sizes in metres, y up, ground at y=0.
   Every level: treasures hidden in forts of glass, ice, wood, brick, stone and iron.
   ================================================================= */
const PW=.42,PH=1.7,PT=.42,GS=1.1,CR=.9,CB=.55;
/* from the test bot: arrows a good player needs (PAR) and which seed makes each level (LVK).
   Re-run the bot whenever the level maker changes. */
const PAR=[1,1,2,2,2,2,1,2,1,2,1,1,2,2,2,2,3,4,2,3,1,1,2,3,3,1,4,4,2,4,2,1,1,2,2,3,5,3,2,3,1,1,2,2,3,2,6,2,2,3,1,3,3,2,3,3,2,4,3,4];
const LVK=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const LVC={};
function genLevel(n){if(LVC[n])return LVC[n];let lv;const k0=LVK[n-1]||0;for(let k=k0;k<k0+12;k++){lv=genRaw(n,k);if(stable(lv))break}return LVC[n]=lv}
function stable(lv){const S=makeSim(lv);for(let i=0;i<300;i++)simStep(S);return S.goals.every(g=>!g.done)&&!S.ev.some(e=>e.e==='break'||e.e==='boom')}
const arrowsAt=n=>AORDER.filter(a=>ARROWS[a].unlock<=n);
function genRaw(n,k){
  const w=worldOf(n),i=(n-1)%WN,R=seeded(n*9973+7+k*7919),WD=WORLDS[w];
  const pick=a=>a[Math.floor(R()*a.length)],rnd=(a,b)=>a+R()*(b-a),r1=v=>Math.round(v*10)/10;
  const items=[];let top=0,ii=Math.floor(R()*WD.items.length),bi=Math.floor(R()*WD.birds.length),ci=0;
  const lv={n,w,items,wind:0};
  /* the world's strongest material only shows up once the arrow for it is open */
  const mats=WD.mats.filter(m=>m!=='stone'||n>=ARROWS.diamond.unlock);
  const mat=()=>pick(mats);
  const box=(m,x,y,w2,h)=>{items.push({k:'box',mat:m,x,y,w:w2,h});top=Math.max(top,y+h/2)};
  const tri=(m,x,y,w2,h)=>{items.push({k:'tri',mat:m,x,y,w:w2,h});top=Math.max(top,y+h)};
  const rock=(x,w2,h)=>{items.push({k:'rock',x,y:h/2,w:w2,h});top=Math.max(top,h)};
  const goal=(x,y)=>{const g=WD.items[ii++%WD.items.length];const v=g==='cage'?WD.birds[bi++%WD.birds.length]:g==='gift'?['pink','blue','purple','green'][ci++%4]:g==='gem'?['ruby','emerald','sapphire'][ci++%3]:'';
    items.push({k:'goal',g,v,x,y:y+GS/2,w:GS,h:GS});top=Math.max(top,y+GS)};
  const barrel=(x,y)=>{items.push({k:'barrel',x,y:y+.45,w:.8,h:.9});top=Math.max(top,y+.9)};
  function frame(x,y,L,m,fill){
    box(m,x-L/2+PW/2,y+PH/2,PW,PH);box(m,x+L/2-PW/2,y+PH/2,PW,PH);if(L>3.5)box(m,x,y+PH/2,PW,PH);
    if(fill){if(L>3.5){fill(x-L/4-.02,y);fill(x+L/4+.02,y)}else fill(x,y)}
    box(m,x,y+PH+PT/2,L,PT);return y+PH+PT}
  function tower(x,y,floors,L,ms,inside,topK){
    let yy=y;for(let f=0;f<floors;f++)yy=frame(x,yy,L,ms[f%ms.length],inside[f]?goal:null);
    if(topK==='goal')goal(x,yy);else if(topK==='roof')tri(ms[0],x,yy,L,1);else if(topK==='crate')box(ms[0],x,yy+CR/2,CR,CR);else if(topK==='barrel')barrel(x,yy);
    return yy}
  /* a vault: a block wall all round a treasure, 4 x 4 small blocks with the treasure in the middle */
  function vault(x,y,m){const x0=x-CB*1.5;
    for(let r=0;r<4;r++)for(let c=0;c<4;c++){if((r===1||r===2)&&(c===1||c===2))continue;box(m,x0+c*CB,y+CB/2+r*CB,CB,CB)}
    items.push({k:'goal',...nextGoal(),x,y:y+CB*2,w:GS,h:GS});top=Math.max(top,y+CB*4);return y+CB*4}
  function nextGoal(){const g=WD.items[ii++%WD.items.length];return{g,v:g==='cage'?WD.birds[bi++%WD.birds.length]:g==='gift'?['pink','blue','purple','green'][ci++%4]:g==='gem'?['ruby','emerald','sapphire'][ci++%3]:''}}
  function pile(x,y,rows,m){let yy=y;for(let r=0;r<rows;r++){const kk=rows-r+1;for(let c=0;c<kk;c++)box(m,x+(c-(kk-1)/2)*(CR+.04),yy+CR/2,CR,CR);yy+=CR}goal(x,yy);return yy}
  const maxF=Math.min(3,1+Math.floor((n-1)/12));
  if(n===1)tower(11,0,1,2.3,['wood'],[1],null);
  else if(n===2)tower(12,0,1,2.3,['wood'],[0],'goal');
  else if(n===3){tower(10.5,0,1,2.3,['glass'],[1],null);tower(14.3,0,1,2.3,['wood'],[0],'goal')}
  else{
    /* some later levels put the forts far away, so the camera has to travel to them */
    const far=n>=4&&i%3===1?r1(3+w*.6):0;lv.far=far;
    const nS=i<2?1:i<6?2:(w>=1?3:2);let x=9.4+far;
    for(let s=0;s<nS;s++){
      const ped=(w>=1&&R()<.3)?r1(rnd(.8,1.8)):0;
      const kind=n>=5&&R()<.3?'vault':n>5&&R()<.2?'pile':'tower';
      const L=kind==='tower'&&n>10&&R()<.3?4.3:2.3,span=kind==='pile'?CR*3+.2:kind==='vault'?CB*4:L;
      if(s>0)x+=span/2+1.6;else x+=span/2;
      let base=0;if(ped){rock(x,span+.8,ped);base=ped}
      if(kind==='vault')vault(x,base,mat());
      else if(kind==='pile')pile(x,base,R()<.5?1:2,mat());
      else{const floors=1+Math.floor(R()*maxF),ms=[...Array(floors)].map(mat);
        const inside=[...Array(floors)].map((_,f)=>f===0?R()<.7:R()<.5);
        let topK=pick(['goal','goal','roof','crate',null]);if(n>=5&&R()<.25)topK='barrel';
        if(!inside.some(Boolean)&&topK!=='goal')inside[floors-1]=1;
        tower(x,base,floors,L,ms,inside,topK)}
      // an iron shield in front sometimes (forest and later)
      if(w>=2&&R()<.3)box('iron',x-span/2-.45,PH/2,PW,PH);
      // a firework barrel on the ground next to it
      if(n>=7&&R()<.3)barrel(x+span/2+.6,base?0:0);
      x+=span/2+(ped?.4:0)+.4}}
  /* bonus things in the air: coins, and sometimes a bundle of arrows */
  const nc=n<3?1:2+Math.floor(R()*3);for(let c=0;c<nc;c++)items.push({k:'coin',x:r1(rnd(5.5,9)),y:r1(rnd(2,5.2))});
  if(n>=4&&i%4===3)items.push({k:'bundle',x:r1(rnd(6,8.5)),y:r1(rnd(3.5,5.5))});
  if(w===3&&i>=2)lv.wind=r1(pick([-1,1])*rnd(.8,1.8));
  if(w===4)lv.slip=1;
  const right=Math.max(...items.map(it=>(it.x||0)+(it.w||0)/2));
  lv.width=Math.max(17,right+2.4);lv.top=Math.max(top,5.6);
  lv.goals=items.filter(it=>it.k==='goal').length;
  lv.mats=[...new Set(items.filter(it=>it.mat).map(it=>it.mat))];if(items.some(it=>it.k==='barrel'))lv.mats.push('barrel');
  lv.par=PAR[n-1]||Math.max(1,Math.ceil(lv.goals/2));
  return lv}

/* =================================================================
   The physics world (also used by the test bot without drawing)
   ================================================================= */
const V=(x,y)=>planck.Vec2(x,y);
function makeSim(lv,opt){opt=opt||{};
  const W=new planck.World({gravity:V(0,-10)});
  const S={W,lv,list:[],proj:[],ev:[],dmgOn:false,goals:[],goalsLeft:0,turn:null,hitQ:new Set(),steps:0,maxImp:0,maxMat:'',bonus:[],dmgK:opt.dmgK||1};
  const ground=W.createBody();ground.createFixture(planck.Edge(V(-80,0),V(240,0)),{friction:.9});S.ground=ground;
  for(const it of lv.items){const u={...it,dmg:0};let b=null;
    if(it.k==='rock'){b=W.createBody({type:'static',position:V(it.x,it.y)});b.createFixture(planck.Box(it.w/2,it.h/2),{friction:.9})}
    else if(it.k==='box'||it.k==='tri'||it.k==='goal'||it.k==='barrel'){
      const m=it.k==='goal'?{d:.7,f:.6,r:.05}:it.k==='barrel'?{d:.8,f:.6,r:.05}:MAT[it.mat];b=W.createDynamicBody({position:V(it.x,it.y)});
      const sh=it.k==='tri'?planck.Polygon([V(-it.w/2,0),V(it.w/2,0),V(0,it.h)]):planck.Box(it.w/2,it.h/2);
      b.createFixture(sh,{density:m.d,friction:lv.slip&&it.mat==='ice'?.12:m.f,restitution:m.r});
      u.hp=it.k==='goal'?ITEM[it.g].hp:it.k==='barrel'?1.2:m.hp;
      if(it.k==='goal'){const g={u,key:'g:'+it.g,done:false};S.goals.push(g);u.goal=g}}
    else if(it.k==='coin'||it.k==='bundle'){S.bonus.push(u);S.list.push(u);continue}
    if(b){u.b=b;b.setUserData(u)}S.list.push(u)}
  W.on('post-solve',(c,imp)=>onImpact(S,c,imp));
  /* an arrow that is too weak for a block bounces off it: the block only shakes */
  W.on('pre-solve',c=>{if(!S.dmgOn)return;const A=c.getFixtureA().getBody().getUserData(),B=c.getFixtureB().getBody().getUserData();
    const p=A&&A.k==='proj'?A:B&&B.k==='proj'?B:null,u=p===A?B:A;
    if(!p||!u||!u.hp||u.dead||MULT[p.at][keyOf(u)]!==0)return;c.setEnabled(false);
    if(!p.blocked){p.blocked=1;p.touched=1;if(S.steps-(u.toughT||-99)>40){u.toughT=S.steps;S.ev.push({e:'tough',u,at:p.at})}}});
  W.on('begin-contact',c=>{for(const f of [c.getFixtureA(),c.getFixtureB()]){const u=f.getBody().getUserData();if(u&&u.k==='proj'){u.touched=1;if(u.at==='firework'&&!u.burst)u.burstQ=1;
      if(u.at==='flame'&&!u.lit){const o=(f===c.getFixtureA()?c.getFixtureB():c.getFixtureA()).getBody().getUserData();if(o&&!o.dead){if(o.mat==='wood'){u.lit=1;if(!o.burn){o.burn=1;S.ev.push({e:'ignite',x:o.b.getPosition().x,y:o.b.getPosition().y})}}else if(o.mat==='ice'){u.lit=1;S.hitQ.add(o)}}}}}});
  for(let k=0;k<90;k++)W.step(1/60,8,3);
  for(const u of S.list)if(u.b&&u.b.isDynamic()){u.b.setLinearVelocity(V(0,0));u.b.setAngularVelocity(0);if(u.k==='goal')u.y0=u.b.getPosition().y}
  S.goalsLeft=S.goals.length;S.dmgOn=true;return S}
function onImpact(S,c,imp){
  if(!S.dmgOn)return;const n=c.getManifold().pointCount;let s=0;for(let i=0;i<n;i++)s+=imp.normalImpulses[i]||0;
  if(s<.3)return;
  const A=c.getFixtureA().getBody().getUserData(),B=c.getFixtureB().getBody().getUserData();
  const pa=A&&A.k==='proj'?A:null,pb=B&&B.k==='proj'?B:null;
  hurt(S,A,s,pb);hurt(S,B,s,pa);
  if(s>S.maxImp){S.maxImp=s;const u=(A&&A.mat)?A:(B&&B.mat)?B:null;S.maxMat=u?u.mat:'ground'}}
const keyOf=u=>u.k==='goal'?'goal':u.k==='barrel'?'barrel':u.mat;
function hurt(S,u,s,p){
  if(!u||u.dead)return;
  if(p&&s>1.2&&u.mat==='iron'&&S.steps-(u.toughT||-99)>40){u.toughT=S.steps;S.ev.push({e:'tough',u,at:p.at})}
  if(!u.hp)return;const key=keyOf(u);
  const d=p?s*MULT[p.at][key]*S.dmgK:Math.max(0,s-.9)*FALLK[key];
  if(d<=0)return;u.dmg+=d;if(u.dmg>=u.hp)S.hitQ.add(u)}
function removeBody(S,u,lost){
  if(u.dead)return;u.dead=1;const q=u.b.getPosition();
  S.ev.push({e:u.k==='goal'?'goal':u.k==='proj'?'pgone':u.k==='barrel'?'boom':'break',u,x:q.x,y:q.y,a:u.b.getAngle(),lost:!!lost});
  S.W.destroyBody(u.b);
  if(u.k==='goal'&&!u.goal.done){u.goal.done=true;S.goalsLeft--}
  if(u.k==='barrel'&&!lost)blast(S,q,3,5.5)}
/* a firework burst: pushes things away and breaks the weak ones */
function blast(S,q,R,pow){
  for(const u of S.list){if(u.dead||!u.b||!u.b.isDynamic())continue;const o=u.b.getPosition(),dx=o.x-q.x,dy=o.y-q.y,d=Math.hypot(dx,dy);if(d>R)continue;
    const k=1-d/R,m=Math.min(u.b.getMass(),3);u.b.applyLinearImpulse(V(dx/(d||1)*k*5*m,(dy/(d||1)*k*5+k*2)*m),o,true);
    if(u.hp){u.dmg+=pow*k*BLAST[keyOf(u)]*S.dmgK;if(u.dmg>=u.hp)S.hitQ.add(u)}}}
function segPt(ax,ay,bx,by,px,py){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;let t=l?((px-ax)*dx+(py-ay)*dy)/l:0;t=Math.max(0,Math.min(1,t));return Math.hypot(ax+dx*t-px,ay+dy*t-py)}
function simStep(S){
  S.maxImp=0;S.steps++;const lv=S.lv;
  for(const p of S.proj)if(!p.dead){const q=p.b.getPosition();p.px=q.x;p.py=q.y;
    if(!p.touched){const v=p.b.getLinearVelocity();p.b.setTransform(q,Math.atan2(v.y,v.x));p.b.setAngularVelocity(0)}
    if(lv.wind&&!p.touched)p.b.applyForceToCenter(V(p.b.getMass()*lv.wind,0),true)}
  S.W.step(1/60,8,3);
  for(const p of S.proj)if(p.blocked===1&&!p.dead){p.blocked=2;const v=p.b.getLinearVelocity();p.b.setLinearVelocity(V(-v.x*.18,Math.abs(v.y)*.1+1.5));p.b.setAngularVelocity(6)}
  // arrows flying through coins and arrow bundles
  for(const p of S.proj){if(p.dead||p.px==null)continue;const q=p.b.getPosition();
    for(const o of S.bonus)if(!o.got&&segPt(p.px,p.py,q.x,q.y,o.x,o.y)<.55){o.got=1;S.ev.push({e:o.k,x:o.x,y:o.y})}}
  for(const p of S.proj)if(p.burstQ&&!p.dead){p.burst=1;const q=p.b.getPosition();S.ev.push({e:'boom',x:q.x,y:q.y,small:1});blast(S,{x:q.x,y:q.y},2.4,4.2);removeBody(S,p)}
  // fire: burning wood spreads to the wood it touches, then burns away
  for(const u of S.list)if(u.burn&&!u.dead){u.burn++;
    if(u.burn===35){const a=u.b.getFixtureList().getAABB(0);
      for(const o of S.list)if(o.mat==='wood'&&!o.burn&&!o.dead&&o.b){const q=o.b.getFixtureList().getAABB(0);
        if(q.lowerBound.x<a.upperBound.x+.1&&q.upperBound.x>a.lowerBound.x-.1&&q.lowerBound.y<a.upperBound.y+.1&&q.upperBound.y>a.lowerBound.y-.1)o.burn=1}}
    if(u.burn>=110)S.hitQ.add(u)}
  for(let g=0;g<6&&S.hitQ.size;g++){const q=[...S.hitQ];S.hitQ.clear();for(const u of q)removeBody(S,u)}
  // treasures that fall out of their fort onto the ground are collected too
  for(const u of S.list){if(u.dead||!u.b||!u.b.isDynamic())continue;const q=u.b.getPosition();
    if(q.y<-4||q.x>lv.width+30||q.x<-20){removeBody(S,u,true);continue}
    if(u.k==='goal'&&u.y0>1&&q.y<GS/2+.12)removeBody(S,u)}
  for(const p of S.proj)if(!p.dead){const q=p.b.getPosition();if(q.y<-4||q.x>lv.width+30||q.x<-20)removeBody(S,p,true)}
  if(S.list.some(u=>u.dead))S.list=S.list.filter(u=>!u.dead);
  if(S.proj.some(u=>u.dead))S.proj=S.proj.filter(u=>!u.dead);
  if(S.maxImp>1.2)S.ev.push({e:'hit',s:S.maxImp,m:S.maxMat});
  if(S.turn)S.turn.t++}
function spawnArrow(S,at,x,y,vx,vy){
  const b=S.W.createDynamicBody({position:V(x,y),angle:Math.atan2(vy,vx),bullet:true});
  b.createFixture(planck.Box(.5,.07),{density:ARROWS[at].d,friction:.4,restitution:.05});
  b.setLinearVelocity(V(vx,vy));const u={k:'proj',at,b,born:S.steps};b.setUserData(u);S.proj.push(u);return u}
const clampAng=a=>Math.max(-.35,Math.min(1.45,a));
function launchVel(at,ang,pow){const sp=BOWV*ARROWS[at].v*Math.max(.15,Math.min(1,pow));return[Math.cos(ang)*sp,Math.sin(ang)*sp]}
function launchPos(ang){return[LX+Math.cos(ang)*.7,OY+Math.sin(ang)*.7]}
function fire(S,at,ang,pow){ang=clampAng(ang);const [x,y]=launchPos(ang);
  S.turn={t:0,quiet:0};
  const angs=at==='triple'?[ang-.09,ang,ang+.09]:[ang];
  for(const a of angs){const [vx,vy]=launchVel(at,a,pow);spawnArrow(S,at,x,y+(a-ang)*.5,vx,vy)}}
/* a turn ends when everything has settled */
function turnDone(S){const T=S.turn;if(!T)return false;let moving=S.list.some(u=>u.burn&&!u.dead);
  for(const u of S.list){if(!u.b||!u.b.isDynamic()||!u.b.isAwake())continue;const v=u.b.getLinearVelocity();if(v.x*v.x+v.y*v.y>.04||Math.abs(u.b.getAngularVelocity())>.3){moving=true;break}}
  if(!moving)for(const p of S.proj){const v=p.b.getLinearVelocity();if(v.x*v.x+v.y*v.y>.12){moving=true;break}}
  T.quiet=moving?0:T.quiet+1;
  return(T.t>50&&T.quiet>25)||T.t>600}
function endTurn(S){for(const p of [...S.proj])removeBody(S,p);S.proj=[];S.turn=null}
/* the test bot plays a level from scratch: [{l:arrow,a,p}, ...] */
function simulate(n,shots,lv){const S=makeSim(lv||genLevel(n));let used=0;
  for(const sh of shots){if(S.goalsLeft<=0)break;fire(S,sh.l,sh.a,sh.p);used++;do{simStep(S)}while(!turnDone(S));endTurn(S);S.ev.length=0}
  return{left:S.goalsLeft,used,goals:S.goals.length}}
/* =================================================================
   Drawing helpers (pixel space). s = pixels per metre.
   Code drawings until the owner's art arrives.
   ================================================================= */
const IMG={};[['mo','../home/mo.webp'],['jump','art/mo-jump.webp'],['star','ui/star.webp']].forEach(([k,src])=>{const i=new Image();i.onload=()=>{i.ok=1;if(typeof renderHomeArt==='function')renderHomeArt()};i.src=src;IMG[k]=i});
function lw(s){return Math.max(1.4,s*.055)}
function drawBlock(x,u,s){
  const W=u.w*s,H=u.h*s,m=u.mat,l=lw(s);x.lineJoin='round';
  if(u.k==='tri'){x.beginPath();x.moveTo(-W/2,0);x.lineTo(W/2,0);x.lineTo(0,-H);x.closePath();
    const g=x.createLinearGradient(0,-H,0,0);matStops(g,m);x.fillStyle=g;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
    if(m==='wood'){x.beginPath();x.moveTo(-W*.25,-H*.25);x.lineTo(W*.25,-H*.25);x.strokeStyle='rgba(120,60,10,.35)';x.lineWidth=l*.7;x.stroke()}
    cracks(x,u,-W/4,-H*.6,W/2,H*.5,s);return}
  const rad=m==='brick'||m==='stone'?Math.min(W,H)*.12:Math.min(W,H)*.22;
  rr(x,-W/2,-H/2,W,H,rad);
  const g=W>H?x.createLinearGradient(0,-H/2,0,H/2):x.createLinearGradient(-W/2,0,W/2,0);matStops(g,m);x.fillStyle=g;x.fill();
  x.save();x.clip();const sh=Math.min(W,H);
  if(m==='wood'){x.strokeStyle='rgba(120,60,10,.32)';x.lineWidth=l*.6;const lng=Math.max(W,H);
    for(const k of [-.18,.2]){x.beginPath();if(W>H){x.moveTo(-W/2+sh*.4,k*H);x.lineTo(W/2-sh*.6,k*H)}else{x.moveTo(k*W,-H/2+sh*.4);x.lineTo(k*W,H/2-sh*.6)}x.stroke()}
    if(lng>sh*1.6){x.beginPath();x.ellipse(W>H?W*.22:0,W>H?0:H*.22,sh*.12,sh*.07,W>H?0:Math.PI/2,0,7);x.stroke()}}
  else if(m==='ice'||m==='glass'){x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.moveTo(-W/2,-H/2+sh*.25);x.lineTo(-W/2+sh*.25,-H/2);x.lineTo(-W/2+sh*.45,-H/2);x.lineTo(-W/2,-H/2+sh*.45);x.fill();
    if(m==='glass'){x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=Math.max(1,s*.035);x.beginPath();x.moveTo(W*.1,H*.35);x.lineTo(W*.32,H*.1);x.stroke()}}
  else if(m==='brick'){x.strokeStyle='rgba(255,230,200,.75)';x.lineWidth=Math.max(1,s*.04);const bh=s*.18,bw=s*.36;
    for(let yy=-H/2+bh,r=0;yy<H/2;yy+=bh,r++){x.beginPath();x.moveTo(-W/2,yy);x.lineTo(W/2,yy);x.stroke()}
    for(let yy=-H/2,r=0;yy<H/2;yy+=bh,r++)for(let xx=-W/2+(r%2?bw/2:0);xx<W/2;xx+=bw){x.beginPath();x.moveTo(xx,yy);x.lineTo(xx,yy+bh);x.stroke()}}
  else if(m==='stone'){x.fillStyle='rgba(70,55,90,.22)';[[-.25,-.15,.12],[.22,.2,.1],[.05,-.3,.07],[-.1,.28,.08]].forEach(([a,b,r])=>{x.beginPath();x.arc(a*W,b*H,r*sh*1.6,0,7);x.fill()})}
  else if(m==='iron'){x.fillStyle='#e8eef5';const rv=Math.max(1.5,s*.05);for(const yy of [-H/2+s*.15,H/2-s*.15])for(const xx of W>H?[-W/2+s*.15,W/2-s*.15]:[0]){x.beginPath();x.arc(xx,yy,rv,0,7);x.fill()}
    x.strokeStyle='rgba(40,50,70,.35)';x.lineWidth=Math.max(1,s*.03);x.beginPath();if(W>H){x.moveTo(-W/2,0);x.lineTo(W/2,0)}else{x.moveTo(0,-H/2+s*.3);x.lineTo(0,H/2-s*.3)}x.stroke()}
  x.fillStyle='rgba(255,255,255,.28)';x.fillRect(-W/2,-H/2,W,Math.min(H*.22,s*.09));
  x.restore();
  rr(x,-W/2,-H/2,W,H,rad);x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  cracks(x,u,-W/2,-H/2,W,H,s)}
function matStops(g,m){
  if(m==='ice'){g.addColorStop(0,'rgba(205,245,255,.92)');g.addColorStop(1,'rgba(120,200,245,.92)')}
  else if(m==='glass'){g.addColorStop(0,'rgba(200,255,245,.6)');g.addColorStop(1,'rgba(110,220,210,.6)')}
  else if(m==='stone'){g.addColorStop(0,'#d6d0e2');g.addColorStop(1,'#9488a8')}
  else if(m==='brick'){g.addColorStop(0,'#f07a4a');g.addColorStop(1,'#c04a2a')}
  else if(m==='iron'){g.addColorStop(0,'#aebccc');g.addColorStop(1,'#5e6e84')}
  else{g.addColorStop(0,'#f8c46c');g.addColorStop(1,'#d48236')}}
function cracks(x,u,X,Y,W,H,s){const k=u.dmg/(u.hp||1);if(!u.hp||k<.3)return;const R=seeded(Math.floor(u.x*100+u.y*37));
  x.strokeStyle='rgba(60,30,10,.75)';x.lineWidth=Math.max(1,s*.03);x.lineCap='round';const n=k>.65?3:1;
  for(let i=0;i<n;i++){let px=X+W*(.2+R()*.6),py=Y+H*(.15+R()*.2);x.beginPath();x.moveTo(px,py);for(let j=0;j<4;j++){px+=(R()-.5)*W*.35;py+=H*.18;x.lineTo(px,py)}x.stroke()}}
const GIFTC={pink:'#ff5fa8',blue:'#3fa8ff',purple:'#a35bff',green:'#2fc46a'};
const GEMC={ruby:'#ff3b5c',emerald:'#2fd47a',sapphire:'#3f7bff'};
function star5(x,cx,cy,R,r){x.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,q=i%2?r:R;x.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q)}x.closePath()}
function gemShape(x,cx,cy,r){x.beginPath();x.moveTo(cx-r,cy-r*.3);x.lineTo(cx-r*.55,cy-r*.8);x.lineTo(cx+r*.55,cy-r*.8);x.lineTo(cx+r,cy-r*.3);x.lineTo(cx,cy+r*.95);x.closePath()}
function gemDraw(x,cx,cy,r,c,l){gemShape(x,cx,cy,r);const g=x.createLinearGradient(cx-r,cy-r,cx+r,cy+r);g.addColorStop(0,mix(c,.55));g.addColorStop(1,mix(c,-.15));x.fillStyle=g;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  x.strokeStyle='rgba(255,255,255,.6)';x.lineWidth=l*.6;x.beginPath();x.moveTo(cx-r,cy-r*.3);x.lineTo(cx+r,cy-r*.3);x.moveTo(cx-r*.3,cy-r*.3);x.lineTo(cx,cy+r*.9);x.moveTo(cx+r*.3,cy-r*.3);x.lineTo(cx,cy+r*.9);x.stroke();
  x.fillStyle='rgba(255,255,255,.8)';x.beginPath();x.ellipse(cx-r*.45,cy-r*.52,r*.14,r*.08,-.4,0,7);x.fill()}
function coinDraw(x,cx,cy,r){x.beginPath();x.arc(cx,cy,r,0,7);const g=x.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);g.addColorStop(0,'#fff3a0');g.addColorStop(1,'#f5a800');x.fillStyle=g;x.fill();x.lineWidth=Math.max(1.2,r*.14);x.strokeStyle=OUT;x.stroke();
  x.beginPath();x.arc(cx,cy,r*.68,0,7);x.strokeStyle='rgba(176,92,0,.55)';x.lineWidth=Math.max(1,r*.1);x.stroke();star5(x,cx,cy,r*.42,r*.18);x.fillStyle='#d98a00';x.fill()}
/* treasures, centred at 0,0, size s (pixels for a 1.1 m box) */
function drawGoal(x,g,v,s){
  const l=lw(s/GS),h=s/2;x.lineJoin='round';x.lineCap='round';x.lineWidth=l;x.strokeStyle=OUT;
  const fill=c=>{x.fillStyle=c;x.fill();x.stroke()};
  if(g==='gift'){const c=GIFTC[v]||'#ff5fa8';rr(x,-h*.9,-h*.6,h*1.8,h*1.5,h*.18);const gg=x.createLinearGradient(0,-h*.6,0,h);gg.addColorStop(0,mix(c,.35));gg.addColorStop(1,mix(c,-.2));x.fillStyle=gg;x.fill();x.stroke();
    rr(x,-h*1,-h*.78,h*2,h*.45,h*.14);fill(mix(c,.15));
    x.fillStyle='#ffd23f';x.fillRect(-h*.16,-h*.78,h*.32,h*1.68);x.strokeRect(-h*.16,-h*.78,h*.32,h*1.68);
    for(const k of [-1,1]){x.beginPath();x.ellipse(k*h*.3,-h*.92,h*.3,h*.18,k*.5,0,7);fill('#ffd23f')}
    x.beginPath();x.arc(0,-h*.88,h*.12,0,7);fill('#ffd23f');
    x.fillStyle='rgba(255,255,255,.45)';x.beginPath();x.ellipse(-h*.55,-h*.2,h*.14,h*.28,0,0,7);x.fill();return}
  if(g==='star'){x.save();x.shadowColor='rgba(255,220,80,.9)';x.shadowBlur=h*.6;star5(x,0,h*.05,h*.98,h*.45);const gg=x.createRadialGradient(-h*.2,-h*.2,h*.1,0,0,h);gg.addColorStop(0,'#fff6a0');gg.addColorStop(1,'#ffb800');x.fillStyle=gg;x.fill();x.restore();x.stroke();
    for(const k of [-1,1]){x.beginPath();x.arc(k*h*.2,-h*.02,h*.07,0,7);x.fillStyle=OUT;x.fill()}x.beginPath();x.arc(0,h*.12,h*.15,.3,Math.PI-.3);x.stroke();return}
  if(g==='chest'){rr(x,-h*.92,-h*.15,h*1.84,h*1.05,h*.12);const gg=x.createLinearGradient(0,-h*.2,0,h);gg.addColorStop(0,'#c97a2c');gg.addColorStop(1,'#8a4a1c');x.fillStyle=gg;x.fill();x.stroke();
    x.beginPath();x.moveTo(-h*.92,-h*.15);x.lineTo(-h*.92,-h*.45);x.quadraticCurveTo(0,-h*1.05,h*.92,-h*.45);x.lineTo(h*.92,-h*.15);x.closePath();fill('#d98a3a');
    x.fillStyle='#ffd23f';for(const k of [-.62,.62]){x.fillRect(k*h-h*.11,-h*.75,h*.22,h*1.63);x.strokeRect(k*h-h*.11,-h*.75,h*.22,h*1.63)}
    rr(x,-h*.92,-h*.24,h*1.84,h*.18,h*.05);fill('#ffd23f');rr(x,-h*.2,-h*.32,h*.4,h*.5,h*.1);fill('#ffd23f');x.beginPath();x.arc(0,-h*.1,h*.07,0,7);x.fillStyle=OUT;x.fill();
    for(const [a,b] of [[-.4,-.75],[.3,-.82]]){star5(x,a*h,b*h,h*.12,h*.05);x.fillStyle='#fff';x.fill()}return}
  if(g==='gem'){const c=GEMC[v]||'#ff3b5c';x.save();x.shadowColor=mix(c,.3);x.shadowBlur=h*.5;gemDraw(x,0,-h*.05,h*.85,c,l);x.restore();return}
  if(g==='crystal'){x.save();x.shadowColor='#bff0ff';x.shadowBlur=h*.5;for(const [a,b,w2,hh] of [[-.45,.2,.3,1.1],[.45,.25,.28,.9],[0,0,.38,1.5]]){x.beginPath();x.moveTo(a*h-w2*h,h*.9);x.lineTo(a*h-w2*h,h*.9-hh*h*.7);x.lineTo(a*h,h*.9-hh*h);x.lineTo(a*h+w2*h,h*.9-hh*h*.7);x.lineTo(a*h+w2*h,h*.9);x.closePath();
      const gg=x.createLinearGradient(a*h-w2*h,0,a*h+w2*h,0);gg.addColorStop(0,'#e8fbff');gg.addColorStop(1,'#6cc8f0');x.fillStyle=gg;x.fill();x.stroke()}x.restore();return}
  if(g==='gold'){const bar=(X,Y)=>{x.beginPath();x.moveTo(X-h*.42,Y+h*.3);x.lineTo(X-h*.3,Y);x.lineTo(X+h*.3,Y);x.lineTo(X+h*.42,Y+h*.3);x.closePath();const gg=x.createLinearGradient(0,Y,0,Y+h*.3);gg.addColorStop(0,'#fff09a');gg.addColorStop(1,'#e8a400');x.fillStyle=gg;x.fill();x.stroke()};
    bar(-h*.45,h*.55);bar(h*.45,h*.55);bar(0,h*.22);bar(-h*.25,-h*.1);bar(h*.25,-h*.1);bar(0,-h*.42);x.fillStyle='rgba(255,255,255,.8)';star5(x,h*.3,-h*.55,h*.14,h*.05);x.fill();return}
  if(g==='pearl'){x.beginPath();x.moveTo(-h*.95,h*.2);x.quadraticCurveTo(-h*.95,h*.95,0,h*.95);x.quadraticCurveTo(h*.95,h*.95,h*.95,h*.2);x.closePath();fill('#ffb8d0');
    x.beginPath();x.moveTo(-h*.95,h*.15);x.quadraticCurveTo(-h*.9,-h*.95,0,-h*.9);x.quadraticCurveTo(h*.9,-h*.95,h*.95,h*.15);x.closePath();fill('#ffd0e0');
    x.strokeStyle='rgba(200,80,120,.5)';for(const k of [-.45,0,.45]){x.beginPath();x.moveTo(0,h*.1);x.lineTo(k*h*1.6,-h*.7);x.stroke()}x.strokeStyle=OUT;
    x.beginPath();x.arc(0,h*.3,h*.38,0,7);const gg=x.createRadialGradient(-h*.12,h*.18,h*.05,0,h*.3,h*.4);gg.addColorStop(0,'#fff');gg.addColorStop(1,'#d8d0f0');x.fillStyle=gg;x.fill();x.stroke();return}
  if(g==='crown'){x.beginPath();x.moveTo(-h*.9,h*.6);x.lineTo(-h*.95,-h*.45);x.lineTo(-h*.45,h*.05);x.lineTo(0,-h*.7);x.lineTo(h*.45,h*.05);x.lineTo(h*.95,-h*.45);x.lineTo(h*.9,h*.6);x.closePath();
    const gg=x.createLinearGradient(0,-h*.7,0,h*.6);gg.addColorStop(0,'#fff09a');gg.addColorStop(1,'#f0a800');x.fillStyle=gg;x.fill();x.stroke();rr(x,-h*.95,h*.45,h*1.9,h*.32,h*.1);fill('#ffd23f');
    for(const [a,c] of [[-.5,'#ff3b5c'],[0,'#3f7bff'],[.5,'#2fd47a']]){x.beginPath();x.arc(a*h,h*.61,h*.11,0,7);fill(c)}
    for(const [a,b] of [[-.95,-.45],[0,-.7],[.95,-.45]]){x.beginPath();x.arc(a*h,b*h,h*.12,0,7);fill('#fff3c0')}return}
  if(g==='ring'){rr(x,-h*.85,-h*.1,h*1.7,h*1,h*.2);fill('#a35bff');rr(x,-h*.85,-h*.1,h*1.7,h*.22,h*.08);fill('#c89aff');
    x.beginPath();x.arc(0,-h*.42,h*.42,0,7);x.lineWidth=h*.16+l*2;x.stroke();x.lineWidth=h*.16;x.strokeStyle='#ffd23f';x.stroke();x.strokeStyle=OUT;x.lineWidth=l;
    gemDraw(x,0,-h*.86,h*.26,'#ff5fa8',l*.8);x.fillStyle='rgba(255,255,255,.4)';x.fillRect(-h*.6,h*.2,h*.3,h*.08);return}
  if(g==='lantern'){x.save();x.shadowColor='rgba(255,200,80,.9)';x.shadowBlur=s*.35;
    rr(x,-h*.62,-h*.6,h*1.24,h*1.35,h*.35);const gg=x.createLinearGradient(0,-h,0,h);gg.addColorStop(0,'#ffe27a');gg.addColorStop(1,'#ff9a1f');x.fillStyle=gg;x.fill();x.restore();x.stroke();
    x.strokeStyle='rgba(160,70,0,.55)';x.lineWidth=l*.7;for(const k of [-.25,.25]){x.beginPath();x.moveTo(k*h,-h*.58);x.lineTo(k*h,h*.72);x.stroke()}
    x.strokeStyle=OUT;x.lineWidth=l;rr(x,-h*.45,-h*.92,h*.9,h*.34,h*.1);fill('#c0392b');rr(x,-h*.45,h*.72,h*.9,h*.24,h*.1);fill('#c0392b');
    x.beginPath();x.arc(0,-h*1.04,h*.13,0,7);x.lineWidth=l*.8;x.stroke();return}
  // bird cage with a bird inside
  rr(x,-h*.95,-h*.95,h*1.9,h*1.9,h*.2);x.fillStyle='rgba(255,240,200,.45)';x.fill();
  drawBird(x,v,0,h*.15,h*.55,false,0);
  x.strokeStyle='#8a5a2a';x.lineWidth=Math.max(1.4,l*.85);for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(i*h*.36,-h*.8);x.lineTo(i*h*.36,h*.8);x.stroke()}
  for(const yy of [-h*.95,h*.7]){rr(x,-h*.95,yy,h*1.9,h*.25,h*.1);x.fillStyle='#c97a2c';x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke()}
  rr(x,-h*.95,-h*.95,h*1.9,h*1.9,h*.2);x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  x.beginPath();x.arc(0,-h*1.08,h*.2,Math.PI,0);x.lineWidth=l*.9;x.stroke();
  rr(x,h*.45,h*.05,h*.32,h*.3,h*.06);x.fillStyle='#ffd23f';x.fill();x.lineWidth=l*.7;x.stroke()}
/* birds: body centred at cx,cy, radius r, facing left; flap 0..1 lifts the wing */
const BIRDC={hoopoe:['#f0a050','#fff1dc'],sparrow:['#b9824a','#f6e2c4'],finch:['#ffd23f','#fff7c8'],dove:['#ffffff','#e8eef8'],swallow:['#2f4aa8','#ffe9d6'],parrot:['#2fc46a','#ffd23f'],owl:['#a8784a','#f0dcc0'],redbird:['#ff4f5e','#ffd6d0'],robin:['#8a6a4a','#ff7a3a']};
function drawBird(x,v,cx,cy,r,happy,flap){
  const [c,b]=BIRDC[v]||BIRDC.sparrow,l=Math.max(1.2,r*.09);x.lineWidth=l;x.strokeStyle=OUT;x.lineJoin='round';x.lineCap='round';
  const fill=col=>{x.fillStyle=col;x.fill();x.stroke()};
  // tail
  if(v==='swallow'){x.beginPath();x.moveTo(cx+r*.6,cy+r*.1);x.lineTo(cx+r*1.45,cy-r*.05);x.lineTo(cx+r*1.05,cy+r*.25);x.lineTo(cx+r*1.45,cy+r*.55);x.closePath();fill(c)}
  else if(v==='parrot'){x.beginPath();x.moveTo(cx+r*.55,cy+r*.1);x.lineTo(cx+r*1.4,cy+r*.75);x.lineTo(cx+r*.9,cy+r*.5);x.closePath();fill('#3fa8ff')}
  else{x.beginPath();x.moveTo(cx+r*.6,cy);x.lineTo(cx+r*1.15,cy-r*.2);x.lineTo(cx+r*1.1,cy+r*.35);x.closePath();fill(mix(c,-.15))}
  // crest
  if(v==='hoopoe')for(let i=-2;i<=2;i++){const a=-Math.PI/2+i*.3-.2;x.beginPath();x.ellipse(cx-r*.1+Math.cos(a)*r*.75,cy-r*.45+Math.sin(a)*r*.55,r*.1,r*.32,a+Math.PI/2,0,7);fill('#ff9a3a');
    x.beginPath();x.arc(cx-r*.1+Math.cos(a)*r*1.0,cy-r*.45+Math.sin(a)*r*.82,r*.07,0,7);x.fillStyle=OUT;x.fill()}
  if(v==='owl')for(const k of [-1,1]){x.beginPath();x.moveTo(cx+k*r*.55,cy-r*.6);x.lineTo(cx+k*r*.75,cy-r*1.1);x.lineTo(cx+k*r*.2,cy-r*.8);x.closePath();fill(c)}
  // body
  x.beginPath();x.ellipse(cx,cy,r*.9,r*.82,0,0,7);const g=x.createRadialGradient(cx-r*.3,cy-r*.35,r*.1,cx,cy,r);g.addColorStop(0,mix(c,.4));g.addColorStop(1,c);x.fillStyle=g;x.fill();x.stroke();
  x.save();x.beginPath();x.ellipse(cx,cy,r*.9,r*.82,0,0,7);x.clip();x.beginPath();x.ellipse(cx-r*.2,cy+r*.5,r*.6,r*.5,0,0,7);x.fillStyle=b;x.fill();
  if(v==='hoopoe'){x.fillStyle=OUT;for(const k of [.15,.4,.65])x.fillRect(cx+r*k,cy-r,r*.12,r*2)}
  x.restore();x.beginPath();x.ellipse(cx,cy,r*.9,r*.82,0,0,7);x.stroke();
  // wing
  const fl=flap||0;x.save();x.translate(cx+r*.2,cy+r*.05);x.rotate(-.3-fl*1.1);x.beginPath();x.ellipse(r*.15,0,r*.5,r*.3,0,0,7);fill(mix(c,v==='dove'?-.08:-.2));x.restore();
  // eyes and beak
  const ex=cx-r*.35,ey=cy-r*.22;
  if(v==='owl'){for(const k of [-1,1]){x.beginPath();x.arc(cx+k*r*.3-r*.1,ey,r*.28,0,7);fill('#fff3c0');x.beginPath();x.arc(cx+k*r*.3-r*.1,ey,r*.14,0,7);x.fillStyle=OUT;x.fill();x.beginPath();x.arc(cx+k*r*.3-r*.06,ey-r*.05,r*.05,0,7);x.fillStyle='#fff';x.fill()}
    x.beginPath();x.moveTo(cx-r*.18,ey+r*.15);x.lineTo(cx-r*.02,ey+r*.15);x.lineTo(cx-r*.1,ey+r*.35);x.closePath();fill('#ffb02a')}
  else{x.beginPath();x.arc(ex,ey,r*.17,0,7);x.fillStyle='#fff';x.fill();x.lineWidth=l*.6;x.stroke();x.beginPath();x.arc(ex-r*.04,ey+r*.02,r*.1,0,7);x.fillStyle=OUT;x.fill();x.beginPath();x.arc(ex,ey-r*.03,r*.04,0,7);x.fillStyle='#fff';x.fill();
    x.lineWidth=l*.8;x.beginPath();
    if(v==='hoopoe'){x.moveTo(cx-r*.7,ey+r*.05);x.quadraticCurveTo(cx-r*1.3,ey+r*.25,cx-r*1.6,ey+r*.5);x.lineTo(cx-r*.72,ey+r*.25)}
    else if(v==='parrot'){x.moveTo(cx-r*.72,ey-r*.05);x.quadraticCurveTo(cx-r*1.25,ey,cx-r*1.05,ey+r*.45);x.lineTo(cx-r*.75,ey+r*.3)}
    else{x.moveTo(cx-r*.75,ey+r*.02);x.lineTo(cx-r*1.15,ey+r*.15);x.lineTo(cx-r*.75,ey+r*.3)}
    x.closePath();x.fillStyle=v==='hoopoe'?'#3a2a20':'#ffb02a';x.fill();x.stroke()}
  x.fillStyle='rgba(255,110,140,.45)';x.beginPath();x.ellipse(cx-r*.1,cy+r*.08,r*.13,r*.08,0,0,7);x.fill();
  if(happy){x.lineWidth=l*.7;x.beginPath();x.arc(ex,ey,r*.17,Math.PI*1.1,Math.PI*1.9);x.stroke()}}
function drawBarrel(x,s){const W=.8*s,H=.9*s,l=lw(s);rr(x,-W/2,-H/2,W,H,W*.25);const g=x.createLinearGradient(-W/2,0,W/2,0);g.addColorStop(0,'#ff6a5e');g.addColorStop(.45,'#ff9a8a');g.addColorStop(1,'#d8383a');x.fillStyle=g;x.fill();x.lineWidth=l;x.strokeStyle=OUT;x.stroke();
  x.fillStyle='#ffd23f';for(const yy of [-H*.32,H*.24]){x.fillRect(-W/2,yy,W,H*.1);x.strokeRect(-W/2,yy,W,H*.1)}
  star5(x,0,-H*.02,W*.26,W*.11);x.fillStyle='#fff';x.fill();x.lineWidth=l*.6;x.stroke();
  x.beginPath();x.moveTo(0,-H/2);x.quadraticCurveTo(W*.1,-H*.7,W*.25,-H*.68);x.lineWidth=l;x.stroke();x.beginPath();x.arc(W*.27,-H*.68,s*.05,0,7);x.fillStyle='#ffd23f';x.fill()}
function drawBundle(x,s){x.save();x.rotate(-.5);for(const k of [-1,0,1]){x.save();x.translate(0,k*s*.1);drawArrow(x,'normal',s*.8,0);x.restore()}x.restore();
  x.fillStyle='#ff5fa8';rr(x,-s*.12,-s*.18,s*.24,s*.36,s*.06);x.fill();x.lineWidth=lw(s)*.7;x.strokeStyle=OUT;x.stroke();
  x.font=`400 ${s*.42}px "Lilita One",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.lineWidth=3;x.strokeText('+1',s*.32,-s*.42);x.fillStyle='#fff';x.fillText('+1',s*.32,-s*.42)}
/* an arrow pointing along +x, s = pixels per metre */
const ACOL={normal:['#ff5f5f','#ffd23f','#c8d2dc'],heavy:['#7a5ad0','#b8a0ff','#5a5a70'],triple:['#3fa8ff','#7fd0ff','#c8d2dc'],diamond:['#2fd4c8','#9ff0ff','#bff8ff'],flame:['#ff6a1f','#ffd23f','#ff9a2a'],firework:['#ff8a1f','#ffd23f','#ff4f8a']};
function drawArrow(x,at,s,ang){x.save();x.rotate(-ang);const L=s*.5,[f1,f2,hc]=ACOL[at]||ACOL.normal,l=lw(s);x.lineJoin='round';x.lineCap='round';
  const thick=at==='heavy'?1.5:1;
  x.strokeStyle=OUT;x.lineWidth=Math.max(3,s*.11*thick);x.beginPath();x.moveTo(-L,0);x.lineTo(L*.8,0);x.stroke();
  x.strokeStyle=at==='heavy'?'#8a6a4a':'#d48a3a';x.lineWidth=Math.max(1.6,s*.06*thick);x.stroke();
  const hw=at==='heavy'?s*.17:s*.12;x.beginPath();
  if(at==='diamond'){x.moveTo(L*1.2,0);x.lineTo(L*.92,-hw);x.lineTo(L*.66,0);x.lineTo(L*.92,hw)}
  else if(at==='firework'){x.moveTo(L*1.15,0);x.quadraticCurveTo(L*.95,-hw*1.3,L*.65,-hw);x.lineTo(L*.65,hw);x.quadraticCurveTo(L*.95,hw*1.3,L*1.15,0)}
  else{x.moveTo(L*1.12,0);x.lineTo(L*.7,-hw);x.lineTo(L*.78,0);x.lineTo(L*.7,hw)}
  x.closePath();x.fillStyle=hc;x.fill();x.lineWidth=l*.7;x.strokeStyle=OUT;x.stroke();
  if(at==='firework'){star5(x,L*.88,0,hw*.55,hw*.24);x.fillStyle='#fff';x.fill()}
  if(at==='flame'){const tt=performance.now()/90;for(const [k,c] of [[1,'#ff6a1f'],[.6,'#ffd23f']]){x.beginPath();x.moveTo(L*1.0,-hw*.6*k);x.quadraticCurveTo(L*(.62+.04*Math.sin(tt)),-hw*1.5*k,L*.42,0);x.quadraticCurveTo(L*(.62+.04*Math.cos(tt)),hw*1.5*k,L*1.0,hw*.6*k);x.closePath();x.fillStyle=c;x.fill()}}
  if(at==='diamond'){x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(L*.95,-hw*.3,hw*.18,0,7);x.fill()}
  for(const k of [-1,1]){x.beginPath();x.moveTo(-L*.55,0);x.lineTo(-L*1.02,k*s*.15);x.lineTo(-L*.82,0);x.closePath();x.fillStyle=k<0?f1:f2;x.fill();x.stroke()}
  x.restore()}
/* the bow on its stand: foot at gx,gy, pivot at px,py (pixels); ang = aim, pull 0..1; tier 0-3 */
const BOWC=['#d0782a','#9ccc4a','#c8d4e4','#ffcc2a'];
function drawBow(x,tier,gx,gy,px,py,s,ang,pull,ammo){
  const l=lw(s);x.lineJoin='round';x.lineCap='round';const c=Math.cos(ang),sn=Math.sin(ang);
  const wood=(x0,y0,x1,y1,w)=>{x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.lineWidth=w+l*2;x.strokeStyle=OUT;x.stroke();x.lineWidth=w;x.strokeStyle='#c97a2c';x.stroke()};
  wood(gx-s*.35,gy,px,py+s*.15,s*.12);wood(gx+s*.35,gy,px,py+s*.15,s*.12);
  const R=s*.95,bx=px+c*s*.15,by=py-sn*s*.15,a0=-ang,ox=bx-c*R*.55,oy=by+sn*R*.55;
  const tip=k=>[ox+Math.cos(a0+k*1.05)*R,oy+Math.sin(a0+k*1.05)*R];
  const [t1x,t1y]=tip(-1),[t2x,t2y]=tip(1),pb=s*(.15+pull*.65),nx=ox-c*pb,ny=oy+sn*pb;
  x.beginPath();x.moveTo(t1x,t1y);x.lineTo(nx,ny);x.lineTo(t2x,t2y);x.lineWidth=Math.max(1.2,s*.03);x.strokeStyle=tier>=3?'#fff2a0':'#fff6e0';x.stroke();
  const col=BOWC[tier]||BOWC[0];
  if(tier>=2){x.save();x.shadowColor=tier===3?'rgba(255,210,60,.9)':'rgba(220,235,255,.9)';x.shadowBlur=s*.35}
  x.beginPath();x.arc(ox,oy,R,a0-1.05,a0+1.05);x.lineWidth=s*.16+l*2;x.strokeStyle=OUT;x.stroke();x.lineWidth=s*.16;x.strokeStyle=col;x.stroke();
  if(tier>=2)x.restore();
  if(tier===1){x.lineWidth=Math.max(1,s*.04);x.strokeStyle='#5a8a2a';for(const k of [-.7,-.35,.35,.7]){const [qx,qy]=[ox+Math.cos(a0+k)*R,oy+Math.sin(a0+k)*R];x.beginPath();x.moveTo(qx-Math.cos(a0+k)*s*.08,qy-Math.sin(a0+k)*s*.08);x.lineTo(qx+Math.cos(a0+k)*s*.08,qy+Math.sin(a0+k)*s*.08);x.stroke()}}
  if(tier===3)for(const k of [-.6,.6]){star5(x,ox+Math.cos(a0+k)*R,oy+Math.sin(a0+k)*R,s*.1,s*.045);x.fillStyle='#fff';x.fill()}
  x.lineWidth=s*.05;x.strokeStyle=tier===3?'#ff5fa8':'#ffd23f';x.beginPath();x.arc(ox,oy,R,a0-.12,a0+.12);x.stroke();
  if(ammo){x.save();x.translate(nx+c*s*.62,ny-sn*s*.62);drawArrow(x,ammo,s*1.25,ang);if(ammo==='triple'){x.translate(0,-s*.14);drawArrow(x,ammo,s*1.1,ang);x.translate(0,s*.28);drawArrow(x,ammo,s*1.1,ang)}x.restore()}}

/* =================================================================
   Backgrounds (drawn in code until the owner's art arrives). gy = ground line in pixels.
   ================================================================= */
function paintWorld(x,w,W,H,gy,s,noSun){
  const WD=WORLDS[w],R=seeded(w*101+5);
  const g=x.createLinearGradient(0,0,0,gy);g.addColorStop(0,WD.sky[0]);g.addColorStop(1,WD.sky[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
  const u=Math.max(16,Math.min(s,H/9));
  if(w===5){x.fillStyle='#fff';for(let i=0;i<90;i++){const r=R()*1.6+.4;x.globalAlpha=.4+R()*.6;x.beginPath();x.arc(R()*W,R()*gy*.8,r,0,7);x.fill()}x.globalAlpha=1;
    x.beginPath();x.arc(W*.8,gy*.22,u*1.3,0,7);x.fillStyle='#fff3c0';x.fill();x.beginPath();x.arc(W*.8+u*.55,gy*.22-u*.3,u*1.15,0,7);x.fillStyle=WD.sky[0];x.fill()}
  else if(w!==2&&!noSun){x.save();x.shadowColor='rgba(255,240,150,.9)';x.shadowBlur=u*1.2;x.beginPath();x.arc(W*.82,gy*.2,u*1.1,0,7);x.fillStyle=w===4?'#fffbe0':'#ffe25a';x.fill();x.restore()}
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
}
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
if(prog.coins==null)prog.coins=0;if(!prog.up)prog.up={bow:0,quiver:0,sight:0};if(!prog.birds)prog.birds={};
/* Little (3+): every level is open, so young children can play any stage. Big Kid unlocks them one by one. */
const openTo=()=>age==='little'?LEVELS:prog.open;
const totalStars=()=>Object.values(prog.stars).reduce((a,b)=>a+b,0);
const sx=X=>cam.ox+X*cam.s,sy=Y=>cam.oy-Y*cam.s;
function layout(){
  const W=innerWidth,H=innerHeight,d=DPR();[cv,fxc].forEach(c=>{c.width=Math.round(W*d);c.height=Math.round(H*d)});cam.W=W;cam.H=H;
  const land=W>H;$('#game').classList.toggle('land',land);document.body.classList.toggle('land',land);
  if(!G)return;const lv=G.lv,vw=lv.width+.8,vh=Math.max(lv.top+2.2,8.5),gr=1.2;
  const pick=G.av.length>1,left=land&&pick?Math.min(84,W*.1):0,top=land?64:132,botP=land?0:pick?112:64;
  /* levels 1-3 always fit on one screen; later ones may be wider than the screen and the camera moves */
  const avW=W-left,want=G.n<=3?vw:Math.min(vw,land?18:12.5);
  const s=Math.min(avW/want,(H-top-botP)/(vh+gr));cam.s=s;cam.left=left;
  const viewW=avW/s;cam.viewW=viewW;cam.min=-.4-Math.max(0,(viewW-vw)/2);cam.max=cam.min+Math.max(0,vw-viewW);
  cam.x=camClamp(cam.x==null?cam.min:cam.x);cam.oy=H-Math.max(gr*s,botP);setCam();
  bgCache=null}
const camClamp=v=>Math.max(cam.min,Math.min(cam.max,v));
const canPan=()=>cam.max>cam.min+.3;
function setCam(){cam.ox=cam.left-cam.x*cam.s}
/* camera: shows the target first, follows the arrow, then slides back to Mo */
function camStep(now){if(!G)return;
  if(G.state==='fly'&&!G.panning){const p=G.sim.proj[0];if(p&&!p.dead){G.camT=p.b.getPosition().x-cam.viewW*.45;G.camSp=.12}}
  if(G.backT&&now>G.backT&&G.state==='ready'&&!G.panning){G.backT=0;if(!G.looked){G.camT=cam.min;G.camSp=.06}}
  if(!G.panning&&G.camT!=null){const tg=camClamp(G.camT);cam.x+=(tg-cam.x)*(G.camSp||.1);if(Math.abs(tg-cam.x)<.005)cam.x=tg}
  setCam()}
function drawBg(){const d=DPR();if(!bgCache||bgCache.w!==cv.width||bgCache.h!==cv.height||bgCache.world!==G.lv.w){const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d');x.scale(d,d);paintWorld(x,G.lv.w,cam.W,cam.H,cam.oy,cam.s);bgCache={c,w:cv.width,h:cv.height,world:G.lv.w}}
  cx.drawImage(bgCache.c,0,0)}
function drawGame(now){
  const d=DPR(),x=cx,s=cam.s,S=G.sim,w=G.lv.w;x.setTransform(1,0,0,1,0,0);drawBg();x.setTransform(d,0,0,d,0,0);
  for(const u of S.list)if(u.k==='rock'){x.save();x.translate(sx(u.x),sy(u.y));rockDraw(x,u,s,w);x.restore()}
  // Mo
  const mo=G.won&&IMG.jump.ok?IMG.jump:IMG.mo;if(mo.ok){const h=2.05*s*(mo===IMG.jump?1.12:1),mw=h*mo.naturalWidth/mo.naturalHeight;let hop=0;
    if(G.won)hop=Math.abs(Math.sin(now/180))*s*.3;else if(G.shotT&&now-G.shotT<350)hop=Math.sin((now-G.shotT)/350*Math.PI)*s*.12;
    x.drawImage(mo,sx(1.05)-mw/2,sy(0)-h-hop,mw,h)}
  // wind flag
  if(G.lv.wind){const fx=sx(LX+1.6),fy=sy(0),wv=G.lv.wind,ph=now/120;x.strokeStyle=OUT;x.lineWidth=3;x.beginPath();x.moveTo(fx,fy);x.lineTo(fx,fy-s*2.4);x.stroke();
    x.beginPath();x.moveTo(fx,fy-s*2.4);for(let i=0;i<=8;i++){const t2=i/8;x.lineTo(fx+Math.sign(wv)*s*(.3+Math.abs(wv)*.35)*t2,fy-s*2.4+Math.sin(ph+t2*4)*s*.08*t2)}
    for(let i=8;i>=0;i--){const t2=i/8;x.lineTo(fx+Math.sign(wv)*s*(.3+Math.abs(wv)*.35)*t2,fy-s*1.95+Math.sin(ph+t2*4)*s*.08*t2)}x.closePath();x.fillStyle='#ff4f5e';x.fill();x.lineWidth=2;x.stroke()}
  // coins and arrow bundles in the air
  for(const o of S.bonus)if(!o.got){const bob=Math.sin(now/300+o.x)*s*.08;x.save();x.translate(sx(o.x),sy(o.y)+bob);
    if(o.k==='coin'){const sq=Math.abs(Math.cos(now/400+o.x));x.scale(.35+.65*sq,1);coinDraw(x,0,0,s*.32)}else drawBundle(x,s);x.restore()}
  // aim dots (the wind bends them too)
  const at=G.asel,aim=G.aim,wind=G.lv.wind||0;
  if(aim&&aim.p>.08){const [vx,vy]=launchVel(at,aim.a,aim.p),[px,py]=launchPos(aim.a),T=age==='little'?2.4:SIGHT[upLv('sight')];
    for(let tt=.05,i=0;tt<T;tt+=.07,i++){const X=px+vx*tt+.5*wind*tt*tt,Y=py+vy*tt-5*tt*tt;if(Y<0)break;const r=Math.max(2,s*(.13-i*.002));
      x.beginPath();x.arc(sx(X),sy(Y),r,0,7);x.fillStyle='#fff';x.globalAlpha=Math.max(.35,1-tt/T*.6);x.fill();x.lineWidth=1.5;x.strokeStyle=OUT;x.stroke();x.globalAlpha=1}}
  if(aim&&aim.p>.02){const deg=Math.round(clampAng(aim.a)*180/Math.PI),pw=Math.round(Math.min(1,aim.p)*100),bx=sx(LX)-s*.2,by=sy(OY)-s*2.3,W=Math.max(110,s*3),H=Math.max(34,s*.95);
    x.save();rr(x,bx-W/2,by-H/2,W,H,H/2);x.fillStyle='rgba(255,255,255,.92)';x.fill();x.lineWidth=2;x.strokeStyle=OUT;x.stroke();
    x.font=`400 ${H*.42}px "Lilita One",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle='#d07a00';x.fillText(deg+'°  '+pw+'%',bx,by-H*.18);
    const bw=W*.78,bh=H*.2,b0=bx-bw/2,b1=by+H*.22;rr(x,b0,b1-bh/2,bw,bh,bh/2);x.fillStyle='#eadfcf';x.fill();
    const gg=x.createLinearGradient(b0,0,b0+bw,0);gg.addColorStop(0,'#3fcf5a');gg.addColorStop(.6,'#ffd23f');gg.addColorStop(1,'#ff4f5e');rr(x,b0,b1-bh/2,Math.max(bh,bw*pw/100),bh,bh/2);x.fillStyle=gg;x.fill();
    x.lineWidth=1.5;rr(x,b0,b1-bh/2,bw,bh,bh/2);x.stroke();x.restore()}
  // bodies
  for(const u of S.list){const k=u.k;if(!u.b||k==='rock')continue;const q=u.b.getPosition(),a=u.b.getAngle();x.save();x.translate(sx(q.x),sy(q.y));
    if(u.shakeT&&now-u.shakeT<450){const kk=1-(now-u.shakeT)/450;x.translate(Math.sin(now/22)*s*.07*kk,Math.cos(now/31)*s*.03*kk)}x.rotate(-a);
    if(k==='goal'){if(u.g!=='cage'&&u.g!=='gift'&&u.g!=='chest'){x.save();x.globalAlpha=.25+.15*Math.sin(now/300+u.x);x.beginPath();x.arc(0,0,u.w*s*.62,0,7);x.fillStyle='#fff6c0';x.fill();x.restore()}
      drawGoal(x,u.g,u.v,u.w*s);if(u.dmg>.25*u.hp)cracks(x,u,-u.w*s/2,-u.h*s/2,u.w*s,u.h*s,s)}
    else if(k==='barrel'){drawBarrel(x,s);cracks(x,u,-.4*s,-.45*s,.8*s,.9*s,s)}
    else{drawBlock(x,u,s);if(u.burn){const kk=Math.min(1,u.burn/110);rr(x,-u.w*s/2,-u.h*s/2,u.w*s,u.h*s,Math.min(u.w,u.h)*s*.2);x.fillStyle=`rgba(40,20,10,${kk*.55})`;x.fill()}}x.restore()}
  // flames on burning wood (drawn upright)
  for(const u of S.list)if(u.burn&&u.b){const q=u.b.getPosition(),n2=Math.max(2,Math.round(u.w*2.2));
    for(let i=0;i<n2;i++){const fx=sx(q.x+(i/(n2-1||1)-.5)*u.w*.8),fy=sy(q.y)-u.h*s*.2,h=s*(.35+.18*Math.sin(now/90+i*1.7+u.x));
      for(const [k2,c] of [[1,'rgba(255,110,30,.9)'],[.6,'rgba(255,220,80,.95)']]){x.beginPath();x.moveTo(fx-s*.14*k2,fy);x.quadraticCurveTo(fx-s*.12*k2,fy-h*k2*.6,fx,fy-h*k2);x.quadraticCurveTo(fx+s*.12*k2,fy-h*k2*.6,fx+s*.14*k2,fy);x.closePath();x.fillStyle=c;x.fill()}}}
  // the bow
  const ready=G.state==='ready'||G.state==='aim',ang=aim?clampAng(aim.a):.55;
  drawBow(x,upLv('bow'),sx(LX),sy(0),sx(LX),sy(OY),s,ang,aim?aim.p:0,ready&&G.shots>0?at:null);
  for(const p of S.proj){const q=p.b.getPosition();x.save();x.translate(sx(q.x),sy(q.y));drawArrow(x,p.at,s,p.b.getAngle());x.restore()}
  drawParts(x,now,s)}
/* particles in world units */
function drawParts(x,now,s){
  const dt=1/60;
  parts=parts.filter(p=>{p.t+=dt;if(p.t>p.life)return false;p.vy-=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;const k=1-p.t/p.life;
    x.save();x.translate(sx(p.x),sy(p.y));x.rotate(p.r);x.globalAlpha=Math.min(1,k*2);
    if(p.k==='star'&&IMG.star.ok){const z=p.z*s;x.drawImage(IMG.star,-z/2,-z/2,z,z)}
    else if(p.k==='coin')coinDraw(x,0,0,p.z*s);
    else if(p.k==='heart'){const z=p.z*s;x.fillStyle='#ff5f8a';x.beginPath();x.moveTo(0,z*.3);x.bezierCurveTo(-z*.6,-z*.1,-z*.3,-z*.6,0,-z*.25);x.bezierCurveTo(z*.3,-z*.6,z*.6,-z*.1,0,z*.3);x.fill();x.lineWidth=1.5;x.strokeStyle=OUT;x.stroke()}
    else if(p.k==='dot'){x.beginPath();x.arc(0,0,p.z*s*k+1,0,7);x.fillStyle=p.c;x.fill()}
    else{const z=p.z*s;x.fillStyle=p.c;x.fillRect(-z/2,-z/3,z,z*.66);x.lineWidth=1.2;x.strokeStyle=OUT;x.strokeRect(-z/2,-z/3,z,z*.66)}
    x.restore();return true});
  flyers=flyers.filter(f=>{f.t+=dt;if(f.t>4)return false;f.x+=f.vx*dt;f.y+=1.6*dt+Math.sin(f.t*9)*.02;x.save();x.translate(sx(f.x),sy(f.y));x.scale(f.vx<0?1:-1,1);drawBird(x,f.v,0,0,s*.4,true,(Math.sin(f.t*18)+1)/2);x.restore();return true});
  texts=texts.filter(tx=>{tx.t+=dt;if(tx.t>1.6)return false;const k=tx.t/1.6;x.save();x.globalAlpha=k>.7?(1-k)/.3:1;x.font=`400 ${Math.max(16,s*.62)}px "Lilita One",sans-serif`;x.textAlign='center';
    x.lineWidth=4;x.strokeStyle=OUT;x.lineJoin='round';const X=sx(tx.x),Y=sy(tx.y+k*1.4);x.strokeText(tx.s,X,Y);x.fillStyle=tx.c;x.fillText(tx.s,X,Y);x.restore();return true})}
const DEB={wood:'#e09a4a',ice:'#bfeaff',glass:'#9ff0e8',brick:'#e0603a',stone:'#a89cb8',iron:'#8a9aae',goal:'#ffd23f'};
function debris(X,Y,mat,n,big){const col=DEB[mat]||'#e09a4a';
  for(let i=0;i<n;i++){const a=Math.random()*6.283,v=1.5+Math.random()*(big?6:4);parts.push({x:X,y:Y,vx:Math.cos(a)*v,vy:Math.sin(a)*v+2,g:12,t:0,life:.8+Math.random()*.5,r:Math.random()*6,vr:(Math.random()-.5)*12,z:.12+Math.random()*.16,c:col,k:'chip'})}}
function sparkle(X,Y,k,n,cols){for(let i=0;i<n;i++){const a=Math.random()*6.283,v=1+Math.random()*4;parts.push({x:X,y:Y,vx:Math.cos(a)*v,vy:Math.sin(a)*v+2.5,g:k==='dot'?3:5,t:0,life:1+Math.random()*.6,r:0,vr:(Math.random()-.5)*4,z:k==='star'?.45+Math.random()*.25:k==='heart'?.4:k==='coin'?.18:.14,c:cols?cols[i%cols.length]:'#fff',k})}}
function firework(X,Y,big){const cols=['#ff3b30','#ffd60a','#1fa64a','#3fc6f5','#9b4bf0','#ff5fa8','#fff'];for(let i=0;i<(big?44:26);i++){const a=i/(big?44:26)*6.283,v=(big?5:3.5)+Math.random()*2;parts.push({x:X,y:Y,vx:Math.cos(a)*v,vy:Math.sin(a)*v+1,g:2.5,t:0,life:.9+Math.random()*.4,r:0,vr:0,z:.14,c:cols[i%cols.length],k:'dot'})}}
/* confetti on the fx canvas (screen pixels) */
function confetti(){const W=innerWidth,H=innerHeight,cols=['#ff3b30','#ffd60a','#1fa64a','#3fc6f5','#9b4bf0','#ff5fa8','#ff8a00'];
  for(let i=0;i<150;i++)conf.push({x:W/2+(Math.random()-.5)*W*.4,y:H*.35,vx:(Math.random()-.5)*900,vy:-Math.random()*900-200,s:Math.random()*8+7,c:cols[i%cols.length],r:Math.random()*6,t:-Math.random()*.2})}
function drawConf(){const d=DPR();fxx.setTransform(1,0,0,1,0,0);fxx.clearRect(0,0,fxc.width,fxc.height);if(!conf.length)return;fxx.setTransform(d,0,0,d,0,0);const dt=1/60;
  conf=conf.filter(p=>{p.t+=dt;if(p.t<0)return true;if(p.t>2.6)return false;p.vy+=900*dt;p.vx*=.99;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*6;fxx.save();fxx.translate(p.x,p.y);fxx.rotate(p.r);fxx.globalAlpha=Math.min(1,(2.6-p.t)*2);fxx.fillStyle=p.c;fxx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);fxx.restore();return true})}

/* =================================================================
   Playing a level
   ================================================================= */
/* spare arrows over par: Big Kid 2, Little 4, plus the quiver upgrade. Little also gets refills. */
function shotsFor(lv){return lv.par+(age==='little'?4:2)+upLv('quiver')}
function startGame(n){
  const lv=genLevel(n);G={n,lv,sim:makeSim(lv,{dmgK:BOWK[upLv('bow')]}),state:'bism',shots:0,used:0,aim:null,won:false,shotT:0,idle:0,newB:[],coins:0,av:arrowsAt(n)};
  G.shots=shotsFor(lv);
  const pref=store.get('asel','normal');G.asel=G.av.includes(pref)?pref:'normal';
  const nw=store.get('newA',null);if(nw&&G.av.includes(nw)){G.asel=nw;store.set('newA',null);G.newA=nw}
  parts=[];flyers=[];texts=[];
  show('game');cam.x=null;layout();cam.x=cam.max;G.camT=cam.max;setCam();G.coinShown=prog.coins;renderHud();renderPicker();
  $('#lvlChip').textContent=tf('level',{n});
  $('#bismGoal').textContent=t('mGoal');
  $('#bismGoals').innerHTML='';goalKeys(G.sim).forEach(e=>{const sp=document.createElement('span');sp.append(keyIcon(e.key,88),document.createTextNode('× '+e.total));$('#bismGoals').appendChild(sp)});
  ov('bism',true);
  if(innerHeight>innerWidth*1.15){const r=$('#rot');r.classList.remove('on');void r.offsetWidth;r.classList.add('on')}}
function goalKeys(S){const m=new Map();for(const g of S.goals){const e=m.get(g.key)||{key:g.key,total:0,left:0};e.total++;if(!g.done)e.left++;m.set(g.key,e)}return[...m.values()]}
function keyIcon(key,px){const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d');x.translate(px/2,px/2+px*.04);const [,g,v]=key.split(':');
  drawGoal(x,g,v||(g==='gift'?'pink':g==='gem'?'ruby':g==='cage'?'sparrow':''),px*.72);return c}
function arrowIcon(at,px){const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d');x.translate(px/2,px/2);
  if(at==='triple'){for(const k of [-1,0,1]){x.save();x.translate(0,k*px*.16);drawArrow(x,at,px*.75,.6);x.restore()}}else drawArrow(x,at,px*.85,.6);return c}
function bowIcon(tier,px){const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d'),s=px/2.7;const gx=px*.45,gy=px*.94;drawBow(x,tier,gx,gy,gx,gy-OY*s,s,.55,.35,'normal');return c}
$('#bismBtn').onclick=()=>{ov('bism',false);sfx.bism();say(t('sayBism'));if(!G)return;G.state='ready';G.idle=performance.now();
  const intro=canPan();if(intro){setTimeout(()=>{if(G&&G.camT===cam.max&&!G.panning){G.camT=cam.min;G.camSp=.035}},1100);
    if(!store.get('lookTip',0))setTimeout(()=>{if(G&&cur==='game'){store.set('lookTip',1);toast(t('lookTip'))}},3600)}
  if(G.n<=2||!store.get('hinted',0))setTimeout(showHint,intro?3200:700);
  const tips=[...G.lv.mats].filter(m=>t('tipM')[m]&&!store.get('tip:'+m,0));if(G.lv.wind&&!store.get('tip:wind',0))tips.push('wind');
  let d=G.newA?2600:500;if(G.newA)setTimeout(()=>{if(G&&G.state!=='bism')toast(tf('newA',{a:t('AR')[G.newA]})+' '+t('ARD')[G.newA])},500);
  tips.slice(0,2).forEach(m=>{setTimeout(()=>{if(G&&cur==='game'){toast(m==='wind'?t('wind'):t('tipM')[m]);store.set('tip:'+m,1)}},d);d+=2600})};
function renderHud(){
  const el=$('#goals');el.innerHTML='';
  goalKeys(G.sim).forEach(e=>{const d=document.createElement('div');d.className='goal'+(e.left?'':' done');d.append(keyIcon(e.key,76));d.insertAdjacentHTML('beforeend',`<b>${e.left?e.left:'✓'}</b>`);el.appendChild(d)});
  $('#coinHud b').textContent=G.coinShown;
  const sh=$('#shots');sh.innerHTML='';sh.append(arrowIcon(G.asel,68));sh.insertAdjacentHTML('beforeend',`<b>${G.shots}</b>`)}
function bumpGoal(){document.querySelectorAll('#goals .goal').forEach(g=>{g.classList.add('bump');setTimeout(()=>g.classList.remove('bump'),180)})}
function renderPicker(){const p=$('#picker');p.innerHTML='';p.classList.toggle('off',G.av.length<2);
  G.av.forEach(at=>{const b=document.createElement('button');b.className=(at===G.asel?'on':'')+(at===G.newA?' new':'');b.setAttribute('aria-label',t('AR')[at]);b.append(arrowIcon(at,120));
    b.onclick=e=>{e.stopPropagation();if(G.state!=='ready'&&G.state!=='bism')return;G.asel=at;store.set('asel',at);G.newA=null;sfx.tap();toast(t('AR')[at]+': '+t('ARD')[at]);renderPicker();renderHud()};p.appendChild(b)})}

/* aiming: press anywhere, pull back, let go */
let aimStart=null;
const maxPull=()=>Math.max(90,Math.min(220,Math.min(cam.W,cam.H)*.32));
function aimFrom(e){const dx=aimStart.x-e.clientX,dy=aimStart.y-e.clientY,dist=Math.hypot(dx,dy);
  let a=Math.atan2(-dy,dx);if(dist<8)a=G.aim?G.aim.a:.55;
  return{a:clampAng(a),p:Math.min(1,dist/maxPull())}}
cv.addEventListener('pointerdown',e=>{if(!G||window.praying)return;hideHint();G.idle=performance.now();
  if(G.state==='ready'&&canPan()&&e.clientX>cam.W*.5){G.panning={x:e.clientX,cx:cam.x,id:e.pointerId};G.looked=1;try{cv.setPointerCapture(e.pointerId)}catch(_){}return}
  if(G.camT!==cam.min){G.camT=cam.min;G.camSp=.15}G.looked=0;
  if(G.state!=='ready'||G.shots<=0)return;aimStart={x:e.clientX,y:e.clientY,id:e.pointerId};G.state='aim';G.aim={a:.55,p:0};try{cv.setPointerCapture(e.pointerId)}catch(_){}sfx.pull()});
cv.addEventListener('pointermove',e=>{if(G&&G.panning&&e.pointerId===G.panning.id){cam.x=camClamp(G.panning.cx+(G.panning.x-e.clientX)/cam.s);G.camT=cam.x;setCam();return}
  if(!G||G.state!=='aim'||!aimStart||e.pointerId!==aimStart.id)return;const o=G.aim.p;G.aim=aimFrom(e);if(Math.floor(G.aim.p*5)!==Math.floor(o*5)&&G.aim.p>o)tone(200+G.aim.p*300,.05,'triangle',.05)});
function release(e){if(G&&G.panning&&e.pointerId===G.panning.id){G.panning=null;return}
  if(!G||G.state!=='aim'||!aimStart||e.pointerId!==aimStart.id)return;const A=aimFrom(e);aimStart=null;
  if(A.p<.12||window.praying){G.state='ready';G.aim=null;return}shoot(A.a,A.p)}
cv.addEventListener('pointerup',release);cv.addEventListener('pointercancel',e=>{if(G)G.panning=null;if(G&&G.state==='aim'){G.state='ready';G.aim=null;aimStart=null}});
function shoot(a,p){const at=G.asel;fire(G.sim,at,a,p);G.state='fly';G.shots--;G.used++;G.aim=null;G.shotT=performance.now();sfx.shoot(at);renderHud()}

let cheerN=0;
function cheer(){const c=document.createElement('div');const i=cheerN++%4;c.className='cheer c'+(i+1);c.innerHTML=`<b>${t('cheer')[i]}</b><small>${t('cheerM')[i]}</small>`;document.body.appendChild(c);setTimeout(()=>c.remove(),1450);if(Math.random()<.6)say(t('cheer')[i])}
function freeBird(b){if(!BIRDS.includes(b))return;if(prog.birds[b])return;prog.birds[b]=1;store.set('prog',prog);if(G)G.newB.push(b);setTimeout(()=>toast(tf('newB',{b:t('BD')[b]})),600)}
/* coins fly up to the coin counter, which counts up as each one lands */
const coinImg=(()=>{const c=document.createElement('canvas');c.width=c.height=64;coinDraw(c.getContext('2d'),32,32,28);return c.toDataURL()})();
coinDraw($('#coinHud canvas').getContext('2d'),34,34,29);
function flyCoins(n,x0,y0){const hud=$('#coinHud'),r=hud.getBoundingClientRect(),x1=r.left+r.height*.5,y1=r.top+r.height/2,k=Math.min(6,Math.max(1,Math.round(n/3)));let left=n;
  for(let i=0;i<k;i++){const share=i===k-1?left:Math.floor(n/k);left-=share;const im=document.createElement('img');im.src=coinImg;im.className='flycoin';document.body.appendChild(im);
    const mx=(x0+x1)/2+(Math.random()-.5)*80,my=Math.min(y0,y1)-60-Math.random()*60;
    const a=im.animate([{transform:`translate(${x0}px,${y0}px) scale(.6)`},{transform:`translate(${mx}px,${my}px) scale(1.25)`,offset:.45},{transform:`translate(${x1}px,${y1}px) scale(.8)`}],{duration:750,delay:i*110,easing:'ease-in',fill:'both'});
    a.onfinish=()=>{im.remove();if(!G)return;G.coinShown+=share;$('#coinHud b').textContent=G.coinShown;hud.classList.remove('bump');void hud.offsetWidth;hud.classList.add('bump');setTimeout(()=>hud.classList.remove('bump'),160);tone(1568+Math.random()*300,.06,'square',.035)}}}
const say2=(X,Y,s,c)=>texts.push({x:X,y:Y,s,c,t:0});
function addCoins(n,X,Y){G.coins+=n;prog.coins+=n;store.set('prog',prog);flyCoins(n,sx(X),sy(Y));if(!store.get('coinTip',0)){store.set('coinTip',1);setTimeout(()=>toast(t('coinTip')),900)}sparkle(X,Y,'coin',Math.min(10,2+Math.round(n/3)));setTimeout(sfx.coin,120)}
function handleEvents(){
  const S=G.sim;let goalsNow=0;
  for(const ev of S.ev){const X=ev.x,Y=Math.max(.6,ev.y||0);
    if(ev.e==='hit')sfx.hit(ev.m,ev.s);
    else if(ev.e==='break'){sfx.brk(ev.u.mat);debris(ev.x,ev.y,ev.u.mat,ev.lost?0:10,ev.u.w>1.5)}
    else if(ev.e==='boom'){sfx.boom();firework(X,Y,!ev.small);if(!ev.small)debris(X,Y,'goal',8,true)}
    else if(ev.e==='goal'){goalsNow++;const u=ev.u,c=ITEM[u.g].c;
      if(u.g==='cage'){sfx.free();debris(X,Y,'wood',8);flyers.push({v:u.v,x:X,y:Y,vx:(Math.random()<.5?-1:1)*(1.4+Math.random()),t:0});sparkle(X,Y,'heart',5);say2(X,Y+.7,pickT('thanks'),'#ff9ad5');freeBird(u.v)}
      else{sfx.gift();sparkle(X,Y,'star',6);debris(X,Y,'goal',8);say2(X,Y+.6,pickT('got'),'#ffe14a')}
      addCoins(c,X,Y);say2(X,Y-.2,'+'+c,'#ffd23f')}
    else if(ev.e==='coin'){addCoins(3,X,Y);say2(X,Y+.3,'+3','#ffd23f')}
    else if(ev.e==='ignite'){sfx.burn();sparkle(X,Y,'dot',10,['#ff6a1f','#ffd23f','#fff'])}
    else if(ev.e==='tough'){const u=ev.u,q=u.b?u.b.getPosition():{x:X,y:Y};u.shakeT=performance.now();sfx.hit(u.mat,3);say2(q.x,q.y+.6,t('tough'),'#fff');
      const m=u.mat,need=NEEDS[m];G.tough=G.tough||{};
      if(!G.tough[m]){G.tough[m]=1;if(m==='iron')toast(t('tipM').iron);else if(need){const n=ARROWS[need].unlock;toast(G.av.includes(need)?tf('toughT',{a:t('AR')[need]}):tf('toughL',{a:t('AR')[need],n}))}}}
    else if(ev.e==='bundle'){G.shots++;renderHud();sfx.unlock();sparkle(X,Y,'dot',12,['#fff','#ffd23f','#ff5fa8']);say2(X,Y+.3,t('bonusA'),'#fff')}}
  S.ev.length=0;
  if(goalsNow){renderHud();bumpGoal();if(goalsNow>=2||S.goalsLeft===0)cheer()}
  if(S.goalsLeft<=0&&!G.won&&!G.winAt)G.winAt=performance.now()+1300}
function levelWin(){
  const n=G.n,par=G.lv.par,st=G.refill?1:G.used<=par?3:G.used<=par+2?2:1;G.won=true;G.state='end';
  const before=prog.open,old=prog.stars[n]||0;prog.stars[n]=Math.max(old,st);prog.open=Math.max(prog.open,Math.min(LEVELS,n+1));
  const bonus=Math.max(0,st-old)*5;prog.coins+=bonus;G.coins+=bonus;store.set('prog',prog);G.coinShown+=bonus;$('#coinHud b').textContent=G.coinShown;
  sfx.win();say(t('sayAlh'));confetti();
  setTimeout(()=>{if(!G||cur!=='game')return;
    $('#winSub').textContent=n>=LEVELS?t('allDone'):tf('lvlDone',{n});
    const is=$('#winStars').children;[...is].forEach((i,k)=>{i.className='';if(k<st)setTimeout(()=>{i.className='on';tone(880+k*220,.25,'triangle',.12)},400+k*300)});
    $('#winFact').textContent=fact(n);
    const u=$('#winUnl');u.innerHTML='';
    const cn=document.createElement('div');cn.className='unl coins';const cc=document.createElement('canvas');cc.width=cc.height=96;coinDraw(cc.getContext('2d'),48,48,40);cn.append(cc,document.createTextNode(tf('coinsWon',{n:G.coins})));u.appendChild(cn);
    const na=AORDER.find(a=>ARROWS[a].unlock===n+1),vb=VILLAGE.filter(b=>b.cost>totalStars()-(prog.stars[n]-old)&&b.cost<=totalStars()&&b.cost>0);
    const row=(node,txt)=>{const d=document.createElement('div');d.className='unl';if(node)d.append(node);d.append(document.createTextNode(txt));u.appendChild(d)};
    if(na&&before<n+1){store.set('newA',na);setTimeout(sfx.unlock,1300);row(arrowIcon(na,128),tf('newA',{a:t('AR')[na]})+' '+t('ARD')[na])}
    else if(G.newB.length){const b=G.newB[0],c=document.createElement('canvas');c.width=c.height=128;drawBird(c.getContext('2d'),b,64,70,40,true,.5);row(c,tf('newB',{b:t('BD')[b]}))}
    else if(vb.length){row(null,'🏡 '+tf('vBuilt',{b:t('B')[vb[0].id]}))}
    else if(n%WN===0&&n<LEVELS&&before<=n){row(null,tf('worldOpen',{w:t('W')[n/WN]}))}
    $('#winNext').style.display=n>=LEVELS?'none':'';ov('win',true)},1100)}
$('#winNext').onclick=()=>{ov('win',false);startGame(G.n+1)};
$('#winAgain').onclick=()=>{ov('win',false);startGame(G.n)};
$('#winMap').onclick=()=>{ov('win',false);G=null;openMap()};
$('#overAgain').onclick=()=>{ov('over',false);startGame(G.n)};
$('#overMap').onclick=()=>{ov('over',false);G=null;openMap()};
function outOfShots(){
  if(age==='little'){G.shots+=3;G.refill=1;renderHud();sfx.unlock();toast(t('moreA'));return}
  G.state='end';sfx.over();setTimeout(()=>{if(!G||cur!=='game')return;
  $('#overT').textContent=t('overT');$('#overP').textContent=t('overP');
  $('#overFact').textContent=fact(G.n+Math.floor(Math.random()*9));ov('over',true)},500)}

/* hint: a hand shows "press, pull back, let go" */
let hintAnim=null;
function showHint(){if(!G||G.state!=='ready'||cur!=='game')return;const x0=sx(LX)+cam.s*1.2,y0=sy(OY)-cam.s*.2,dx=-Math.min(120,cam.s*2.6),dy=Math.min(90,cam.s*1.6);
  const h=$('#hint');h.style.display='block';toast(t('aimHint'));
  hintAnim=h.animate([{transform:`translate(${x0-14}px,${y0}px) scale(1)`,opacity:0},{transform:`translate(${x0-14}px,${y0}px) scale(.85)`,opacity:1,offset:.15},
    {transform:`translate(${x0-14+dx}px,${y0+dy}px) scale(.85)`,opacity:1,offset:.6},{transform:`translate(${x0-14+dx}px,${y0+dy}px) scale(1)`,opacity:0,offset:.75},{transform:`translate(${x0-14+dx}px,${y0+dy}px) scale(1)`,opacity:0}],{duration:2400,iterations:Infinity});
  G.demo=performance.now()}
function hideHint(){if(hintAnim){hintAnim.cancel();hintAnim=null;$('#hint').style.display='none';store.set('hinted',1)}if(G)G.demo=0}

/* main loop: fixed 60 Hz physics */
let acc=0,lastT=0;
function loop(now){requestAnimationFrame(loop);
  const dt=Math.min(.1,(now-(lastT||now))/1000);lastT=now;
  if(cur==='game'&&G){
    if(!window.praying&&G.state!=='bism'){acc+=dt;let n=0;while(acc>=1/60&&n<4){simStep(G.sim);acc-=1/60;n++;
        if(G.state==='fly'&&turnDone(G.sim)){endTurn(G.sim);renderHud();if(G.sim.goalsLeft>0){G.state='ready';G.idle=now;G.backT=now+900}}
        if(G.state==='ready'&&G.shots<=0&&G.sim.goalsLeft>0&&!G.winAt)outOfShots()}
      if(acc>1/60)acc=0;handleEvents();
      if(G.winAt&&now>G.winAt&&!G.won&&G.state!=='aim'){G.winAt=0;levelWin()}
      if(G.state==='ready'&&age==='little'&&!hintAnim&&now-G.idle>9000){G.idle=now;showHint()}}
    if(G.demo&&G.state==='ready'){const k=((now-G.demo)%2400)/2400,p=k<.15?0:k<.6?(k-.15)/.45*.8:k<.75?.8:0;G.aim=p?{a:.6,p}:null}
    else if(G.demo===0&&G.state==='ready'&&G.aim&&!aimStart)G.aim=null;
    camStep(now);drawGame(now)}
  if(conf.length||fxDirty){drawConf();fxDirty=conf.length>0}}
let fxDirty=false;
requestAnimationFrame(loop);
addEventListener('resize',()=>{layout();if(cur==='home')renderHome();if(cur==='village')renderVillage()});

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
  btnNav=false;['bism','win','over','lauOv','stkOv','gate'].forEach(id=>ov(id,false));
  const s=(e.state&&e.state.s)||'home';if(s==='game'&&!G){show('home',false);renderHome();return}
  show(s,false);if(s==='home'){G=null;renderHome()}if(s==='map'){G=null;renderMap()}if(s==='village')renderVillage()});
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

/* ---------- My Village: every star helps build it ---------- */
const VILLAGE=[{id:'house',cost:0,x:.06},{id:'garden',cost:4,x:.15},{id:'well',cost:10,x:.235},{id:'palms',cost:18,x:.32},{id:'swing',cost:28,x:.41},{id:'school',cost:40,x:.5},
 {id:'market',cost:54,x:.6},{id:'pond',cost:70,x:.69},{id:'fountain',cost:86,x:.775},{id:'masjid',cost:104,x:.865},{id:'minaret',cost:125,x:.955},{id:'lights',cost:150,x:.5}];
function drawBuilding(x,id,cx,gy,u,W){
  const l=Math.max(1.5,u*.06);x.lineWidth=l;x.strokeStyle=OUT;x.lineJoin='round';x.lineCap='round';const fill=c=>{x.fillStyle=c;x.fill();x.stroke()};
  if(id==='house'){rr(x,cx-u*1.1,gy-u*1.5,u*2.2,u*1.5,u*.1);fill('#fff2d6');x.beginPath();x.moveTo(cx-u*1.35,gy-u*1.45);x.lineTo(cx,gy-u*2.5);x.lineTo(cx+u*1.35,gy-u*1.45);x.closePath();fill('#e8574a');
    rr(x,cx-u*.25,gy-u*.9,u*.5,u*.9,u*.2);fill('#8a5a2a');rr(x,cx+u*.45,gy-u*1.15,u*.45,u*.4,u*.06);fill('#7fd0ff');return}
  if(id==='garden'){rr(x,cx-u*.9,gy-u*.25,u*1.8,u*.25,u*.08);fill('#8a5a2a');for(let i=0;i<7;i++){const fx=cx-u*.8+i*u*.27,fy=gy-u*(.45+(i%2)*.15);x.beginPath();x.moveTo(fx,gy-u*.2);x.lineTo(fx,fy);x.stroke();
    for(let k=0;k<5;k++){x.beginPath();x.arc(fx+Math.cos(k*1.26)*u*.09,fy+Math.sin(k*1.26)*u*.09,u*.07,0,7);x.fillStyle=['#ff5fa8','#ffd23f','#a35bff','#ff8a1f'][i%4];x.fill()}x.beginPath();x.arc(fx,fy,u*.05,0,7);x.fillStyle='#fff';x.fill()}return}
  if(id==='well'){rr(x,cx-u*.6,gy-u*.7,u*1.2,u*.7,u*.12);fill('#b0a08c');x.beginPath();x.moveTo(cx-u*.5,gy-u*.7);x.lineTo(cx-u*.5,gy-u*1.7);x.moveTo(cx+u*.5,gy-u*.7);x.lineTo(cx+u*.5,gy-u*1.7);x.lineWidth=u*.12;x.stroke();x.lineWidth=l;
    x.beginPath();x.moveTo(cx-u*.8,gy-u*1.6);x.lineTo(cx,gy-u*2.1);x.lineTo(cx+u*.8,gy-u*1.6);x.closePath();fill('#c97a2c');rr(x,cx-u*.15,gy-u*1.25,u*.3,u*.3,u*.05);fill('#3fa8ff');return}
  if(id==='palms'){palm(x,cx-u*.5,gy,u*2.4);palm(x,cx+u*.5,gy,u*2.8);x.fillStyle='#8a4a1c';for(const [a,b] of [[-.42,-2.3],[.58,-2.7]]){x.beginPath();x.arc(cx+a*u,gy+b*u,u*.13,0,7);x.fill()}return}
  if(id==='swing'){x.lineWidth=u*.12;x.strokeStyle='#ff5f5f';x.beginPath();x.moveTo(cx-u*.9,gy);x.lineTo(cx-u*.6,gy-u*1.6);x.lineTo(cx+u*.6,gy-u*1.6);x.lineTo(cx+u*.9,gy);x.stroke();x.lineWidth=l;x.strokeStyle=OUT;
    x.beginPath();x.moveTo(cx-u*.2,gy-u*1.6);x.lineTo(cx-u*.2,gy-u*.6);x.moveTo(cx+u*.2,gy-u*1.6);x.lineTo(cx+u*.2,gy-u*.6);x.stroke();rr(x,cx-u*.3,gy-u*.65,u*.6,u*.12,u*.04);fill('#ffd23f');return}
  if(id==='school'){rr(x,cx-u*1.2,gy-u*1.7,u*2.4,u*1.7,u*.1);fill('#d6f7ea');rr(x,cx-u*1.35,gy-u*1.85,u*2.7,u*.25,u*.08);fill('#22c08d');
    x.beginPath();x.moveTo(cx,gy-u*1.15);x.quadraticCurveTo(cx-u*.3,gy-u*1.3,cx-u*.55,gy-u*1.2);x.lineTo(cx-u*.55,gy-u*.75);x.quadraticCurveTo(cx-u*.3,gy-u*.85,cx,gy-u*.7);x.quadraticCurveTo(cx+u*.3,gy-u*.85,cx+u*.55,gy-u*.75);x.lineTo(cx+u*.55,gy-u*1.2);x.quadraticCurveTo(cx+u*.3,gy-u*1.3,cx,gy-u*1.15);x.closePath();fill('#fff');
    x.beginPath();x.moveTo(cx,gy-u*1.15);x.lineTo(cx,gy-u*.7);x.stroke();rr(x,cx-u*.2,gy-u*.55,u*.4,u*.55,u*.12);fill('#8a5a2a');return}
  if(id==='market'){rr(x,cx-u*1,gy-u*1.1,u*2,u*1.1,u*.08);fill('#ffe2a0');for(let i=0;i<5;i++){x.beginPath();x.moveTo(cx-u+i*u*.4,gy-u*1.15);x.lineTo(cx-u+(i+1)*u*.4,gy-u*1.15);x.lineTo(cx-u+(i+1)*u*.4,gy-u*1.5);x.lineTo(cx-u+i*u*.4,gy-u*1.5);x.closePath();fill(i%2?'#fff':'#ff5f5f')}
    for(let i=0;i<4;i++){x.beginPath();x.arc(cx-u*.65+i*u*.43,gy-u*.45,u*.16,0,7);fill(['#ff8a1f','#3fcf5a','#ffd23f','#ff4f5e'][i])}return}
  if(id==='pond'){x.beginPath();x.ellipse(cx,gy-u*.08,u*1.3,u*.3,0,0,7);fill('#4fb8ff');x.beginPath();x.moveTo(cx-u*1.1,gy-u*.1);x.quadraticCurveTo(cx,gy-u*1.1,cx+u*1.1,gy-u*.1);x.lineWidth=u*.16;x.strokeStyle='#c97a2c';x.stroke();x.lineWidth=l;x.strokeStyle=OUT;return}
  if(id==='fountain'){rr(x,cx-u*.8,gy-u*.6,u*1.6,u*.6,u*.1);fill('#e8f0ff');for(const k of [-.45,0,.45]){x.beginPath();x.moveTo(cx+k*u,gy-u*.6);x.lineTo(cx+k*u,gy-u*.85);x.stroke();
    x.beginPath();x.moveTo(cx+k*u,gy-u*.85);x.quadraticCurveTo(cx+k*u+u*.15,gy-u*.85,cx+k*u+u*.17,gy-u*.6);x.strokeStyle='#4fb8ff';x.lineWidth=u*.07;x.stroke();x.strokeStyle=OUT;x.lineWidth=l}return}
  if(id==='masjid'){rr(x,cx-u*1.5,gy-u*1.6,u*3,u*1.6,u*.1);fill('#fffaf0');x.beginPath();x.arc(cx,gy-u*1.6,u*.95,Math.PI,0);x.closePath();fill('#22c08d');
    x.beginPath();x.moveTo(cx,gy-u*2.55);x.lineTo(cx,gy-u*2.95);x.stroke();x.beginPath();x.arc(cx,gy-u*3.05,u*.13,.6,5.7);x.stroke();
    x.beginPath();x.moveTo(cx-u*.32,gy);x.lineTo(cx-u*.32,gy-u*.75);x.arc(cx,gy-u*.75,u*.32,Math.PI,0);x.lineTo(cx+u*.32,gy);x.closePath();fill('#8a5a2a');
    for(const k of [-1,1]){x.beginPath();x.moveTo(cx+k*u*.95-u*.18,gy-u*.9);x.lineTo(cx+k*u*.95-u*.18,gy-u*1.15);x.arc(cx+k*u*.95,gy-u*1.15,u*.18,Math.PI,0);x.lineTo(cx+k*u*.95+u*.18,gy-u*.9);x.closePath();fill('#7fd0ff')}return}
  if(id==='minaret'){rr(x,cx-u*.3,gy-u*3.4,u*.6,u*3.4,u*.06);fill('#fffaf0');rr(x,cx-u*.45,gy-u*2.6,u*.9,u*.2,u*.06);fill('#22c08d');x.beginPath();x.moveTo(cx-u*.32,gy-u*3.4);x.lineTo(cx,gy-u*4);x.lineTo(cx+u*.32,gy-u*3.4);x.closePath();fill('#22c08d');
    x.beginPath();x.arc(cx,gy-u*4.15,u*.14,.6,5.7);x.stroke();return}
  if(id==='lights'){x.strokeStyle='rgba(74,44,20,.6)';x.lineWidth=2;x.beginPath();for(let X=0;X<=W;X+=W/40)x.lineTo(X,gy-u*4.6+Math.sin(X/W*Math.PI*6)*u*.35);x.stroke();
    for(let i=0;i<22;i++){const X=(i+.5)*W/22,Y=gy-u*4.6+Math.sin(X/W*Math.PI*6)*u*.35;x.save();x.shadowColor='#ffd060';x.shadowBlur=u*.4;x.beginPath();x.arc(X,Y+u*.15,u*.13,0,7);x.fillStyle=['#ffd23f','#ff5fa8','#7df0c2','#9fe2ff'][i%4];x.fill();x.restore()}}}
function drawVillage(x,W,H,stars,small){
  const gy=H*.86,u=Math.min(H/7,W/(small?16:22));paintWorld(x,0,W,H,gy,u,!small);
  const next=VILLAGE.find(b=>b.cost>stars);
  for(const b of VILLAGE){const built=b.cost<=stars;if(!built&&b!==next)continue;const cx=b.x*W;
    x.save();if(!built)x.globalAlpha=.3;drawBuilding(x,b.id,cx,gy,u,W);x.restore();
    if(!built&&!small){const ty=b.id==='lights'?gy-u*5.3:gy-u*(b.id==='minaret'?4.7:3.2);x.fillStyle='#fff';rr(x,cx-u*.85,ty-u*.4,u*1.7,u*.8,u*.4);x.fill();x.lineWidth=2;x.strokeStyle=OUT;x.stroke();
      x.font=`400 ${u*.5}px "Lilita One",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle='#d07a00';x.fillText('★ '+b.cost,cx,ty+u*.02)}}
  if(stars>=0&&IMG.mo.ok){const h=u*2.2,w=h*IMG.mo.naturalWidth/IMG.mo.naturalHeight;x.drawImage(IMG.mo,W*.06+u*1.4,gy-h,w,h)}}
function renderVillage(){const st=totalStars(),c=$('#vilCv'),wrap=$('#vilWrap'),d=DPR(),H=wrap.clientHeight||300,W=Math.max(wrap.clientWidth,Math.round(H*2.6));
  c.style.width=W+'px';c.style.height=H+'px';c.width=Math.round(W*d);c.height=Math.round(H*d);const x=c.getContext('2d');x.scale(d,d);drawVillage(x,W,H,st,false);
  $('#vilSum').innerHTML=`<img src="ui/star.webp" alt=""><span>${st}</span>`;
  const nx=VILLAGE.find(b=>b.cost>st);$('#vilNext').textContent=nx?tf('vNext',{b:t('B')[nx.id],n:nx.cost}):t('vDone');
  const nb=nx?VILLAGE[VILLAGE.indexOf(nx)-1]:VILLAGE[VILLAGE.length-2];if(nb)setTimeout(()=>{wrap.scrollLeft=Math.max(0,nb.x*W-wrap.clientWidth/2)},30)}
function openVillage(){show('village');renderVillage()}
/* ---------- Birds I Freed ---------- */
function renderStk(){const el=$('#stkList');el.innerHTML='';
  BIRDS.forEach(b=>{const d=document.createElement('div'),on=!!prog.birds[b];d.className=on?'':'lock';const c=document.createElement('canvas');c.width=c.height=192;const x=c.getContext('2d');
    if(!on)x.filter='brightness(0) opacity(.22)';drawBird(x,b,100,104,58,on,.4);d.append(c);
    d.insertAdjacentHTML('beforeend',on?`<b>${t('BD')[b]}</b><small>${t('BF')[b]}</small>`:`<b>?</b><small>${t('lockedB')}</small>`);el.appendChild(d)})}
/* ---------- Bow Workshop ---------- */
function upIcon(k,lvl,px){if(k==='bow')return bowIcon(Math.min(3,lvl),px);const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d');
  if(k==='quiver'){x.save();x.translate(px*.5,px*.55);x.rotate(.35);rr(x,-px*.16,-px*.3,px*.32,px*.62,px*.1);x.fillStyle='#c97a2c';x.fill();x.lineWidth=3;x.strokeStyle=OUT;x.stroke();
    for(const k2 of [-1,0,1]){x.save();x.translate(k2*px*.08,-px*.36);x.rotate(-Math.PI/2);drawArrow(x,'normal',px*.4,0);x.restore()}x.restore()}
  else{x.translate(px/2,px/2);x.beginPath();x.arc(0,0,px*.32,0,7);x.lineWidth=px*.07;x.strokeStyle='#ff5f5f';x.stroke();x.beginPath();x.arc(0,0,px*.16,0,7);x.strokeStyle='#ffd23f';x.stroke();
    x.beginPath();x.arc(0,0,px*.05,0,7);x.fillStyle=OUT;x.fill();for(const [a,b] of [[0,-1],[0,1],[-1,0],[1,0]]){x.beginPath();x.moveTo(a*px*.38,b*px*.38);x.lineTo(a*px*.46,b*px*.46);x.lineWidth=px*.04;x.strokeStyle=OUT;x.stroke()}}
  return c}
function renderLau(){
  $('#wsCoins').innerHTML='';const cc=document.createElement('canvas');cc.width=cc.height=64;coinDraw(cc.getContext('2d'),32,32,27);$('#wsCoins').append(cc,document.createTextNode(prog.coins));
  const el=$('#lauList');el.innerHTML='';
  for(const k of ['bow','quiver','sight']){const lvl=upLv(k),cost=UPS[k].cost[lvl],d=document.createElement('div');
    const nx=cost==null?lvl:lvl+1;d.append(upIcon(k,nx,144));
    const nm=k==='bow'?t('BOWT')[nx]:t('UP')[k]+' +'+nx;
    d.insertAdjacentHTML('beforeend',`<b>${nm}</b><small>${t('UPD')[k]}</small>`);
    const b=document.createElement('button');b.className='buy'+(cost==null?' max':cost>prog.coins?' poor':'');
    if(cost==null)b.textContent=t('maxed');else{const ic=document.createElement('canvas');ic.width=ic.height=48;coinDraw(ic.getContext('2d'),24,24,20);b.append(ic,document.createTextNode(cost))}
    b.onclick=()=>{if(cost==null)return;if(cost>prog.coins){sfx.bad();toast(t('needC'));b.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300});return}
      prog.coins-=cost;prog.up[k]=lvl+1;store.set('prog',prog);sfx.unlock();confetti();fxDirty=true;toast(tf('upDone',{u:k==='bow'?t('BOWT')[lvl+1]:t('UP')[k]}));renderLau();renderHomeArt()};
    d.append(b);el.appendChild(d)}
  const al=$('#arList');al.innerHTML='';
  AORDER.forEach(a=>{const open=ARROWS[a].unlock<=openTo()||ARROWS[a].unlock<=prog.open,d=document.createElement('div');d.className=open?'':'lock';
    d.append(arrowIcon(a,120));d.insertAdjacentHTML('beforeend',`<b>${t('AR')[a]}</b><small>${open?t('ARD')[a]:tf('unlockAt',{n:ARROWS[a].unlock})}</small>`);al.appendChild(d)})}

/* ---------- home ---------- */
function paintBg(){const c=$('#bg'),d=DPR(),W=innerWidth,H=innerHeight;c.width=Math.round(W*d);c.height=Math.round(H*d);const x=c.getContext('2d');x.scale(d,d);
  paintWorld(x,0,W,H,H*.88,Math.min(W,H)/12)}
function renderHomeArt(){
  const a=$('#cvAdv');if(a){const x=a.getContext('2d'),W=a.width,H=a.height,s=W/7.2;x.clearRect(0,0,W,H);
    const gy=H*.9;x.fillStyle='#7ad35a';x.fillRect(0,gy,W,H-gy);x.strokeStyle=OUT;x.lineWidth=2;x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke();
    const bx=W*.7;const blk=(X,Y,w,h,m)=>{x.save();x.translate(X,Y);drawBlock(x,{w,h,mat:m,dmg:0,hp:1,x:X,y:Y,k:'box'},s);x.restore()};
    blk(bx-s*.95,gy-s*.85,PW,PH,'brick');blk(bx+s*.95,gy-s*.85,PW,PH,'wood');blk(bx,gy-s*1.9,2.3,PT,'glass');
    x.save();x.translate(bx,gy-s*.55);drawGoal(x,'chest','',s*1.1);x.restore();
    x.save();x.translate(bx,gy-s*2.66);drawGoal(x,'cage','hoopoe',s*1.1);x.restore();
    x.save();x.translate(W*.5,gy-s*3.4);coinDraw(x,0,0,s*.3);x.restore();
    if(IMG.mo.ok){const h=s*2.2,w=h*IMG.mo.naturalWidth/IMG.mo.naturalHeight;x.drawImage(IMG.mo,W*.04,gy-h,w,h)}
    drawBow(x,upLv('bow'),W*.3,gy,W*.3,gy-s*1.5,s*.9,.45,.6,'normal');
    x.setLineDash([4,7]);x.strokeStyle='#fff';x.lineWidth=3;x.beginPath();x.moveTo(W*.38,gy-s*1.9);x.quadraticCurveTo(W*.5,gy-s*3.6,W*.6,gy-s*2.9);x.stroke();x.setLineDash([])}
  const v=$('#cvVil');if(v){const x=v.getContext('2d');x.save();rr(x,0,0,v.width,v.height,0);x.clip();drawVillage(x,v.width,v.height,Math.max(totalStars(),18),true);x.restore()}
  const pl=$('#pLau');if(pl){const x=pl.getContext('2d');x.clearRect(0,0,96,96);x.drawImage(bowIcon(upLv('bow'),96),0,0)}
  const ps=$('#pStk');if(ps){const x=ps.getContext('2d');x.clearRect(0,0,96,96);drawBird(x,'hoopoe',50,58,28,true,.4)}}
let idleT=0,idleI=0,idleN=0;
function stopNudge(){clearTimeout(idleT);clearInterval(idleI);document.querySelectorAll('.mode.nudge').forEach(m=>m.classList.remove('nudge'))}
function armNudge(){stopNudge();if(cur!=='home')return;idleT=setTimeout(()=>{const step=()=>{if(cur!=='home'||document.querySelector('.ov.on')){stopNudge();return}
  const ms=[$('#goAdv'),$('#goAdv'),$('#goVil')];ms.forEach(m=>m.classList.remove('nudge'));ms[idleN%3].classList.add('nudge');idleN++};step();idleI=setInterval(step,3200)},4000)}
['pointerdown','keydown','wheel'].forEach(ev=>document.addEventListener(ev,()=>{if(cur==='home')armNudge();else stopNudge()},true));
function renderHome(){armNudge();paintBg();renderHomeArt();
  $('#advBadge').innerHTML=`<img src="ui/star.webp" alt=""> ${totalStars()}`;
  $('#vilBadge').innerHTML=`<img src="ui/star.webp" alt=""> ${totalStars()}`;const nk=BIRDS.filter(b=>prog.birds[b]).length;$('#stkBadge').textContent=nk?nk+'/'+BIRDS.length:'';
  $('#coinBadge').textContent=prog.coins||'';
  document.querySelectorAll('#age button').forEach(b=>b.classList.toggle('on',b.dataset.a===age))}
$('#age').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;age=b.dataset.a;store.set('age',age);sfx.tap();renderHome()});
let picking=false;
function pickMode(btn,go){if(picking)return;picking=true;btn.classList.add('pick');sfx.tap();setTimeout(()=>{btn.classList.remove('pick');picking=false;go()},420)}
$('#goAdv').onclick=e=>pickMode(e.currentTarget,openMap);
$('#goLau').onclick=()=>{sfx.tap();renderLau();ov('lauOv',true)};
$('#goVil').onclick=e=>pickMode(e.currentTarget,openVillage);
$('#goStk').onclick=()=>{sfx.tap();renderStk();ov('stkOv',true)};
$('#stkClose').onclick=()=>ov('stkOv',false);
$('#lauClose').onclick=()=>{ov('lauOv',false);renderHome()};
function openMap(){renderMap();show('map');const c=$('#worlds .lv.cur')||[...document.querySelectorAll('#worlds .lv:not(.lock)')].pop();if(c)setTimeout(()=>c.scrollIntoView({block:'center'}),60)}
function renderMap(){
  $('#mapSum').innerHTML=`<img src="ui/star.webp" alt=""><span>${totalStars()}/${LEVELS*3}</span>`;
  const el=$('#worlds');el.innerHTML='';
  WORLDS.forEach((WD,w)=>{const first=w*WN+1,last=first+WN-1,lockW=first>openTo();let st=0;for(let n=first;n<=last;n++)st+=prog.stars[n]||0;
    const sec=document.createElement('div');sec.className='world w'+w+(lockW?' lock':'');
    const th=document.createElement('canvas');th.width=th.height=132;{const x=th.getContext('2d');paintWorld(x,w,132,132,104,14);x.save();x.translate(66,80);drawGoal(x,WD.items[0],WD.items[0]==='gift'?'pink':'',52);x.restore()}
    sec.innerHTML=`<div class="wh"><span class="thc"></span><div><b>${t('W')[w]}</b><small>${tf('levelsR',{a:first,b:last})}</small></div><span class="ws"><img src="ui/star.webp" alt=""> ${st}/${WN*3}</span></div><div class="lvls"></div>`;
    sec.querySelector('.thc').replaceWith(th);
    const g=sec.querySelector('.lvls');
    for(let n=first;n<=last;n++){const lk=n>openTo(),sn=prog.stars[n]||0,cu=n===prog.open&&!sn,b=document.createElement('button');b.className='lv'+(lk?' lock':cu?' cur':'');b.dataset.n=n;b.setAttribute('aria-label',tf('level',{n}));
      b.innerHTML=lk?'<img src="ui/lock.webp" alt="">':`${n}<span class="st">${[0,1,2].map(k=>`<i class="${k<sn?'on':''}"></i>`).join('')}</span>`;
      const na=AORDER.find(a=>ARROWS[a].unlock===n&&n>1);if(na){const s=document.createElement('span');s.className='ln';s.append(arrowIcon(na,80));b.appendChild(s)}
      g.appendChild(b)}
    if(lockW)sec.insertAdjacentHTML('beforeend',`<div class="wlock"><img src="ui/lock.webp" alt="">${tf('lockedW',{w:t('W')[w-1]})}</div>`);
    el.appendChild(sec)})}
$('#worlds').addEventListener('click',e=>{const b=e.target.closest('.lv');if(!b)return;const n=+b.dataset.n;if(n>openTo()){sfx.bad();toast(t('lockedLv'));b.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300});return}sfx.tap();startGame(n)});

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
window.__moa={get G(){return G},genLevel,genRaw,stable,makeSim,simulate,fire,simStep,turnDone,endTurn,ARROWS,AORDER,arrowsAt,PAR,startGame,shoot,
  get prog(){return prog},setProg(p){prog=p;store.set('prog',p)},cam};
