const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE_KEY = 'oddlet:v1:stash';
const SETTINGS_KEY = 'oddlet:v1:settings';
const FAVORITES_KEY = 'oddlet:v1:favorites';
const OPENROUTER_MODEL = 'openrouter/free';

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

const packs = [
  { value: 'surprise', label: 'Surprise pack' },
  { value: 'notebook', label: 'Notebook creatures' },
  { value: 'artDesk', label: 'Art desk oddlets' },
  { value: 'softCryptid', label: 'Soft cryptids' },
  { value: 'snack', label: 'Snack gremlins' },
  { value: 'symbolPet', label: 'Symbol pets' },
  { value: 'lostObject', label: 'Lost object club' }
];

const energies = [
  { value: 'low', label: 'Low energy' },
  { value: 'normal', label: 'Normal' },
  { value: 'playful', label: 'Feeling playful' },
  { value: 'wild', label: 'Unhinged but drawable' }
];

const energyRules = {
  low: { label: 'low energy', shape: '3', extraLine: 'Keep it almost embarrassingly simple.', build: ['one big body shape', 'one simple face', 'one tiny spark'] },
  normal: { label: 'normal', shape: null, extraLine: 'Let it be odd, but do not make it a scene.', build: [] },
  playful: { label: 'feeling playful', shape: null, extraLine: 'Add one playful acting cue or tiny contradiction.', build: ['one playful acting cue'] },
  wild: { label: 'unhinged but drawable', shape: null, extraLine: 'Give it one strange logic rule, but keep the body simple.', build: ['one strange-but-simple logic cue'] }
};

const defaultFavoriteSeeds = ['X eye', 'question mark', 'tiny sign', 'paint palette', 'ghost', 'brush', 'heart', 'star', 'living detail', 'wrong scale'];

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

const packDecks = {
  notebook: {
    mascots: ['sticky note', 'question mark', 'arrow sign', 'paper scrap', 'margin ghost', 'doodle blob', 'X mark', 'label sticker'],
    extras: ['question mark patch', 'tiny sign', 'arrow label', 'sticker scar', 'scribble star', 'folded note'],
    sparks: ['secretSymbol', 'livingDetail', 'fakeImportance', 'attachedOddity']
  },
  artDesk: {
    mascots: ['paint palette', 'paint brush', 'ink bottle', 'eraser', 'pencil stub', 'marker cap', 'tape roll', 'crayon'],
    extras: ['paint drop', 'tiny brush', 'glow dot', 'sticker scar', 'sealed envelope', 'crumb'],
    sparks: ['livingDetail', 'microProblem', 'wrongScale', 'attachedOddity']
  },
  softCryptid: {
    mascots: ['sheet ghost', 'mask blob', 'soft cryptid', 'tiny shadow', 'pillow goblin', 'fog puff', 'blanket creature'],
    extras: ['moon', 'spark', 'tiny sign', 'heart', 'question mark patch', 'mini crown'],
    sparks: ['quietMagic', 'microProblem', 'secretSymbol', 'tinyCompanion']
  },
  snack: {
    mascots: ['toast slice', 'lemon wedge', 'mushroom', 'jellybean', 'dumpling', 'marshmallow', 'tiny pickle', 'cupcake liner'],
    extras: ['crumb', 'spoon', 'button', 'ribbon', 'mini crown', 'flower'],
    sparks: ['wrongScale', 'tinyJob', 'microProblem', 'fakeImportance']
  },
  symbolPet: {
    mascots: ['star sticker', 'heart stamp', 'tiny moon', 'question mark', 'warning triangle', 'sparkle', 'map pin'],
    extras: ['heart', 'star', 'key', 'moon', 'question mark patch', 'spark'],
    sparks: ['tinyCompanion', 'secretSymbol', 'quietMagic', 'livingDetail']
  },
  lostObject: {
    mascots: ['paper bag', 'tiny mailbox', 'sock', 'button', 'key', 'mirror', 'bottle cap', 'little clock'],
    extras: ['tiny sign', 'sealed envelope', 'key', 'note', 'ribbon', 'button'],
    sparks: ['fakeImportance', 'tinyJob', 'microProblem', 'wrongScale']
  }
};

const oddBiasMascots = ['paint palette', 'paper bag', 'question mark', 'mask blob', 'ink bottle', 'warning triangle', 'X mark', 'sticky note', 'tiny shadow', 'map pin', 'paint brush', 'arrow sign'];

const extras = ['heart', 'star', 'key', 'note', 'tiny sign', 'moon', 'spoon', 'flower', 'button', 'ribbon', 'spark', 'mini crown', 'glow dot', 'sealed envelope', 'paint drop', 'crumb', 'question mark patch', 'sticker scar', 'arrow label', 'tiny brush', 'folded note', 'scribble star'];

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

