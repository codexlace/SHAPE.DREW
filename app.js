const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE_KEY = 'oddlet:v1:stash';
const SETTINGS_KEY = 'oddlet:v1:settings';

const lanes = [
  { value: 'surprise', label: 'Surprise me' },
  { value: 'object', label: 'Object gremlin' },
  { value: 'food', label: 'Snack creature' },
  { value: 'symbol', label: 'Symbol creature' },
  { value: 'ghost', label: 'Soft monster' },
  { value: 'stationery', label: 'Stationery oddball' },
  { value: 'weather', label: 'Weather blob' },
  { value: 'plant', label: 'Plant sprout' },
  { value: 'charm', label: 'Tiny charm' }
];

const moods = [
  { value: 'surprise', label: 'Surprise me' },
  { value: 'bashful', label: 'bashful' },
  { value: 'dramatic', label: 'dramatic' },
  { value: 'sleepy', label: 'sleepy' },
  { value: 'suspicious', label: 'suspicious' },
  { value: 'proud', label: 'proud but tiny' },
  { value: 'confused', label: 'deeply confused' },
  { value: 'grumpy', label: 'grumpy-soft' },
  { value: 'hopeful', label: 'hopeful' },
  { value: 'blank', label: 'blank-faced' },
  { value: 'secret', label: 'secretly powerful' }
];

const sparks = [
  { value: 'surprise', label: 'Surprise me' },
  { value: 'livingDetail', label: 'Living detail' },
  { value: 'tinyJob', label: 'Tiny job' },
  { value: 'secretSymbol', label: 'Secret symbol' },
  { value: 'wrongScale', label: 'Wrong scale' },
  { value: 'microProblem', label: 'Mini problem' },
  { value: 'costumeLogic', label: 'Costume logic' },
  { value: 'quietMagic', label: 'Almost magic' },
  { value: 'attachedOddity', label: 'Attached oddity' },
  { value: 'tinyCompanion', label: 'Tiny companion' },
  { value: 'fakeImportance', label: 'Fake importance' }
];

const shapes = [
  { value: '3', label: '3-shape easy' },
  { value: '5', label: '5-shape cute' },
  { value: '7', label: '7-shape playful' },
  { value: 'loose', label: 'loose but simple' }
];

const mascotDeck = {
  object: ['paint palette', 'tiny mailbox', 'teacup', 'button', 'sock', 'candle', 'mirror', 'key', 'paper bag', 'bottle cap', 'little clock', 'spoon', 'tiny door'],
  food: ['toast slice', 'lemon wedge', 'mushroom', 'jellybean', 'strawberry', 'pancake stack', 'dumpling', 'cupcake liner', 'blueberry', 'marshmallow', 'noodle cup', 'tiny pickle'],
  symbol: ['question mark', 'star sticker', 'map pin', 'X mark', 'arrow sign', 'tiny moon', 'warning triangle', 'sparkle', 'heart stamp', 'speech bubble', 'exclamation point'],
  ghost: ['sheet ghost', 'fluffy monster', 'dust bunny', 'mask blob', 'soft cryptid', 'pillow goblin', 'fog puff', 'blanket creature', 'tiny shadow', 'cloudy gremlin'],
  stationery: ['pencil stub', 'eraser', 'notebook page', 'sticky note', 'paint brush', 'crayon', 'ink bottle', 'paperclip', 'ruler', 'tape roll', 'marker cap'],
  weather: ['rain cloud', 'tiny storm', 'moon puddle', 'sun drop', 'fog bean', 'snow puff', 'wind swirl', 'raindrop', 'misty star', 'thunder button'],
  plant: ['sprout', 'cactus nub', 'leaf pile', 'flower bud', 'acorn', 'moss blob', 'tiny fern', 'seed packet', 'mushroom cap', 'berry twig'],
  charm: ['lucky charm', 'tiny bell', 'ribbon charm', 'locket', 'glass bead', 'mini crown', 'toy mask', 'pocket talisman', 'button badge', 'little relic']
};

const oddBiasMascots = ['paint palette', 'paper bag', 'question mark', 'mask blob', 'ink bottle', 'warning triangle', 'X mark', 'sticky note', 'tiny shadow', 'map pin', 'paint brush', 'arrow sign'];

const extras = ['heart', 'star', 'key', 'note', 'tiny sign', 'moon', 'spoon', 'flower', 'button', 'ribbon', 'spark', 'mini crown', 'glow dot', 'sealed envelope', 'paint drop', 'crumb', 'question mark patch', 'sticker scar'];

