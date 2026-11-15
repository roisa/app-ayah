/* Mo Fashion Show: the children and their clothes, drawn in code as SVG layers
   (back hair / hood / backpack, shoes, bottom, top or dress, jacket, bag, head, hijab or hat,
   arms with sleeves, and what the child holds). No image files are needed.
   Every outfit is modest: long sleeves to the wrist and long skirts, robes or trousers to the ankle.
   Size: viewBox -10 -30 220 370 (the child stands about 330 high). */
'use strict';
const ART=(()=>{
const OUT='#4a2c14';
/* clothes colours. fam = colour family for "Matching colours" */
const C={pink:'#ff8cc6',rose:'#ff5f8f',red:'#f2545b',maroon:'#a3344c',orange:'#ff9f40',yellow:'#ffd23f',gold:'#f2c14e',mint:'#72e2b6',green:'#3fbf6a',teal:'#2ec4c4',
  sky:'#6ccaff',blue:'#3d7bff',navy:'#34449a',purple:'#a77bff',lilac:'#d6c2ff',white:'#fbfaf5',cream:'#fff0d2',beige:'#e3c79e',brown:'#a06a3c',grey:'#aeb6c2',black:'#3d3d48'};
const FAM={pink:'pink',rose:'pink',red:'red',maroon:'red',orange:'orange',yellow:'yellow',gold:'yellow',mint:'green',green:'green',teal:'green',sky:'blue',blue:'blue',navy:'blue',
  purple:'purple',lilac:'purple',white:'white',cream:'white',beige:'brown',brown:'brown',grey:'grey',black:'black'};
const BRIGHT=new Set(['pink','rose','red','orange','yellow','gold','mint','green','teal','sky','blue','purple']);
const NIGHT=new Set(['navy','purple','black','maroon']);
const WHITE=new Set(['white','cream']);
const CN={pink:['Pink','merah muda'],rose:['Rose','mawar'],red:['Red','merah'],maroon:['Maroon','marun'],orange:['Orange','oranye'],yellow:['Yellow','kuning'],gold:['Gold','emas'],
  mint:['Mint','mint'],green:['Green','hijau'],teal:['Teal','toska'],sky:['Sky blue','biru langit'],blue:['Blue','biru'],navy:['Navy','biru tua'],purple:['Purple','ungu'],lilac:['Lilac','lila'],
  white:['White','putih'],cream:['Cream','krem'],beige:['Beige','krem tua'],brown:['Brown','cokelat'],grey:['Grey','abu-abu'],black:['Black','hitam']};
const SKIN=['#ffe4d1','#f7cfae','#e8b086','#c88b5c','#9c653d','#6c4226'];
const HAIRC=['#2a1a10','#5a3418','#8a5428','#b0582c','#e0ad52','#d9733a'];
const HAIR={g:['long','ponytail','buns','bob','curly'],b:['short','spiky','side','curlyb','buzz']};
const HAIRN={long:['Long','Panjang'],ponytail:['Ponytail','Kuncir'],buns:['Two buns','Cepol dua'],bob:['Bob','Bob'],curly:['Curly puffs','Keriting'],
  short:['Short','Pendek'],spiky:['Spiky','Jabrik'],side:['Side part','Belah samping'],curlyb:['Curly','Keriting'],buzz:['Buzz cut','Cepak']};

const hx=h=>{const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]};
const mx=(h,k)=>'#'+hx(h).map(v=>Math.round(k>=0?v+(255-v)*k:v*(1+k)).toString(16).padStart(2,'0')).join('');

/* ---------- drawing helpers ---------- */
let SEQ=0;
function ctx(){const d=new Map(),u='k'+(++SEQ).toString(36)+'_';return{d,
  g(col){const id=u+'g'+col.slice(1);if(!d.has(id))d.set(id,`<linearGradient id="${id}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="${mx(col,.3)}"/><stop offset=".55" stop-color="${col}"/><stop offset="1" stop-color="${mx(col,-.13)}"/></linearGradient>`);return`url(#${id})`},
  r(col){const id=u+'r'+col.slice(1);if(!d.has(id))d.set(id,`<radialGradient id="${id}" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="${mx(col,.22)}"/><stop offset=".7" stop-color="${col}"/><stop offset="1" stop-color="${mx(col,-.08)}"/></radialGradient>`);return`url(#${id})`},
  p(type,c1,c2){const id=u+'p'+type+c1.slice(1)+c2.slice(1);if(!d.has(id)){let s=20,b='';const dk=mx(c2,-.3);
    if(type==='batik'){s=26;b=`<rect width="26" height="26" fill="${c1}"/><g fill="${c2}" stroke="${dk}" stroke-width="1"><ellipse cx="13" cy="5.5" rx="3" ry="4.6"/><ellipse cx="13" cy="20.5" rx="3" ry="4.6"/><ellipse cx="5.5" cy="13" rx="4.6" ry="3"/><ellipse cx="20.5" cy="13" rx="4.6" ry="3"/></g><circle cx="13" cy="13" r="1.8" fill="${dk}"/><g fill="${dk}"><circle cx="0" cy="0" r="2.2"/><circle cx="26" cy="0" r="2.2"/><circle cx="0" cy="26" r="2.2"/><circle cx="26" cy="26" r="2.2"/></g>`}
    else if(type==='check'){s=18;b=`<rect width="18" height="18" fill="${c1}"/><rect y="6" width="18" height="6" fill="${c2}" opacity=".55"/><rect x="6" width="6" height="18" fill="${c2}" opacity=".55"/><rect y="8.5" width="18" height="1" fill="#fff" opacity=".35"/><rect x="8.5" width="1" height="18" fill="#fff" opacity=".35"/>`}
    else if(type==='dots'){s=14;b=`<rect width="14" height="14" fill="${c1}"/><circle cx="7" cy="7" r="2.4" fill="${c2}"/>`}
    else if(type==='stars'){s=24;b=`<rect width="24" height="24" fill="${c1}"/><path d="M12 5l1.8 4.2 4.5.4-3.4 3 1 4.4L12 14.7 8.1 17l1-4.4-3.4-3 4.5-.4z" fill="${c2}"/><circle cx="2" cy="20" r="1.3" fill="${c2}"/><circle cx="21" cy="3" r="1" fill="${c2}"/>`}
    else if(type==='flowers'){s=22;b=`<rect width="22" height="22" fill="${c1}"/><g fill="${c2}"><circle cx="11" cy="7.5" r="2.6"/><circle cx="14.5" cy="10.5" r="2.6"/><circle cx="13" cy="14.5" r="2.6"/><circle cx="9" cy="14.5" r="2.6"/><circle cx="7.5" cy="10.5" r="2.6"/></g><circle cx="11" cy="11.3" r="1.9" fill="#ffd23f"/>`}
    else if(type==='stripes'){s=12;b=`<rect width="12" height="12" fill="${c1}"/><rect y="6" width="12" height="6" fill="${c2}"/>`}
    d.set(id,`<pattern id="${id}" width="${s}" height="${s}" patternUnits="userSpaceOnUse">${b}</pattern>`)}return`url(#${id})`},
  defs(){return d.size?`<defs>${[...d.values()].join('')}</defs>`:''}}}
const P=(d,f,sw=4,ex='')=>`<path d="${d}" fill="${f}" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"${ex}/>`;
const LN=(d,c=OUT,w=3,o=1)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o<1?` opacity="${o}"`:''}/>`;
const CI=(x,y,r,f,sw=4)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${sw?` stroke="${OUT}" stroke-width="${sw}"`:''}/>`;
const EL=(x,y,rx,ry,f,sw=4,ex='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${sw?` stroke="${OUT}" stroke-width="${sw}"`:''}${ex}/>`;
const HL=(d,o=.32)=>`<path d="${d}" fill="#fff" opacity="${o}"/>`;
/* a stadium (capsule) shape from x1,y1 to x2,y2 with radius r */
function cap(x1,y1,x2,y2,r){const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1,nx=-dy/l*r,ny=dx/l*r,f=v=>v.toFixed(1);
  return`M${f(x1+nx)},${f(y1+ny)} L${f(x2+nx)},${f(y2+ny)} A${r},${r} 0 0 0 ${f(x2-nx)},${f(y2-ny)} L${f(x1-nx)},${f(y1-ny)} A${r},${r} 0 0 0 ${f(x1+nx)},${f(y1+ny)}Z`}
const BTN=(x,y,c='#fff')=>CI(x,y,3,c,2);

/* body points */
const SH={L:[75,172],R:[125,172]},WR={L:[57,233],R:[143,233]},HD={L:[55,246],R:[145,246]};
const TORSO='M74,160 Q100,152 126,160 Q139,164 141,180 L143,247 Q100,259 57,247 L59,180 Q61,164 74,160Z';
const DRESS='M74,160 Q100,152 126,160 Q139,164 141,180 L139,224 Q153,274 159,316 Q100,331 41,316 Q47,274 61,224 L59,180 Q61,164 74,160Z';
const ROBE='M74,160 Q100,152 126,160 Q139,164 141,180 L147,318 Q100,330 53,318 L59,180 Q61,164 74,160Z';

/* ---------- styles: slot, who (g girl, b boy, a all), tags, names ---------- */
const ST={
 basicDress:['dress','g',['basic'],'simple dress','Gaun sederhana'],
 gamis:['dress','g',['festive','masjid','traditional'],'gamis','Gamis'],
 abaya:['dress','g',['masjid','simple','neat'],'abaya','Abaya'],
 kurung:['dress','g',['traditional','festive','neat'],'baju kurung','Baju kurung'],
 kebaya:['dress','g',['traditional','festive','batik'],'kebaya','Kebaya'],
 ruffle:['dress','g',['festive','sparkly'],'party dress','Gaun pesta'],
 jubah:['dress','b',['masjid','simple','traditional'],'jubah','Jubah'],
 basicTop:['top','a',['basic'],'long tee','Kaus lengan panjang'],
 koko:['top','b',['masjid','festive','traditional'],'baju koko','Baju koko'],
 shirt:['top','a',['neat'],'shirt','Kemeja'],
 school:['top','a',['school','neat'],'school shirt','Kemeja sekolah'],
 jersey:['top','a',['sporty','comfy'],'sports top','Kaus olahraga'],
 sweater:['top','a',['cosy','comfy'],'sweater','Sweter'],
 tunic:['top','g',['comfy','picnic'],'tunic','Tunik'],
 batikTop:['top','a',['batik','traditional','festive'],'batik shirt','Kemeja batik'],
 basicPants:['bottom','a',['basic'],'plain trousers','Celana polos'],
 trousers:['bottom','a',['neat','comfy'],'trousers','Celana panjang'],
 skirt:['bottom','g',['neat'],'long skirt','Rok panjang'],
 tiered:['bottom','g',['festive','picnic'],'ruffle skirt','Rok susun'],
 sarung:['bottom','b',['masjid','traditional'],'sarung','Sarung'],
 track:['bottom','a',['sporty','comfy'],'track pants','Celana training'],
 batikSkirt:['bottom','g',['batik','traditional'],'batik skirt','Rok batik'],
 raincoat:['jacket','a',['rain'],'raincoat','Jas hujan'],
 denim:['jacket','a',['picnic','comfy'],'jacket','Jaket'],
 cardigan:['jacket','a',['cosy','neat'],'cardigan','Kardigan'],
 blazer:['jacket','a',['school','neat'],'school blazer','Blazer sekolah'],
 puffer:['jacket','a',['cosy'],'puffy jacket','Jaket tebal'],
 instant:['hijab','g',['masjid','simple'],'hijab','Jilbab'],
 khimar:['hijab','g',['masjid','simple'],'khimar','Khimar'],
 pashmina:['hijab','g',['festive','neat'],'pashmina','Pashmina'],
 sporthijab:['hijab','g',['sporty'],'sport hijab','Jilbab olahraga'],
 schoolhijab:['hijab','g',['school','neat'],'school hijab','Jilbab sekolah'],
 square:['hijab','g',['neat','festive'],'square hijab','Jilbab segi empat'],
 peci:['hat','b',['masjid','festive','traditional'],'peci','Peci'],
 kopiah:['hat','b',['masjid','simple'],'kopiah','Kopiah'],
 cap:['hat','a',['sporty','sunny'],'cap','Topi'],
 beanie:['hat','a',['cosy'],'beanie','Kupluk'],
 sunhat:['hat','a',['sunny','picnic'],'sun hat','Topi lebar'],
 rainhat:['hat','a',['rain'],'rain hat','Topi hujan'],
 flowerband:['hat','g',['festive','picnic'],'flower band','Bando bunga'],
 basicShoes:['shoes','a',['basic'],'simple shoes','Sepatu polos'],
 sneakers:['shoes','a',['sporty','comfy'],'sneakers','Sepatu kets'],
 boots:['shoes','a',['rain'],'rain boots','Sepatu bot'],
 schoolshoes:['shoes','a',['school','neat'],'school shoes','Sepatu sekolah'],
 flats:['shoes','g',['festive','neat'],'flat shoes','Sepatu flat'],
 sandals:['shoes','a',['simple','comfy','sunny'],'sandals','Sandal'],
 backpack:['bag','a',['school'],'backpack','Ransel'],
 sling:['bag','a',['picnic','comfy'],'sling bag','Tas selempang'],
 tote:['bag','a',['neat'],'tote bag','Tas jinjing'],
 basket:['bag','a',['picnic'],'picnic basket','Keranjang piknik'],
 umbrella:['held','a',['rain'],'umbrella','Payung'],
 balloon:['held','a',['festive','picnic'],'balloon','Balon'],
 lantern:['held','a',['light','night'],'lantern','Lentera'],
 bouquet:['held','a',['gift','picnic'],'flowers','Buket bunga'],
 book:['held','a',['school'],'book','Buku'],
 ketupat:['held','a',['festive','traditional'],'ketupat','Ketupat'],
 sajadah:['held','a',['masjid'],'prayer mat','Sajadah'],
 ball:['held','a',['sporty'],'ball','Bola'],
 gift:['held','a',['gift','festive'],'gift','Kado'],
 starlamp:['held','a',['light','night','sparkly'],'star lamp','Lampu bintang']};
/* colour variants: [col, col2, pattern, lock]. lock = theme that opens it ("eid"), or with 3 stars ("eid3") */
const V={
 basicDress:[['beige','cream']],
 gamis:[['mint','white'],['pink','gold'],['lilac','white'],['sky','white','','eid'],['cream','gold','flowers','eid3'],['maroon','gold','','grandma'],['white','gold','','hajj']],
 abaya:[['navy','gold'],['black','gold','','masjid'],['brown','cream'],['white','sky','','hajj3']],
 kurung:[['yellow','pink'],['teal','gold'],['rose','white','flowers','grandma3']],
 kebaya:[['white','brown','batik'],['pink','maroon','batik','batik'],['mint','navy','batik','batik3']],
 ruffle:[['pink','white'],['lilac','gold','stars','stars'],['sky','white','','eid']],
 jubah:[['white','gold'],['cream','brown'],['grey','navy'],['navy','gold','','stars3'],['green','gold','','eid3']],
 basicTop:[['grey','white']],
 koko:[['white','gold'],['sky','white'],['green','gold'],['maroon','gold','','eid'],['cream','teal','','masjid3']],
 shirt:[['white','sky'],['blue','white'],['pink','white'],['mint','white','','grandma']],
 school:[['white','red']],
 jersey:[['red','white'],['blue','white'],['green','yellow'],['orange','navy','','sports'],['purple','yellow','','sports3']],
 sweater:[['yellow','orange','dots'],['purple','lilac'],['red','white','','rain'],['teal','white','stars','stars']],
 tunic:[['orange','yellow','flowers'],['sky','white','dots'],['pink','white','flowers','picnic']],
 batikTop:[['brown','gold','batik'],['navy','gold','batik'],['maroon','cream','batik','batik'],['teal','cream','batik','batik3']],
 basicPants:[['beige','brown']],
 trousers:[['navy','navy'],['brown','brown'],['black','black'],['beige','beige'],['grey','grey','','school']],
 skirt:[['navy','navy'],['pink','pink'],['grey','grey'],['purple','purple'],['white','white','','hajj'],['red','red','','eid3']],
 tiered:[['yellow','orange'],['mint','green'],['lilac','purple','','picnic3']],
 sarung:[['green','yellow','check'],['maroon','gold','check'],['navy','sky','check'],['white','grey','check','hajj']],
 track:[['navy','white'],['red','white'],['black','yellow','','sports']],
 batikSkirt:[['brown','gold','batik'],['purple','pink','batik'],['navy','sky','batik','batik']],
 raincoat:[['yellow','orange'],['sky','blue'],['pink','rose','','rain'],['green','yellow','','rain3']],
 denim:[['blue','sky'],['mint','green','','picnic']],
 cardigan:[['cream','brown'],['pink','white'],['lilac','white'],['orange','yellow','','grandma']],
 blazer:[['navy','gold'],['maroon','gold','','school3']],
 puffer:[['red','white'],['purple','pink'],['teal','white','','rain']],
 instant:[['pink','white'],['white','sky'],['mint','white'],['navy','sky'],['yellow','white'],['lilac','white'],['black','gold','','stars'],['cream','gold','','hajj']],
 khimar:[['white','sky'],['purple','lilac'],['beige','brown'],['navy','gold','stars','stars3'],['sky','white','','masjid']],
 pashmina:[['rose','pink'],['teal','mint'],['cream','gold','dots'],['gold','yellow','','eid']],
 sporthijab:[['black','pink'],['blue','sky'],['red','white','','sports']],
 schoolhijab:[['white','grey']],
 square:[['sky','white','flowers'],['maroon','gold'],['pink','white','dots','picnic'],['brown','gold','batik','batik']],
 peci:[['black','black'],['maroon','gold','','eid'],['navy','gold','','batik3']],
 kopiah:[['white','white'],['cream','gold'],['green','white','','masjid']],
 cap:[['red','white'],['blue','white'],['green','white','','sports']],
 beanie:[['orange','yellow'],['purple','pink'],['teal','white','','rain']],
 sunhat:[['cream','pink'],['yellow','orange','','picnic']],
 rainhat:[['yellow','orange'],['sky','blue','','rain3']],
 flowerband:[['pink','yellow'],['lilac','white','','eid']],
 basicShoes:[['grey','white']],
 sneakers:[['red','white'],['blue','white'],['pink','white'],['green','yellow','','sports'],['purple','yellow','','sports3']],
 boots:[['yellow','orange'],['red','white'],['green','yellow','','rain']],
 schoolshoes:[['black','white']],
 flats:[['pink','rose'],['gold','yellow'],['lilac','purple','','grandma']],
 sandals:[['brown','beige'],['white','sky','','hajj']],
 backpack:[['red','yellow'],['blue','sky'],['purple','pink','','school']],
 sling:[['orange','brown'],['mint','green']],
 tote:[['cream','pink','flowers'],['navy','gold']],
 basket:[['brown','red','check'],['beige','sky','check','picnic']],
 umbrella:[['red','white'],['yellow','orange'],['sky','white','dots','rain']],
 balloon:[['red','white'],['sky','white'],['yellow','white','','eid']],
 lantern:[['gold','orange'],['teal','gold','','stars']],
 bouquet:[['pink','green'],['yellow','green','','grandma']],
 book:[['green','gold'],['blue','gold','','school']],
 ketupat:[['green','yellow']],
 sajadah:[['maroon','gold'],['green','gold','','masjid3']],
 ball:[['orange','white'],['white','black','','sports']],
 gift:[['pink','yellow'],['sky','red','','grandma3']],
 starlamp:[['gold','yellow','','stars']]};
const ITEMS={},LIST=[];
for(const s in V)V[s].forEach(([c,c2,pat,lock])=>{const [slot,who,tags,en,idn]=ST[s];const id=s+'-'+c+(pat?'-'+pat:'');
  const t=new Set(tags);if(BRIGHT.has(c))t.add('bright');if(NIGHT.has(c))t.add('nightc');if(WHITE.has(c))t.add('white');if(c2==='gold'||pat==='stars'||c==='gold')t.add('sparkly');
  const it={id,slot,style:s,who,col:c,col2:c2,pat:pat||'',lock:lock||'',tags:t,fam:FAM[c],
    name:[CN[c][0]+' '+en,idn+' '+CN[c][1]]};ITEMS[id]=it;LIST.push(it)});

/* ---------- face ---------- */
function face(o){const e=o.face||'smile';let s='';
  s+=EL(80,106,7.5,10,'#2a1a10',0)+CI(82.6,101.6,3,'#fff',0)+CI(77.6,110,1.5,'#fff',0);
  if(e==='wink')s+=LN('M112,106 Q120,98 128,106',OUT,4);
  else s+=EL(120,106,7.5,10,'#2a1a10',0)+CI(122.6,101.6,3,'#fff',0)+CI(117.6,110,1.5,'#fff',0);
  s+=LN('M72,90 Q80,86 88,90',OUT,3,.55)+LN('M112,90 Q120,86 128,90',OUT,3,.55);
  s+=EL(66,124,9,5.5,'#ff7f9a',0,' opacity=".5"')+EL(134,124,9,5.5,'#ff7f9a',0,' opacity=".5"');
  s+=EL(100,117,3,2.2,'rgba(120,60,30,.28)',0);
  if(e==='grin'||e==='wink')s+=P('M89,124 Q100,141 111,124 Q100,128 89,124Z','#d9475c',3)+P('M95,132 Q100,137 105,132 Q100,129 95,132Z','#ff8fa0',0);
  else s+=LN('M91,126 Q100,135 109,126',OUT,3.5);
  return s}

/* ---------- hair ---------- */
function hairBack(st,c,x){const f=x.g(c);
  switch(st){
   case 'long':return P('M36,100 Q34,28 100,28 Q166,28 164,100 L168,200 Q160,216 140,208 L60,208 Q40,216 32,200Z',f);
   case 'ponytail':return P('M150,62 Q182,70 178,120 Q176,160 160,186 Q156,160 156,130 Q154,96 140,80Z',f)+CI(146,66,9,x.g(C.pink),3);
   case 'buns':return CI(50,46,21,f)+CI(150,46,21,f)+HL('M40,40 Q46,30 56,32 Q46,36 42,44Z');
   case 'bob':return P('M36,100 Q34,30 100,30 Q166,30 164,100 L164,148 Q152,160 138,150 L62,150 Q48,160 36,148Z',f);
   case 'curly':return CI(40,74,24,f)+CI(160,74,24,f)+CI(34,96,16,f)+CI(166,96,16,f);
  }return''}
function hairFront(st,c,x){const f=x.g(c),hl=HL('M62,52 Q84,36 108,38 Q84,44 68,58Z',.35);
  switch(st){
   case 'long':case 'ponytail':case 'bob':return P('M40,104 Q34,30 100,30 Q166,30 160,104 Q156,84 146,76 Q128,84 112,72 Q98,86 78,76 Q60,84 52,84 Q44,90 40,104Z',f)+hl;
   case 'buns':return P('M40,102 Q36,32 100,32 Q164,32 160,102 Q152,80 132,74 Q116,82 100,72 Q84,82 68,74 Q48,80 40,102Z',f)+hl;
   case 'curly':return P('M38,104 Q30,82 42,68 Q40,46 60,42 Q68,26 88,30 Q100,20 114,30 Q134,26 140,42 Q160,46 158,68 Q170,82 162,104 Q156,84 144,82 Q138,72 126,76 Q116,68 106,76 Q94,68 84,76 Q72,70 64,80 Q50,82 38,104Z',f)+hl;
   case 'short':return P('M42,100 Q38,34 100,32 Q162,34 158,100 Q156,76 140,70 Q120,78 100,68 Q80,78 60,70 Q46,76 42,100Z',f)+hl;
   case 'spiky':return P('M42,100 Q36,56 56,42 L60,24 L76,36 L88,18 L102,34 L118,18 L126,38 L144,30 L146,48 Q164,60 158,100 Q152,76 132,72 Q100,80 68,72 Q48,76 42,100Z',f)+hl;
   case 'side':return P('M42,102 Q36,34 104,32 Q164,34 158,100 Q154,80 140,74 Q110,72 86,58 Q80,74 60,76 Q46,82 42,102Z',f)+hl;
   case 'curlyb':return P('M42,100 Q30,86 40,72 Q34,52 54,46 Q58,30 78,32 Q88,20 102,28 Q116,20 126,32 Q146,30 148,46 Q166,52 160,72 Q170,86 158,100 Q152,84 140,82 Q132,74 120,78 Q110,70 100,78 Q90,70 80,78 Q68,74 60,82 Q48,84 42,100Z',f)+hl;
   case 'buzz':return P('M44,94 Q42,38 100,36 Q158,38 156,94 Q150,68 100,64 Q50,68 44,94Z',f);
  }return''}

/* ---------- hijab ---------- */
function hijab(it,x){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c),dk=mx(c,-.22);let s='';
  switch(it.style){
   case 'khimar':s=P('M100,22 Q168,22 168,100 Q168,136 160,156 Q176,176 168,206 L152,242 Q100,256 48,242 L32,206 Q24,176 40,156 Q32,136 32,100 Q32,22 100,22Z',f)+LN('M50,226 Q100,240 150,226',dk,3,.6);break;
   case 'sporthijab':s=P('M100,26 Q166,26 166,102 Q166,148 148,170 Q100,186 52,170 Q34,148 34,102 Q34,26 100,26Z',f)+LN('M40,128 Q100,140 160,128',c2,6);break;
   case 'square':s=P('M100,24 Q168,24 168,102 Q168,140 150,162 Q172,186 154,202 L100,238 L46,202 Q28,186 50,162 Q32,140 32,102 Q32,24 100,24Z',f);break;
   case 'pashmina':s=P('M100,24 Q168,24 168,102 Q168,140 150,162 Q166,182 156,204 Q100,222 44,204 Q34,182 50,162 Q32,140 32,102 Q32,24 100,24Z',f)
     +P('M138,160 Q166,190 156,250 L136,248 Q142,206 122,178Z',f)+LN('M54,178 Q100,212 146,172',dk,3,.7);break;
   default:s=P('M100,24 Q168,24 168,102 Q168,140 150,162 Q166,182 156,204 Q100,222 44,204 Q34,182 50,162 Q32,140 32,102 Q32,24 100,24Z',f);
  }
  s+=HL('M52,64 Q70,34 100,30 Q74,42 60,72Z',.3);
  return s}
