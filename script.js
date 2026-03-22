/* =============================================
   StudyVault — script.js
   FastWeb Project
   ============================================= */

/* ═══════════════════════════════════════
   OWL DIALOGUES
   ═══════════════════════════════════════ */
const OPEN_DIALOGUES = [
  "Hey, what's up? 👋\nWhat do you wanna study today?",
  "Good to see you! 🦉\nReady to dive into something new?",
  "Whooo's here to learn? 👓\nYour study vault awaits!",
  "Hoot hoot! 📚\nKnowledge time — let's get it!",
  "Ah, a fellow scholar! 🎓\nWhat subject are we conquering today?",
  "Rise & shine, bookworm! ☀️\nYour resources are all here waiting.",
  "Well, well, well...\nLooks like someone's serious about studying! 💪",
  "I've been keeping your notes warm 📖\nWhat shall we explore today?",
  "The wise owl greets you! 🌟\nEvery page you read makes you sharper.",
  "Psst... I saved all your links! 🔖\nNow go learn something amazing!",
  "You showed up — that's already 80% of it! 🚀\nLet's handle the other 20%.",
];

const CLOSE_DIALOGUES = [
  "See you next time! 👋\nYou studied well today — be proud!",
  "Hoot hoot! 🦉\nOff to dreamland I go...",
  "Great session! 🌙\nCome back soon, we've got more to learn!",
  "Goodbye, scholar! ⭐\nRest well and let it all sink in.",
  "See ya! 📚\nRemember: small steps every day!",
  "Night night! 💤\nYou're one step smarter now.",
];

/* ═══════════════════════════════════════
   OWL LOGIC
   ═══════════════════════════════════════ */
let owlDismissed = false;

function showOwlOpening() {
  const h = new Date().getHours();
  let greeting;
  if      (h >= 5  && h < 12) greeting = "Good morning, scholar! ☀️\nWhat are we learning today?";
  else if (h >= 12 && h < 17) greeting = "Good afternoon! 📖\nPerfect time for a study session!";
  else if (h >= 17 && h < 21) greeting = "Good evening! 🌆\nEvening study sessions hit different!";
  else                         greeting = "Burning the midnight oil? 🌙\nI'm right here with you!";

  const dialogues = [greeting, ...OPEN_DIALOGUES];
  const msg = dialogues[Math.floor(Math.random() * dialogues.length)];
  document.getElementById('owl-speech').innerHTML = msg.replace(/\n/g, '<br>');
  document.getElementById('owl-overlay').classList.remove('hidden', 'hiding', 'closing');
}

function dismissOwl() {
  const overlay = document.getElementById('owl-overlay');
  overlay.classList.add('hiding');
  owlDismissed = true;
  setTimeout(() => overlay.classList.add('hidden'), 650);
}

function showOwlClosing() {
  const msg = CLOSE_DIALOGUES[Math.floor(Math.random() * CLOSE_DIALOGUES.length)];
  document.getElementById('owl-bye-speech').innerHTML = msg.replace(/\n/g, '<br>');
  const overlay = document.getElementById('owl-overlay');
  overlay.classList.remove('hidden', 'hiding');
  overlay.classList.add('closing');
  overlay.style.pointerEvents = 'none';
  setTimeout(() => overlay.classList.add('hiding'), 2800);
  setTimeout(() => overlay.classList.add('hidden'), 3500);
}

window.addEventListener('beforeunload', () => {
  if (owlDismissed) showOwlClosing();
});

/* ═══════════════════════════════════════
   CLOCK + DAY / NIGHT AUTO-THEME
   ═══════════════════════════════════════ */
let manualMode = null; // null = auto | 'light' | 'dark'

function isNightTime(h) { return h >= 19 || h < 6; }

function applyDayNight(force) {
  const h    = new Date().getHours();
  const dark = (force !== undefined) ? force : isNightTime(h);
  document.body.classList.toggle('dark', dark);

  const modeEl = document.getElementById('clock-mode');
  const btn    = document.getElementById('mode-toggle');
  if (dark) {
    modeEl.textContent      = '🌙 Night';
    modeEl.style.color      = 'var(--accent)';
    btn.textContent         = '☀ Day Mode';
  } else {
    modeEl.textContent      = '☀ Day';
    modeEl.style.color      = 'var(--accent2)';
    btn.textContent         = '🌙 Night Mode';
  }
}