const moodData = {
  bashful: { label: 'bashful', face: 'low eyes, tiny mouth, cheeks doing most of the talking', pose: 'tilted inward, like it is trying to occupy less space' },
  dramatic: { label: 'dramatic', face: 'arched brows, open mouth, one detail treated like a catastrophe', pose: 'leaning back or presenting the prop like evidence' },
  sleepy: { label: 'sleepy', face: 'half-lidded eyes, relaxed mouth, soft sagging posture', pose: 'slouched with one part drooping' },
  suspicious: { label: 'suspicious', face: 'one narrowed eye, one dot eye, mouth held hostage by doubt', pose: 'leaning toward the odd thing, inspecting it' },
  proud: { label: 'proud but tiny', face: 'small smile, lifted brow, face sitting a bit high', pose: 'chest forward, prop displayed like a trophy' },
  confused: { label: 'deeply confused', face: 'uneven eyes, question energy, mouth slightly open', pose: 'body tilted away from the thing it is holding' },
  grumpy: { label: 'grumpy-soft', face: 'heavy brows, tiny frown, round cheeks betraying the grumpiness', pose: 'arms close to body, prop held too tightly' },
  hopeful: { label: 'hopeful', face: 'wide eyes, tiny smile, one sparkle or soft cheek mark', pose: 'reaching forward just a little' },
  blank: { label: 'blank-faced', face: 'simple dots or one dot plus one X, expression painfully unreadable', pose: 'standing still while something absurd happens nearby' },
  secret: { label: 'secretly powerful', face: 'small calm smile, one strange eye symbol, quiet confidence', pose: 'still body, odd thing floating or glowing nearby' }
};

const sparkData = {
  livingDetail: {
    label: 'living detail',
    templates: [
      'one detail on it has a tiny face and is reacting more than the mascot is',
      'its {extra} is awake, opinionated, and clearly judging the mascot',
      'one small mark on its body looks like it is trying to crawl away'
    ]
  },
  tinyJob: {
    label: 'tiny job',
    templates: [
      'it has appointed itself the official guardian of a single {extra}',
      'it is working as a tiny inspector for something nobody asked to be inspected',
      'it takes a very small job painfully seriously'
    ]
  },
  secretSymbol: {
    label: 'secret symbol',
    templates: [
      'it has a mysterious {extra} symbol on it and refuses to explain why',
      'its little sign says “you are here,” but points to the wrong part of itself',
      'one symbol on its body seems more confident than the mascot'
    ]
  },
  wrongScale: {
    label: 'wrong scale',
    templates: [
      'its {extra} is way too big, but it insists this is normal',
      'it carries a tiny object like it weighs as much as a planet',
      'one accessory is hilariously oversized and stealing the composition'
    ]
  },
  microProblem: {
    label: 'mini problem',
    templates: [
      'it is having one small inconvenience and making it everyone’s concern',
      'its {extra} keeps slipping, wobbling, or leaning the wrong way',
      'it is trying very hard to look fine while obviously not being fine'
    ]
  },
  costumeLogic: {
    label: 'costume logic',
    templates: [
      'it is dressed like a tiny official, but only one costume piece fits',
      'it wears a costume that makes sense only to itself',
      'one accessory is pretending to be a costume and doing a bad job'
    ]
  },
  quietMagic: {
    label: 'almost magic',
    templates: [
      'a tiny bit of magic is happening, but only around the {extra}',
      'something small floats near it like a shy spell',
      'its symbol glows softly, but the mascot looks unsure about being magical'
    ]
  },
  attachedOddity: {
    label: 'attached oddity',
    templates: [
      'one attached part is acting like a separate creature',
      'its handle, ribbon, tag, or corner has more personality than expected',
      'the {extra} is attached to it but seems emotionally independent'
    ]
  },
  tinyCompanion: {
    label: 'tiny companion',
    templates: [
      'a tiny {extra} companion follows it and copies its expression',
      'it has a small sidekick that thinks it is in charge',
      'a tiny buddy hides behind it but keeps peeking out'
    ]
  },
  fakeImportance: {
    label: 'fake importance',
    templates: [
      'it is guarding something completely ordinary as if it is sacred',
      'it has a label that makes the situation sound more official than it is',
      'it is presenting the {extra} like a rare museum artifact'
    ]
  }
};

const shapeRecipes = {
  '3': ['one big body shape', 'one face zone', 'one prop or symbol'],
  '5': ['big body shape', 'face zone', 'two simple limbs or corners', 'one prop', 'one symbol mark'],
  '7': ['big body silhouette', 'face zone', 'two limbs', 'prop shape', 'tiny extra', 'one symbol', 'one grounding shadow'],
  loose: ['big silhouette first', 'face second', 'one focal odd thing third', 'scribbles last, if at all']
};

const coachLines = [
  'Big shape first. Details are dessert, not breakfast.',
  'Give it one weird thing. Twelve weird things becomes paperwork.',
  'If the silhouette reads, the creature has bones. Tiny weird bones.',
  'Lower the face for cute. Tilt the body for attitude.',
  'One prop can carry the whole joke. Let it do its little job.',
  'Scribbles are seasoning. Do not pour the whole cabinet in.',
  'The drawing does not need to be perfect. It needs a readable little problem.',
  'Make the biggest shape boring on purpose, then let the tiny detail be rude.'
];