function hijabFront(it,x){const c=C[it.col],c2=C[it.col2],dk=mx(c,-.25);let s=LN('M62,150 Q100,178 138,150',dk,3,.7);
  if(it.style==='schoolhijab')s+=P('M58,76 Q100,44 142,76 Q100,60 58,76Z',x.g(mx(c,-.06)),3);
  if(it.style==='square'||it.style==='instant')s+=CI(100,166,6,x.r(C.gold),3);
  if(it.style==='sporthijab')s='';
  return s}

/* ---------- hats (head top is at y 34; over a hijab the hat sits a little higher) ---------- */
function hat(it,x,onHijab){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c);let s='';
  switch(it.style){
   case 'peci':s=P('M56,62 L60,30 Q100,20 140,30 L144,62 Q100,72 56,62Z',f)+(it.col2!==it.col?LN('M58,52 Q100,62 142,52',c2,5):'')+HL('M66,34 Q90,28 110,28 Q86,34 70,42Z',.25);break;
   case 'kopiah':s=P('M52,64 Q54,20 100,18 Q146,20 148,64 Q100,74 52,64Z',f)+LN('M58,48 Q100,56 142,48',mx(c2,-.15),2.5,.7)+LN('M66,34 Q100,40 134,34',mx(c2,-.15),2.5,.7)
     +[70,84,100,116,130].map(X=>CI(X,58,2.2,mx(c,-.18),0)).join('');break;
   case 'cap':s=P('M48,72 Q48,22 100,20 Q152,22 152,72 Q100,62 48,72Z',f)+P('M52,70 Q28,72 14,86 Q48,90 82,72Z',x.g(c2))+CI(100,22,5,x.g(c2),3)+LN('M100,24 L100,64',mx(c,-.2),2.5,.6);break;
   case 'beanie':s=P('M42,78 Q42,18 100,16 Q158,18 158,78Z',f)+P('M40,66 L160,66 L160,84 Q100,92 40,84Z',x.g(c2))+CI(100,12,13,x.g(c2))
     +[54,68,82,96,110,124,138,150].map(X=>LN(`M${X},70 L${X},84`,mx(c2,-.2),2,.6)).join('');break;
   case 'sunhat':s=EL(100,60,80,17,f)+P('M62,58 Q62,14 100,12 Q138,14 138,58Z',f)+P('M62,46 Q100,54 138,46 L138,58 Q100,66 62,58Z',x.g(c2))+CI(130,52,8,x.g(c2),3);break;
   case 'rainhat':s=P('M58,58 L64,18 Q100,8 136,18 L142,58Z',f)+P('M36,76 Q100,40 164,76 L152,58 Q100,42 48,58Z',x.g(c2));break;
   case 'flowerband':s=LN('M46,74 Q100,10 154,74',mx(c,-.2),6)+[[52,62],[70,40],[100,30],[130,40],[148,62]].map(([X,Y],i)=>
     [0,72,144,216,288].map(a=>CI(X+Math.cos(a*Math.PI/180)*6,Y+Math.sin(a*Math.PI/180)*6,5.5,i%2?C[it.col2]:c,2)).join('')+CI(X,Y,4,C.yellow,2)).join('');break;
  }
  return onHijab?`<g transform="translate(100 60) scale(1.1) translate(-100 -66)">${s}</g>`:s}