function toggleMode() {
  const isDark = document.body.classList.contains('dark');
  manualMode   = isDark ? 'light' : 'dark';
  applyDayNight(manualMode === 'dark');
}

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function tickClock() {
  const now = new Date();
  const hh  = String(now.getHours()).padStart(2, '0');
  const mm  = String(now.getMinutes()).padStart(2, '0');
  const ss  = String(now.getSeconds()).padStart(2, '0');

  document.getElementById('clock-time').textContent =
    `${hh}:${mm}:${ss}`;
  document.getElementById('clock-date').textContent =
    `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  if (manualMode === null) applyDayNight();
}

setInterval(tickClock, 1000);
tickClock();

/* ═══════════════════════════════════════
   SEED DATA — 40 exam resources
   ═══════════════════════════════════════ */
const SEED = [
  // MATH
  { id:1,  title:'Khan Academy – Math',              url:'https://khanacademy.org/math',                                                               category:'Math',        tags:['free','video','all-levels'],       notes:'Full K-12 curriculum',                      starred:true,  date:'2025-01-01' },
  { id:2,  title:'Desmos Graphing Calculator',        url:'https://desmos.com/calculator',                                                              category:'Math',        tags:['tool','graphing','interactive'],    notes:'Plot any function instantly',               starred:false, date:'2025-01-02' },
  { id:3,  title:'Wolfram Alpha',                     url:'https://wolframalpha.com',                                                                   category:'Math',        tags:['solver','step-by-step'],            notes:'Get worked solutions',                      starred:true,  date:'2025-01-03' },
  { id:4,  title:"Paul's Online Math Notes",          url:'https://tutorial.math.lamar.edu',                                                            category:'Math',        tags:['calculus','algebra','notes'],       notes:'Excellent for Calculus I–III',               starred:false, date:'2025-01-04' },
  { id:5,  title:'MIT OCW – Single Variable Calculus',url:'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010',                     category:'Math',        tags:['MIT','calculus','advanced'],        notes:'Free MIT lecture notes & problem sets',      starred:false, date:'2025-01-05' },
  { id:6,  title:'Art of Problem Solving',            url:'https://artofproblemsolving.com',                                                            category:'Math',        tags:['olympiad','competition'],           notes:'Olympiad & competition math',               starred:false, date:'2025-01-06' },
  // SCIENCE
  { id:7,  title:'PhET Interactive Simulations',      url:'https://phet.colorado.edu',                                                                  category:'Science',     tags:['simulation','free','interactive'],  notes:'Physics, chemistry & bio sims',             starred:true,  date:'2025-01-07' },
  { id:8,  title:'Crash Course – Science',            url:'https://youtube.com/@crashcourse',                                                           category:'Science',     tags:['youtube','video','quick'],          notes:'Engaging overview of all sciences',          starred:false, date:'2025-01-08' },
  { id:9,  title:'Science Daily',                     url:'https://sciencedaily.com',                                                                   category:'Science',     tags:['news','research','current'],        notes:'Latest science research news',              starred:false, date:'2025-01-09' },
  // PHYSICS
  { id:10, title:'HyperPhysics',                      url:'http://hyperphysics.phy-astr.gsu.edu',                                                       category:'Physics',     tags:['reference','concept-maps'],         notes:'Best concept-map style reference',           starred:true,  date:'2025-01-10' },
  { id:11, title:'The Feynman Lectures Online',        url:'https://feynmanlectures.caltech.edu',                                                        category:'Physics',     tags:['Feynman','advanced','Caltech'],     notes:'Classic lectures freely available',          starred:true,  date:'2025-01-11' },
  { id:12, title:'Physics Classroom',                 url:'https://physicsclassroom.com',                                                               category:'Physics',     tags:['tutorials','high-school'],          notes:'Great for 11th–12th grade physics',          starred:false, date:'2025-01-12' },
  { id:13, title:'AP Physics – Khan Academy',          url:'https://khanacademy.org/science/ap-physics-1',                                               category:'Physics',     tags:['AP','exam-prep','free'],            notes:'AP Physics 1 & 2 exam prep',                starred:false, date:'2025-01-13' },
  // CHEMISTRY
  { id:14, title:'ChemLibreTexts',                    url:'https://chem.libretexts.org',                                                                category:'Chemistry',   tags:['textbook','open-access','free'],    notes:'Open-access chemistry textbooks',           starred:true,  date:'2025-01-14' },
  { id:15, title:'Ptable – Interactive Periodic Table',url:'https://ptable.com',                                                                        category:'Chemistry',   tags:['periodic-table','interactive'],     notes:'Click any element for full data',            starred:false, date:'2025-01-15' },
  { id:16, title:'RSC Learn Chemistry',               url:'https://edu.rsc.org',                                                                        category:'Chemistry',   tags:['RSC','lab','official'],             notes:'Official Royal Society resources',           starred:false, date:'2025-01-16' },
  { id:17, title:'Chemguide',                         url:'https://chemguide.co.uk',                                                                    category:'Chemistry',   tags:['A-level','UK','notes'],             notes:'A-Level chemistry revision notes',           starred:true,  date:'2025-01-17' },
  // BIOLOGY
  { id:18, title:'Khan Academy – Biology',             url:'https://khanacademy.org/science/biology',                                                    category:'Biology',     tags:['free','cell','genetics'],           notes:'Cells to ecosystems coverage',              starred:false, date:'2025-01-18' },
  { id:19, title:'Visible Body',                      url:'https://visiblebody.com',                                                                    category:'Biology',     tags:['anatomy','3D','interactive'],       notes:'3D human anatomy explorer',                 starred:true,  date:'2025-01-19' },
  { id:20, title:'NCBI Bookshelf – Molecular Biology', url:'https://ncbi.nlm.nih.gov/books/NBK21054',                                                    category:'Biology',     tags:['molecular','advanced','NCBI'],      notes:'Free molecular biology textbook',            starred:false, date:'2025-01-20' },
  { id:21, title:'Biology Online Dictionary',          url:'https://biologyonline.com/dictionary',                                                       category:'Biology',     tags:['glossary','definitions'],           notes:'Fast lookup for biology terms',              starred:false, date:'2025-01-21' },
  // PROGRAMMING
  { id:22, title:'MDN Web Docs',                      url:'https://developer.mozilla.org',                                                              category:'Programming', tags:['reference','HTML','CSS','JS'],      notes:'Best web tech reference',                   starred:true,  date:'2025-01-22' },
  { id:23, title:'freeCodeCamp',                      url:'https://freecodecamp.org',                                                                   category:'Programming', tags:['free','project-based','web-dev'],   notes:'Hands-on coding with projects',             starred:true,  date:'2025-01-23' },
  { id:24, title:'LeetCode',                          url:'https://leetcode.com',                                                                       category:'Programming', tags:['DSA','interview-prep','problems'],   notes:'Data structures & algorithm practice',      starred:false, date:'2025-01-24' },
  { id:25, title:'CS50 – Harvard (edX)',               url:'https://cs50.harvard.edu',                                                                   category:'Programming', tags:['Harvard','free','intro-CS'],        notes:'Best intro to CS course',                   starred:true,  date:'2025-01-25' },
  { id:26, title:'GeeksforGeeks',                     url:'https://geeksforgeeks.org',                                                                  category:'Programming', tags:['algorithms','CS-fundamentals'],     notes:'CS exam & interview prep',                  starred:false, date:'2025-01-26' },
  { id:27, title:'The Odin Project',                  url:'https://theodinproject.com',                                                                 category:'Programming', tags:['full-stack','project','free'],      notes:'Full-stack web dev curriculum',             starred:false, date:'2025-01-27' },
  // ENGLISH
  { id:28, title:'Purdue OWL',                        url:'https://owl.purdue.edu',                                                                     category:'English',     tags:['essay','APA','MLA','citation'],     notes:'Gold standard for academic writing',        starred:true,  date:'2025-01-28' },
  { id:29, title:'Project Gutenberg',                 url:'https://gutenberg.org',                                                                      category:'English',     tags:['free','classic-literature','ebook'],notes:'60,000+ free classic books',               starred:false, date:'2025-01-29' },
  { id:30, title:'Vocabulary.com',                    url:'https://vocabulary.com',                                                                     category:'English',     tags:['vocabulary','gamified','learning'], notes:'Game-based vocabulary building',            starred:false, date:'2025-01-30' },
  { id:31, title:'Hemingway Editor',                  url:'https://hemingwayapp.com',                                                                   category:'English',     tags:['writing','readability','tool'],     notes:'Improve writing clarity & style',           starred:false, date:'2025-01-31' },
  { id:32, title:'British Council – Learn English',   url:'https://learnenglish.britishcouncil.org',                                                    category:'English',     tags:['grammar','skills','official'],      notes:'Official British Council resources',        starred:true,  date:'2025-02-01' },
  // HISTORY
  { id:33, title:'World History Encyclopedia',        url:'https://worldhistory.org',                                                                   category:'History',     tags:['peer-reviewed','ancient','articles'],notes:'Free peer-reviewed history articles',       starred:true,  date:'2025-02-02' },
  { id:34, title:'Crash Course History (YouTube)',     url:'https://youtube.com/playlist?list=PLBDA2E52FB1EF80C9',                                       category:'History',     tags:['youtube','video','John-Green'],     notes:"John Green's entertaining history series",  starred:true,  date:'2025-02-03' },
  { id:35, title:'HISTORY.com',                       url:'https://history.com',                                                                        category:'History',     tags:['articles','documentary','broad'],   notes:'History articles, videos & docs',           starred:false, date:'2025-02-04' },
  { id:36, title:'Internet History Sourcebooks',      url:'https://sourcebooks.fordham.edu',                                                            category:'History',     tags:['primary-sources','Fordham'],        notes:'Primary source documents collection',       starred:false, date:'2025-02-05' },
  // GEOGRAPHY
  { id:37, title:'National Geographic Education',     url:'https://education.nationalgeographic.org',                                                   category:'Geography',   tags:['maps','environment','Nat-Geo'],     notes:'Maps, articles & explorer stories',         starred:false, date:'2025-02-06' },
  { id:38, title:'CIA World Factbook',                url:'https://cia.gov/the-world-factbook',                                                         category:'Geography',   tags:['reference','countries','statistics'],notes:'Country data & geography stats',            starred:true,  date:'2025-02-07' },
  { id:39, title:'Google Earth',                      url:'https://earth.google.com',                                                                   category:'Geography',   tags:['maps','3D','satellite'],            notes:'Explore Earth in 3D satellite view',        starred:false, date:'2025-02-08' },
  { id:40, title:'Seterra Geography Games',           url:'https://seterra.com',                                                                        category:'Geography',   tags:['quiz','gamified','map-skills'],     notes:'Learn countries & capitals through quizzes',starred:false, date:'2025-02-09' },
];

/* ═══════════════════════════════════════
   STATE & LOCAL STORAGE
   ═══════════════════════════════════════ */
const STORE_KEY = 'studyvault_v4';
let res       = [];
let activeF   = 'All';
let saveTimer = null;

function loadData() {
  try {
    res = JSON.parse(localStorage.getItem(STORE_KEY) || 'null') || [...SEED];
  } catch {
    res = [...SEED];
  }
}

function saveData(silent = false) {
  localStorage.setItem(STORE_KEY, JSON.stringify(res));
  if (!silent) flashSave();
}

function flashSave() {
  const el = document.getElementById('sf');
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

/* ═══════════════════════════════════════
   CATEGORY FILTER CHIPS
   ═══════════════════════════════════════ */
const CATS = ['Math','Science','Physics','Chemistry','Biology','Programming','English','History','Geography','Other'];

function buildChips() {
  document.getElementById('chips').innerHTML =
    ['All', ...CATS, '★ Starred'].map(c => `
      <span class="chip ${c === activeF ? 'active' : ''} ${c === '★ Starred' ? 'sc' : ''}"
            onclick="setF('${c}', this)">${c}</span>
    `).join('');
}

function setF(v, el) {
  activeF = v;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  render();
}

/* ═══════════════════════════════════════
   SEARCH BAR
   ═══════════════════════════════════════ */
function onSrch(inp) {
  document.getElementById('sclr').classList.toggle('vis', inp.value.length > 0);
  render();
}

function clrSrch() {
  document.getElementById('si').value = '';
  document.getElementById('sclr').classList.remove('vis');
  render();
}

/* ═══════════════════════════════════════
   FAVICON PREVIEW (add form)
   ═══════════════════════════════════════ */
function prevFav() {
  const url = document.getElementById('fi-u').value.trim();
  const img = document.getElementById('fav-preview');
  const txt = document.getElementById('fp-txt');
  if (!url) {
    img.style.display = 'none';
    txt.textContent   = 'Enter a URL to preview its favicon';
    return;
  }
  try {
    const host     = new URL(url).hostname;
    img.src        = `https://www.google.com/s2/favicons?sz=64&domain=${host}`;
    img.style.display = 'block';
    img.onerror    = () => { img.style.display = 'none'; };
    txt.textContent = host;
  } catch {
    img.style.display = 'none';
    txt.textContent   = 'Invalid URL';
  }
}

