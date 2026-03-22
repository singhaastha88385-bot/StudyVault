/* ============================================================
   StudyVault PRO — script.js
   ============================================================ */

/* ══ OWL DIALOGUES ══ */
const OPEN_DIALOGUES=[
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
  "New day, new knowledge! 🌅\nWhat are we mastering today?",
  "Your brain is a muscle 💪\nTime to give it a good workout!",
];
const CLOSE_DIALOGUES=[
  "See you next time! 👋\nYou studied well today — be proud!",
  "Hoot hoot! 🦉\nOff to dreamland I go...",
  "Great session! 🌙\nCome back soon, we've got more to learn!",
  "Goodbye, scholar! ⭐\nRest well and let it all sink in.",
  "See ya! 📚\nRemember: small steps every day!",
  "Night night! 💤\nYou're one step smarter now.",
  "Amazing work today! 🎉\nConsistency is the secret weapon.",
];

/* ══ OWL ══ */
let owlDismissed=false;
function showOwlOpening(){
  const h=new Date().getHours();
  let g=h>=5&&h<12?"Good morning, scholar! ☀️\nWhat are we learning today?":
         h>=12&&h<17?"Good afternoon! 📖\nPerfect time for a study session!":
         h>=17&&h<21?"Good evening! 🌆\nEvening study sessions hit different!":
                     "Burning the midnight oil? 🌙\nI'm right here with you!";
  const all=[g,...OPEN_DIALOGUES];
  const msg=all[Math.floor(Math.random()*all.length)];
  document.getElementById('owl-speech').innerHTML=msg.replace(/\n/g,'<br>');
  document.getElementById('owl-overlay').classList.remove('hidden','hiding','closing');
}
function dismissOwl(){
  const o=document.getElementById('owl-overlay');
  o.classList.add('hiding'); owlDismissed=true;
  setTimeout(()=>o.classList.add('hidden'),600);
}
function showOwlClosing(){
  const msg=CLOSE_DIALOGUES[Math.floor(Math.random()*CLOSE_DIALOGUES.length)];
  document.getElementById('owl-bye-speech').innerHTML=msg.replace(/\n/g,'<br>');
  const o=document.getElementById('owl-overlay');
  o.classList.remove('hidden','hiding');o.classList.add('closing');
  o.style.pointerEvents='none';
  setTimeout(()=>o.classList.add('hiding'),2800);
  setTimeout(()=>o.classList.add('hidden'),3500);
}
window.addEventListener('beforeunload',()=>{if(owlDismissed)showOwlClosing();});

/* ══ CLOCK + DAY/NIGHT ══ */
let manualMode=null;
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function isNight(h){return h>=19||h<6;}
function applyDayNight(force){
  const h=new Date().getHours();
  const dark=force!==undefined?force:isNight(h);
  document.body.classList.toggle('dark',dark);
  const mEl=document.getElementById('clock-mode');
  const btn=document.getElementById('mode-toggle');
  if(dark){mEl.textContent='🌙 Night';btn.textContent='☀ Day';}
  else{mEl.textContent='☀ Day';btn.textContent='🌙 Night';}
}
function toggleMode(){
  const isDark=document.body.classList.contains('dark');
  manualMode=isDark?'light':'dark';
  applyDayNight(manualMode==='dark');
}
function tickClock(){
  const n=new Date();
  const hh=String(n.getHours()).padStart(2,'0');
  const mm=String(n.getMinutes()).padStart(2,'0');
  const ss=String(n.getSeconds()).padStart(2,'0');
  document.getElementById('clock-time').textContent=`${hh}:${mm}:${ss}`;
  document.getElementById('clock-date').textContent=`${DAYS[n.getDay()]}, ${n.getDate()} ${MONTHS[n.getMonth()]} ${n.getFullYear()}`;
  if(manualMode===null)applyDayNight();
}
setInterval(tickClock,1000);tickClock();