/* ---------- tops, bottoms, dresses, jackets ---------- */
function sleeves(it,x,side,r=13){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c);const [a,b]=SH[side],[cx,cy]=WR[side];
  let s=P(cap(a,b,cx,cy,r),f,4);
  const cuffCol=({koko:c2,jersey:c2,sweater:mx(c,-.12),gamis:c2,abaya:c2,kurung:c2,ruffle:'#fff',jubah:c2,kebaya:mx(c,-.05),school:c,shirt:c2,batikTop:c2})[it.style];
  if(cuffCol){const k=side==='L'?-1:1;s+=P(cap(cx-k*1.2,cy-8,cx,cy,r+.5),x.g(cuffCol),3.5)}
  if(it.style==='jersey')s+=LN(`M${a+(cx-a)*.35+(side==='L'?-10:10)},${b+(cy-b)*.35} L${a+(cx-a)*.35+(side==='L'?11:-11)},${b+(cy-b)*.35+3}`,c2,5);
  if(it.style==='ruffle')s+=LN(`M${a+(side==='L'?-12:12)},${b-2} Q${a},${b-16} ${a+(side==='L'?14:-14)},${b-6}`,'#fff',5,.7);
  s+=HL(cap(a+(side==='L'?-4:4),b+4,cx+(side==='L'?-4:4),cy-10,3.5),.28);
  return s}
