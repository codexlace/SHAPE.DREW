const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const STORAGE_KEYS = {
  current: 'shapeDrew.currentCard.v1',
  toybox: 'shapeDrew.toybox.v1',
  theme: 'shapeDrew.theme.v1',
  openrouterKey: 'shapeDrew.openrouterKey.v1'
};

const DATA = {
  subjectFamily: {
    blob: {
      label: 'Blob creature',
      icon: 'B',
      subjects: ['moon blob', 'puddle sprite', 'gumdrop ghost', 'tiny cloud', 'mystery bean'],
      shape: ['Start with one squashed circle or bean shape.', 'Keep the body readable before adding any decorations.', 'Use one asymmetrical bump so it feels alive, not like a plain ball.'],
      readability: 'The silhouette should read as one strong soft lump with one memorable bump.',
      danger: 'Too many tiny bumps can turn the mascot into visual oatmeal.'
    },
    food: {
      label: 'Food mascot',
      icon: 'F',
      subjects: ['strawberry', 'toast slice', 'dumpling', 'cupcake', 'melon soda'],
      shape: ['Use the food shape as the body first.', 'Group texture details into one neat area.', 'Keep the face below the middle so the food identity stays clear.'],
      readability: 'The viewer should recognize the food even if the face disappears.',
      danger: 'Scattered sprinkles, seeds, or toppings can eat the silhouette alive.'
    },
    object: {
      label: 'Object mascot',
      icon: 'O',
      subjects: ['pencil', 'lantern', 'key', 'teacup', 'paint tube'],
      shape: ['Preserve the object function before adding limbs.', 'Turn one functional part into personality.', 'Place limbs where they do not hide the object outline.'],
      readability: 'The object must still work as an icon shape from far away.',
      danger: 'Arms and accessories can disguise the object if they cross the main contour.'
    },
    letter: {
      label: 'Letter mascot',
      icon: 'L',
      subjects: ['letter A', 'letter B', 'letter S', 'letter M', 'letter R'],
      shape: ['Keep the letter readable first.', 'Place the face in the counterspace or lower thick stroke.', 'Use limbs that follow the letter direction.'],
      readability: 'It should still read as a letter when shrunk to app-icon size.',
      danger: 'Overdecorating the strokes can make the letter turn into alphabet soup.'
    },
    icon: {
      label: 'Icon companion',
      icon: 'I',
      subjects: ['star badge', 'heart badge', 'mask icon', 'spark button', 'tiny shield'],
      shape: ['Begin with one bold emblem silhouette.', 'Use one inner face zone and one outer charm detail.', 'Make the border slightly thicker than you think.'],
      readability: 'The mascot must work as a sticker, badge, or tiny app helper.',
      danger: 'Thin details vanish first. Make important parts chunky.'
    },
    creature: {
      label: 'Little creature',
      icon: 'C',
      subjects: ['moth cat', 'snail bun', 'star puppy', 'frog charm', 'bat bean'],
      shape: ['Pick one animal clue only: ears, tail, wings, shell, or antennae.', 'Build the body from a simple oval or rounded square.', 'Let the chosen animal clue carry the identity.'],
      readability: 'One creature clue should be obvious without needing realism.',
      danger: 'Mixing too many animal traits makes the design noisy instead of magical.'
    },
    mask: {
      label: 'Mask mascot',
      icon: 'M',
      subjects: ['soft theater mask', 'sticker mask', 'moon mask', 'tiny monster mask', 'button mask'],
      shape: ['Use a strong face silhouette: oval, squircle, shield, or moon slice.', 'Make eye shapes the personality engine.', 'Keep the mouth extremely simple.'],
      readability: 'The mask should be recognizable from eye placement and outer contour alone.',
      danger: 'Too much facial detail can make it uncanny instead of charming.'
    },
    plant: {
      label: 'Plant mascot',
      icon: 'P',
      subjects: ['sprout', 'mushroom', 'cactus charm', 'flower bud', 'leaf ghost'],
      shape: ['Use stem, leaf, cap, or petal as the main identity.', 'Repeat one simple leaf/petal shape instead of inventing many.', 'Keep the face anchored to the largest mass.'],
      readability: 'The plant clue should be visible as a clean top or side silhouette.',
      danger: 'Leaves can become confetti. Use fewer, larger shapes.'
    }
  },
  mood: {
    curious: { label: 'Curious', face: 'one eyebrow lift, wide eyes, small open mouth', posture: 'slight lean forward', exaggerate: 'tilt the head or top shape', simplify: 'keep the mouth tiny so the eyes do the question-asking' },
    shy: { label: 'Shy', face: 'low eyes, tiny mouth, soft blush', posture: 'inward limbs, tucked shape', exaggerate: 'lower the face and round the body', simplify: 'remove big gestures' },
    proud: { label: 'Proud', face: 'small smile, lifted cheeks, confident eyes', posture: 'upright body, tiny chest-forward stance', exaggerate: 'make the top silhouette taller', simplify: 'avoid too many sparkles' },
    sleepy: { label: 'Sleepy', face: 'droopy eyelids, soft mouth, low cheeks', posture: 'heavy rounded lean', exaggerate: 'sag the shape gently', simplify: 'remove sharp corners' },
    dramatic: { label: 'Dramatic', face: 'bold eyes, tiny theatrical mouth', posture: 'one big angle or sweeping accessory', exaggerate: 'one oversized feature', simplify: 'only one drama detail gets the spotlight' },
    grumpy: { label: 'Grumpy-cute', face: 'flat mouth, low brows, squished cheeks', posture: 'stubby planted stance', exaggerate: 'compress the body wider', simplify: 'keep the face readable, not mean' },
    hauntedCute: { label: 'Haunted-cute', face: 'tiny uneasy mouth, mismatched eyes', posture: 'floating or slightly tilted', exaggerate: 'one strange asymmetrical detail', simplify: 'stay cute through roundness' },
    sparkly: { label: 'Sparkly', face: 'starry eye highlight, delighted mouth', posture: 'open and bouncy', exaggerate: 'one shine mark or charm', simplify: 'do not cover the mascot in glitter confetti' },
    focused: { label: 'Focused', face: 'small determined eyes, simple mouth', posture: 'forward-pointing tool or stance', exaggerate: 'make the working tool clear', simplify: 'use fewer decorative details' }
  },
  material: {
    plush: { label: 'Soft plush', finish: 'rounded edges, seam hints, soft side shadow', brush: 'soft airbrush, 6B pencil seam, gentle smudge', layer: ['Base shape', 'soft side shadow', 'tiny seam or stitch', 'face', 'warm blush'] },
    gummy: { label: 'Gummy candy', finish: 'translucent edges, juicy highlight, saturated shadow', brush: 'soft round brush, glossy highlight brush', layer: ['Base candy color', 'inner glow', 'edge shadow', 'white highlight', 'face on top'] },
    clay: { label: 'Clay charm', finish: 'matte body, thumbprint texture, chunky bevel', brush: 'clay/noise brush, soft shadow', layer: ['Base clay blob', 'bevel shadow', 'texture speckles', 'face pieces', 'rim light'] },
    paper: { label: 'Paper cutout', finish: 'flat color, lifted paper shadow, crisp edge', brush: 'monoline, dry paper texture', layer: ['Paper silhouette', 'drop shadow', 'paper texture', 'face stickers', 'edge accent'] },
    sticker: { label: 'Glossy sticker', finish: 'thick outline, shiny top streak, bold rim', brush: 'monoline, airbrush highlight', layer: ['Sticker base', 'thick border', 'face', 'top gloss', 'cast shadow'] },
    glass: { label: 'Soft glass', finish: 'transparent tint, bright rim, inner reflection', brush: 'soft airbrush, fine white highlight', layer: ['Tinted base', 'inner shadow', 'rim glow', 'reflected shine', 'face with strong contrast'] },
    velvet: { label: 'Velvet toy', finish: 'deep soft color, fuzzy edge, low-gloss shadow', brush: 'noise brush, soft grain, velvet shading', layer: ['Deep base', 'nap texture', 'soft shadow', 'muted highlight', 'face'] },
    crayon: { label: 'Crayon doodle', finish: 'grainy fills, uneven edges, sketch warmth', brush: '6B pencil, crayon brush, grain texture', layer: ['Loose sketch', 'crayon fill', 'extra dark contour', 'face scribble', 'one color pop'] },
    pearl: { label: 'Pearl charm', finish: 'milky gradient, colored rim, tiny shine dots', brush: 'soft round, sparkle highlight', layer: ['Milky base', 'cool rim', 'warm shadow', 'shine dots', 'face'] }
  },
  purpose: {
    sticker: { label: 'Sticker', rule: 'Use a bold outer contour and a tiny cast shadow. Make the expression readable first.', output: 'Export-ready sticker creature' },
    appIcon: { label: 'App icon', rule: 'Center the shape, enlarge the face, and keep the silhouette chunky at 192px.', output: 'Tiny icon mascot' },
    logoBuddy: { label: 'Logo buddy', rule: 'Make the mascot simple enough to sit beside text without stealing the whole room.', output: 'Brand companion' },
    plushToy: { label: 'Plush toy', rule: 'Prioritize rounded seams, stubby limbs, and one exaggerated soft feature.', output: 'Toy-like character' },
    badge: { label: 'Badge', rule: 'Use a strong circular or shield-like container and make the center symbol clear.', output: 'Badge mascot' },
    practice: { label: 'Practice sketch', rule: 'Keep it fast: three shapes, one face, one redraw decision.', output: 'Learning sketch' }
  },
  difficulty: {
    tiny: { label: 'Tiny beginner', steps: 4, constraint: 'Use only three main shapes and one detail.' },
    cozy: { label: 'Cozy learner', steps: 5, constraint: 'Use four to six shapes and one polish idea.' },
    brave: { label: 'Brave redraw', steps: 6, constraint: 'Add one asymmetry, one material cue, and one silhouette check.' }
  }
};