function getFav(url) {
  try { return `https://www.google.com/s2/favicons?sz=32&domain=${new URL(url).hostname}`; }
  catch { return ''; }
}

/* ═══════════════════════════════════════
   ADD NEW RESOURCE
   ═══════════════════════════════════════ */
function addRes() {
  const t = document.getElementById('fi-t').value.trim();
  const u = document.getElementById('fi-u').value.trim();
  const c = document.getElementById('fi-c').value;
  const g = document.getElementById('fi-g').value.split(',').map(x => x.trim()).filter(Boolean);
  const n = document.getElementById('fi-n').value.trim();

  if (!t || !u) { showToast('⚠ Title and URL required'); return; }

  res.unshift({
    id: Date.now(), title: t, url: u,
    category: c, tags: g, notes: n,
    starred: false,
    date: new Date().toISOString().slice(0, 10),
  });
  saveData();
  render();

  ['fi-t', 'fi-u', 'fi-g', 'fi-n'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fav-preview').style.display = 'none';
  document.getElementById('fp-txt').textContent = 'Enter a URL to preview its favicon';
  showToast('✓ Resource added!');
}

/* ═══════════════════════════════════════
   STAR & DELETE
   ═══════════════════════════════════════ */
function toggleStar(id) {
  const r = res.find(x => x.id === id);
  if (r) { r.starred = !r.starred; saveData(); render(); }
}

function delRes(id) {
  if (!confirm('Delete this resource?')) return;
  res = res.filter(x => x.id !== id);
  saveData(); render(); showToast('Deleted');
}

/* ═══════════════════════════════════════
   INLINE EDIT
   ═══════════════════════════════════════ */
function toggleEdit(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  if (!card) return;

  if (card.dataset.editing === 'true') {
    commitEdit(id, card);
  } else {
    card.dataset.editing = 'true';
    card.querySelector('.ctitle').contentEditable = 'true';
    card.querySelector('.curl').contentEditable   = 'true';
    card.querySelector('.cnotes').contentEditable = 'true';
    card.querySelector('.tiw').classList.add('op');
    card.querySelector('.edb').classList.add('on');
    card.querySelector('.ctitle').focus();
  }
}

function commitEdit(id, card) {
  const r = res.find(x => x.id === id);
  if (!r) return;

  r.title = card.querySelector('.ctitle').innerText.trim() || r.title;
  r.url   = card.querySelector('.curl').innerText.trim()   || r.url;
  r.notes = card.querySelector('.cnotes').innerText.trim();

  const tv = card.querySelector('.ti').value.trim();
  if (tv) {
    r.tags = [...new Set([...r.tags, ...tv.split(',').map(x => x.trim()).filter(Boolean)])];
  }

  card.dataset.editing = 'false';
  ['ctitle', 'curl', 'cnotes'].forEach(cls => {
    card.querySelector('.' + cls).contentEditable = 'false';
  });
  card.querySelector('.tiw').classList.remove('op');
  card.querySelector('.ti').value = '';
  card.querySelector('.edb').classList.remove('on');

  saveData(); showToast('✓ Changes saved'); render();
}

function removeTag(id, i) {
  const r = res.find(x => x.id === id);
  if (r) { r.tags.splice(i, 1); saveData(); render(); }
}

function tagKey(e, id) {
  if (e.key === 'Enter') {
    const tags = e.target.value.split(',').map(x => x.trim()).filter(Boolean);
    const r    = res.find(x => x.id === id);
    if (r && tags.length) {
      r.tags = [...new Set([...r.tags, ...tags])];
      e.target.value = '';
      saveData(); render(); showToast('Tags added ✓');
    }
  }
}

/* ═══════════════════════════════════════
   RENDER GRID
   ═══════════════════════════════════════ */
function render() {
  const q   = (document.getElementById('si').value || '').toLowerCase();
  const srt = document.getElementById('ssrt').value;

  let list = res.filter(r => {
    if (activeF === '★ Starred' && !r.starred) return false;
    if (activeF !== 'All' && activeF !== '★ Starred' && r.category !== activeF) return false;
    if (q) return [r.title, r.url, r.notes || '', r.category, ...r.tags]
                  .some(s => s.toLowerCase().includes(q));
    return true;
  });

  list = [...list].sort((a, b) =>
    srt === 'new' ? b.id - a.id :
    srt === 'old' ? a.id - b.id :
    srt === 'az'  ? a.title.localeCompare(b.title) :
                    b.title.localeCompare(a.title)
  );

  const g = document.getElementById('grid');
  g.innerHTML = list.length
    ? list.map(cardHTML).join('')
    : `<div class="empty">
         <div class="ei">📚</div>
         <h3>Nothing here</h3>
         <p>Add a resource or try a different filter.</p>
       </div>`;

  document.getElementById('st-t').textContent = res.length;
  document.getElementById('st-s').textContent = res.filter(r => r.starred).length;
  document.getElementById('st-c').textContent = [...new Set(res.map(r => r.category))].length;
}

function cardHTML(r) {
  const fav     = getFav(r.url);
  const dateStr = r.date
    ? new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
  const tagsHTML = r.tags
    .map((t, i) => `<span class="tag" onclick="removeTag(${r.id},${i})" title="Click to remove">#${esc(t)}</span>`)
    .join('');

  return `
    <div class="card ${r.starred ? 'starred' : ''}" data-id="${r.id}" data-editing="false">
      <div class="ch">
        <img class="fav" src="${fav}" alt="" onerror="this.style.visibility='hidden'">
        <div class="ctw">
          <div class="ctitle" contenteditable="false" spellcheck="false">${esc(r.title)}</div>
          <a class="curl" href="${esc(r.url)}" target="_blank" rel="noopener"
             contenteditable="false" spellcheck="false"
             onclick="handleA(event,this)">${esc(r.url)}</a>
        </div>
      </div>
      <span class="cbadge cat-${r.category}">${r.category}</span>
      <div class="cnotes" contenteditable="false">${esc(r.notes || '')}</div>
      <div class="tw">${tagsHTML}</div>
      <div class="tiw">
        <input class="ti" type="text"
               placeholder="+ add tags (comma-sep), Enter to save"
               onkeydown="tagKey(event,${r.id})">
      </div>
      <div class="cf">
        <span class="cd">${dateStr}</span>
        <div class="ca">
          <div class="ib stb ${r.starred ? 'on' : ''}" onclick="toggleStar(${r.id})" title="${r.starred ? 'Unstar' : 'Star'}">★</div>
          <div class="ib opb" onclick="window.open('${esc(r.url)}','_blank')" title="Open">↗</div>
          <div class="ib edb" onclick="toggleEdit(${r.id})" title="Edit / Save">✎</div>
          <div class="ib dlb" onclick="delRes(${r.id})" title="Delete">✕</div>
        </div>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════ */
function handleA(e, el) {
  if (el.closest('.card').dataset.editing === 'true') e.preventDefault();
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2400);
}

// Press Enter inside the add form to submit
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' &&
      document.activeElement.closest('.add-panel') &&
      document.activeElement.tagName === 'INPUT') {
    addRes();
  }
});

/* ═══════════════════════════════════════
   BOOT — runs on page load
   ═══════════════════════════════════════ */
loadData();
buildChips();
render();
showOwlOpening();