function top(it,x){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c);let s='';
  switch(it.style){
   case 'tunic':s=P('M74,160 Q100,152 126,160 Q139,164 141,180 L144,236 Q154,262 156,276 Q100,288 44,276 Q46,262 56,236 L59,180 Q61,164 74,160Z',f)+LN('M48,268 Q100,280 152,268',c2,5,.9);break;
   default:s=P(TORSO,f);
  }
  switch(it.style){
   case 'koko':s+=P('M84,158 Q100,166 116,158 L114,150 Q100,156 86,150Z',x.g(c2),3)+LN('M100,164 L100,240',mx(c,-.25),3)+[178,198,218].map(Y=>BTN(100,Y,c2)).join('')
     +LN('M66,186 Q78,182 86,190 Q78,198 66,194',c2,3)+LN('M134,186 Q122,182 114,190 Q122,198 134,194',c2,3);break;
   case 'shirt':case 'school':s+=P('M80,158 L100,176 L120,158 L114,152 L100,166 L86,152Z',x.g(it.style==='school'?'#ffffff':c2),3)+LN('M100,176 L100,244',mx(c,-.2),3)+[192,212,232].map(Y=>BTN(100,Y,'#fff')).join('');
     if(it.style==='school')s+=P('M112,188 L132,188 L132,206 Q122,212 112,206Z','#fff',2.5)+CI(122,196,4,c2,2)+P('M92,176 L108,176 L104,186 L96,186Z',x.g(c2),2.5)+P('M96,186 L104,186 L108,214 L100,222 L92,214Z',x.g(c2),2.5);break;
   case 'jersey':s+=LN('M86,158 Q100,170 114,158',c2,6)+LN('M62,212 L138,212',c2,7)+`<text x="100" y="204" text-anchor="middle" font-family="Lilita One,Baloo 2,sans-serif" font-size="26" fill="${c2}" stroke="${OUT}" stroke-width="1.4">7</text>`;break;
   case 'sweater':s+=P('M84,156 Q100,166 116,156 L114,150 Q100,158 86,150Z',x.g(mx(c,-.12)),3)+P('M58,236 L142,236 L143,247 Q100,259 57,247Z',x.g(mx(c,-.12)),3)
     +(it.pat?'':`<path d="M100,214 C88,202 86,192 94,188 C98,186 100,190 100,192 C100,190 102,186 106,188 C114,192 112,202 100,214Z" fill="${c2}" stroke="${OUT}" stroke-width="2.5"/>`);break;
   case 'batikTop':s+=P('M80,158 L100,174 L120,158 L114,152 L100,164 L86,152Z',x.g(c2),3)+LN('M100,174 L100,244',mx(c2,-.3),3)+[190,210,230].map(Y=>BTN(100,Y,c2)).join('');break;
   case 'basicTop':s+=LN('M86,158 Q100,170 114,158',mx(c,-.2),4);break;
   case 'tunic':s+=LN('M86,158 Q100,170 114,158',c2,5);break;
  }
  s+=HL('M66,176 Q72,166 82,166 Q72,180 70,214 Q64,200 66,176Z');
  return s}