const redrawSpins = [
  { title: 'Sticker simple', text: 'Redraw it with one clean outline, no texture, and only the most important prop.' },
  { title: 'More suspicious', text: 'Change only the eyes and eyebrow angle so the mascot distrusts its own accessory.' },
  { title: 'Tiny official', text: 'Give it one fake job marker: badge, sign, clipboard, crown, or ribbon. Keep the body unchanged.' },
  { title: 'Prop betrayal', text: 'Make the prop look more alive than the mascot. Add eyes to the prop or tilt it dramatically.' },
  { title: 'Lower face', text: 'Redraw with the face lower on the body. Watch it become softer, smaller, and more adoptable.' },
  { title: 'One less detail', text: 'Remove one detail you like. If the idea still works, the design got stronger.' },
  { title: 'Bigger weird thing', text: 'Make the tiny spark 40% bigger and simplify everything else around it.' },
  { title: 'Awkward pose', text: 'Tilt the mascot slightly, like it just noticed the viewer watching.' }
];


const commentaryOpeners = [
  'It looks like it was discovered in a drawer and immediately given responsibility.',
  'This creature has the confidence of a sticker that was never asked to explain itself.',
  'It is doing its best, which is concerning but visually useful.',
  'There is exactly one thought behind those eyes, and it is holding a tiny sign.',
  'This one feels like a notebook margin accidentally gained citizenship.',
  'It has small-object drama, which is the easiest kind to draw and the funniest kind to witness.',
  'The vibe is: found artifact, mild panic, surprisingly drawable.',
  'It does not need a full scene. It already brought enough emotional furniture.'
];

const tinyVersionTemplates = [
  'Draw only the {body}, one simple face, and the {extra}. Keep it almost sticker-flat.',
  'Use three marks: {body}, face, {extra}. Stop before the creature starts filing taxes.',
  'Make the mascot one readable silhouette with the {extra} beside it or tucked onto it.',
  'Draw the simplest version first: big shape, tiny expression, one visible {extra}.',
  'Turn it into a tiny icon: no background, no extra limbs unless they help the joke.'
];

const oddletVersionTemplates = [
  'Now let the {extra} cause a tiny problem: it reacts, judges, hides, glows, or acts more important than the mascot.',
  'Add one odd behavior: the {extra} is too confident, the mascot is unsure, or the symbol seems to know something.',
  'Give it one tiny relationship: the mascot protects the {extra}, distrusts it, presents it, or pretends it is normal.',
  'Make the same simple drawing stranger by changing the acting, not the amount of detail.',
  'Promote the {extra} into the joke. It should feel like the second thing you notice and the first thing you remember.'
];

const moodRemixes = {
  cuter: {
    label: 'Cuter',
    ideaLine: 'Soften the shapes, lower the face, and make the odd detail look like it wants to be adopted.',
    oddLine: 'The tiny spark becomes sweeter, rounder, and less threatening, but still a little suspicious.',
    guardrail: 'Make the body rounder before adding anything else. Cute comes from simple proportions, not extra decoration.'
  },
  weirder: {
    label: 'Weirder',
    ideaLine: 'Add one wrong little behavior, symbol, or expression that makes the mascot feel slightly found-in-a-drawer.',
    oddLine: 'One detail becomes oddly awake, too confident, or emotionally incorrect.',
    guardrail: 'Only one weird thing gets promoted. The rest of the drawing stays clean so the weird thing can sparkle loudly.'
  },
  simpler: {
    label: 'Simpler',
    ideaLine: 'Strip the idea down to the mascot, one face, and one tiny spark. No decorative confetti allowed.',
    oddLine: 'The twist becomes a single readable mark, prop, or tiny behavior.',
    guardrail: 'Draw it with three main shapes first. If the creature works there, details are optional little guests.'
  },
  dramatic: {
    label: 'More dramatic',
    ideaLine: 'Make the mascot treat its tiny spark like a grand personal crisis.',
    oddLine: 'The tiny spark becomes emotionally oversized even if it is physically small.',
    guardrail: 'Use pose and eyebrows for drama before adding props. Acting beats clutter.'
  },
  moreMe: {
    label: 'More me',
    ideaLine: 'Push it toward notebook-gremlin energy: uneven eyes, a sign, a symbol patch, or a slightly haunted object mood.',
    oddLine: 'The twist gains a personal scribble-symbol flavor: X eye, question mark, arrow, sign, label, or strange patch.',
    guardrail: 'Let the imperfection look intentional. One rough symbol can carry the whole personality.'
  },
  moreCreative: {
    label: 'More creative',
    ideaLine: 'Give the mascot an unexpected purpose, secret use, or clever visual contradiction without making the drawing bigger.',
    oddLine: 'The spark becomes a fresh idea-hook: the object is used wrong, the symbol means something else, or the prop quietly changes the character logic.',
    guardrail: 'Creative does not mean complicated. Change the meaning of one thing instead of adding five new things.'
  },
  newTwist: {
    label: 'New tiny twist',
    ideaLine: 'Keep the mascot, but swap the tiny spark so the same drawing suddenly has a different little problem.',
    oddLine: 'A new micro-twist takes over while the main mascot stays the same.',
    guardrail: 'Keep the body and pose. Only the tiny spark changes, like a sticker placed on a different emotional nerve.'
  }
};