const extraWeirdTemplates = [
  'The {extra} is now the boss, and the mascot is pretending that is normal. Keep it to one extra expression cue.',
  'Add one impossible-but-small rule: the {extra} floats, points the wrong way, has boots, or looks suspiciously official.',
  'Make the mascot misunderstand its own {extra}. Same simple shapes, stranger little logic.',
  'Give the {extra} a tiny job title, label, crown, or eyebrow. Do not add a background.',
  'Turn one mark into a clue: an arrow, X, question mark, sticker scar, or little label that changes the joke.'
];

const bingoGoals = [
  { id: 'xeye', label: 'Draw an X-eye', test: c => cardText(c).toLowerCase().includes('x') },
  { id: 'living', label: 'Draw a living prop', test: c => /living|awake|face|companion|sidekick|buddy/i.test(cardText(c)) },
  { id: 'ghost', label: 'Draw a ghost/blob', test: c => c.lane === 'ghost' || /ghost|blob|cryptid|shadow/i.test(cardText(c)) },
  { id: 'sign', label: 'Draw a sign/note', test: c => /sign|note|label|envelope|arrow/i.test(cardText(c)) },
  { id: 'object', label: 'Draw an object gremlin', test: c => c.lane === 'object' || /palette|bag|button|teacup|key|mirror/i.test(cardText(c)) },
  { id: 'food', label: 'Draw a snack creature', test: c => c.lane === 'food' || /toast|lemon|mushroom|jellybean|dumpling|marshmallow/i.test(cardText(c)) },
  { id: 'companion', label: 'Draw a tiny companion', test: c => /companion|sidekick|buddy|follows|peeking/i.test(cardText(c)) },
  { id: 'dramatic', label: 'Draw something dramatic', test: c => /dramatic|crisis|official|important|catastrophe/i.test(cardText(c)) },
  { id: 'question', label: 'Draw a question mark', test: c => cardText(c).includes('?') || /question mark/i.test(cardText(c)) }
];

const drawFirstByLane = {
  object: 'Start with the plain object silhouette before adding eyes. Let the object be boring for one brave minute.',
  food: 'Draw the snack shape first: one toast block, lemon wedge, dumpling blob, or mushroom cap. Toppings wait outside.',
  symbol: 'Draw the symbol large and readable first. The face should sneak in after the symbol survives.',
  ghost: 'Start with one soft blob or sheet shape. Wobbles are allowed, but the outside edge should read clearly.',
  stationery: 'Draw the desk-object shape first, like a tiny tool pretending to have a soul.',
  weather: 'Draw the puff, drop, swirl, or moon shape first. Keep floating bits for last.',
  plant: 'Start with one plant mass: sprout, cactus nub, leaf pile, or bud. Group leaves like they know each other.',
  charm: 'Draw one charm silhouette first, then hang the face and symbol inside it.'
};

const whyTemplates = [
  'It works because the {mascot} gives you the readable shape, while the {extra} gives you the little reason to care.',
  'The idea stays drawable because there is one main body and one tiny spark, not a whole parade of background chores.',
  'The {spark} makes the mascot feel alive without needing a full scene. It is character energy in miniature.',
  'The mood does most of the acting, so you can keep the drawing simple and still make it feel specific.',
  'This works as a sticker because the silhouette can stay clean while the tiny detail does the storytelling.'
];

const notFeelingFixes = {
  boring: {
    label: 'Less boring',
    oddLine: 'One detail now has a tiny opinion, secret job, or suspicious label so the drawing has a second read.',
    ideaLine: 'Keep the same mascot, but make one tiny part act like it knows something the mascot does not.',
    guardrail: 'Do not add more objects. Add one clearer attitude.'
  },
  complex: {
    label: 'Simplified',
    oddLine: 'The twist is reduced to one readable prop, mark, or expression change.',
    ideaLine: 'Use the easiest mascot version: big body, face, one tiny spark. Everything else gets politely evicted.',
    guardrail: 'Three shapes first. If it is cute there, stop or add only one detail.'
  },
  normal: {
    label: 'Less normal',
    oddLine: 'The mascot now has one wrong-scale, living, or oddly official detail that nudges it out of ordinary.',
    ideaLine: 'Make it slightly stranger by changing what one detail means, not by building a bigger scene.',
    guardrail: 'One unusual meaning beats five random decorations.'
  },
  cute: {
    label: 'Less sweet',
    oddLine: 'The cute part gets a dry little attitude: suspicious, blank-faced, too official, or mildly haunted.',
    ideaLine: 'Keep the softness, but give the expression one tiny contradiction.',
    guardrail: 'Do not erase the cute. Give it a weird eyebrow and let it suffer elegantly.'
  },
  hard: {
    label: 'Starter path',
    oddLine: 'The twist waits until the end. First draw the mascot as one large simple shape with a face.',
    ideaLine: 'Begin with the body only, then add the face, then add the spark as the final small note.',
    guardrail: 'First mark: largest shape. Second mark: face zone. Third mark: tiny spark.'
  }
};

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
let favoriteIngredients = [];

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