function bottom(it,x){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c);let s='';
  switch(it.style){
   case 'skirt':s=P('M64,226 L136,226 Q150,274 156,318 Q100,331 44,318 Q50,274 64,226Z',f)+LN('M86,250 Q82,286 80,318',mx(c,-.2),3,.5)+LN('M114,250 Q118,286 120,318',mx(c,-.2),3,.5);break;
   case 'batikSkirt':s=P('M64,226 L136,226 Q150,274 156,318 Q100,331 44,318 Q50,274 64,226Z',f)+P('M46,304 Q100,316 154,304 L156,318 Q100,331 44,318Z',x.g(c2),3);break;
   case 'tiered':s=P('M56,280 L144,280 Q156,300 160,318 Q100,332 40,318 Q44,300 56,280Z',x.g(c2))+P('M60,252 L140,252 Q150,270 152,288 Q100,298 48,288 Q50,270 60,252Z',x.g(c))+P('M64,226 L136,226 Q142,244 144,258 Q100,266 56,258 Q58,244 64,226Z',f);break;
   case 'sarung':s=P('M60,226 L140,226 L145,320 Q100,328 55,320Z',f)+P('M60,226 L140,226 L140,242 Q100,248 60,242Z',x.g(mx(c,-.15)),3)+LN('M118,244 L126,320',mx(c,-.3),3,.6);break;
   default:{const legs='M62,226 L138,226 L141,320 Q124,326 106,320 L102,262 Q100,256 98,262 L94,320 Q76,326 59,320Z';s=P(legs,f);
     if(it.style==='track')s+=LN('M66,232 L62,316',c2,5)+LN('M134,232 L138,316',c2,5);
     s+=LN('M100,228 L100,252',mx(c,-.25),3,.6)}
  }
  return s}