let currentCard = null;
let biasOn = true;
let deferredPrompt = null;

function choice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickValue(selectValue, dataList) {
  if (selectValue && selectValue !== 'surprise') return selectValue;
  const real = dataList.filter((item) => item.value !== 'surprise');
  return choice(real).value;
}

function fillSelect(id, list) {
  const select = $(id);
  select.innerHTML = list.map((item) => `<option value="${item.value}">${item.label}</option>`).join('');
}

function titleCase(text) {
  return text.split(' ').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ');
}

function makeName(mood, mascot, spark) {
  const noun = titleCase(mascot);
  const prefixes = {
    livingDetail: ['Possessed', 'Opinionated', 'Awake'],
    tinyJob: ['Official', 'Certified', 'Tiny'],
    secretSymbol: ['Marked', 'Mysterious', 'Map-Lost'],
    wrongScale: ['Overpacked', 'Too-Tiny', 'Oversized'],
    microProblem: ['Wobbly', 'Barely Fine', 'Tiny Crisis'],
    costumeLogic: ['Disguised', 'Costumed', 'Pretending'],
    quietMagic: ['Softly Magical', 'Glowing', 'Almost Enchanted'],
    attachedOddity: ['Attached', 'Tagalong', 'Side-Glitched'],
    tinyCompanion: ['Followed', 'Companion', 'Little-Buddy'],
    fakeImportance: ['Museum-Grade', 'Important', 'Very Official']
  };
  return `${choice(prefixes[spark] || ['Odd'])} ${noun}`;
}

function rollCard({ fullSurprise = false, mutate = null } = {}) {
  if (fullSurprise) {
    $('#laneSelect').value = 'surprise';
    $('#moodSelect').value = 'surprise';
    $('#sparkSelect').value = 'surprise';
    $('#shapeSelect').value = choice(shapes).value;
  }

  let lane = pickValue($('#laneSelect').value, lanes);
  let mascotPool = mascotDeck[lane] || Object.values(mascotDeck).flat();
  if (biasOn && Math.random() < 0.42) mascotPool = [...mascotPool, ...oddBiasMascots];

  const moodKey = pickValue($('#moodSelect').value, moods);
  const sparkKey = pickValue($('#sparkSelect').value, sparks);
  const shapeLimit = $('#shapeSelect').value || '5';
  const mascot = choice(mascotPool);
  const mood = moodData[moodKey];
  const extra = choice(extras);
  const spark = sparkData[sparkKey];
  const template = choice(spark.templates);
  const oddThing = template.replaceAll('{extra}', extra);

  const title = makeName(moodKey, mascot, sparkKey);
  const build = [...(shapeRecipes[shapeLimit] || shapeRecipes['5'])];

  if (mutate === 'simpler') {
    build.splice(0, build.length, 'one simple body shape', 'two eyes or one symbol face', 'one tiny extra');
  }
  if (mutate === 'weirder') {
    build.push('one odd mark that looks intentional, even if it is not');
  }

  currentCard = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    lane,
    mascot,
    mood: mood.label,
    spark: spark.label,
    shapeLimit,
    extra,
    title,
    idea: `Draw a ${mood.label} ${mascot} mascot. ${capitalize(oddThing)}.`,
    oddThing: capitalize(oddThing),
    build,
    poseCue: `${mood.pose}. Expression cue: ${mood.face}.`,
    guardrail: guardrailFor(lane, sparkKey, mutate),
    coach: choice(coachLines),
    tinyVersion: makeTinyVersion({ lane, mascot, extra, mood: mood.label }),
    oddletVersion: makeOddletVersion({ lane, mascot, extra, mood: mood.label, spark: spark.label }),
    commentary: makeCommentary({ mascot, extra, spark: spark.label, mood: mood.label }),
    status: 'rolled',
    notes: ''
  };

  animateRoll();
  renderCard();
  renderBlueprint(currentCard);
  showToast('Oddlet rolled. It is small, strange, and employable.');
}


function bodyWordFor(lane, mascot) {
  const words = {
    object: 'object body',
    food: 'snack body',
    symbol: 'symbol shape',
    ghost: 'soft ghost/blob shape',
    stationery: 'desk-object shape',
    weather: 'puffy weather shape',
    plant: 'plant blob',
    charm: 'charm body'
  };
  return words[lane] || `${mascot} shape`;
}