/* ══ SEED DATA ══ */
const SEED=[
  {id:1,title:'Khan Academy – Math',url:'https://khanacademy.org/math',category:'Math',tags:['free','video'],notes:'Full K-12 curriculum',starred:true,date:'2025-01-01',priority:'high',progress:75,theme:''},
  {id:2,title:'Desmos Graphing Calculator',url:'https://desmos.com/calculator',category:'Math',tags:['tool','graphing'],notes:'Plot any function instantly',starred:false,date:'2025-01-02',priority:'medium',progress:40,theme:'teal'},
  {id:3,title:'Wolfram Alpha',url:'https://wolframalpha.com',category:'Math',tags:['solver'],notes:'Get worked solutions',starred:true,date:'2025-01-03',priority:'high',progress:60,theme:''},
  {id:4,title:"Paul's Online Math Notes",url:'https://tutorial.math.lamar.edu',category:'Math',tags:['calculus','notes'],notes:'Excellent for Calculus I–III',starred:false,date:'2025-01-04',priority:'medium',progress:30,theme:''},
  {id:5,title:'MIT OCW – Calculus',url:'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010',category:'Math',tags:['MIT','advanced'],notes:'Free MIT lecture notes',starred:false,date:'2025-01-05',priority:'low',progress:15,theme:'violet'},
  {id:6,title:'Art of Problem Solving',url:'https://artofproblemsolving.com',category:'Math',tags:['olympiad'],notes:'Competition math',starred:false,date:'2025-01-06',priority:'low',progress:5,theme:''},
  {id:7,title:'PhET Interactive Simulations',url:'https://phet.colorado.edu',category:'Science',tags:['simulation','free'],notes:'Physics, chemistry & bio sims',starred:true,date:'2025-01-07',priority:'high',progress:80,theme:'sky'},
  {id:8,title:'Crash Course – Science',url:'https://youtube.com/@crashcourse',category:'Science',tags:['youtube','video'],notes:'Engaging overview',starred:false,date:'2025-01-08',priority:'medium',progress:50,theme:''},
  {id:9,title:'Science Daily',url:'https://sciencedaily.com',category:'Science',tags:['news'],notes:'Latest research',starred:false,date:'2025-01-09',priority:'low',progress:20,theme:''},
  {id:10,title:'HyperPhysics',url:'http://hyperphysics.phy-astr.gsu.edu',category:'Physics',tags:['reference'],notes:'Best concept-map reference',starred:true,date:'2025-01-10',priority:'high',progress:70,theme:''},
  {id:11,title:'The Feynman Lectures',url:'https://feynmanlectures.caltech.edu',category:'Physics',tags:['advanced'],notes:'Classic lectures free online',starred:true,date:'2025-01-11',priority:'high',progress:45,theme:'amber'},
  {id:12,title:'Physics Classroom',url:'https://physicsclassroom.com',category:'Physics',tags:['tutorials'],notes:'Great for high school physics',starred:false,date:'2025-01-12',priority:'medium',progress:55,theme:''},
  {id:13,title:'AP Physics – Khan Academy',url:'https://khanacademy.org/science/ap-physics-1',category:'Physics',tags:['AP','exam-prep'],notes:'AP exam prep',starred:false,date:'2025-01-13',priority:'medium',progress:35,theme:''},
  {id:14,title:'ChemLibreTexts',url:'https://chem.libretexts.org',category:'Chemistry',tags:['textbook','free'],notes:'Open-access chemistry',starred:true,date:'2025-01-14',priority:'high',progress:65,theme:'lime'},
  {id:15,title:'Ptable – Periodic Table',url:'https://ptable.com',category:'Chemistry',tags:['reference'],notes:'Click any element for data',starred:false,date:'2025-01-15',priority:'medium',progress:90,theme:''},
  {id:16,title:'Chemguide',url:'https://chemguide.co.uk',category:'Chemistry',tags:['A-level','notes'],notes:'A-Level chemistry notes',starred:true,date:'2025-01-16',priority:'high',progress:55,theme:''},
  {id:17,title:'Khan Academy – Biology',url:'https://khanacademy.org/science/biology',category:'Biology',tags:['free','video'],notes:'Cells to ecosystems',starred:false,date:'2025-01-17',priority:'medium',progress:40,theme:'rose'},
  {id:18,title:'Visible Body',url:'https://visiblebody.com',category:'Biology',tags:['anatomy','3D'],notes:'3D human anatomy explorer',starred:true,date:'2025-01-18',priority:'medium',progress:60,theme:''},
  {id:19,title:'NCBI Bookshelf – Molecular Bio',url:'https://ncbi.nlm.nih.gov/books/NBK21054',category:'Biology',tags:['molecular'],notes:'Free molecular biology textbook',starred:false,date:'2025-01-19',priority:'low',progress:25,theme:''},
  {id:20,title:'MDN Web Docs',url:'https://developer.mozilla.org',category:'Programming',tags:['reference','JS'],notes:'Best web tech reference',starred:true,date:'2025-01-20',priority:'high',progress:85,theme:'violet'},
  {id:21,title:'freeCodeCamp',url:'https://freecodecamp.org',category:'Programming',tags:['free','web-dev'],notes:'Hands-on coding',starred:true,date:'2025-01-21',priority:'high',progress:70,theme:''},
  {id:22,title:'LeetCode',url:'https://leetcode.com',category:'Programming',tags:['DSA','interview'],notes:'Algorithm practice',starred:false,date:'2025-01-22',priority:'medium',progress:45,theme:'amber'},
  {id:23,title:'CS50 – Harvard',url:'https://cs50.harvard.edu',category:'Programming',tags:['Harvard','intro'],notes:'Best intro to CS course',starred:true,date:'2025-01-23',priority:'high',progress:90,theme:''},
  {id:24,title:'GeeksforGeeks',url:'https://geeksforgeeks.org',category:'Programming',tags:['algorithms'],notes:'CS exam prep',starred:false,date:'2025-01-24',priority:'medium',progress:50,theme:''},
  {id:25,title:'Purdue OWL',url:'https://owl.purdue.edu',category:'English',tags:['essay','citation'],notes:'Gold standard for writing',starred:true,date:'2025-01-25',priority:'high',progress:75,theme:'pink'},
  {id:26,title:'Project Gutenberg',url:'https://gutenberg.org',category:'English',tags:['free','ebook'],notes:'60,000+ free classic books',starred:false,date:'2025-01-26',priority:'low',progress:30,theme:''},
  {id:27,title:'British Council – Learn English',url:'https://learnenglish.britishcouncil.org',category:'English',tags:['grammar'],notes:'Official British Council',starred:true,date:'2025-01-27',priority:'high',progress:65,theme:''},
  {id:28,title:'World History Encyclopedia',url:'https://worldhistory.org',category:'History',tags:['peer-reviewed'],notes:'Free peer-reviewed articles',starred:true,date:'2025-01-28',priority:'medium',progress:50,theme:'orange'},
  {id:29,title:'Crash Course History',url:'https://youtube.com/playlist?list=PLBDA2E52FB1EF80C9',category:'History',tags:['youtube','video'],notes:"John Green's history series",starred:true,date:'2025-01-29',priority:'high',progress:80,theme:''},
  {id:30,title:'National Geographic Education',url:'https://education.nationalgeographic.org',category:'Geography',tags:['maps'],notes:'Maps & explorer stories',starred:false,date:'2025-01-30',priority:'medium',progress:35,theme:'sky'},
  {id:31,title:'CIA World Factbook',url:'https://cia.gov/the-world-factbook',category:'Geography',tags:['reference','countries'],notes:'Country stats & geography',starred:true,date:'2025-01-31',priority:'medium',progress:60,theme:''},
  {id:32,title:'Seterra Geography Games',url:'https://seterra.com',category:'Geography',tags:['quiz','gamified'],notes:'Learn countries via quizzes',starred:false,date:'2025-02-01',priority:'low',progress:40,theme:'lime'},
];