function dress(it,x){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c),dk=mx(c,-.22);let s='';
  switch(it.style){
   case 'abaya':s=P(ROBE,f)+P('M94,158 L106,158 L112,324 Q100,326 88,324Z',x.g(c2),3);break;
   case 'jubah':s=P(ROBE,f)+P('M86,156 Q100,164 114,156 L112,150 Q100,156 88,150Z',x.g(c2),3)+LN('M100,164 L100,214',dk,3)+[176,192,208].map(Y=>BTN(100,Y,c2)).join('')+LN('M58,300 Q100,312 146,300',c2,4,.8);break;
   case 'kurung':s=P('M60,250 L140,250 Q150,286 154,318 Q100,330 46,318 Q50,286 60,250Z',f)+P('M74,160 Q100,152 126,160 Q139,164 141,180 L146,272 Q100,284 54,272 L59,180 Q61,164 74,160Z',f)+P('M86,156 Q100,170 114,156 L110,150 Q100,160 90,150Z',x.g(c2),3);break;
   case 'kebaya':{const sk=x.p('batik',C[it.col2],mx(C[it.col2],.5));s=P('M62,226 L138,226 Q150,274 155,318 Q100,330 45,318 Q50,274 62,226Z',sk)+LN('M120,232 L130,318',mx(C[it.col2],-.3),3,.7)
     +P('M74,160 Q100,152 126,160 Q139,164 141,180 L144,256 Q132,266 120,258 Q110,268 100,258 Q90,268 80,258 Q68,266 56,256 L59,180 Q61,164 74,160Z',x.g(c))+LN('M88,160 L100,196 L112,160',dk,3)+CI(100,198,6,x.r(C.gold),3)+CI(100,220,4,x.r(C.gold),2.5);break}
   case 'ruffle':s=P(DRESS,f)+P('M44,296 Q100,310 156,296 L160,318 Q148,326 136,320 Q124,328 112,320 Q100,328 88,320 Q76,328 64,320 Q52,326 40,318Z',x.g('#ffffff'),3)+P('M64,220 Q100,232 136,220 L138,230 Q100,242 62,230Z',x.g(c2),3)+CI(100,228,7,x.g(c2),3);break;
   case 'basicDress':s=P(DRESS,f)+LN('M86,158 Q100,170 114,158',dk,4);break;
   default:/* gamis */s=P(DRESS,f)+P('M62,218 Q100,230 138,218 L139,232 Q100,244 61,232Z',x.g(c2),3)+LN('M86,158 Q100,170 114,158',c2,5)+LN('M80,250 Q74,286 70,318',dk,3,.45)+LN('M120,250 Q126,286 130,318',dk,3,.45)+LN('M100,252 L100,322',dk,3,.35);
  }
  s+=HL('M66,176 Q72,166 82,166 Q72,180 70,214 Q64,200 66,176Z');
  return s}
function jacketBack(it,x){if(it.style!=='raincoat')return'';return P('M60,166 Q100,128 140,166 Q100,176 60,166Z',x.g(mx(C[it.col],-.1)))}
function jacket(it,x){const c=C[it.col],c2=C[it.col2],f=x.g(c),dk=mx(c,-.25);let s='';
  switch(it.style){
   case 'raincoat':s=P('M72,160 Q100,170 128,160 Q141,164 143,180 L150,286 Q100,298 50,286 L57,180 Q59,164 72,160Z',f)+P('M78,158 L100,176 L122,158 L118,150 L100,166 L82,150Z',x.g(c2),3)+LN('M100,176 L100,290',dk,3)+[196,224,254].map(Y=>CI(108,Y,4,x.g(c2),2.5)).join('')
     +P('M62,240 L84,240 L84,256 L62,256Z',x.g(mx(c,-.08)),2.5)+P('M116,240 L138,240 L138,256 L116,256Z',x.g(mx(c,-.08)),2.5);break;
   case 'puffer':s=P('M70,158 Q100,166 130,158 Q144,164 146,182 L148,252 Q100,266 52,252 L54,182 Q56,164 70,158Z',f)+[188,212,236].map(Y=>LN(`M56,${Y} Q100,${Y+10} 144,${Y}`,dk,3,.6)).join('')+LN('M100,164 L100,258',c2,4)+P('M80,154 Q100,166 120,154 L118,146 Q100,156 82,146Z',x.g(c2),3);break;
   default:{const L1='M72,160 Q62,164 60,180 L58,250 Q76,256 94,254 L96,212 L88,170Z',R1='M128,160 Q138,164 140,180 L142,250 Q124,256 106,254 L104,212 L112,170Z';
     s=P(L1,f)+P(R1,f);
     if(it.style==='blazer')s+=P('M88,170 L80,160 L96,206Z',x.g(mx(c,-.15)),3)+P('M112,170 L120,160 L104,206Z',x.g(mx(c,-.15)),3)+CI(124,196,6,x.r(C[it.col2]),2.5);
     else if(it.style==='denim')s+=P('M84,162 L72,156 L80,184Z',x.g(c2),3)+P('M116,162 L128,156 L120,184Z',x.g(c2),3)+P('M66,200 L86,200 L86,214 L66,214Z',x.g(mx(c,-.1)),2.5)+P('M114,200 L134,200 L134,214 L114,214Z',x.g(mx(c,-.1)),2.5)+LN('M60,240 L94,242',c2,3)+LN('M106,242 L140,240',c2,3);
     else s+=[196,216,236].map(Y=>BTN(91,Y,c2)).join('')+LN('M60,244 L94,246',dk,4,.5)+LN('M106,246 L140,244',dk,4,.5);}
  }
  s+=HL('M64,180 Q68,170 76,168 Q68,184 68,206 Q62,196 64,180Z',.25);
  return s}