function makeTinyVersion({ lane, mascot, extra }) {
  const body = bodyWordFor(lane, mascot);
  return choice(tinyVersionTemplates).replaceAll('{body}', body).replaceAll('{extra}', extra);
}

function makeOddletVersion({ extra }) {
  return choice(oddletVersionTemplates).replaceAll('{extra}', extra);
}

function makeCommentary({ mascot, extra, spark, mood }) {
  const closer = [
    `Keep the ${mascot} readable first; let the ${extra} be the tiny little narrator.`,
    `The ${spark} part should feel like a side-eye, not a second assignment.`,
    `Because it is ${mood}, the face and pose can do more work than extra details.`,
    `Draw it like a sticker that escaped before quality control could ask questions.`,
    `The whole charm is one simple body plus one suspicious little decision.`
  ];
  return `${choice(commentaryOpeners)} ${choice(closer)}`;
}

function refreshTinyOddlet(card) {
  card.tinyVersion = makeTinyVersion(card);
  card.oddletVersion = makeOddletVersion(card);
  card.commentary = makeCommentary(card);
  return card;
}

function guardrailFor(lane, spark, mutate) {
  if (mutate === 'simpler') return 'Use fewer parts than you want. If it works as a blob with eyes, you are allowed one extra detail.';
  if (mutate === 'weirder') return 'Make only one thing weird. Bigger weirdness beats more weirdness.';
  const byLane = {
    object: 'Keep the object readable before adding the face. Body first, personality second, chaos third.',
    food: 'Do not decorate until the food silhouette reads. One topping can be the joke.',
    symbol: 'The symbol must stay readable. Make the face support it, not swallow it.',
    ghost: 'Start with one clean ghost/blob silhouette. Ragged edges come after the shape works.',
    stationery: 'Let the tool shape do most of the work. The face should not hide what the object is.',
    weather: 'Use soft shapes and one clear motion cue. Avoid too many floating bits.',
    plant: 'Big plant shape first. Leaves and sprouts should be grouped, not scattered everywhere.',
    charm: 'Keep it icon-like: one charm body, one face, one tiny symbolic oddity.'
  };
  const bySpark = {
    tinyCompanion: 'The companion should be much smaller than the mascot so the main silhouette stays in charge.',
    wrongScale: 'If one thing is oversized, simplify the rest. Let the scale joke breathe.',
    secretSymbol: 'Make the symbol clear and simple. One mark can feel mysterious without being complicated.'
  };
  return bySpark[spark] || byLane[lane] || 'Main shape first. Face second. Odd little thing third.';
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function animateRoll() {
  const slot = $('.slot-window');
  slot.classList.remove('rolling');
  void slot.offsetWidth;
  slot.classList.add('rolling');
  $('#slotOne').textContent = currentCard.mascot;
  $('#slotTwo').textContent = currentCard.spark;
  $('#slotThree').textContent = currentCard.extra;
  $('#coachLine').textContent = currentCard.coach;
}

function renderCard() {
  if (!currentCard) return;
  $('#cardTitle').textContent = 'Current Oddlet';
  $('#ideaTitle').textContent = currentCard.title;
  $('#ideaText').textContent = currentCard.idea;
  $('#oddThing').textContent = currentCard.oddThing;
  $('#tinyVersion').textContent = currentCard.tinyVersion || makeTinyVersion(currentCard);
  $('#oddletVersion').textContent = currentCard.oddletVersion || makeOddletVersion(currentCard);
  $('#creatureCommentary').textContent = currentCard.commentary || makeCommentary(currentCard);
  $('#poseCue').textContent = currentCard.poseCue;
  $('#guardrail').textContent = currentCard.guardrail;
  $('#difficultyPill').textContent = currentCard.shapeLimit === 'loose' ? 'loose simple' : `${currentCard.shapeLimit} shapes`;
  $('#buildList').innerHTML = currentCard.build.map((item) => `<li>${item}</li>`).join('');
}

function renderBlueprint(card) {
  const svg = $('#blueprintSvg');
  const color = getComputedStyle(document.documentElement);
  const mint = color.getPropertyValue('--mint').trim() || '#78e0c2';
  const primary = color.getPropertyValue('--primary').trim() || '#ff7f73';
  const pink = color.getPropertyValue('--pink').trim() || '#ff8fbd';
  const blue = color.getPropertyValue('--blue').trim() || '#91b7ff';
  const bodyShape = bodyShapeFor(card?.lane);
  const symbol = symbolFor(card?.extra);

  svg.innerHTML = `
    <defs>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000" flood-opacity="0.22" />
      </filter>
      <linearGradient id="bodyGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="${mint}" stop-opacity="0.95" />
        <stop offset="1" stop-color="${primary}" stop-opacity="0.82" />
      </linearGradient>
    </defs>
    <g opacity="0.36" stroke="currentColor" fill="none" stroke-width="2" stroke-dasharray="8 10">
      <path d="M58 120 H264" />
      <path d="M160 34 V214" />
      <circle cx="160" cy="120" r="78" />
    </g>
    <g filter="url(#softShadow)">
      ${bodyShape}
      <circle cx="132" cy="110" r="16" fill="#111426" />
      <path d="M128 110 l4 -8 l4 8 l-4 8z" fill="${blue}" />
      <path d="M184 100 l24 24 M208 100 l-24 24" stroke="#111426" stroke-width="10" stroke-linecap="round" />
      <path d="M148 148 q12 12 26 0" fill="none" stroke="#111426" stroke-width="7" stroke-linecap="round" />
      <g transform="translate(206 146)">${symbol}</g>
      <path d="M94 156 q-25 25 -2 44" fill="none" stroke="${pink}" stroke-width="12" stroke-linecap="round" opacity="0.9" />
      <path d="M224 156 q25 25 2 44" fill="none" stroke="${pink}" stroke-width="12" stroke-linecap="round" opacity="0.9" />
    </g>
  `;
}

function bodyShapeFor(lane) {
  const fill = 'url(#bodyGrad)';
  const stroke = 'rgba(255,255,255,.62)';
  const shapesByLane = {
    object: `<path d="M92 64 q72 -28 139 2 q16 8 14 30 q-5 63 -18 95 q-10 25 -38 22 l-83 -10 q-24 -3 -24 -28 l2 -82 q1 -21 8 -29z" fill="${fill}" stroke="${stroke}" stroke-width="4" />`,
    food: `<path d="M94 78 q66 -38 130 0 q22 13 10 39 q-5 12 -2 39 q4 35 -30 42 q-40 8 -84 -1 q-35 -7 -30 -42 q3 -27 -4 -41 q-12 -24 10 -36z" fill="${fill}" stroke="${stroke}" stroke-width="4" />`,
    symbol: `<path d="M158 55 q35 20 54 58 q16 34 6 68 q-7 23 -31 23 h-50 q-25 0 -34 -23 q-13 -35 5 -72 q17 -35 50 -54z" fill="${fill}" stroke="${stroke}" stroke-width="4" />`,
    ghost: `<path d="M94 90 q9 -47 68 -48 q61 -1 70 48 q9 55 -4 112 q-14 -15 -28 0 q-15 -17 -31 1 q-15 -17 -31 0 q-14 -16 -31 -1 q-20 -55 -13 -112z" fill="${fill}" stroke="${stroke}" stroke-width="4" />`,
    stationery: `<rect x="98" y="58" width="128" height="142" rx="26" fill="${fill}" stroke="${stroke}" stroke-width="4" transform="rotate(-4 160 130)" />`,
    weather: `<path d="M96 137 q-22 -43 24 -55 q16 -45 60 -24 q38 -12 54 22 q41 4 33 43 q-8 38 -55 35 h-84 q-23 0 -32 -21z" fill="${fill}" stroke="${stroke}" stroke-width="4" />`,
    plant: `<path d="M162 48 q39 37 41 78 q54 10 33 51 q-20 39 -75 32 q-54 7 -75 -32 q-21 -41 33 -51 q3 -41 43 -78z" fill="${fill}" stroke="${stroke}" stroke-width="4" />`,
    charm: `<path d="M160 50 l75 75 l-75 86 l-75 -86z" fill="${fill}" stroke="${stroke}" stroke-width="4" />`
  };
  return shapesByLane[lane] || shapesByLane.object;
}

function symbolFor(extra = 'star') {
  const fill = getComputedStyle(document.documentElement).getPropertyValue('--primary-2').trim() || '#ffb36e';
  if (extra.includes('heart')) return `<path d="M0 10 q0 -16 14 -10 q14 -6 14 10 q0 14 -14 24 q-14 -10 -14 -24z" fill="${fill}" />`;
  if (extra.includes('key')) return `<circle cx="8" cy="8" r="7" fill="none" stroke="${fill}" stroke-width="5"/><path d="M15 15 L34 34 M27 27 h9 M24 31 h8" stroke="${fill}" stroke-width="5" stroke-linecap="round" />`;
  if (extra.includes('moon')) return `<path d="M22 0 q-17 14 -8 35 q-18 -6 -18 -21 q0 -18 26 -14z" fill="${fill}" />`;
  if (extra.includes('question')) return `<text x="0" y="32" fill="${fill}" font-size="42" font-weight="900">?</text>`;
  if (extra.includes('sign') || extra.includes('note') || extra.includes('envelope')) return `<rect x="-2" y="0" width="42" height="30" rx="6" fill="${fill}"/><path d="M2 5 l17 13 l17 -13" fill="none" stroke="#20151a" stroke-width="3"/>`;
  return `<path d="M16 0 l5 12 l13 3 l-10 8 l2 13 l-10 -7 l-11 7 l3 -13 l-10 -8 l13 -3z" fill="${fill}" />`;
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function saveCurrent() {
  if (!currentCard) {
    showToast('Roll an Oddlet first. Empty jars make no noise.');
    return;
  }
  const stash = getStash();
  stash.unshift({ ...currentCard, status: 'saved' });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stash.slice(0, 80)));
  renderStash();
  showToast('Saved to Sketch Stash.');
}