const coachLines = [
  'Lower the face and the mascot becomes instantly more adoptable.',
  'One charm detail is a design choice. Five charm details is a tiny parade in traffic.',
  'If the silhouette works as a black blob, the mascot has bones.',
  'Make the big shapes calmer, then let one tiny detail sing.',
  'A cute mascot is usually a readable shape wearing a feeling.'
];

const drills = [
  { title: 'Three-shape pass', text: 'Draw the mascot using only three shapes. No texture. No accessories. Just the bones.' },
  { title: 'Black blob test', text: 'Fill the outer shape with black. Can you still tell what it is? Fix the silhouette before details.' },
  { title: 'Face elevator', text: 'Draw three tiny versions with the face high, middle, and low. Circle the cutest one.' },
  { title: 'Detail diet', text: 'Remove one decoration and make one remaining shape bigger. See if it gets stronger.' },
  { title: 'Sticker shrink', text: 'Squint or zoom out. Redraw the mascot so it still reads at thumbnail size.' },
  { title: 'Material whisper', text: 'Show the material with only one shadow and one highlight. No rendering storm allowed.' }
];

let currentCard = readJSON(STORAGE_KEYS.current, null);
let toybox = readJSON(STORAGE_KEYS.toybox, []);

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function uid() { return `sd-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function titleCase(text) { return text.replace(/\b\w/g, c => c.toUpperCase()); }
function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function init() {
  hydrateSelects();
  bindTabs();
  bindControls();
  renderPractice();
  applyTheme(localStorage.getItem(STORAGE_KEYS.theme) || 'light');
  $('#openrouterKey').value = localStorage.getItem(STORAGE_KEYS.openrouterKey) || '';
  renderCard();
  renderToybox();
  if (!currentCard) generateCard({ random: true, silent: true });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(() => {});
}

function hydrateSelects() {
  fillSelect('#subjectFamily', DATA.subjectFamily);
  fillSelect('#mood', DATA.mood);
  fillSelect('#material', DATA.material);
  fillSelect('#purpose', DATA.purpose);
  fillSelect('#difficulty', DATA.difficulty);
}

function fillSelect(selector, map) {
  const select = $(selector);
  select.innerHTML = Object.entries(map).map(([key, item]) => `<option value="${key}">${item.label}</option>`).join('');
}

function bindTabs() {
  $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => openTab(btn.dataset.tab)));
  document.addEventListener('click', event => {
    const go = event.target.closest('[data-go-tab]');
    if (go) openTab(go.dataset.goTab);
  });
}

function openTab(tab) {
  $$('.tab-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.tab === tab));
  $$('.tab-panel').forEach(panel => panel.classList.toggle('is-active', panel.id === tab));
}

function bindControls() {
  $('#makerForm').addEventListener('submit', event => {
    event.preventDefault();
    generateCard();
    openTab('card');
  });
  $('#quickGenerate').addEventListener('click', () => { generateCard(); openTab('card'); });
  $('#surpriseBtn').addEventListener('click', () => { randomizeForm(); generateCard(); openTab('card'); });
  $('#themeToggle').addEventListener('click', () => applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark'));
  $('#saveNoteBtn').addEventListener('click', saveNote);
  $('#exportBtn').addEventListener('click', exportToybox);
  $('#clearToyboxBtn').addEventListener('click', clearToybox);
  $('#askCoachBtn').addEventListener('click', askCoach);
  $$('.status-btn').forEach(btn => btn.addEventListener('click', () => updateStatus(btn.dataset.status)));
}

function applyTheme(theme) {
  document.body.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(STORAGE_KEYS.theme, document.body.dataset.theme);
  $('#themeToggle').textContent = document.body.dataset.theme === 'dark' ? 'Milkfoam desk' : 'Dark desk';
}

function randomizeForm() {
  ['#subjectFamily', '#mood', '#material', '#purpose', '#difficulty'].forEach(selector => {
    const select = $(selector);
    select.selectedIndex = Math.floor(Math.random() * select.options.length);
  });
  const family = DATA.subjectFamily[$('#subjectFamily').value];
  $('#customSubject').value = pick(family.subjects);
}

function generateCard(options = {}) {
  if (options.random) randomizeForm();
  const familyKey = $('#subjectFamily').value;
  const moodKey = $('#mood').value;
  const materialKey = $('#material').value;
  const purposeKey = $('#purpose').value;
  const difficultyKey = $('#difficulty').value;
  const family = DATA.subjectFamily[familyKey];
  const mood = DATA.mood[moodKey];
  const material = DATA.material[materialKey];
  const purpose = DATA.purpose[purposeKey];
  const difficulty = DATA.difficulty[difficultyKey];
  const rawSubject = $('#customSubject').value.trim() || pick(family.subjects);
  const subject = rawSubject.toLowerCase();
  const name = makeName(subject, moodKey, materialKey, familyKey);

  currentCard = {
    id: uid(),
    createdAt: new Date().toISOString(),
    name,
    subject,
    familyKey,
    moodKey,
    materialKey,
    purposeKey,
    difficultyKey,
    family: family.label,
    mood: mood.label,
    material: material.label,
    purpose: purpose.label,
    difficulty: difficulty.label,
    status: 'fresh',
    note: '',
    blueprint: buildBlueprint(subject, family, mood, material, purpose, difficulty),
    drills: buildDrills(subject, mood, material, purpose)
  };

  writeJSON(STORAGE_KEYS.current, currentCard);
  $('#tinyCoach').textContent = pick(coachLines);
  renderCard();
  renderPractice();
  if (!options.silent) sparkleButton($('#quickGenerate'));
}

function makeName(subject, moodKey, materialKey, familyKey) {
  const roots = subject.split(/\s+/).filter(Boolean);
  const core = roots[roots.length - 1] || subject;
  const prefixes = {
    shy: 'Bashful', curious: 'Peeking', proud: 'Noble', sleepy: 'Drowsy', dramatic: 'Opera', grumpy: 'Pouty', hauntedCute: 'Moonlost', sparkly: 'Glint', focused: 'Tasky'
  };
  const suffixes = {
    plush: 'plush', gummy: 'drop', clay: 'charm', paper: 'cutie', sticker: 'sticker', glass: 'glimmer', velvet: 'velvet', crayon: 'scrib', pearl: 'pearl'
  };
  const familySuffix = { blob: 'bean', food: 'bite', object: 'buddy', letter: 'glyph', icon: 'badge', creature: 'kin', mask: 'mask', plant: 'sprout' };
  return `${prefixes[moodKey] || 'Tiny'} ${titleCase(core)}${suffixes[materialKey] || familySuffix[familyKey]}`;
}

function buildBlueprint(subject, family, mood, material, purpose, difficulty) {
  const steps = [
    `Draw the largest ${subject} silhouette first. Ignore the face until the shape feels readable.`,
    pick(family.shape),
    `Place the face using this mood rule: ${mood.face}.`,
    `Add posture: ${mood.posture}.`,
    `Apply the ${material.label.toLowerCase()} finish: ${material.finish}.`,
    `Purpose check: ${purpose.rule}`
  ].slice(0, difficulty.steps);

  return {
    coreShape: pick(family.shape),
    faceMap: mood.face,
    posture: mood.posture,
    silhouetteRule: family.readability,
    exaggerate: mood.exaggerate,
    simplify: mood.simplify,
    dangerZone: family.danger,
    polish: material.finish,
    brush: material.brush,
    layerStack: material.layer,
    output: purpose.output,
    constraint: difficulty.constraint,
    steps
  };
}

function buildDrills(subject, mood, material, purpose) {
  return [
    { title: 'Shape skeleton', text: `Draw ${subject} with only the main body, one face zone, and one identity clue.` },
    { title: 'Mood mutation', text: `Redraw it so ${mood.label.toLowerCase()} is visible without adding props. Use face placement and posture.` },
    { title: 'Polish pass', text: `Add ${material.label.toLowerCase()} using one shadow, one highlight, and one texture clue.` },
    { title: 'Purpose shrink', text: `Check it as a ${purpose.label.toLowerCase()}. Shrink it mentally to 192px and remove anything that turns muddy.` }
  ];
}

function renderCard() {
  const output = $('#cardOutput');
  if (!currentCard) {
    output.innerHTML = $('#emptyCardTemplate').innerHTML;
    return;
  }
  const b = currentCard.blueprint;
  output.innerHTML = `
    <div class="card-top">
      <div class="card-token" data-initial="${escapeHTML(DATA.subjectFamily[currentCard.familyKey].icon)}"></div>
      <div class="card-title">
        <p class="eyebrow">Current mascot card</p>
        <h2>${escapeHTML(currentCard.name)}</h2>
        <p>${escapeHTML(currentCard.subject)} as a ${escapeHTML(currentCard.mood.toLowerCase())} ${escapeHTML(currentCard.material.toLowerCase())} ${escapeHTML(currentCard.purpose.toLowerCase())}.</p>
        <div class="pill-row">
          ${[currentCard.family, currentCard.mood, currentCard.material, currentCard.purpose, currentCard.difficulty, currentCard.status].map(x => `<span class="pill">${escapeHTML(x)}</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="card-grid">
      ${infoCard('Core shape', [b.coreShape, b.constraint])}
      ${infoCard('Face map', [b.faceMap, b.posture])}
      ${infoCard('Silhouette rule', [b.silhouetteRule, `Danger zone: ${b.dangerZone}`])}
      ${infoCard('Design decision', [`Exaggerate: ${b.exaggerate}`, `Simplify: ${b.simplify}`])}
      ${infoCard('Polish pass', [b.polish, `Brush idea: ${b.brush}`])}
      ${infoCard('Layer stack', b.layerStack)}
      ${infoCard('Draw path', b.steps, true, 'ol')}
      ${currentCard.note ? infoCard('Redraw note', [currentCard.note]) : ''}
    </div>
    <div class="card-actions">
      <button class="primary-btn" id="saveCardBtn" type="button">Save to Toybox</button>
      <button class="ghost-btn" id="copyCardBtn" type="button">Copy card text</button>
      <button class="ghost-btn" id="newVersionBtn" type="button">New version</button>
    </div>
  `;
  $('#saveCardBtn').addEventListener('click', saveCurrentCard);
  $('#copyCardBtn').addEventListener('click', copyCardText);
  $('#newVersionBtn').addEventListener('click', () => { generateCard(); openTab('card'); });
  $$('.status-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.status === currentCard.status));
  $('#redrawNote').value = currentCard.note || '';
}

function infoCard(title, items, full = false, listTag = 'ul') {
  const safeItems = items.filter(Boolean).map(item => `<li>${escapeHTML(item)}</li>`).join('');
  return `<section class="info-card ${full ? 'full' : ''}"><h3>${escapeHTML(title)}</h3><${listTag}>${safeItems}</${listTag}></section>`;
}

function renderPractice() {
  const custom = currentCard?.drills || [];
  const all = [...custom, ...drills].slice(0, 8);
  $('#practiceList').innerHTML = all.map(drill => `<article class="drill-card"><h3>${escapeHTML(drill.title)}</h3><p>${escapeHTML(drill.text)}</p></article>`).join('');
}

function updateStatus(status) {
  if (!currentCard) return;
  currentCard.status = status;
  writeJSON(STORAGE_KEYS.current, currentCard);
  renderCard();
}

function saveNote() {
  if (!currentCard) return;
  currentCard.note = $('#redrawNote').value.trim();
  writeJSON(STORAGE_KEYS.current, currentCard);
  renderCard();
  openTab('card');
}

function saveCurrentCard() {
  if (!currentCard) return;
  const exists = toybox.some(card => card.id === currentCard.id);
  toybox = exists ? toybox.map(card => card.id === currentCard.id ? currentCard : card) : [currentCard, ...toybox];
  writeJSON(STORAGE_KEYS.toybox, toybox);
  renderToybox();
  sparkleButton($('#saveCardBtn'));
}

function renderToybox() {
  const list = $('#toyboxList');
  if (!toybox.length) {
    list.innerHTML = `<div class="empty-state"><img src="ICON-192x192.png" alt="" /><h2>Your Toybox is empty.</h2><p>Save a mascot card and it will appear here.</p></div>`;
    return;
  }
  list.innerHTML = toybox.map(card => `
    <article class="saved-card">
      <p class="eyebrow">${escapeHTML(card.status || 'saved')}</p>
      <h3>${escapeHTML(card.name)}</h3>
      <p>${escapeHTML(card.subject)} • ${escapeHTML(card.mood)} • ${escapeHTML(card.material)}</p>
      <p class="mini">${new Date(card.createdAt).toLocaleString()}</p>
      <div class="saved-actions">
        <button class="ghost-btn" data-load="${escapeHTML(card.id)}" type="button">Open</button>
        <button class="danger-btn" data-delete="${escapeHTML(card.id)}" type="button">Delete</button>
      </div>
    </article>
  `).join('');
  $$('[data-load]', list).forEach(btn => btn.addEventListener('click', () => loadCard(btn.dataset.load)));
  $$('[data-delete]', list).forEach(btn => btn.addEventListener('click', () => deleteCard(btn.dataset.delete)));
}

function loadCard(id) {
  const found = toybox.find(card => card.id === id);
  if (!found) return;
  currentCard = found;
  writeJSON(STORAGE_KEYS.current, currentCard);
  renderCard();
  renderPractice();
  openTab('card');
}

function deleteCard(id) {
  toybox = toybox.filter(card => card.id !== id);
  writeJSON(STORAGE_KEYS.toybox, toybox);
  renderToybox();
}

function clearToybox() {
  if (!toybox.length) return;
  const ok = confirm('Clear every saved mascot card from this browser?');
  if (!ok) return;
  toybox = [];
  writeJSON(STORAGE_KEYS.toybox, toybox);
  renderToybox();
}

function exportToybox() {
  const blob = new Blob([JSON.stringify(toybox, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shape-drew-toybox-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function copyCardText() {
  if (!currentCard) return;
  const b = currentCard.blueprint;
  const text = `${currentCard.name}\nSubject: ${currentCard.subject}\nMood: ${currentCard.mood}\nMaterial: ${currentCard.material}\nPurpose: ${currentCard.purpose}\n\nCore shape: ${b.coreShape}\nFace map: ${b.faceMap}\nSilhouette: ${b.silhouetteRule}\nDanger zone: ${b.dangerZone}\nPolish: ${b.polish}\n\nDraw path:\n${b.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
  navigator.clipboard?.writeText(text).then(() => sparkleButton($('#copyCardBtn')));
}

async function askCoach() {
  const key = $('#openrouterKey').value.trim();
  const model = $('#openrouterModel').value.trim();
  const userPrompt = $('#coachPrompt').value.trim();
  localStorage.setItem(STORAGE_KEYS.openrouterKey, key);

  if (!key) return setCoach('Add your OpenRouter API key first. It stays in this browser only.');
  if (!model) return setCoach('Choose an OpenRouter model first. The model field is intentionally blank so you control it.');
  if (!userPrompt) return setCoach('Tell the coach what you want help with. Try asking for readability, silhouette, Procreate layers, or a redraw plan.');

  setCoach('Thinking through the mascot bones...');
  const context = currentCard ? `Current card: ${JSON.stringify(currentCard, null, 2)}` : 'No current mascot card.';
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        'HTTP-Referer': location.origin,
        'X-Title': 'SHAPE.drew'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a concise, beginner-friendly mascot design coach. Give practical drawing advice focused on shape language, silhouette readability, expression, Procreate layers, and simple redraw decisions. Avoid vague praise. Keep it useful and playful.' },
          { role: 'user', content: `${context}\n\nUser request: ${userPrompt}` }
        ]
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'OpenRouter request failed.');
    setCoach(data?.choices?.[0]?.message?.content || 'No response returned. Try another model or request.');
  } catch (error) {
    setCoach(`OpenRouter error: ${error.message}`);
  }
}

function setCoach(text) { $('#coachOutput').textContent = text; }

function sparkleButton(btn) {
  if (!btn) return;
  const old = btn.textContent;
  btn.textContent = 'Saved ✦';
  setTimeout(() => { btn.textContent = old; }, 900);
}

init();