function jacketSleeve(it,x,side){const c=C[it.col],c2=C[it.col2];const [a,b]=SH[side],[cx,cy]=WR[side];let s=P(cap(a,b,cx,cy,15),x.g(c),4);
  const k=side==='L'?-1:1;s+=P(cap(cx-k*1.4,cy-9,cx,cy,15.5),x.g(it.style==='denim'||it.style==='cardigan'?mx(c,-.12):c2),3.5);
  if(it.style==='puffer')s+=LN(`M${a+(cx-a)*.45-12},${b+(cy-b)*.45} L${a+(cx-a)*.45+12},${b+(cy-b)*.45+2}`,mx(c,-.25),3,.6);
  return s}

/* ---------- shoes ---------- */
function shoe(it,x,side,sk){const c=C[it.col],c2=C[it.col2],X=side==='L'?83:117,f=x.g(c);let s='';
  switch(it.style){
   case 'boots':s=P(`M${X-13},292 L${X+13},292 L${X+13},322 Q${X+20},326 ${X+19},334 L${X-19},334 Q${X-20},324 ${X-13},320Z`,f)+LN(`M${X-13},300 L${X+13},300`,c2,4);break;
   case 'sandals':s=EL(X,333,18,6,x.g(c2))+EL(X,326,11,7,sk||SKIN[1],3)+LN(`M${X-11},326 Q${X},318 ${X+11},326`,c,6);break;
   case 'flats':s=P(`M${X-17},332 Q${X-18},320 ${X-6},319 L${X+8},319 Q${X+19},322 ${X+17},333 Q${X},337 ${X-17},332Z`,f)+CI(X,322,4,x.g(c2),2.5);break;
   default:s=P(`M${X-17},333 Q${X-18},318 ${X-4},317 L${X+6},317 Q${X+19},320 ${X+18},333 Q${X},338 ${X-17},333Z`,f)+LN(`M${X-17},331 Q${X},336 ${X+18},331`,c2,4);
     if(it.style==='sneakers')s+=LN(`M${X-5},321 L${X+5},325`,'#fff',2.5)+LN(`M${X-6},326 L${X+6},322`,'#fff',2.5);
  }
  return s+EL(X-6,323,4,2,'#fff',0,' opacity=".35"')}

/* ---------- bags (worn) and things held in the right hand ---------- */
function bagBack(it,x){if(it.style!=='backpack')return'';const c=C[it.col];return P('M50,176 Q50,160 66,160 L134,160 Q150,160 150,176 L152,246 Q100,256 48,246Z',x.g(c))+P('M88,160 Q100,140 112,160',x.g(mx(c,-.2)),3)}
function bagFront(it,x){const c=C[it.col],c2=C[it.col2];
  if(it.style==='backpack')return LN('M80,162 L76,232',OUT,9)+LN('M80,162 L76,232',x.g(c2)==null?c2:c2,5)+LN('M120,162 L124,232',OUT,9)+LN('M120,162 L124,232',c2,5);
  if(it.style==='sling')return LN('M128,162 L74,232',OUT,9)+LN('M128,162 L74,232',c2,5)+P('M54,226 Q54,218 62,218 L88,218 Q94,218 94,226 L94,250 Q74,258 54,250Z',x.g(c))+P('M54,226 Q54,218 62,218 L88,218 Q94,218 94,226 L94,234 Q74,240 54,234Z',x.g(mx(c,-.12)),3)+CI(74,236,3.5,x.g(c2),2);
  return''}
function bagHand(it,x){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c);
  if(it.style==='tote')return LN('M42,262 Q55,232 68,262',OUT,4)+P('M30,258 L80,258 L84,302 Q55,310 26,302Z',f)+HL('M36,264 L44,264 L42,292 L34,292Z',.3);
  if(it.style==='basket')return LN('M36,266 Q55,226 74,266',OUT,7)+LN('M36,266 Q55,226 74,266',C.brown,3)+P('M28,262 L82,262 L76,300 Q55,306 34,300Z',x.g(c))+[276,288].map(Y=>LN(`M32,${Y} L80,${Y}`,mx(c,-.25),2.5,.7)).join('')+P('M30,262 Q44,252 56,262 Q68,252 80,262 L76,270 Q55,276 34,270Z',x.p('check','#ffffff',c2),3);
  return''}
function held(it,x){const c=C[it.col],c2=C[it.col2],f=it.pat?x.p(it.pat,c,c2):x.g(c);
  switch(it.style){
   case 'umbrella':return LN('M145,252 L166,10',OUT,5)+LN('M145,252 Q144,264 136,262',OUT,5)+P('M118,16 Q166,-46 214,16 Q202,8 190,16 Q178,8 166,16 Q154,8 142,16 Q130,8 118,16Z',f)+LN('M166,-24 L166,-34',OUT,4)+HL('M128,6 Q146,-26 166,-30 Q146,-18 134,8Z',.3);
   case 'balloon':return LN('M145,242 Q166,170 172,72',OUT,2.5)+P('M168,74 L176,74 L172,66Z',f,2.5)+EL(172,40,23,27,f)+HL('M158,30 Q162,20 170,18 Q162,26 162,36Z',.45);
   case 'lantern':return LN('M145,252 L145,262',OUT,3)+P('M133,266 L157,266 L151,258 L139,258Z',x.g(c),3)+P('M131,268 Q145,262 159,268 L156,300 Q145,306 134,300Z',x.r('#fff3a8'),3.5)+LN('M139,268 L138,300',c,3)+LN('M151,268 L152,300',c,3)+P('M134,300 L156,300 L152,310 L138,310Z',x.g(c),3)+EL(145,284,22,24,'#ffe866',0,' opacity=".22"');
   case 'bouquet':return P('M138,262 L152,262 L166,214 L124,214Z',x.g(c2),3.5)+[[132,206,c],[146,198,C.yellow],[160,206,c],[139,192,C.white],[154,190,c]].map(([X,Y,k])=>[0,72,144,216,288].map(a=>CI(X+Math.cos(a*Math.PI/180)*5.5,Y+Math.sin(a*Math.PI/180)*5.5,5,k,2)).join('')+CI(X,Y,3.5,C.orange,1.5)).join('');
   case 'book':return P('M128,226 L160,220 L165,262 L133,268Z',x.g(c))+P('M133,268 L165,262 L166,267 L134,273Z','#fff',2.5)+P('M137,236 L154,233 L156,248 L139,251Z',C[it.col2],2);
   case 'ketupat':return LN('M145,252 L145,264',OUT,3)+P('M145,264 L166,286 L145,308 L124,286Z',x.g(c))+LN('M134,275 L156,297',C[it.col2],3)+LN('M156,275 L134,297',C[it.col2],3)+LN('M145,308 Q150,318 158,320',c,4)+LN('M145,308 Q138,318 132,322',c,4);
   case 'sajadah':return P(cap(124,250,176,244,11),x.p('stripes',c,c2))+EL(124,250,7,11,x.g(mx(c,-.2)),3)+LN('M168,256 L174,262',C[it.col2],3)+LN('M172,254 L180,258',C[it.col2],3);
   case 'ball':return CI(152,264,18,x.r(c))+LN('M136,258 Q152,250 168,260',c2,3)+LN('M140,276 Q152,268 166,276',c2,3)+LN('M152,246 L152,282',c2,3);
   case 'gift':return P('M130,252 L170,252 L170,286 L130,286Z',x.g(c))+LN('M150,252 L150,286',c2,7)+P('M150,252 Q136,238 140,234 Q148,232 150,252Z',x.g(c2),3)+P('M150,252 Q164,238 160,234 Q152,232 150,252Z',x.g(c2),3);
   case 'starlamp':return LN('M145,250 L158,176',OUT,5)+LN('M145,250 L158,176',C.brown,2)+EL(160,158,30,30,'#fff3a0',0,' opacity=".3"')+P('M160,136 L166,151 L182,152 L170,162 L174,178 L160,169 L146,178 L150,162 L138,152 L154,151Z',x.r(c),3.5);
  }return''}