function getStash() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function renderStash() {
  const stash = getStash();
  const list = $('#stashList');
  if (!stash.length) {
    list.innerHTML = '<div class="empty">No saved Oddlets yet. Roll one tiny creature and trap it lovingly in the jar.</div>';
    return;
  }
  list.innerHTML = stash.map((item) => `
    <article class="stash-card" data-id="${item.id}">
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.idea)}</p>
      </div>
      <p><strong>Odd thing:</strong> ${escapeHtml(item.oddThing)}</p>
      <div class="stash-actions">
        <button class="ghost-btn" data-action="load">Load</button>
        <button class="ghost-btn" data-action="drawn">${item.status === 'drawn' ? 'Drawn ✓' : 'Mark drawn'}</button>
        <button class="ghost-btn" data-action="favorite">${item.favorite ? 'Favorite ★' : 'Favorite'}</button>
        <button class="ghost-btn danger" data-action="delete">Delete</button>
      </div>
    </article>
  `).join('');
}

function escapeHtml(text) {
  return String(text).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function handleStashClick(event) {
  const button = event.target.closest('button[data-action]');
  const card = event.target.closest('.stash-card');
  if (!button || !card) return;
  const id = card.dataset.id;
  let stash = getStash();
  const item = stash.find((entry) => entry.id === id);
  if (!item) return;

  const action = button.dataset.action;
  if (action === 'load') {
    currentCard = { ...item };
    renderCard();
    renderBlueprint(currentCard);
    switchTab('card');
    showToast('Loaded. The little creature has returned.');
  }
  if (action === 'drawn') {
    item.status = item.status === 'drawn' ? 'saved' : 'drawn';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stash));
    renderStash();
  }
  if (action === 'favorite') {
    item.favorite = !item.favorite;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stash));
    renderStash();
  }
  if (action === 'delete') {
    stash = stash.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stash));
    renderStash();
    showToast('Released back into the weird.');
  }
}