function rollCard({ fullSurprise = false, mutate = null, daily = false } = {}) {
  if (fullSurprise) {
    $('#laneSelect').value = 'surprise';
    $('#moodSelect').value = 'surprise';
    $('#sparkSelect').value = 'surprise';
    $('#shapeSelect').value = choice(shapes).value;
    $('#packSelect').value = 'surprise';
  }

  if (daily) chooseDailyControls();

  let lane = pickValue($('#laneSelect').value, lanes);
  let mascotPool = mascotDeck[lane] || Object.values(mascotDeck).flat();
  const energyKey = $('#energySelect')?.value || 'normal';
  const energy = energyRules[energyKey] || energyRules.normal;
  const packKey = $('#packSelect')?.value || 'surprise';
  const pack = packDecks[packKey];
  let extraPool = [...extras];
  let forcedSpark = null;

  if (pack) {
    mascotPool = [...mascotPool, ...pack.mascots];
    extraPool = [...extraPool, ...pack.extras];
    if ($('#sparkSelect').value === 'surprise') forcedSpark = choice(pack.sparks);
  }
  if (biasOn && Math.random() < 0.42) mascotPool = [...mascotPool, ...oddBiasMascots];
  const favoriteHints = favoriteIngredients.length ? favoriteIngredients : defaultFavoriteSeeds.filter(() => Math.random() < 0.16);
  const favoriteMascots = favoriteHints.filter((hint) => Object.values(mascotDeck).flat().some((m) => m.toLowerCase().includes(hint.toLowerCase())));
  const favoriteExtras = favoriteHints.filter((hint) => extras.some((x) => x.toLowerCase().includes(hint.toLowerCase())));
  if (favoriteMascots.length) mascotPool = [...mascotPool, ...favoriteMascots, ...favoriteMascots];
  if (favoriteExtras.length) extraPool = [...extraPool, ...favoriteExtras, ...favoriteExtras];

  const moodKey = pickValue($('#moodSelect').value, moods);
  const sparkKey = forcedSpark || pickValue($('#sparkSelect').value, sparks);
  let shapeLimit = $('#shapeSelect').value || '5';
  if (energy.shape) shapeLimit = energy.shape;
  const mascot = choice(mascotPool);
  const mood = moodData[moodKey];
  const extra = choice(extraPool);
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
  if (energy.build?.length) {
    build.push(...energy.build);
  }

  currentCard = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    lane,
    mascot,
    moodKey,
    mood: mood.label,
    sparkKey,
    spark: spark.label,
    shapeLimit,
    extra,
    title,
    idea: `Draw a ${mood.label} ${mascot} mascot. ${capitalize(oddThing)}. ${energy.extraLine}`,
    oddThing: capitalize(oddThing),
    build,
    poseCue: `${mood.pose}. Expression cue: ${mood.face}.`,
    guardrail: guardrailFor(lane, sparkKey, mutate),
    drawFirst: drawFirstFor(lane, mascot),
    whyWorks: whyWorksFor({ mascot, extra, spark: spark.label }),
    pack: packKey,
    energy: energyKey,
    coach: choice(coachLines),
    tinyVersion: makeTinyVersion({ lane, mascot, extra, mood: mood.label }),
    oddletVersion: makeOddletVersion({ lane, mascot, extra, mood: mood.label, spark: spark.label }),
    extraWeirdVersion: makeExtraWeirdVersion({ lane, mascot, extra, mood: mood.label, spark: spark.label }),
    commentary: makeCommentary({ mascot, extra, spark: spark.label, mood: mood.label, energy: energy.label }),
    blueprint: null,
    status: 'rolled',
    notes: ''
  };

  currentCard.blueprint = buildBlueprintIntelligence(currentCard);

  animateRoll();
  renderCard();
  renderBlueprint(currentCard);
  showToast(daily ? 'Daily Oddlet opened. No streak monster, just a tiny visitor.' : 'Oddlet rolled. It is small, strange, and employable.');
}


function hashNumber(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  return Math.abs(hash);
}

function seededPick(list, seedText) {
  return list[hashNumber(seedText) % list.length];
}