/* ---------- the whole child ---------- */
/* ch: {kind:'g'|'b', skin:0-5, hair:style, hairc:0-5}; look: {dress,top,bottom,jacket,hijab,hat,shoes,bag,held} (item ids)
   o: {pose:'stand'|'wave'|'pose', face:'smile'|'grin'|'wink', only:slot (for item cards), vb:viewBox, cls} */
function avatar(ch,look,o={}){const x=ctx(),only=o.only,on=k=>!only||only===k;
  const I=s=>look&&look[s]&&ITEMS[look[s]]||null;
  const sk=SKIN[ch.skin|0],hc=HAIRC[ch.hairc|0],hijabIt=I('hijab'),hatIt=I('hat'),dr=I('dress'),tp=dr?null:I('top'),bt=dr?null:I('bottom'),jk=I('jacket'),sh=I('shoes'),bg=I('bag'),hd=I('held');
  const headOnly=only==='hijab'||only==='hat'||only==='head';
  let back='',body='',head='',armL='',armR='',over='';
  /* back */
  if(!only||headOnly){if(!hijabIt&&!(only==='hat'&&false))back+=hairBack(ch.hair,hc,x)}
  if(jk&&on('jacket'))back+=jacketBack(jk,x);
  if(bg&&on('bag'))back+=bagBack(bg,x);
  /* feet and clothes */
  if(sh&&on('shoes'))body+=`<g class="footL">${shoe(sh,x,'L',sk)}</g><g class="footR">${shoe(sh,x,'R',sk)}</g>`;
  if(bt&&on('bottom'))body+=bottom(bt,x);
  if(!only)body+=P('M90,138 L110,138 L110,168 L90,168Z',x.g(sk),3.5);
  if(dr&&on('dress'))body+=dress(dr,x);
  if(tp&&on('top'))body+=top(tp,x);
  if(jk&&on('jacket'))body+=jacket(jk,x);
  if(bg&&on('bag'))body+=bagFront(bg,x);
  /* head */
  const faceOval=EL(100,108,47,45,x.r(sk),4)+face(o);
  const plainHead=CI(40,106,11,x.r(sk))+CI(160,106,11,x.r(sk))+CI(100,94,60,x.r(sk))+EL(46,96,7,12,'#fff',0,' opacity=".18"')+face(o)+hairFront(ch.hair,hc,x);
  if(!only||headOnly){
    if(hijabIt&&(only!=='hat')){const hj=hijab(hijabIt,x)+faceOval+hijabFront(hijabIt,x);if(hijabIt.style==='khimar')over+=hj;else head+=hj}
    else head+=plainHead;
    if(hatIt&&(only!=='hijab')){const h=hat(hatIt,x,!!hijabIt&&only!=='hat');if(hijabIt&&hijabIt.style==='khimar')over+=h;else head+=h}}
  /* arms */
  const cloth=dr||tp;
  for(const side of ['L','R']){let a='';
    if(cloth&&(on('dress')&&dr||on('top')&&tp))a+=sleeves(cloth,x,side);
    if(jk&&on('jacket'))a+=jacketSleeve(jk,x,side);
    if(!only)a+=CI(HD[side][0],HD[side][1],11.5,x.r(sk),4);
    if(side==='L'){if(bg&&on('bag'))a+=bagHand(bg,x);armL=a}else{if(hd&&on('held'))a+=held(hd,x);armR=a}}
  const pose=o.pose||'stand';
  const rotL=pose==='flat'?0:pose==='wave'?125:pose==='pose'?30:6,rotR=pose==='flat'?0:pose==='wave'||pose==='pose'?(hd?-18:-125):-6;
  const g=`<g class="armL" style="transform-origin:75px 172px;transform:rotate(${rotL}deg)">${armL}</g><g class="armR" style="transform-origin:125px 172px;transform:rotate(${rotR}deg)">${armR}</g>`;
  const inner=back+body+head+g+over;
  const vb=o.vb||'-10 -30 220 370';
  return`<svg class="kid ${o.cls||''}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${x.defs()}<g class="bodyG">${inner}</g></svg>`}

/* crop boxes for item cards */
const VB={dress:'26 136 148 202',top:'28 138 144 124',bottom:'34 214 132 120',jacket:'28 132 144 168',shoes:'56 290 88 54',hijab:'18 10 164 232',hat:'2 -16 196 168',head:'18 12 164 160',
  bag:{backpack:'40 128 120 132',sling:'40 150 100 112',tote:'14 222 84 92',basket:'14 216 84 96'},
  held:{umbrella:'108 -54 116 124',balloon:'140 6 64 88',lantern:'112 240 66 74',bouquet:'112 176 64 96',book:'116 210 62 70',ketupat:'114 248 64 80',sajadah:'108 220 84 54',ball:'126 238 52 52',gift:'118 224 64 66',starlamp:'122 124 76 80'}};
function thumb(it,ch){const vb=typeof VB[it.slot]==='string'?VB[it.slot]:VB[it.slot][it.style];
  const look={[it.slot]:it.id};const c={...ch};if(it.slot==='hijab'||it.slot==='hat')c.hair=ch.kind==='g'?'bob':'short';
  return avatar(c,look,{only:it.slot,vb,cls:'th',pose:'flat'})}
function headThumb(ch,look){return avatar(ch,{hijab:look&&look.hijab,hat:look&&look.hat},{only:'head',vb:VB.head,cls:'th'})}
return{C,FAM,SKIN,HAIRC,HAIR,HAIRN,ITEMS,LIST,ST,avatar,thumb,headThumb,mx}})();
