// Make tools/voice/stories.json (one clip per story page: story-<world>-<page> -> [English, Indonesian]) from the
// STORIES object in NurConnect/index.html. Run after editing a story:  node NurConnect/tools/voice/build-stories.js
const fs = require('fs'), path = require('path');
const NC = path.join(__dirname, '..', '..');
const src = fs.readFileSync(path.join(NC, 'index.html'), 'utf8');
const i = src.indexOf('const STORIES='), j = src.indexOf('};', i) + 2;
const STORIES = new Function(src.slice(i, j).replace('const STORIES=', 'return ') )();
const out = {};
for (const [w, st] of Object.entries(STORIES)) st.p.forEach((p, n) => { out[`story-${w}-${n + 1}`] = { who: st.who, t: [p[0], p[1]] }; });
fs.writeFileSync(path.join(__dirname, 'stories.json'), JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, 'story pages');