function chooseDailyControls() {
  const today = new Date().toISOString().slice(0, 10);
  $('#laneSelect').value = seededPick(lanes.filter(x => x.value !== 'surprise'), `${today}:lane`).value;
  $('#moodSelect').value = seededPick(moods.filter(x => x.value !== 'surprise'), `${today}:mood`).value;
  $('#sparkSelect').value = seededPick(sparks.filter(x => x.value !== 'surprise'), `${today}:spark`).value;
  $('#shapeSelect').value = seededPick(shapes, `${today}:shape`).value;
  $('#energySelect').value = seededPick(energies, `${today}:energy`).value;
  $('#packSelect').value = seededPick(packs, `${today}:pack`).value;
  $('#dailyHint').textContent = `Today’s drawer omen is ${$('#moodSelect').selectedOptions[0].textContent} + ${$('#packSelect').selectedOptions[0].textContent}.`;
}

function drawFirstFor(lane, mascot) {
  return drawFirstByLane[lane] || `Start with one simple ${mascot} shape. No face, no prop, no tiny nonsense until the silhouette reads.`;
}

function whyWorksFor({ mascot, extra, spark }) {
  return choice(whyTemplates)
    .replaceAll('{mascot}', mascot)
    .replaceAll('{extra}', extra)
    .replaceAll('{spark}', spark);
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

function makeExtraWeirdVersion({ extra }) {
  return choice(extraWeirdTemplates).replaceAll('{extra}', extra);
}

function makeCommentary({ mascot, extra, spark, mood, energy }) {
  const closer = [
    `Keep the ${mascot} readable first; let the ${extra} be the tiny little narrator.`,
    `The ${spark} part should feel like a side-eye, not a second assignment.`,
    `Because it is ${mood}, the face and pose can do more work than extra details.`,
    energy ? `The ${energy} setting says: let the card fit your hand today, not some imaginary art goblin.` : '',
    `Draw it like a sticker that escaped before quality control could ask questions.`,
    `The whole charm is one simple body plus one suspicious little decision.`
  ];
  return `${choice(commentaryOpeners)} ${choice(closer.filter(Boolean))}`;
}

function refreshTinyOddlet(card) {
  card.tinyVersion = makeTinyVersion(card);
  card.oddletVersion = makeOddletVersion(card);
  card.extraWeirdVersion = makeExtraWeirdVersion(card);
  card.commentary = makeCommentary(card);
  card.drawFirst = drawFirstFor(card.lane, card.mascot);
  card.whyWorks = whyWorksFor(card);
  card.blueprint = buildBlueprintIntelligence(card);
  return card;
}

function buildBlueprintIntelligence(card) {
  const lane = String(card?.lane || '').toLowerCase();
  const mascot = String(card?.mascot || '').toLowerCase();
  const sparkKey = String(card?.sparkKey || '').toLowerCase();
  const sparkLabel = String(card?.spark || '').toLowerCase();
  const mood = String(card?.mood || '').toLowerCase();
  const energy = String(card?.energy || '').toLowerCase();
  const shapeLimit = String(card?.shapeLimit || '5');

  const blueprint = {
    primarySilhouette: 'one main readable body shape',
    faceZone: 'lower third',
    propAnchor: 'one side edge, touching the body',
    expressionWeight: 'eyes first, mouth second',
    detailDanger: 'too many tiny details before the silhouette reads',
    easiestStartingShape: 'large oval or bean blob',
    weirdThingPlacement: 'near the face, hand, or chest area',
    doNotAdd: ['background', 'shoes', 'extra face', 'second prop']
  };

  const laneRules = {
    object: {
      primarySilhouette: 'readable object silhouette first',
      faceZone: 'middle-lower area',
      propAnchor: 'right or left outer edge',
      expressionWeight: 'eye shape plus one brow cue',
      detailDanger: 'stacking labels, corners, and props too early',
      easiestStartingShape: 'lumpy rectangle, rounded wedge, or bean object',
      weirdThingPlacement: 'on the front face or attached to one side',
      doNotAdd: ['background', 'shoes', 'third arm', 'second big prop']
    },
    food: {
      primarySilhouette: 'one bold edible shape',
      faceZone: 'lower third',
      propAnchor: 'front center or one side edge',
      expressionWeight: 'eyes and cheek spacing',
      detailDanger: 'too many crumbs, toppings, seeds, or texture marks',
      easiestStartingShape: 'toast block, wedge, dumpling blob, or rounded cap',
      weirdThingPlacement: 'tucked near the hand, chest, or bite edge',
      doNotAdd: ['plate', 'background kitchen', 'extra toppings', 'second prop']
    },
    symbol: {
      primarySilhouette: 'large readable symbol shape',
      faceZone: 'center-lower zone',
      propAnchor: 'one outer edge or lower side',
      expressionWeight: 'eye placement relative to the symbol',
      detailDanger: 'letting the face swallow the symbol',
      easiestStartingShape: 'one big question mark, star, moon, or sign',
      weirdThingPlacement: 'inside the symbol or attached right beside it',
      doNotAdd: ['extra symbols everywhere', 'background pattern', 'second face', 'complex limbs']
    },
    ghost: {
      primarySilhouette: 'one soft blob or sheet silhouette',
      faceZone: 'upper-middle for spooky, lower third for cute',
      propAnchor: 'tucked under one side or floating just beside it',
      expressionWeight: 'eye angle and body tilt',
      detailDanger: 'too many folds or ragged edges before the body reads',
      easiestStartingShape: 'large wobbly oval or sheet blob',
      weirdThingPlacement: 'close enough to feel protected by the body',
      doNotAdd: ['background fog', 'extra limbs', 'big costume', 'tiny texture lines']
    },
    stationery: {
      primarySilhouette: 'clean desk-object silhouette',
      faceZone: 'center or lower center',
      propAnchor: 'clip, corner, side edge, or tip end',
      expressionWeight: 'one eye shape plus a prop tilt',
      detailDanger: 'too many little desk bits around the mascot',
      easiestStartingShape: 'simple rectangle, stub, cylinder, or page shape',
      weirdThingPlacement: 'on the corner, cap, label, or near the hand',
      doNotAdd: ['whole desk scene', 'extra supplies', 'second prop', 'full text blocks']
    },
    weather: {
      primarySilhouette: 'puffy cloud, drop, swirl, or moon-like mass',
      faceZone: 'middle-lower area',
      propAnchor: 'just under or beside the main weather mass',
      expressionWeight: 'eyes plus a small tilt or droop',
      detailDanger: 'too many floating sparkles and weather bits',
      easiestStartingShape: 'single puff, drop, or swirl',
      weirdThingPlacement: 'hovering close to the main body',
      doNotAdd: ['full sky scene', 'extra clouds', 'lightning everywhere', 'second prop']
    },
    plant: {
      primarySilhouette: 'one grouped plant mass',
      faceZone: 'pot/body center or lower third',
      propAnchor: 'leaf edge, stem side, or pot front',
      expressionWeight: 'face simplicity plus leaf tilt',
      detailDanger: 'scattering leaves and sprouts everywhere',
      easiestStartingShape: 'bud, nub, leaf pile, or rounded pot blob',
      weirdThingPlacement: 'nestled in the leaves or attached to the stem area',
      doNotAdd: ['background garden', 'too many leaves', 'second plant', 'surface texture']
    },
    charm: {
      primarySilhouette: 'small icon-like charm body',
      faceZone: 'center-lower area',
      propAnchor: 'hanger loop, side edge, or center front',
      expressionWeight: 'eyes and one tiny symbol cue',
      detailDanger: 'too many decorative dangly extras',
      easiestStartingShape: 'simple charm blob, bead, badge, or relic shape',
      weirdThingPlacement: 'inside the body shape or hanging directly from it',
      doNotAdd: ['background chain', 'full outfit', 'second charm', 'extra face']
    }
  };

  Object.assign(blueprint, laneRules[lane] || {});

  if (mascot.includes('wedge') || mascot.includes('triangle')) {
    blueprint.primarySilhouette = 'rounded wedge';
    blueprint.easiestStartingShape = 'squashed triangle or rounded wedge';
  }
  if (mascot.includes('question mark') || mascot.includes('mark') || mascot.includes('exclamation')) {
    blueprint.primarySilhouette = 'big readable symbol stem + hook';
    blueprint.easiestStartingShape = 'one large symbol outline';
  }
  if (mascot.includes('palette')) {
    blueprint.primarySilhouette = 'big bean palette shape';
    blueprint.easiestStartingShape = 'bean blob with one thumb notch';
  }
  if (mascot.includes('paper bag') || mascot.includes('notebook page') || mascot.includes('sticky note')) {
    blueprint.easiestStartingShape = 'lumpy rectangle';
  }

  const sparkText = `${sparkKey} ${sparkLabel}`;
  if (sparkText.includes('livingdetail') || sparkText.includes('living detail')) {
    blueprint.propAnchor = 'on the body surface where you will notice it early';
    blueprint.weirdThingPlacement = 'on a spot, mark, patch, or detail attached to the mascot';
    blueprint.doNotAdd = ['second living detail', 'background action', 'extra prop', 'extra face'];
  }
  if (sparkText.includes('tinycompanion') || sparkText.includes('tiny companion')) {
    blueprint.propAnchor = 'beside the body or tucked under one arm';
    blueprint.weirdThingPlacement = 'touching or almost touching the mascot';
    blueprint.doNotAdd = ['multiple companions', 'background scene', 'second prop', 'tiny crowd'];
  }
  if (sparkText.includes('attachedoddity') || sparkText.includes('attached oddity')) {
    blueprint.propAnchor = 'upper edge, side corner, handle, ribbon, or tag point';
    blueprint.weirdThingPlacement = 'attached directly to the mascot body';
    blueprint.doNotAdd = ['detached second weird thing', 'extra companion', 'background', 'busy costume'];
  }
  if (sparkText.includes('wrongscale') || sparkText.includes('wrong scale')) {
    blueprint.propAnchor = 'one strong side anchor';
    blueprint.expressionWeight = 'body tilt plus one stressed eye shape';
    blueprint.weirdThingPlacement = 'close to the body so the size contrast is obvious';
    blueprint.detailDanger = 'an oversized prop plus too many other extras';
    blueprint.doNotAdd = ['second oversized prop', 'background', 'tiny clutter', 'full environment'];
  }
  if (sparkText.includes('secretsymbol') || sparkText.includes('secret symbol')) {
    blueprint.weirdThingPlacement = 'chest, face patch, label area, or sign front';
    blueprint.doNotAdd = ['many symbols', 'background clues', 'extra text', 'second prop'];
  }
  if (sparkText.includes('microproblem') || sparkText.includes('mini problem')) {
    blueprint.expressionWeight = 'eyes, mouth, and a slight body lean';
    blueprint.weirdThingPlacement = 'where it can visibly wobble, slip, or annoy the mascot';
    blueprint.doNotAdd = ['background accident', 'second problem', 'too many effects', 'crowd energy'];
  }
  if (sparkText.includes('tinyjob') || sparkText.includes('tiny job')) {
    blueprint.propAnchor = 'front center or one presenting hand';
    blueprint.weirdThingPlacement = 'where it reads like a job marker: sign, badge, prop, or tiny station';
    blueprint.doNotAdd = ['full workplace scene', 'extra tools', 'second costume cue', 'background signage'];
  }
  if (sparkText.includes('quietmagic') || sparkText.includes('almost magic')) {
    blueprint.propAnchor = 'hovering close to the body';
    blueprint.weirdThingPlacement = 'near the face or chest so the magic feels intimate';
    blueprint.doNotAdd = ['spell circle', 'giant glow effects', 'background stars', 'extra magic props'];
  }
  if (sparkText.includes('costumelogic') || sparkText.includes('costume logic')) {
    blueprint.propAnchor = 'top edge or body front';
    blueprint.weirdThingPlacement = 'hat, badge, cape edge, or one costume piece only';
    blueprint.doNotAdd = ['full outfit set', 'lots of accessories', 'background stage', 'second prop'];
  }
  if (sparkText.includes('fakeimportance') || sparkText.includes('fake importance')) {
    blueprint.propAnchor = 'front center like a presentation';
    blueprint.weirdThingPlacement = 'label, sign, crown, or presented object area';
    blueprint.doNotAdd = ['full museum scene', 'extra labels', 'background display', 'second trophy'];
  }

  if (mood.includes('bashful') || mood.includes('nervous') || mood.includes('hopeful')) {
    blueprint.faceZone = 'lower third';
    blueprint.expressionWeight = 'low eyes and a tiny mouth';
  }
  if (mood.includes('sleepy')) blueprint.expressionWeight = 'half-lidded eyes and droop';
  if (mood.includes('dramatic') || mood.includes('proud')) {
    blueprint.faceZone = 'middle to upper-middle';
    blueprint.expressionWeight = 'brows, mouth, and pose tilt';
  }
  if (mood.includes('blank')) blueprint.expressionWeight = 'one simple eye difference and stillness';
  if (mood.includes('confused') || mood.includes('suspicious')) blueprint.expressionWeight = 'uneven eyes plus one brow cue';
  if (mood.includes('secretly powerful')) blueprint.weirdThingPlacement = 'close to the chest or floating beside the face';

  if (shapeLimit === '3') {
    blueprint.detailDanger = 'trying to squeeze too much into a 3-shape drawing';
    blueprint.doNotAdd = ['background', 'second prop', 'extra limbs', 'tiny texture'];
  } else if (shapeLimit === '7') {
    blueprint.detailDanger = 'using all seven shapes on clutter instead of readability';
  }

  if (energy === 'low') {
    blueprint.detailDanger = 'too many parts for a low-energy sketch';
    blueprint.doNotAdd = ['background', 'texture', 'second prop', 'surface details'];
  }
  if (energy === 'wild') {
    blueprint.detailDanger = 'letting the joke overpower the silhouette';
    blueprint.doNotAdd = ['third weird thing', 'extra character', 'full environment', 'tiny clutter'];
  }

  return blueprint;
}

function renderBlueprintBreakdown(card) {
  const blueprint = card?.blueprint || buildBlueprintIntelligence(card);
  if (card) card.blueprint = blueprint;
  $('#bluePrimarySilhouette').textContent = blueprint.primarySilhouette;
  $('#blueFaceZone').textContent = blueprint.faceZone;
  $('#bluePropAnchor').textContent = blueprint.propAnchor;
  $('#blueExpressionWeight').textContent = blueprint.expressionWeight;
  $('#blueDetailDanger').textContent = blueprint.detailDanger;
  $('#blueStartShape').textContent = blueprint.easiestStartingShape;
  $('#blueWeirdPlacement').textContent = blueprint.weirdThingPlacement;
  $('#blueDoNotAdd').textContent = blueprint.doNotAdd.join(', ');
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
  $('#drawFirst').textContent = currentCard.drawFirst || drawFirstFor(currentCard.lane, currentCard.mascot);
  $('#whyWorks').textContent = currentCard.whyWorks || whyWorksFor(currentCard);
  $('#tinyVersion').textContent = currentCard.tinyVersion || makeTinyVersion(currentCard);
  $('#oddletVersion').textContent = currentCard.oddletVersion || makeOddletVersion(currentCard);
  $('#extraWeirdVersion').textContent = currentCard.extraWeirdVersion || makeExtraWeirdVersion(currentCard);
  $('#creatureCommentary').textContent = currentCard.commentary || makeCommentary(currentCard);
  $('#poseCue').textContent = currentCard.poseCue;
  $('#guardrail').textContent = currentCard.guardrail;
  $('#difficultyPill').textContent = currentCard.shapeLimit === 'loose' ? 'loose simple' : `${currentCard.shapeLimit} shapes`;
  $('#buildList').innerHTML = currentCard.build.map((item) => `<li>${item}</li>`).join('');
  $('#currentNote').value = currentCard.notes || '';
  renderBlueprintBreakdown(currentCard);
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
  currentCard.notes = $('#currentNote')?.value.trim() || currentCard.notes || '';
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
  const stats = $('#museumStats');
  if (stats) {
    const drawn = stash.filter((item) => item.status === 'drawn').length;
    const favorites = stash.filter((item) => item.favorite).length;
    const packsFound = new Set(stash.map((item) => item.pack).filter(Boolean)).size;
    const notes = stash.filter((item) => item.notes).length;
    stats.innerHTML = `<span><strong>${stash.length}</strong> found</span><span><strong>${drawn}</strong> drawn</span><span><strong>${favorites}</strong> favorites</span><span><strong>${packsFound}</strong> packs</span><span><strong>${notes}</strong> notes</span>`;
  }
  renderBingo(stash);
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
      ${item.notes ? `<p class="stash-note"><strong>Note:</strong> ${escapeHtml(item.notes)}</p>` : ''}
      <div class="stash-tags"><span>${escapeHtml(item.lane || 'odd')}</span><span>${escapeHtml(item.spark || 'spark')}</span><span>${escapeHtml(item.energy || 'normal')}</span><span>${escapeHtml(item.shapeLimit || 'simple')} shapes</span></div>
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
  currentCard.notes = $('#currentNote')?.value.trim() || currentCard.notes || '';
  const text = formatCard(currentCard);
  await navigator.clipboard.writeText(text);
  showToast('Copied draw card.');
}

function formatCard(card) {
  const blueprint = card.blueprint || buildBlueprintIntelligence(card);
  return `${card.title}\n\n${card.idea}\n\nTiny version: ${card.tinyVersion || makeTinyVersion(card)}\n\nOddlet version: ${card.oddletVersion || makeOddletVersion(card)}\n\nCreature commentary: ${card.commentary || makeCommentary(card)}\n\nOdd little thing: ${card.oddThing}\n\nBuild it from:\n- ${card.build.join('\n- ')}\n\nPose + expression: ${card.poseCue}\n\nBeginner guardrail: ${card.guardrail}\n\nBlueprint breakdown:\n- Primary silhouette: ${blueprint.primarySilhouette}\n- Face zone: ${blueprint.faceZone}\n- Prop anchor: ${blueprint.propAnchor}\n- Expression weight: ${blueprint.expressionWeight}\n- Detail danger: ${blueprint.detailDanger}\n- Easiest starting shape: ${blueprint.easiestStartingShape}\n- Weird thing placement: ${blueprint.weirdThingPlacement}\n- What not to add: ${blueprint.doNotAdd.join(', ')}\n\nRedraw spin: ${choice(redrawSpins).text}`;
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


function cardText(card) {
  return [card.title, card.idea, card.oddThing, card.extra, card.spark, card.mood, card.notes].filter(Boolean).join(' ');
}

function renderBingo(stash = getStash()) {
  const grid = $('#bingoGrid');
  if (!grid) return;
  grid.innerHTML = bingoGoals.map((goal) => {
    const complete = stash.some(goal.test);
    return `<div class="bingo-tile ${complete ? 'complete' : ''}"><span>${complete ? '✓' : '·'}</span>${escapeHtml(goal.label)}</div>`;
  }).join('');
}

function loadFavorites() {
  try { favoriteIngredients = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); } catch { favoriteIngredients = []; }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...new Set(favoriteIngredients)].slice(0, 30)));
}