const CARD_THEMES=['','teal','rose','amber','violet','sky','lime','pink','orange'];

/* ══ STATE ══ */
const KEY='studyvault_v5';
let res=[],activeF='All',saveTimer=null;
function loadData(){try{res=JSON.parse(localStorage.getItem(KEY)||'null')||[...SEED];}catch{res=[...SEED];}}
function saveData(silent=false){localStorage.setItem(KEY,JSON.stringify(res));if(!silent)flashSave();}
function flashSave(){const el=document.getElementById('sf');el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),1800);}

/* ══ CHIPS ══ */
const CATS=['Math','Science','Physics','Chemistry','Biology','Programming','English','History','Geography','Other'];
function buildChips(){
  document.getElementById('chips').innerHTML=
    ['All',...CATS,'★ Starred','🔥 High Priority'].map(c=>`<span class="chip ${c===activeF?'active':''} ${c==='★ Starred'?'sc':''}" onclick="setF('${c}',this)">${c}</span>`).join('');
}
function setF(v,el){activeF=v;document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');render();}

/* ══ SEARCH ══ */
function onSrch(inp){document.getElementById('sclr').classList.toggle('vis',inp.value.length>0);render();}
function clrSrch(){document.getElementById('si').value='';document.getElementById('sclr').classList.remove('vis');render();}

/* ══ FAVICON ══ */
function prevFav(){
  const url=document.getElementById('fi-u').value.trim();
  const img=document.getElementById('fav-preview'),txt=document.getElementById('fp-txt');
  if(!url){img.style.display='none';txt.textContent='Enter URL to see favicon preview';return;}
  try{const h=new URL(url).hostname;img.src=`https://www.google.com/s2/favicons?sz=64&domain=${h}`;img.style.display='block';img.onerror=()=>{img.style.display='none';};txt.textContent=h;}
  catch{img.style.display='none';txt.textContent='Invalid URL';}
}
function getFav(url){try{return`https://www.google.com/s2/favicons?sz=32&domain=${new URL(url).hostname}`;}catch{return'';}}

/* ══ ADD ══ */
function addRes(){
  const t=document.getElementById('fi-t').value.trim(),u=document.getElementById('fi-u').value.trim();
  const c=document.getElementById('fi-c').value,g=document.getElementById('fi-g').value.split(',').map(x=>x.trim()).filter(Boolean);
  const n=document.getElementById('fi-n').value.trim();
  if(!t||!u){showToast('⚠ Title and URL required');return;}
  res.unshift({id:Date.now(),title:t,url:u,category:c,tags:g,notes:n,starred:false,date:new Date().toISOString().slice(0,10),priority:'medium',progress:0,theme:''});
  saveData();render();
  ['fi-t','fi-u','fi-g','fi-n'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('fav-preview').style.display='none';
  document.getElementById('fp-txt').textContent='Enter URL to see favicon preview';
  showToast('✓ Resource added!');
  logStudy(`Added resource: ${t}`);
}

/* ══ STAR / DELETE ══ */
function toggleStar(id){const r=res.find(x=>x.id===id);if(r){r.starred=!r.starred;saveData();render();}}
function delRes(id){if(!confirm('Delete this resource?'))return;res=res.filter(x=>x.id!==id);saveData();render();showToast('Deleted');}

/* ══ PROGRESS SLIDER ON CARD ══ */
function updateProgress(id,val){const r=res.find(x=>x.id===id);if(r){r.progress=+val;saveData(true);document.querySelector(`[data-id="${id}"] .cprog-fill`).style.width=val+'%';document.querySelector(`[data-id="${id}"] .cprog-pct`).textContent=val+'%';}}

/* ══ THEME PICKER ══ */
function setCardTheme(id,theme){const r=res.find(x=>x.id===id);if(r){r.theme=theme;saveData();render();}}

/* ══ PRIORITY CYCLE ══ */
function cyclePriority(id){
  const r=res.find(x=>x.id===id);if(!r)return;
  const p=['low','medium','high'];r.priority=p[(p.indexOf(r.priority)+1)%3];
  saveData();render();
}

/* ══ INLINE EDIT ══ */
function toggleEdit(id){
  const card=document.querySelector(`[data-id="${id}"]`);if(!card)return;
  if(card.dataset.editing==='true'){commitEdit(id,card);}
  else{card.dataset.editing='true';card.querySelector('.ctitle').contentEditable='true';card.querySelector('.curl').contentEditable='true';card.querySelector('.cnotes').contentEditable='true';card.querySelector('.tiw').classList.add('op');card.querySelector('.edb').classList.add('on');card.querySelector('.ctitle').focus();}
}
function commitEdit(id,card){
  const r=res.find(x=>x.id===id);if(!r)return;
  r.title=card.querySelector('.ctitle').innerText.trim()||r.title;r.url=card.querySelector('.curl').innerText.trim()||r.url;r.notes=card.querySelector('.cnotes').innerText.trim();
  const tv=card.querySelector('.ti').value.trim();if(tv)r.tags=[...new Set([...r.tags,...tv.split(',').map(x=>x.trim()).filter(Boolean)])];
  card.dataset.editing='false';
  ['ctitle','curl','cnotes'].forEach(cls=>{card.querySelector('.'+cls).contentEditable='false';});
  card.querySelector('.tiw').classList.remove('op');card.querySelector('.ti').value='';card.querySelector('.edb').classList.remove('on');
  saveData();showToast('✓ Changes saved');render();
}
function removeTag(id,i){const r=res.find(x=>x.id===id);if(r){r.tags.splice(i,1);saveData();render();}}
function tagKey(e,id){if(e.key==='Enter'){const tags=e.target.value.split(',').map(x=>x.trim()).filter(Boolean);const r=res.find(x=>x.id===id);if(r&&tags.length){r.tags=[...new Set([...r.tags,...tags])];e.target.value='';saveData();render();showToast('Tags added ✓');}}}

/* ══ RENDER ══ */
function render(){
  const q=(document.getElementById('si').value||'').toLowerCase();
  const srt=document.getElementById('ssrt').value;
  let list=res.filter(r=>{
    if(activeF==='★ Starred'&&!r.starred)return false;
    if(activeF==='🔥 High Priority'&&r.priority!=='high')return false;
    if(activeF!=='All'&&activeF!=='★ Starred'&&activeF!=='🔥 High Priority'&&r.category!==activeF)return false;
    if(q)return[r.title,r.url,r.notes||'',r.category,r.priority,...r.tags].some(s=>s.toLowerCase().includes(q));
    return true;
  });
  list=[...list].sort((a,b)=>srt==='new'?b.id-a.id:srt==='old'?a.id-b.id:srt==='az'?a.title.localeCompare(b.title):srt==='za'?b.title.localeCompare(a.title):srt==='starred'?(b.starred?1:0)-(a.starred?1:0):0);
  const g=document.getElementById('grid');
  g.innerHTML=list.length?list.map(cardHTML).join(''):`<div class="empty"><div class="ei">📚</div><h3>Nothing here</h3><p>Add a resource or try a different filter.</p></div>`;
  document.getElementById('st-t').textContent=res.length;
  document.getElementById('st-s').textContent=res.filter(r=>r.starred).length;
  document.getElementById('st-c').textContent=[...new Set(res.map(r=>r.category))].length;
}

function cardHTML(r){
  const fav=getFav(r.url);
  const dateStr=r.date?new Date(r.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'';
  const tagsHTML=r.tags.map((t,i)=>`<span class="tag" onclick="removeTag(${r.id},${i})" title="Remove">#${esc(t)}</span>`).join('');
  const prioClass=`priority-${r.priority||'medium'}`;
  const prioLabel=r.priority==='high'?'🔥 High':r.priority==='medium'?'⚡ Med':'🌿 Low';
  const themeDots=CARD_THEMES.map(th=>`<button class="theme-dot-btn ${r.theme===th?'active':''}" style="background:${th?`var(--${th==='teal'?'accent3':th==='rose'?'danger':th==='amber'?'star':th==='violet'?'accent':th==='sky'?'accent2':th==='lime'?'accent':th==='pink'?'danger':th==='orange'?'accent2':'border'})` :'var(--border)'};" onclick="setCardTheme(${r.id},'${th}')" title="${th||'default'}"></button>`).join('');
  return`<div class="card ${r.starred?'starred':''}" data-id="${r.id}" data-editing="false" ${r.theme?`data-theme="${r.theme}"`:''}">
    <div class="ch">
      <img class="fav" src="${fav}" alt="" onerror="this.style.visibility='hidden'">
      <div class="ctw">
        <div class="ctitle" contenteditable="false" spellcheck="false">${esc(r.title)}</div>
        <a class="curl" href="${esc(r.url)}" target="_blank" rel="noopener" contenteditable="false" spellcheck="false" onclick="handleA(event,this)">${esc(r.url)}</a>
      </div>
    </div>
    <div class="card-meta">
      <span class="cbadge cat-${r.category}">${r.category}</span>
      <span class="priority-badge ${prioClass}" onclick="cyclePriority(${r.id})" title="Click to change priority" style="cursor:pointer">${prioLabel}</span>
      ${r.richNotes?'<span class="notes-badge">📝 notes</span>':''}
    </div>
    <div class="card-progress">
      <div class="cprog-label"><span>Progress</span><span class="cprog-pct">${r.progress||0}%</span></div>
      <div class="cprog-bar"><div class="cprog-fill" style="width:${r.progress||0}%"></div></div>
      <input type="range" class="prog-slider" min="0" max="100" value="${r.progress||0}"
             oninput="updateProgress(${r.id},this.value)" title="Drag to update progress">
    </div>
    <div class="cnotes" contenteditable="false">${esc(r.notes||'')}</div>
    <div class="tw">${tagsHTML}</div>
    <div class="tiw"><input class="ti" type="text" placeholder="+ add tags, Enter to save" onkeydown="tagKey(event,${r.id})"></div>
    <div class="theme-picker">${themeDots}</div>
    <div class="cf">
      <div class="cf-left">
        <span class="cd">${dateStr}</span>
      </div>
      <div class="ca">
        <div class="ib stb ${r.starred?'on':''}" onclick="toggleStar(${r.id})" title="${r.starred?'Unstar':'Star'}">★</div>
        <div class="ib opb" onclick="window.open('${esc(r.url)}','_blank')" title="Open">↗</div>
        <div class="ib edt-b" onclick="openEditor(${r.id})" title="Open Notes Editor">📝</div>
        <div class="ib edb" onclick="toggleEdit(${r.id})" title="Quick Edit">✎</div>
        <div class="ib dlb" onclick="delRes(${r.id})" title="Delete">✕</div>
      </div>
    </div>
  </div>`;
}
function handleA(e,el){if(el.closest('.card').dataset.editing==='true')e.preventDefault();}

/* ══ NOTES EDITOR ══ */
let currentEdId=null,edDirty=false,edAutoTimer=null;
function openEditor(id){
  const r=res.find(x=>x.id===id);if(!r)return;
  currentEdId=id;
  document.getElementById('em-title').textContent=r.title+' — Notes';
  const body=document.getElementById('editor-body');
  body.innerHTML=r.richNotes||(r.notes?`<p>${escE(r.notes)}</p>`:'');
  updateWC();setBadge(false);
  switchTab('write',document.querySelector('.em-tab[data-tab="write"]'));
  document.getElementById('pdf-content').textContent='';
  document.getElementById('pdf-info').style.display='none';
  document.getElementById('drop-zone').style.display='flex';
  renderFlashList();
  document.getElementById('editor-overlay').classList.add('open');
  setTimeout(()=>body.focus(),300);
}
function closeEditor(){
  if(edDirty&&!confirm('Unsaved changes. Close anyway?'))return;
  document.getElementById('editor-overlay').classList.remove('open');
  currentEdId=null;edDirty=false;
}
function editorBgClick(e){if(e.target===document.getElementById('editor-overlay'))closeEditor();}
function saveEditor(){
  if(!currentEdId)return;
  const r=res.find(x=>x.id===currentEdId);if(!r)return;
  const body=document.getElementById('editor-body');
  r.richNotes=body.innerHTML;r.notes=body.innerText.trim().slice(0,200);
  saveData(true);edDirty=false;setBadge(true);showToast('✓ Notes saved!');render();
}
function onEditorInput(){
  edDirty=true;setBadge(false);updateWC();
  clearTimeout(edAutoTimer);
  edAutoTimer=setTimeout(()=>{saveEditor();document.getElementById('auto-status').textContent='✓ Auto-saved';},2000);
  document.getElementById('auto-status').textContent='...editing';
}
function setBadge(s){const b=document.getElementById('em-badge');b.textContent=s?'✓ Saved':'● Unsaved';b.className='em-badge'+(s?' saved':'');}
function execCmd(cmd,val=null){document.getElementById('editor-body').focus();document.execCommand(cmd,false,val);onEditorInput();}
function insertLink(){const u=prompt('URL:','https://');if(u)execCmd('createLink',u);}
function insertImg(){const u=prompt('Image URL:');if(u)execCmd('insertImage',u);}
function insertTable(){execCmd('insertHTML','<table><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Cell</td><td>Cell</td></tr></table>');}
function insertCodeBlock(){execCmd('insertHTML','<pre><code>// code here</code></pre>');}
function clearEditor(){if(confirm('Clear all content?')){document.getElementById('editor-body').innerHTML='';onEditorInput();}}
function editorKeys(e){if(e.ctrlKey||e.metaKey){if(e.key==='s'){e.preventDefault();saveEditor();}if(e.key==='b'){e.preventDefault();execCmd('bold');}if(e.key==='i'){e.preventDefault();execCmd('italic');}if(e.key==='u'){e.preventDefault();execCmd('underline');}}}
function updateWC(){const txt=document.getElementById('editor-body').innerText||'';document.getElementById('wc-w').textContent=(txt.trim()?txt.trim().split(/\s+/).length:0)+' words';document.getElementById('wc-c').textContent=txt.length+' chars';document.getElementById('wc-l').textContent=txt.split('\n').length+' lines';}
function switchTab(name,el){
  document.querySelectorAll('.em-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.em-content').forEach(t=>t.classList.remove('active'));
  if(el)el.classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
  if(name==='preview')document.getElementById('preview-area').innerHTML=document.getElementById('editor-body').innerHTML||'<p style="color:var(--muted);font-style:italic">Nothing written yet…</p>';
  if(name==='flash')renderFlashList();
}
function handleFile(e){const f=e.target.files[0];if(f)loadFile(f);}
function handleDrop(e){e.preventDefault();const f=e.dataTransfer.files[0];if(f)loadFile(f);}
function loadFile(file){
  const n=file.name,ext=n.split('.').pop().toLowerCase();
  document.getElementById('pdf-name').textContent='📄 '+n;
  document.getElementById('pdf-info').style.display='flex';
  document.getElementById('drop-zone').style.display='none';
  const rd=new FileReader();
  if(ext==='pdf'){rd.onload=ev=>{const s=extractPDF(ev.target.result);document.getElementById('pdf-content').textContent=s||'⚠ Could not extract text.';if(s&&confirm('Load PDF text into editor?')){const b=document.getElementById('editor-body');b.innerHTML+=`<hr><h3>📄 ${escE(n)}</h3><p>${escE(s).replace(/\n{2,}/g,'</p><p>').replace(/\n/g,'<br>')}</p>`;switchTab('write',document.querySelector('.em-tab[data-tab="write"]'));onEditorInput();}};rd.readAsBinaryString(file);}
  else{rd.onload=ev=>{const txt=ev.target.result;document.getElementById('pdf-content').textContent=txt;if(confirm(`Load "${n}" into editor?`)){const b=document.getElementById('editor-body');b.innerHTML+=`<hr><h3>📄 ${escE(n)}</h3>`+(ext==='md'?mdHTML(txt):`<p>${escE(txt).replace(/\n{2,}/g,'</p><p>').replace(/\n/g,'<br>')}</p>`);switchTab('write',document.querySelector('.em-tab[data-tab="write"]'));onEditorInput();}};rd.readAsText(file);}
}
function extractPDF(bin){const r=[];const b=bin.match(/BT[\s\S]*?ET/g)||[];b.forEach(blk=>{(blk.match(/\(([^)]{2,})\)\s*T[jJ]/g)||[]).forEach(m=>{const i=m.match(/\(([^)]+)\)/);if(i)r.push(i[1].replace(/\\[rn]/g,' '));});});if(!r.length)return(bin.match(/[^\x00-\x1F\x7F-\xFF]{4,}/g)||[]).filter(s=>s.trim().length>3).slice(0,300).join('\n');return r.join(' ').trim();}
function mdHTML(md){return md.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<i>$1</i>').replace(/`(.+?)`/g,'<code>$1</code>').replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2">$1</a>').replace(/^[-*] (.+)$/gm,'<li>$1</li>').replace(/\n{2,}/g,'</p><p>').replace(/\n/g,'<br>');}
function clearUpload(){document.getElementById('pdf-info').style.display='none';document.getElementById('drop-zone').style.display='flex';document.getElementById('pdf-content').textContent='';document.getElementById('file-inp').value='';}
function dlHTML(){const c=document.getElementById('editor-body').innerHTML;const r=res.find(x=>x.id===currentEdId);const t=r?r.title:'notes';dlBlob(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escE(t)}</title><style>body{font-family:sans-serif;max-width:800px;margin:40px auto;line-height:1.7;}h1,h2,h3{color:#4a7c59;}blockquote{border-left:4px solid #4a7c59;padding:8px 16px;color:#666;font-style:italic;}</style></head><body><h1>${escE(t)}</h1>${c}</body></html>`,t+'.html','text/html');}
function dlTXT(){const t=document.getElementById('editor-body').innerText;const r=res.find(x=>x.id===currentEdId);dlBlob(t,(r?r.title:'notes')+'.txt','text/plain');}
function dlBlob(c,n,tp){const b=new Blob([c],{type:tp});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();URL.revokeObjectURL(a.href);showToast('⬇ '+n);}
function printDoc(){const c=document.getElementById('editor-body').innerHTML;const w=window.open('','_blank');w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:sans-serif;max-width:800px;margin:40px auto;line-height:1.7;}h1,h2,h3{color:#4a7c59;}</style></head><body>${c}</body></html>`);w.document.close();w.print();}
function copyAll(){navigator.clipboard.writeText(document.getElementById('editor-body').innerText).then(()=>showToast('📋 Copied!'));}

/* ══ FLASHCARDS (Editor Tab) ══ */
function getFlashKey(){return currentEdId?`flash_${currentEdId}`:'flash_global';}
function getCards(){try{return JSON.parse(localStorage.getItem(getFlashKey())||'[]');}catch{return[];}}
function saveCards(cards){localStorage.setItem(getFlashKey(),JSON.stringify(cards));}
function addFlashcard(){
  const q=document.getElementById('fc-q').value.trim(),a=document.getElementById('fc-a').value.trim();
  if(!q||!a){showToast('⚠ Both question and answer needed');return;}
  const cards=getCards();cards.push({id:Date.now(),q,a});saveCards(cards);
  document.getElementById('fc-q').value='';document.getElementById('fc-a').value='';
  renderFlashList();showToast('✓ Flashcard added!');
}
function renderFlashList(){
  const cards=getCards();
  document.getElementById('flash-list').innerHTML=cards.length
    ?cards.map((c,i)=>`<div class="flash-list-item"><span class="fli-q">${esc(c.q)}</span><span style="color:var(--muted)">→</span><span class="fli-a">${esc(c.a)}</span><button class="fli-del" onclick="deleteFlashcard(${c.id})">✕</button></div>`).join('')
    :'<div style="color:var(--muted);font-size:13px;text-align:center;padding:24px">No flashcards yet. Add some above!</div>';
}
function deleteFlashcard(id){const cards=getCards().filter(c=>c.id!==id);saveCards(cards);renderFlashList();}
function autoGenFlashcards(){
  const txt=document.getElementById('editor-body').innerText||'';
  if(!txt.trim()){showToast('⚠ Write some notes first!');return;}
  const sentences=txt.split(/[.!?\n]+/).filter(s=>s.trim().length>20).slice(0,6);
  const cards=getCards();
  sentences.forEach(s=>{
    const parts=s.trim().split(/[:–—]/);
    if(parts.length>=2)cards.push({id:Date.now()+Math.random(),q:parts[0].trim()+'?',a:parts.slice(1).join(':').trim()});
    else cards.push({id:Date.now()+Math.random(),q:'What is: '+s.trim().slice(0,60)+'?',a:s.trim()});
  });
  saveCards(cards);renderFlashList();showToast(`✨ ${sentences.length} flashcards generated!`);
}

/* ══ FLASHCARD VIEWER MODAL ══ */
let flashCards=[],flashIdx=0,flashFlipped=false,fcEasy=0,fcHard=0;
function openFlashcards(){
  buildDeckSelector();
  loadDeck(document.getElementById('flash-deck-sel').value);
  document.getElementById('flash-overlay').classList.add('open');
}
function closeFlash(){document.getElementById('flash-overlay').classList.remove('open');}
function buildDeckSelector(){
  const sel=document.getElementById('flash-deck-sel');
  const decks=[{id:'all',name:'All Cards'},...res.filter(r=>localStorage.getItem(`flash_${r.id}`)&&JSON.parse(localStorage.getItem(`flash_${r.id}`)).length>0).map(r=>({id:r.id,name:r.title.slice(0,30)}))];
  sel.innerHTML=decks.map(d=>`<option value="${d.id}">${esc(d.name)}</option>`).join('');
}
function loadDeck(deckId){
  if(deckId==='all'){flashCards=res.flatMap(r=>{try{return JSON.parse(localStorage.getItem(`flash_${r.id}`)||'[]');}catch{return[];}});}
  else{try{flashCards=JSON.parse(localStorage.getItem(`flash_${deckId}`)||'[]');}catch{flashCards=[];}}
  flashIdx=0;fcEasy=0;fcHard=0;flashFlipped=false;
  document.getElementById('fc-easy').textContent=0;document.getElementById('fc-hard').textContent=0;document.getElementById('fc-score').textContent='—';
  showCard();
}
function showCard(){
  const card=document.getElementById('flash-card');
  card.classList.remove('flipped');flashFlipped=false;
  const total=flashCards.length;
  if(!total){document.getElementById('flash-q-text').textContent='No flashcards in this deck!';document.getElementById('flash-a-text').textContent='Create some in the editor.';document.getElementById('flash-counter').textContent='0 / 0';document.getElementById('flash-pb').style.width='0%';return;}
  const c=flashCards[flashIdx];
  document.getElementById('flash-q-text').textContent=c.q;
  document.getElementById('flash-a-text').textContent=c.a;
  document.getElementById('flash-counter').textContent=`Card ${flashIdx+1} / ${total}`;
  document.getElementById('flash-pb').style.width=((flashIdx+1)/total*100)+'%';
}
function flipCard(){const card=document.getElementById('flash-card');flashFlipped=!flashFlipped;card.classList.toggle('flipped',flashFlipped);}
function nextCard(){if(flashCards.length){flashIdx=(flashIdx+1)%flashCards.length;flashFlipped=false;showCard();}}
function prevCard(){if(flashCards.length){flashIdx=(flashIdx-1+flashCards.length)%flashCards.length;flashFlipped=false;showCard();}}
function shuffleCards(){for(let i=flashCards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[flashCards[i],flashCards[j]]=[flashCards[j],flashCards[i]];}flashIdx=0;showCard();showToast('🔀 Shuffled!');}
function rateCard(rating){
  if(rating==='easy'){fcEasy++;document.getElementById('fc-easy').textContent=fcEasy;}
  else{fcHard++;document.getElementById('fc-hard').textContent=fcHard;}
  const total=fcEasy+fcHard;
  document.getElementById('fc-score').textContent=total?Math.round(fcEasy/total*100)+'%':'—';
  nextCard();
}

/* ══ POMODORO ══ */
const POMO_MODES={focus:{label:'Focus Session',color:'#4a7c59'},short:{label:'Short Break',color:'#2d7a8a'},long:{label:'Long Break',color:'#c4783a'}};
let pomoMode='focus',pomoActive=false,pomoTime=25*60,pomoTotal=25*60,pomoInterval=null,pomoRound=1,pomoDone=0,pomoStreak=0,pomoToday=0,pomoLastDate='';
const CIRCUM=2*Math.PI*96;
function setPomoMode(mode,el){
  if(pomoActive){if(!confirm('Reset timer?'))return;clearInterval(pomoInterval);pomoActive=false;}
  pomoMode=mode;
  document.querySelectorAll('.pomo-mode-btn').forEach(b=>b.classList.remove('active'));if(el)el.classList.add('active');
  updatePomoSettings();
}
function updatePomoSettings(){
  const mins={focus:+document.getElementById('pomo-focus-min').value,short:+document.getElementById('pomo-short-min').value,long:+document.getElementById('pomo-long-min').value};
  pomoTime=mins[pomoMode]*60;pomoTotal=pomoTime;
  document.getElementById('ring-fg').style.stroke=POMO_MODES[pomoMode].color;
  document.getElementById('pomo-label').textContent=POMO_MODES[pomoMode].label;
  renderPomo();
}
function renderPomo(){
  const m=String(Math.floor(pomoTime/60)).padStart(2,'0'),s=String(pomoTime%60).padStart(2,'0');
  document.getElementById('pomo-time').textContent=`${m}:${s}`;
  const pct=pomoTotal?pomoTime/pomoTotal:0;
  document.getElementById('ring-fg').style.strokeDashoffset=(CIRCUM*pct).toFixed(2);
}
function togglePomo(){
  if(pomoActive){clearInterval(pomoInterval);pomoActive=false;document.getElementById('pomo-play').textContent='▶ Resume';}
  else{pomoActive=true;document.getElementById('pomo-play').textContent='⏸ Pause';
    pomoInterval=setInterval(()=>{
      pomoTime--;renderPomo();
      if(pomoTime<=0){clearInterval(pomoInterval);pomoActive=false;document.getElementById('pomo-play').textContent='▶ Start';
        pomoDone++;pomoToday++;
        const today=new Date().toDateString();if(pomoLastDate!==today){pomoStreak++;pomoLastDate=today;}
        document.getElementById('ps-total').textContent=pomoDone;document.getElementById('ps-today').textContent=pomoToday;document.getElementById('ps-streak').textContent=pomoStreak;
        if(pomoMode==='focus'){pomoRound=pomoRound%4+1;document.getElementById('pomo-round').textContent=pomoRound;logStudy(`Completed Pomodoro #${pomoDone} 🍅`);}
        try{new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA').play();}catch{}
        showToast(pomoMode==='focus'?'🍅 Focus session done! Take a break!':'☕ Break over! Back to work!');
        if(pomoMode==='focus')setPomoMode('short',document.getElementById('pm-short'));
        else setPomoMode('focus',document.getElementById('pm-focus'));
      }
    },1000);}
}
function resetPomo(){clearInterval(pomoInterval);pomoActive=false;updatePomoSettings();document.getElementById('pomo-play').textContent='▶ Start';}
function pomoNext(){resetPomo();if(pomoMode==='focus')setPomoMode('short',document.getElementById('pm-short'));else setPomoMode('focus',document.getElementById('pm-focus'));}
function pomoPrev(){resetPomo();updatePomoSettings();}
function openPomodoro(){document.getElementById('pomo-overlay').classList.add('open');updatePomoSettings();}
function closePomo(){document.getElementById('pomo-overlay').classList.remove('open');}

/* ══ PROGRESS TRACKER ══ */
function openProgress(){renderProgress();document.getElementById('progress-overlay').classList.add('open');}
function closeProgress(){document.getElementById('progress-overlay').classList.remove('open');}
function renderProgress(){
  const cats=[...new Set(res.map(r=>r.category))];
  const grid=document.getElementById('prog-grid');
  let totalProg=0,totalItems=0;
  grid.innerHTML=cats.map(cat=>{
    const items=res.filter(r=>r.category===cat);
    const avg=items.length?Math.round(items.reduce((s,r)=>s+(r.progress||0),0)/items.length):0;
    totalProg+=avg;totalItems++;
    const hue=cat==='Math'?145:cat==='Science'?190:cat==='Physics'?270:cat==='Chemistry'?130:cat==='Biology'?50:cat==='Programming'?220:cat==='English'?340:cat==='History'?30:cat==='Geography'?200:0;
    return`<div class="prog-card" onclick="">
      <div class="prog-cat-name">${cat}</div>
      <div class="prog-cat-count">${items.length} resources</div>
      <div class="prog-bar"><div class="prog-bar-fill" style="width:${avg}%;background:hsl(${hue},55%,${document.body.classList.contains('dark')?'55%':'42%'})"></div></div>
      <div class="prog-pct">${avg}% complete</div>
      <input type="range" class="prog-slider" min="0" max="100" value="${avg}" title="Overall ${cat} progress"
             oninput="setCatProgress('${cat}',this.value)">
    </div>`;
  }).join('');
  const overall=totalItems?Math.round(totalProg/totalItems):0;
  document.getElementById('prog-overall-fill').style.width=overall+'%';
  document.getElementById('prog-overall-pct').textContent=overall+'%';
  renderLog();
}
function setCatProgress(cat,val){
  res.filter(r=>r.category===cat).forEach(r=>r.progress=+val);
  saveData(true);renderProgress();render();showToast(`${cat} progress → ${val}%`);
  logStudy(`Set ${cat} progress to ${val}%`);
}
const LOG_KEY='sv_log';
function logStudy(msg){const log=getLog();log.unshift({t:new Date().toLocaleString(),m:msg});if(log.length>50)log.pop();localStorage.setItem(LOG_KEY,JSON.stringify(log));}
function getLog(){try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch{return[];}}
function renderLog(){const log=getLog();document.getElementById('prog-log').innerHTML=log.length?log.map(e=>`<div class="log-entry"><span>${e.t}</span> — ${esc(e.m)}</div>`).join(''):'<div class="log-entry" style="text-align:center">No activity yet</div>';}
function clearLog(){localStorage.removeItem(LOG_KEY);renderLog();}

/* ══ HELPERS ══ */
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function escE(s){return esc(s);}
function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2400);}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){['editor-overlay','pomo-overlay','progress-overlay','flash-overlay'].forEach(id=>{document.getElementById(id).classList.remove('open');});}
  if(e.key==='Enter'&&document.activeElement.closest('.add-panel')&&document.activeElement.tagName==='INPUT')addRes();
  if(e.key==='ArrowRight'&&document.getElementById('flash-overlay').classList.contains('open'))nextCard();
  if(e.key==='ArrowLeft'&&document.getElementById('flash-overlay').classList.contains('open'))prevCard();
  if(e.key===' '&&document.getElementById('flash-overlay').classList.contains('open')){e.preventDefault();flipCard();}
});

/* ══ BOOT ══ */
loadData();buildChips();render();showOwlOpening();