async function copyCard() {
  if (!currentCard) return showToast('Roll first, copy later. The order matters to the jar.');
  const text = formatCard(currentCard);
  await navigator.clipboard.writeText(text);
  showToast('Copied draw card.');
}

function formatCard(card) {
  return `${card.title}\n\n${card.idea}\n\nTiny version: ${card.tinyVersion || makeTinyVersion(card)}\n\nOddlet version: ${card.oddletVersion || makeOddletVersion(card)}\n\nCreature commentary: ${card.commentary || makeCommentary(card)}\n\nOdd little thing: ${card.oddThing}\n\nBuild it from:\n- ${card.build.join('\n- ')}\n\nPose + expression: ${card.poseCue}\n\nBeginner guardrail: ${card.guardrail}\n\nRedraw spin: ${choice(redrawSpins).text}`;
}

function exportStash() {
  const blob = new Blob([JSON.stringify(getStash(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `oddlet-stash-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function clearStash() {
  if (!confirm('Clear the whole Sketch Stash on this device?')) return;
  localStorage.removeItem(STORAGE_KEY);
  renderStash();
  showToast('Stash cleared. A fresh drawer appears.');
}

function renderSpins() {
  $('#spinGrid').innerHTML = redrawSpins.map((spin, index) => `
    <button class="spin-card" type="button" data-index="${index}">
      <strong>${spin.title}</strong>
      <span>${spin.text}</span>
    </button>
  `).join('');
}

function handleSpin(event) {
  const button = event.target.closest('button[data-index]');
  if (!button) return;
  const spin = redrawSpins[Number(button.dataset.index)];
  $('#spinTitle').textContent = spin.title;
  $('#spinText').textContent = currentCard ? `${spin.text} Use it on: ${currentCard.title}.` : spin.text;
  showToast('Redraw spin loaded. Same creature, new tiny headache.');
}

function handleMoodRemix(event) {
  const button = event.target.closest('button[data-remix]');
  if (!button) return;
  remixCurrent(button.dataset.remix);
}

function remixCurrent(mode) {
  if (!currentCard) {
    rollCard({ fullSurprise: true });
    return;
  }

  const remix = moodRemixes[mode];
  if (!remix) return;

  let nextExtra = currentCard.extra;
  let nextOdd = remix.oddLine;
  let nextBuild = [...currentCard.build];

  if (mode === 'newTwist') {
    nextExtra = choice(extras);
    const sparkKey = pickValue('surprise', sparks);
    const spark = sparkData[sparkKey];
    nextOdd = capitalize(choice(spark.templates).replaceAll('{extra}', nextExtra));
  }

  if (mode === 'simpler') {
    nextBuild = ['one big mascot body', 'one simple face', 'one tiny spark'];
  } else if (mode === 'moreCreative') {
    nextBuild = [...new Set([...nextBuild.slice(0, 4), 'one unexpected purpose or visual contradiction'])];
  } else if (mode === 'moreMe') {
    nextBuild = [...new Set([...nextBuild.slice(0, 5), 'one personal symbol: X eye, question mark, arrow, label, or sign'])];
  } else if (mode === 'dramatic') {
    nextBuild = [...new Set([...nextBuild.slice(0, 5), 'one exaggerated pose cue'])];
  }

  currentCard = refreshTinyOddlet({
    ...currentCard,
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    extra: nextExtra,
    title: `${currentCard.title} · ${remix.label}`,
    idea: `Draw a ${currentCard.mood} ${currentCard.mascot} mascot. ${remix.ideaLine}`,
    oddThing: nextOdd,
    build: nextBuild,
    guardrail: remix.guardrail,
    coach: choice(coachLines),
    status: 'remixed'
  });

  renderCard();
  renderBlueprint(currentCard);
  animateRoll();
  showToast(`${remix.label} remix applied.`);
}

function switchTab(tabId) {
  $$('.tab').forEach((button) => button.classList.toggle('active', button.dataset.tab === tabId));
  $$('.view').forEach((view) => view.classList.toggle('active', view.id === tabId));
}

function saveSettings() {
  const settings = { apiKey: $('#apiKey').value.trim(), modelName: $('#modelName').value.trim(), theme: document.body.classList.contains('light') ? 'light' : 'dark' };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  showToast('Settings saved on this device.');
}

function loadSettings() {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    if (settings.apiKey) $('#apiKey').value = settings.apiKey;
    if (settings.modelName) $('#modelName').value = settings.modelName;
    if (settings.theme === 'light') document.body.classList.add('light');
  } catch {}
  updateThemeButton();
}

function updateThemeButton() {
  $('#themeBtn').textContent = document.body.classList.contains('light') ? 'Night desk' : 'Peach desk';
}

async function runAI() {
  if (!currentCard) return showToast('Roll a card first so the AI has a creature to bother.');
  const apiKey = $('#apiKey').value.trim();
  const model = $('#modelName').value.trim();
  if (!apiKey) return showToast('Add your OpenRouter key first.');
  if (!model) return showToast('Add the model you want to use. I left it empty on purpose.');

  $('#aiOutput').textContent = 'Asking the tiny oracle...';
  const prompt = `${$('#aiPrompt').value.trim()}\n\nCurrent card:\n${formatCard(currentCard)}`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': location.origin,
        'X-Title': 'Oddlet PWA'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You generate short, beginner-friendly mascot drawing prompts. Keep ideas simple, funny, weird, and drawable. Avoid complex scenes and avoid advanced rendering.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'OpenRouter request failed');
    $('#aiOutput').textContent = data?.choices?.[0]?.message?.content || 'No text returned.';
  } catch (error) {
    $('#aiOutput').textContent = `Error: ${error.message}`;
  }
}

function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    $('#installBtn').hidden = false;
  });
  $('#installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    $('#installBtn').hidden = true;
  });
}

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
  }
}

function initEvents() {
  $$('.tab').forEach((button) => button.addEventListener('click', () => switchTab(button.dataset.tab)));
  $('#rollBtn').addEventListener('click', () => rollCard());
  $('#surpriseBtn').addEventListener('click', () => rollCard({ fullSurprise: true }));
  $('#remixBar').addEventListener('click', handleMoodRemix);
  $('#saveBtn').addEventListener('click', saveCurrent);
  $('#copyBtn').addEventListener('click', copyCard);
  $('#exportBtn').addEventListener('click', exportStash);
  $('#clearBtn').addEventListener('click', clearStash);
  $('#stashList').addEventListener('click', handleStashClick);
  $('#spinGrid').addEventListener('click', handleSpin);
  $('#aiBtn').addEventListener('click', runAI);
  $('#saveSettingsBtn').addEventListener('click', saveSettings);
  $('#biasSwitch').addEventListener('click', () => {
    biasOn = !biasOn;
    $('#biasSwitch').classList.toggle('on', biasOn);
    $('#biasSwitch').setAttribute('aria-pressed', String(biasOn));
    showToast(biasOn ? 'Notebook oddball bias on.' : 'Notebook oddball bias off. The drawer behaves, slightly.');
  });
  $('#themeBtn').addEventListener('click', () => {
    document.body.classList.toggle('light');
    updateThemeButton();
    saveSettings();
  });
}

function init() {
  fillSelect('#laneSelect', lanes);
  fillSelect('#moodSelect', moods);
  fillSelect('#sparkSelect', sparks);
  fillSelect('#shapeSelect', shapes);
  loadSettings();
  initEvents();
  initInstallPrompt();
  initServiceWorker();
  renderSpins();
  renderStash();
  rollCard({ fullSurprise: true });
}

init();