function renderFavorites() {
  const wrap = $('#favoriteList');
  if (!wrap) return;
  const source = favoriteIngredients.length ? favoriteIngredients : defaultFavoriteSeeds;
  wrap.innerHTML = source.map((item) => `<button class="fav-chip ${favoriteIngredients.includes(item) ? 'active' : ''}" type="button" data-favorite="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join('');
}

function favoriteCurrentIngredients() {
  if (!currentCard) return showToast('Roll a creature first, then steal its ingredients.');
  const adds = [currentCard.mascot, currentCard.extra, currentCard.spark].filter(Boolean);
  favoriteIngredients = [...new Set([...favoriteIngredients, ...adds])].slice(0, 30);
  saveFavorites();
  renderFavorites();
  showToast('Ingredients favorited. Future rolls will lean toward this little flavor cupboard.');
}

function handleFavoriteClick(event) {
  const chip = event.target.closest('[data-favorite]');
  if (!chip) return;
  const value = chip.dataset.favorite;
  if (favoriteIngredients.includes(value)) {
    favoriteIngredients = favoriteIngredients.filter((item) => item !== value);
  } else {
    favoriteIngredients = [...new Set([...favoriteIngredients, value])].slice(0, 30);
  }
  saveFavorites();
  renderFavorites();
  showToast(favoriteIngredients.includes(value) ? 'Favorite bias added.' : 'Favorite bias removed.');
}

function handleQuickNote(event) {
  const chip = event.target.closest('[data-note]');
  if (!chip) return;
  const note = chip.dataset.note;
  const box = $('#currentNote');
  const existing = box.value.trim();
  box.value = existing ? `${existing}; ${note}` : note;
  if (currentCard) currentCard.notes = box.value.trim();
  showToast('Tiny note added. Evidence collected.');
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

function handleFeelingFix(event) {
  const button = event.target.closest('button[data-fix]');
  if (!button) return;
  fixCurrent(button.dataset.fix);
}

function fixCurrent(reason) {
  if (!currentCard) {
    rollCard({ fullSurprise: true });
    return;
  }
  const fix = notFeelingFixes[reason];
  if (!fix) return;
  const simplerBuild = reason === 'complex' || reason === 'hard'
    ? ['one big mascot body', 'one face zone', 'one tiny spark']
    : [...new Set([...currentCard.build.slice(0, 5), 'one clearer attitude cue'])];

  currentCard = refreshTinyOddlet({
    ...currentCard,
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    title: `${currentCard.title} · ${fix.label}`,
    idea: `Draw a ${currentCard.mood} ${currentCard.mascot} mascot. ${fix.ideaLine}`,
    oddThing: fix.oddLine,
    build: simplerBuild,
    guardrail: fix.guardrail,
    status: 'adjusted'
  });
  renderCard();
  renderBlueprint(currentCard);
  animateRoll();
  showToast(`${fix.label}. Same creature, better flavor.`);
}

function switchTab(tabId) {
  $$('.tab').forEach((button) => button.classList.toggle('active', button.dataset.tab === tabId));
  $$('.view').forEach((view) => view.classList.toggle('active', view.id === tabId));
}

function saveSettings() {
  const settings = { apiKey: $('#apiKey').value.trim(), modelName: OPENROUTER_MODEL, theme: document.body.classList.contains('light') ? 'light' : 'dark' };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  showToast('Settings saved on this device.');
}

function loadSettings() {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    if (settings.apiKey) $('#apiKey').value = settings.apiKey;
    $('#modelName').value = OPENROUTER_MODEL;
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
  const model = OPENROUTER_MODEL;
  $('#modelName').value = OPENROUTER_MODEL;
  if (!apiKey) return showToast('Add your OpenRouter key first.');

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
  $('#dailyBtn').addEventListener('click', () => rollCard({ daily: true }));
  $('#remixBar').addEventListener('click', handleMoodRemix);
  $('#feelingBar').addEventListener('click', handleFeelingFix);
  $('#saveBtn').addEventListener('click', saveCurrent);
  $('#copyBtn').addEventListener('click', copyCard);
  $('#favIngredientsBtn').addEventListener('click', favoriteCurrentIngredients);
  document.body.addEventListener('click', handleQuickNote);
  $('#favoriteList').addEventListener('click', handleFavoriteClick);
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
  fillSelect('#energySelect', energies);
  fillSelect('#packSelect', packs);
  loadSettings();
  initEvents();
  initInstallPrompt();
  initServiceWorker();
  loadFavorites();
  renderFavorites();
  renderSpins();
  renderStash();
  rollCard({ fullSurprise: true });
}

init();
