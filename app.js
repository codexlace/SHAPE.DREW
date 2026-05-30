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
  { value: 'secret', label: 'secretly powerful' },
  { value: 'tinyPanic', label: 'tiny panic' },
  { value: 'smug', label: 'smug' },
  { value: 'melancholyCute', label: 'melancholy-cute' },
  { value: 'feralCute', label: 'feral-cute' },
  { value: 'tooOfficial', label: 'too official' },
  { value: 'secretlyGuilty', label: 'secretly guilty' },
  { value: 'delightedGoblin', label: 'delighted goblin' },
  { value: 'dramaticallyOffended', label: 'dramatically offended' },
  { value: 'cosmicBlank', label: 'cosmic blank' },
  { value: 'clingy', label: 'clingy' },
  { value: 'overprepared', label: 'overprepared' },
  { value: 'softlyHaunted', label: 'softly haunted' },
  { value: 'sneaky', label: 'sneaky' },
  { value: 'starstruck', label: 'starstruck' },
  { value: 'mildlyCursed', label: 'mildly cursed' }
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


const twistsBySpark = {
  livingDetail: [
    'one tiny mark has its own face',
    'a sticker patch is awake and judging',
    'the corner has little eyes',
    'a crack in the body is smiling',
    'one button, seed, or dot is alive',
    'the label reacts more than the mascot',
    'a tiny bite mark looks guilty',
    'one shine spot has an expression',
    'a stitched patch is blinking',
    'a drip has a tiny mouth',
    'a crumb is trying to escape',
    'one fold looks suspicious',
    'a symbol on the body is nervous',
    'a tiny spot is staring at the viewer',
    'a loose thread has personality'
  ],
  tinyJob: [
    'guardian of one tiny object',
    'official crumb inspector',
    'keeper of a useless label',
    'protector of a single sparkle',
    'tiny mailbox clerk',
    'button hole supervisor',
    'emergency sticker manager',
    'certified puddle watcher',
    'miniature sign holder',
    'secret snack security guard',
    'moonbeam assistant',
    'dust cataloguer',
    'tiny weather reporter',
    'official ribbon straightener',
    'very serious dot counter'
  ],
  secretSymbol: [
    'mysterious X mark',
    'tiny question mark patch',
    'hidden moon stamp',
    'small warning triangle',
    'secret eye symbol',
    'crooked arrow label',
    'tiny crown mark',
    'strange spiral stamp',
    'mini heart seal',
    'glowing dot code',
    'folded map symbol',
    'odd little star scar',
    'unknown badge shape',
    'tiny “you are here” mark',
    'symbol that points to the wrong place'
  ],
  wrongScale: [
    'huge tiny crown',
    'oversized sticker label',
    'massive little spoon',
    'too-big ribbon bow',
    'giant button on a tiny body',
    'huge charm loop',
    'tiny mascot carrying a huge crumb',
    'enormous tag attached to it',
    'oversized sparkle hovering nearby',
    'big suspicious envelope',
    'tiny body with giant boots',
    'huge key too heavy to hold',
    'massive pencil tip',
    'giant raindrop companion',
    'large official badge'
  ],
  microProblem: [
    'the label keeps peeling off',
    'the tiny crown is slipping',
    'one leg is too short',
    'the prop is wobbling',
    'a drip is falling at the worst time',
    'the ribbon is tangled',
    'the face is slightly misplaced',
    'the sparkle is too heavy',
    'the companion is hiding',
    'the sign points the wrong way',
    'one corner is folded sadly',
    'the handle is emotionally unstable',
    'the hat does not fit',
    'the tiny object is stuck',
    'the mascot is pretending nothing is wrong'
  ],
  costumeLogic: [
    'wearing one tiny cape',
    'pretending to be a wizard',
    'wearing a fake crown',
    'dressed like a tiny official',
    'wearing one oversized bow',
    'disguised as a sticker',
    'wearing a paper mask',
    'pretending to be royalty',
    'wearing a little raincoat',
    'dressed like a desk clerk',
    'wearing a badly placed hat',
    'costumed as a tiny ghost',
    'wearing one dramatic collar',
    'pretending to be fancy',
    'wearing a costume that only makes sense to itself'
  ],
  quietMagic: [
    'one shy sparkle floats nearby',
    'a tiny glow leaks from the edge',
    'the symbol softly shines',
    'one dot orbits the mascot',
    'a small moonbeam touches it',
    'the prop levitates slightly',
    'a tiny charm hums with glow',
    'one eye has a magical glint',
    'a soft halo sits behind it',
    'a glow puddle forms underneath',
    'a tiny star follows it',
    'the weird detail sparkles once',
    'one edge looks enchanted',
    'a little spell mark floats above',
    'the mascot does not realize it is magical'
  ],
  attachedOddity: [
    'a tag with its own mood',
    'a ribbon acting independent',
    'a handle that looks suspicious',
    'a corner charm dangling off',
    'a tiny sticker stuck to the side',
    'a loop attached at the top',
    'a side patch with little eyes',
    'a loose string pulling away',
    'a tiny envelope taped on',
    'a bead hanging from one edge',
    'a label attached too seriously',
    'a small bell tied on',
    'a weird charm clipped to it',
    'a folded flap with personality',
    'an attached dot that looks important'
  ],
  tinyCompanion: [
    'a tiny droplet sidekick',
    'a small star buddy',
    'a nervous crumb companion',
    'a mini ghost hiding behind it',
    'a little button friend',
    'a tiny moon follower',
    'a shy sticker sidekick',
    'a small sprout copying its face',
    'a tiny cloud hovering nearby',
    'a little dot creature',
    'a mini charm following it',
    'a tiny shadow buddy',
    'a small sparkle with opinions',
    'a baby version of the mascot',
    'a tiny prop that thinks it is in charge'
  ],
  fakeImportance: [
    'wearing an official badge',
    'standing beside a serious label',
    'guarding a useless object',
    'presenting a crumb like treasure',
    'holding a tiny certificate',
    'wearing a museum tag',
    'posing like royalty',
    'protecting one ordinary dot',
    'standing on a tiny pedestal',
    'displaying a very important sticker',
    'holding a sign that says official',
    'guarding a spoon like a relic',
    'treating a button like a sacred artifact',
    'wearing a dramatic tiny medal',
    'acting like the tiny prop is legally binding'
  ]
};


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


const speciesByLane = {
  object: [
    'button gremlin',
    'teacup goblin',
    'melting candle creature',
    'tiny mailbox oddlet',
    'sock with a secret',
    'bottle cap goblin',
    'keyhole creature',
    'pocket mirror imp',
    'paper bag ghostling',
    'spoon sprite',
    'wobbly clock gremlin',
    'tiny door creature',
    'ribbon spool oddlet',
    'cracked mug mascot',
    'lost toy block',
    'jar lid creature',
    'tiny lamp gremlin',
    'coin purse creature',
    'safety pin imp',
    'mini suitcase oddlet'
  ],
  food: [
    'toast slice creature',
    'lemon wedge goblin',
    'mushroom cap oddlet',
    'jellybean blob',
    'dumpling creature',
    'cupcake liner imp',
    'blueberry sprite',
    'marshmallow ghostlet',
    'noodle cup mascot',
    'tiny pickle gremlin',
    'pancake stack creature',
    'strawberry charm',
    'croissant goblin',
    'cheese cube oddlet',
    'cinnamon roll creature',
    'cookie crumb sprite',
    'soup dumpling blob',
    'waffle square mascot',
    'gummy bear relic',
    'rice ball creature'
  ],
  symbol: [
    'question mark mascot',
    'star sticker creature',
    'map pin gremlin',
    'X mark oddlet',
    'arrow sign creature',
    'tiny moon symbol',
    'warning triangle goblin',
    'sparkle sprite',
    'heart stamp mascot',
    'speech bubble creature',
    'exclamation point oddlet',
    'spiral mark familiar',
    'asterisk creature',
    'checkmark gremlin',
    'broken circle mascot',
    'tiny crown symbol',
    'cloud icon creature',
    'plus sign oddlet',
    'eye symbol familiar',
    'label tag creature'
  ],
  ghost: [
    'sheet ghost oddlet',
    'dust bunny creature',
    'fog puff familiar',
    'pillow goblin',
    'blanket creature',
    'tiny shadow mascot',
    'mask blob',
    'soft cryptid',
    'worry puff',
    'moonlit blob',
    'closet fluff creature',
    'lint monster',
    'sleepy haunt',
    'sock ghost',
    'curtain spirit',
    'under-bed puff',
    'tiny banshee bean',
    'mothball ghostlet',
    'cloudy gremlin',
    'shy monster blob'
  ],
  stationery: [
    'pencil stub creature',
    'eraser goblin',
    'notebook page oddlet',
    'sticky note mascot',
    'paint brush gremlin',
    'crayon creature',
    'ink bottle familiar',
    'paperclip sprite',
    'ruler oddlet',
    'tape roll creature',
    'marker cap goblin',
    'binder clip mascot',
    'highlighter imp',
    'glue stick creature',
    'scissor charm',
    'index card oddlet',
    'stamp pad goblin',
    'pushpin creature',
    'folder tab mascot',
    'washi tape gremlin'
  ],
  weather: [
    'rain cloud blob',
    'tiny storm creature',
    'moon puddle oddlet',
    'sun drop mascot',
    'fog bean',
    'snow puff creature',
    'wind swirl sprite',
    'raindrop gremlin',
    'misty star familiar',
    'thunder button',
    'hail pebble creature',
    'rainbow shard oddlet',
    'cloud sock goblin',
    'lightning noodle',
    'dew drop mascot',
    'tornado curl creature',
    'frost patch oddlet',
    'weather vane imp',
    'umbrella drip creature',
    'storm eye blob'
  ],
  plant: [
    'tiny sprout creature',
    'cactus nub goblin',
    'leaf pile oddlet',
    'flower bud mascot',
    'acorn creature',
    'moss blob',
    'tiny fern familiar',
    'seed packet oddlet',
    'mushroom cap sprout',
    'berry twig creature',
    'potted bulb goblin',
    'daisy face mascot',
    'vine curl sprite',
    'clover charm',
    'thorny bean creature',
    'petal puff oddlet',
    'root baby goblin',
    'succulent nub',
    'weeping leaf creature',
    'seedling ghost'
  ],
  charm: [
    'lucky charm creature',
    'tiny bell oddlet',
    'ribbon charm mascot',
    'locket goblin',
    'glass bead creature',
    'mini crown oddlet',
    'toy mask familiar',
    'pocket talisman',
    'button badge creature',
    'little relic',
    'keychain ghostlet',
    'friendship bead mascot',
    'tiny pendant sprite',
    'moon charm creature',
    'heart locket oddlet',
    'bottle charm goblin',
    'wishbone mascot',
    'tiny tag familiar',
    'glow bead creature',
    'secret amulet oddlet'
  ]
};

const speciesHints = {
  surprise: 'Choose a specific Oddlet body, or let the drawer decide.',
  object: 'Object gremlins work best when the object shape reads before the face.',
  food: 'Snack creatures need one clear food silhouette before toppings or limbs.',
  symbol: 'Symbol creatures should stay readable as icons first, characters second.',
  ghost: 'Soft monsters work best as one big blob, puff, sheet, or shadow shape.',
  stationery: 'Stationery oddballs need the tool shape to stay clear under the personality.',
  weather: 'Weather blobs like soft edges, floating details, and one clear motion cue.',
  plant: 'Plant sprouts work best when leaves are grouped into one simple mass.',
  charm: 'Tiny charms should feel icon-like, small, and symbolic.'
};


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



const newTwistBlueprintRules = {
  'one tiny mark has its own face': { zone: 'surfacePatch', label: 'face mark', note: 'Place the living mark on the main body surface so it reads as part of the mascot.' },
  'a sticker patch is awake and judging': { zone: 'labelPatch', label: 'sticker', note: 'Put the sticker patch on a clear body area and give it a tiny judging expression.' },
  'the corner has little eyes': { zone: 'foldedCorner', label: 'corner eyes', note: 'Place the eyes on one corner so the body still reads first.' },
  'a crack in the body is smiling': { zone: 'surfacePatch', label: 'crack', note: 'Make the crack one simple curved line with a tiny smile, not a full second face.' },
  'one button, seed, or dot is alive': { zone: 'innerHole', label: 'alive dot', note: 'Pick one small dot or hole and make only that detail alive.' },
  'the label reacts more than the mascot': { zone: 'labelPatch', label: 'label', note: 'Let the label carry the expression while the mascot stays simple.' },
  'a tiny bite mark looks guilty': { zone: 'topRight', label: 'bite', note: 'Place the bite on an outer edge and keep it small enough to not destroy the silhouette.' },
  'one shine spot has an expression': { zone: 'bowlShine', label: 'shine', note: 'Put the expression inside one shine spot or highlight area.' },
  'a stitched patch is blinking': { zone: 'surfacePatch', label: 'patch', note: 'Draw one stitched patch with a single blinking eye, not lots of stitches.' },
  'a drip has a tiny mouth': { zone: 'bottomEdge', label: 'drip', note: 'Place the tiny mouth on the drip so the falling shape becomes the joke.' },
  'a crumb is trying to escape': { zone: 'sideFloat', label: 'crumb', note: 'Put the crumb just outside the body edge so it feels like it is escaping.' },
  'one fold looks suspicious': { zone: 'foldedCorner', label: 'fold', note: 'Use the fold as the suspicious detail and avoid extra face clutter.' },
  'a symbol on the body is nervous': { zone: 'surfacePatch', label: 'symbol', note: 'Place the nervous symbol on the main body, close to the face but not covering it.' },
  'a tiny spot is staring at the viewer': { zone: 'surfacePatch', label: 'spot', note: 'Make one spot stare outward so the weirdness is readable immediately.' },
  'a loose thread has personality': { zone: 'sideAttach', label: 'thread', note: 'Attach the thread to one edge so it feels connected to the mascot.' },
  'guardian of one tiny object': { zone: 'frontCenter', label: 'guarded', note: 'Place the tiny object in front like treasure, with the mascot protecting it.' },
  'official crumb inspector': { zone: 'bottomEdge', label: 'crumb', note: 'Put the crumb near the bottom edge so the mascot can inspect it clearly.' },
  'keeper of a useless label': { zone: 'labelPatch', label: 'label', note: 'Make the label visible and silly-important, but do not fill it with tiny writing.' },
  'protector of a single sparkle': { zone: 'upperRight', label: 'sparkle', note: 'Place one sparkle near the mascot and let the pose imply protection.' },
  'tiny mailbox clerk': { zone: 'flagSide', label: 'mail', note: 'Use a small mail or flag-side marker so the job reads without drawing a full post office.' },
  'button hole supervisor': { zone: 'buttonHole', label: 'hole', note: 'Focus attention on one button hole and treat it like a tiny official station.' },
  'emergency sticker manager': { zone: 'labelPatch', label: 'sticker', note: 'Put the sticker patch on the body and make it feel very official.' },
  'certified puddle watcher': { zone: 'underBody', label: 'puddle', note: 'Place the puddle under the mascot so the job is readable without a background.' },
  'miniature sign holder': { zone: 'frontCenter', label: 'sign', note: 'Put the sign in front or to one side and keep the sign text minimal.' },
  'secret snack security guard': { zone: 'frontCenter', label: 'snack', note: 'Put the protected snack close to the body and avoid adding a whole snack scene.' },
  'moonbeam assistant': { zone: 'upperRight', label: 'beam', note: 'Place the moonbeam above or beside the mascot as one soft magical cue.' },
  'dust cataloguer': { zone: 'sideFloat', label: 'dust', note: 'Use one or two dust dots nearby, not a dusty background.' },
  'tiny weather reporter': { zone: 'upperRight', label: 'weather', note: 'Place one tiny weather symbol near the mascot like a report badge.' },
  'official ribbon straightener': { zone: 'sideAttach', label: 'ribbon', note: 'Attach the ribbon to the body and make it the one job-related detail.' },
  'very serious dot counter': { zone: 'surfacePatch', label: 'dots', note: 'Use a small group of dots on the body, but keep the count visually simple.' },
  'mysterious X mark': { zone: 'surfacePatch', label: 'X mark', note: 'Place the X on the body like a secret stamp, not as a second face unless intended.' },
  'tiny question mark patch': { zone: 'surfacePatch', label: '? patch', note: 'Put the question mark on a clean body area so the symbol stays readable.' },
  'hidden moon stamp': { zone: 'upperRight', label: 'moon', note: 'Place the moon stamp near the upper body or edge so it feels hidden but clear.' },
  'small warning triangle': { zone: 'surfacePatch', label: 'warning', note: 'Keep the warning triangle simple and centered enough to read.' },
  'secret eye symbol': { zone: 'faceZone', label: 'eye', note: 'Place the eye symbol near the face zone, but do not let it become a second full face.' },
  'crooked arrow label': { zone: 'labelPatch', label: 'arrow', note: 'Put the crooked arrow on a label patch or sign area.' },
  'tiny crown mark': { zone: 'topCenter', label: 'crown', note: 'Use the crown mark near the top so it reads as tiny symbolic importance.' },
  'strange spiral stamp': { zone: 'spiralCenter', label: 'spiral', note: 'Place the spiral in a clear center or patch area so it does not become clutter.' },
  'mini heart seal': { zone: 'surfacePatch', label: 'heart', note: 'Use one tiny heart seal on the body, preferably close to the chest area.' },
  'glowing dot code': { zone: 'surfacePatch', label: 'dot code', note: 'Use only a few glowing dots so the code feels intentional, not messy.' },
  'folded map symbol': { zone: 'foldedCorner', label: 'map', note: 'Place the map symbol near a fold or corner for a secret-paper feeling.' },
  'odd little star scar': { zone: 'surfacePatch', label: 'star scar', note: 'Make the star scar small and readable with simple points.' },
  'unknown badge shape': { zone: 'labelPatch', label: 'badge', note: 'Use a badge-like patch on the front surface.' },
  'tiny “you are here” mark': { zone: 'labelPatch', label: 'you are here', note: 'Put this on a label or sign area and avoid tiny map details.' },
  'symbol that points to the wrong place': { zone: 'surfacePatch', label: 'wrong way', note: 'Place the symbol where its wrong direction is obvious but not confusing.' },
  'huge tiny crown': { zone: 'topCenter', label: 'big crown', note: 'Put the crown on top and make it oversized while simplifying everything else.' },
  'oversized sticker label': { zone: 'labelPatch', label: 'big label', note: 'Let the label take up a big readable area on the body.' },
  'massive little spoon': { zone: 'sideFloat', label: 'big spoon', note: 'Place the spoon beside the mascot and make the scale joke clear.' },
  'too-big ribbon bow': { zone: 'sideAttach', label: 'big bow', note: 'Attach the oversized bow to one edge or top corner.' },
  'giant button on a tiny body': { zone: 'surfacePatch', label: 'giant button', note: 'Put the button on the front and let it dominate the small body.' },
  'huge charm loop': { zone: 'topLoop', label: 'big loop', note: 'Make the charm loop oversized at the top so the silhouette still reads.' },
  'tiny mascot carrying a huge crumb': { zone: 'sideFloat', label: 'huge crumb', note: 'Place the crumb beside or above the mascot and keep the body simple.' },
  'enormous tag attached to it': { zone: 'sideAttach', label: 'huge tag', note: 'Attach the large tag to one side so it feels connected.' },
  'oversized sparkle hovering nearby': { zone: 'upperRight', label: 'big sparkle', note: 'Place the sparkle above or beside the mascot as the main scale joke.' },
  'big suspicious envelope': { zone: 'sideFloat', label: 'big envelope', note: 'Put the big envelope beside the mascot and keep it simple.' },
  'tiny body with giant boots': { zone: 'bottomEdge', label: 'big boots', note: 'Place the boots under the body and avoid extra leg detail.' },
  'huge key too heavy to hold': { zone: 'sideFloat', label: 'huge key', note: 'Let the key sit to the side or lower edge with a heavy-feeling tilt.' },
  'massive pencil tip': { zone: 'toolEnd', label: 'big tip', note: 'Make the pencil tip the biggest readable feature.' },
  'giant raindrop companion': { zone: 'sideFloat', label: 'big drop', note: 'Place the raindrop beside the mascot, larger than expected.' },
  'large official badge': { zone: 'frontCenter', label: 'big badge', note: 'Put the badge front-center and simplify the face.' },
  'the label keeps peeling off': { zone: 'labelPatch', label: 'peeling', note: 'Place the peeling label on one edge and curl only one corner.' },
  'the tiny crown is slipping': { zone: 'topCenter', label: 'slip crown', note: 'Tilt the crown slightly off the top to show the problem.' },
  'one leg is too short': { zone: 'bottomEdge', label: 'short leg', note: 'Show the issue with one tiny uneven foot or leg, not detailed anatomy.' },
  'the prop is wobbling': { zone: 'sideFloat', label: 'wobble', note: 'Place the prop to one side with a tiny wobble mark.' },
  'a drip is falling at the worst time': { zone: 'bottomEdge', label: 'drip', note: 'Put the drip just below the body so the falling moment reads quickly.' },
  'the ribbon is tangled': { zone: 'sideAttach', label: 'tangle', note: 'Attach the ribbon to one side and use one simple tangle loop.' },
  'the face is slightly misplaced': { zone: 'faceZone', label: 'face', note: 'Shift the face slightly off-center but keep it readable.' },
  'the sparkle is too heavy': { zone: 'upperRight', label: 'heavy spark', note: 'Place the sparkle close to the body and make it droop or pull downward.' },
  'the companion is hiding': { zone: 'sideFloat', label: 'hiding', note: 'Tuck the companion partly behind the main silhouette.' },
  'the sign points the wrong way': { zone: 'frontCenter', label: 'wrong sign', note: 'Place the sign in front and angle the arrow incorrectly.' },
  'one corner is folded sadly': { zone: 'foldedCorner', label: 'sad fold', note: 'Use one folded corner as the emotional problem.' },
  'the handle is emotionally unstable': { zone: 'handleSide', label: 'handle', note: 'Put the problem on the handle and use a wobble or expression cue.' },
  'the hat does not fit': { zone: 'topCenter', label: 'bad hat', note: 'Place the hat on top and let it sit too large or crooked.' },
  'the tiny object is stuck': { zone: 'surfacePatch', label: 'stuck', note: 'Put the tiny object partly embedded in the body surface.' },
  'the mascot is pretending nothing is wrong': { zone: 'surfacePatch', label: 'problem', note: 'Place one obvious problem on the body while keeping the face calm.' },
  'wearing one tiny cape': { zone: 'sideAttach', label: 'cape', note: 'Attach the cape to one side or back edge and keep it tiny.' },
  'pretending to be a wizard': { zone: 'topCenter', label: 'wizard', note: 'Use one hat or star mark to show wizard energy, not a full outfit.' },
  'wearing a fake crown': { zone: 'topCenter', label: 'crown', note: 'Place the crown clearly on top with a simple silhouette.' },
  'dressed like a tiny official': { zone: 'frontCenter', label: 'official', note: 'Use one badge, collar, or sign at the front.' },
  'wearing one oversized bow': { zone: 'sideAttach', label: 'bow', note: 'Attach the bow to one side or top edge and keep the mascot body readable.' },
  'disguised as a sticker': { zone: 'labelPatch', label: 'sticker', note: 'Use a sticker border or patch on the body instead of a full disguise.' },
  'wearing a paper mask': { zone: 'faceZone', label: 'mask', note: 'Place the mask over the face zone and leave the body simple.' },
  'pretending to be royalty': { zone: 'topCenter', label: 'royal', note: 'Use crown or medal placement at the top/front, not a full royal outfit.' },
  'wearing a little raincoat': { zone: 'surfacePatch', label: 'raincoat', note: 'Show the raincoat as one simple body patch or collar.' },
  'dressed like a desk clerk': { zone: 'frontCenter', label: 'clerk', note: 'Use one tiny badge or label on the front.' },
  'wearing a badly placed hat': { zone: 'topCenter', label: 'hat', note: 'Put the hat slightly crooked so the costume joke reads.' },
  'costumed as a tiny ghost': { zone: 'lowerEdge', label: 'ghost sheet', note: 'Add one sheet-like lower edge or ghost patch, not a full second character.' },
  'wearing one dramatic collar': { zone: 'frontCenter', label: 'collar', note: 'Place the collar under the face to frame the expression.' },
  'pretending to be fancy': { zone: 'frontCenter', label: 'fancy', note: 'Use one fancy marker like a bow, collar, or tiny badge.' },
  'wearing a costume that only makes sense to itself': { zone: 'surfacePatch', label: 'costume', note: 'Use one odd costume detail and keep the rest simple.' },
  'one shy sparkle floats nearby': { zone: 'upperRight', label: 'sparkle', note: 'Place one small sparkle above or beside the body.' },
  'a tiny glow leaks from the edge': { zone: 'edgeWobble', label: 'glow edge', note: 'Put the glow on one edge so the silhouette still reads.' },
  'the symbol softly shines': { zone: 'surfacePatch', label: 'shine', note: 'Place the shine directly on the symbol or body mark.' },
  'one dot orbits the mascot': { zone: 'orbitDetail', label: 'orbit', note: 'Put the orbiting dot close to the mascot, not across the whole canvas.' },
  'a small moonbeam touches it': { zone: 'upperRight', label: 'moonbeam', note: 'Place the moonbeam as one small angled cue near the upper body.' },
  'the prop levitates slightly': { zone: 'sideFloat', label: 'levitate', note: 'Lift the prop just off the body with a small gap.' },
  'a tiny charm hums with glow': { zone: 'topLoop', label: 'glow charm', note: 'Place the glow around the charm loop or attached charm.' },
  'one eye has a magical glint': { zone: 'faceZone', label: 'eye glint', note: 'Put the glint in one eye only to keep the face readable.' },
  'a soft halo sits behind it': { zone: 'glowRing', label: 'halo', note: 'Place the halo behind the body, not as a second prop.' },
  'a glow puddle forms underneath': { zone: 'underBody', label: 'glow puddle', note: 'Put the glow underneath as a grounding shape.' },
  'a tiny star follows it': { zone: 'sideFloat', label: 'star', note: 'Place the star companion slightly behind or beside the mascot.' },
  'the weird detail sparkles once': { zone: 'surfacePatch', label: 'spark', note: 'Add one sparkle mark to the weird detail, not sparkles everywhere.' },
  'one edge looks enchanted': { zone: 'edgeWobble', label: 'enchanted', note: 'Put the enchantment on one edge so it supports the silhouette.' },
  'a little spell mark floats above': { zone: 'topCenter', label: 'spell', note: 'Float the spell mark above the head/body and keep it small.' },
  'the mascot does not realize it is magical': { zone: 'upperRight', label: 'magic', note: 'Place the magic near the mascot while the face stays unaware.' },
  'a tag with its own mood': { zone: 'sideAttach', label: 'tag', note: 'Attach the tag to one side and give the tag the expression.' },
  'a ribbon acting independent': { zone: 'sideAttach', label: 'ribbon', note: 'Attach the ribbon to the body and let it curve away with attitude.' },
  'a handle that looks suspicious': { zone: 'handleSide', label: 'handle', note: 'Put the suspicious expression or marker on the handle area.' },
  'a corner charm dangling off': { zone: 'topRight', label: 'charm', note: 'Attach the charm to one corner and keep it smaller than the body.' },
  'a tiny sticker stuck to the side': { zone: 'sideAttach', label: 'sticker', note: 'Stick it to one side edge so it feels attached, not floating.' },
  'a loop attached at the top': { zone: 'topLoop', label: 'loop', note: 'Place the loop above the body like a charm hanger.' },
  'a side patch with little eyes': { zone: 'sideAttach', label: 'side patch', note: 'Put the patch on the side and make the eyes tiny.' },
  'a loose string pulling away': { zone: 'sideAttach', label: 'string', note: 'Attach the string to the edge and curve it outward.' },
  'a tiny envelope taped on': { zone: 'surfacePatch', label: 'envelope', note: 'Place the tiny envelope on the front surface like a taped-on note.' },
  'a bead hanging from one edge': { zone: 'sideAttach', label: 'bead', note: 'Hang the bead from one side or corner.' },
  'a label attached too seriously': { zone: 'labelPatch', label: 'label', note: 'Place the label on the main body surface so it looks official.' },
  'a small bell tied on': { zone: 'topLoop', label: 'bell', note: 'Attach the bell near the top loop or side edge.' },
  'a weird charm clipped to it': { zone: 'sideAttach', label: 'charm', note: 'Clip the charm to one edge and keep it simple.' },
  'a folded flap with personality': { zone: 'flapCenter', label: 'flap', note: 'Place the personality on the flap area so it feels part of the body.' },
  'an attached dot that looks important': { zone: 'surfacePatch', label: 'dot', note: 'Attach the dot to the body and treat it like a tiny badge.' },
  'a tiny droplet sidekick': { zone: 'sideFloat', label: 'droplet', note: 'Place the droplet beside the mascot and keep it much smaller.' },
  'a small star buddy': { zone: 'upperRight', label: 'star buddy', note: 'Place the star buddy near the upper side so it feels like it is following.' },
  'a nervous crumb companion': { zone: 'sideFloat', label: 'crumb', note: 'Place the crumb close beside the body with a tiny nervous cue.' },
  'a mini ghost hiding behind it': { zone: 'sideFloat', label: 'ghost', note: 'Tuck the ghost partly behind the main body.' },
  'a little button friend': { zone: 'sideFloat', label: 'button', note: 'Place the button friend beside the mascot as a tiny circle companion.' },
  'a tiny moon follower': { zone: 'upperRight', label: 'moon', note: 'Place the moon follower slightly above or behind the mascot.' },
  'a shy sticker sidekick': { zone: 'sideFloat', label: 'sticker', note: 'Place the sticker sidekick near the body edge, not on a full background.' },
  'a small sprout copying its face': { zone: 'sideFloat', label: 'sprout', note: 'Place the sprout beside the mascot and echo the same face shape.' },
  'a tiny cloud hovering nearby': { zone: 'upperRight', label: 'cloud', note: 'Float the cloud near the upper side of the mascot.' },
  'a little dot creature': { zone: 'sideFloat', label: 'dot', note: 'Place the dot creature beside the body and keep it very simple.' },
  'a mini charm following it': { zone: 'sideFloat', label: 'charm', note: 'Place the charm companion beside or behind the mascot.' },
  'a tiny shadow buddy': { zone: 'underBody', label: 'shadow', note: 'Put the shadow buddy underneath or slightly behind the mascot.' },
  'a small sparkle with opinions': { zone: 'upperRight', label: 'sparkle', note: 'Place the sparkle nearby and let its expression carry the opinion.' },
  'a baby version of the mascot': { zone: 'sideFloat', label: 'baby', note: 'Place the baby version beside the mascot and make it a smaller echo shape.' },
  'a tiny prop that thinks it is in charge': { zone: 'frontCenter', label: 'boss prop', note: 'Put the prop front-center so it feels bossy without adding a full scene.' },
  'wearing an official badge': { zone: 'frontCenter', label: 'badge', note: 'Place the badge on the front where it reads instantly.' },
  'standing beside a serious label': { zone: 'labelPatch', label: 'serious label', note: 'Use one serious label beside or on the body, no extra text clutter.' },
  'guarding a useless object': { zone: 'frontCenter', label: 'object', note: 'Place the useless object in front like treasure.' },
  'presenting a crumb like treasure': { zone: 'frontCenter', label: 'crumb', note: 'Put the crumb forward and make the mascot’s pose treat it as important.' },
  'holding a tiny certificate': { zone: 'frontCenter', label: 'certificate', note: 'Place the certificate in front and keep it as a simple rectangle.' },
  'wearing a museum tag': { zone: 'labelPatch', label: 'museum tag', note: 'Attach the museum tag to the body like a tiny official label.' },
  'posing like royalty': { zone: 'topCenter', label: 'royal pose', note: 'Use a top mark like a crown or medal cue while keeping the body simple.' },
  'protecting one ordinary dot': { zone: 'surfacePatch', label: 'dot', note: 'Place the dot on or near the body and treat it as precious.' },
  'standing on a tiny pedestal': { zone: 'underBody', label: 'pedestal', note: 'Place the pedestal under the mascot as one simple base shape.' },
  'displaying a very important sticker': { zone: 'labelPatch', label: 'sticker', note: 'Put the sticker on the body and make it the center of fake importance.' },
  'holding a sign that says official': { zone: 'frontCenter', label: 'official sign', note: 'Place the sign in front and avoid lots of text.' },
  'guarding a spoon like a relic': { zone: 'sideFloat', label: 'spoon relic', note: 'Place the spoon beside the mascot like a protected artifact.' },
  'treating a button like a sacred artifact': { zone: 'frontCenter', label: 'button relic', note: 'Put the button in front and make it feel ceremonially important.' },
  'wearing a dramatic tiny medal': { zone: 'frontCenter', label: 'medal', note: 'Place the medal on the front, near the chest or face zone.' },
  'acting like the tiny prop is legally binding': { zone: 'frontCenter', label: 'legal prop', note: 'Put the prop in front like paperwork and keep the joke simple.' }
};

const twistBlueprintRules = { ...newTwistBlueprintRules };

function twistToBlueprintZone(twist) {
  const text = String(twist || '').toLowerCase();
  if (text.includes('crown') || text.includes('hat') || text.includes('halo')) return 'topCenter';
  if (text.includes('tag') || text.includes('label') || text.includes('badge')) return 'labelPatch';
  if (text.includes('ribbon') || text.includes('string') || text.includes('bow')) return 'sideAttach';
  if (text.includes('companion') || text.includes('buddy') || text.includes('sidekick')) return 'sideFloat';
  if (text.includes('shadow')) return 'underBody';
  if (text.includes('sparkle') || text.includes('star') || text.includes('moon')) return 'upperRight';
  if (text.includes('drip') || text.includes('puddle')) return 'bottomEdge';
  if (text.includes('corner') || text.includes('fold') || text.includes('flap')) return 'foldedCorner';
  if (text.includes('eye') || text.includes('face')) return 'faceZone';
  if (text.includes('certificate') || text.includes('official') || text.includes('sign')) return 'frontCenter';
  return 'surfacePatch';
}

function getTwistBlueprintRule(twist) {
  if (!twist) {
    return { zone: 'surfacePatch', label: 'twist', note: 'Place the tiny twist on the clearest body area.' };
  }
  const direct = twistBlueprintRules[twist];
  if (direct) return direct;
  return {
    zone: twistToBlueprintZone(twist),
    label: 'twist',
    note: 'Use the twist marker to place the small extra without adding a full scene.'
  };
}


const speciesBlueprints = {
  'button gremlin': {
    bodyShape: 'circleButton',
    bodyLabel: 'round button body',
    faceZone: 'lowerCenter',
    propAnchor: 'topRight',
    weirdZone: 'buttonHole',
    bodyHint: 'Start with a soft circle, then add two or four button holes.',
    avoid: ['extra buttons', 'shirt background', 'too many holes', 'second face']
  },
  'teacup goblin': {
    bodyShape: 'cup',
    bodyLabel: 'small cup body',
    faceZone: 'frontCenter',
    propAnchor: 'handleSide',
    weirdZone: 'rim',
    bodyHint: 'Start with a squat cup shape, then add one simple handle.',
    avoid: ['saucer scene', 'steam overload', 'tiny spoon clutter', 'realistic porcelain detail']
  },
  'melting candle creature': {
    bodyShape: 'candle',
    bodyLabel: 'soft candle cylinder',
    faceZone: 'middleLow',
    propAnchor: 'topCenter',
    weirdZone: 'waxDrip',
    bodyHint: 'Start with a rounded vertical rectangle, then add one wax drip.',
    avoid: ['many flames', 'realistic fire', 'background altar', 'too many drips']
  },
  'toast slice creature': {
    bodyShape: 'toast',
    bodyLabel: 'rounded toast slice',
    faceZone: 'lowerCenter',
    propAnchor: 'topLeft',
    weirdZone: 'crustCorner',
    bodyHint: 'Start with a square bottom and rounded bread top.',
    avoid: ['plate', 'full breakfast', 'too many toppings', 'extra arms']
  },
  'lemon wedge goblin': {
    bodyShape: 'wedge',
    bodyLabel: 'lemon wedge triangle',
    faceZone: 'centerLow',
    propAnchor: 'topEdge',
    weirdZone: 'seedSpot',
    bodyHint: 'Start with a rounded triangle wedge, then add one seed or shine mark.',
    avoid: ['too many seeds', 'realistic pulp', 'knife', 'drink scene']
  },
  'waffle square mascot': {
    bodyShape: 'waffle',
    bodyLabel: 'rounded waffle square',
    faceZone: 'lowerCenter',
    propAnchor: 'topRight',
    weirdZone: 'gridCell',
    bodyHint: 'Start with a rounded square, then add only 2–4 soft waffle grid lines.',
    avoid: ['too many grid lines', 'plate', 'syrup puddle', 'fork']
  },
  'question mark mascot': {
    bodyShape: 'questionMark',
    bodyLabel: 'big question mark silhouette',
    faceZone: 'lowerCurve',
    propAnchor: 'upperCurve',
    weirdZone: 'dot',
    bodyHint: 'Start with a big question mark shape. Keep the symbol readable before adding the face.',
    avoid: ['extra symbols', 'busy face', 'tiny unreadable marks', 'background text']
  },
  'star sticker creature': {
    bodyShape: 'star',
    bodyLabel: 'soft star sticker',
    faceZone: 'center',
    propAnchor: 'topPoint',
    weirdZone: 'onePoint',
    bodyHint: 'Start with a chunky five-point star, then soften the points.',
    avoid: ['too many sparkles', 'thin sharp points', 'second star', 'galaxy background']
  },
  'sheet ghost oddlet': {
    bodyShape: 'sheetGhost',
    bodyLabel: 'soft sheet ghost',
    faceZone: 'middleLow',
    propAnchor: 'sideFloat',
    weirdZone: 'lowerEdge',
    bodyHint: 'Start with a rounded sheet shape and one wavy bottom edge.',
    avoid: ['too many folds', 'haunted house', 'complex hands', 'extra ghost']
  },
  'dust bunny creature': {
    bodyShape: 'fluffBlob',
    bodyLabel: 'fluffy dust bunny blob',
    faceZone: 'lowerCenter',
    propAnchor: 'topLeft',
    weirdZone: 'furTuft',
    bodyHint: 'Start with one fuzzy oval. Add only a few tufts.',
    avoid: ['too many spikes', 'realistic fur', 'background floor', 'extra ears if not needed']
  },
  'pencil stub creature': {
    bodyShape: 'pencilStub',
    bodyLabel: 'short pencil body',
    faceZone: 'middle',
    propAnchor: 'eraserEnd',
    weirdZone: 'woodTip',
    bodyHint: 'Start with a short rectangle, then add a tiny point and eraser end.',
    avoid: ['full pencil length', 'desk background', 'too many labels', 'extra tools']
  },
  'sticky note mascot': {
    bodyShape: 'stickyNote',
    bodyLabel: 'square sticky note',
    faceZone: 'centerLow',
    propAnchor: 'foldedCorner',
    weirdZone: 'cornerCurl',
    bodyHint: 'Start with a soft square, then fold one corner.',
    avoid: ['too much writing', 'many notes', 'office scene', 'tiny unreadable text']
  },
  'rain cloud blob': {
    bodyShape: 'cloud',
    bodyLabel: 'puffy cloud body',
    faceZone: 'lowerCenter',
    propAnchor: 'underCloud',
    weirdZone: 'raindrop',
    bodyHint: 'Start with three connected puffs. Keep the bottom simple.',
    avoid: ['too many raindrops', 'full sky', 'lightning plus rainbow plus sun', 'busy texture']
  },
  'raindrop gremlin': {
    bodyShape: 'drop',
    bodyLabel: 'single raindrop body',
    faceZone: 'lowerCenter',
    propAnchor: 'topPoint',
    weirdZone: 'insideDrop',
    bodyHint: 'Start with one teardrop shape. Make the face low.',
    avoid: ['puddle scene', 'many drops', 'realistic water texture', 'extra limbs']
  },
  'tiny sprout creature': {
    bodyShape: 'sprout',
    bodyLabel: 'seed body with two leaves',
    faceZone: 'seedCenter',
    propAnchor: 'leafTip',
    weirdZone: 'leafMark',
    bodyHint: 'Start with a seed oval, then add two simple leaves.',
    avoid: ['too many leaves', 'garden background', 'realistic roots', 'flower overload']
  },
  'cactus nub goblin': {
    bodyShape: 'cactus',
    bodyLabel: 'rounded cactus nub',
    faceZone: 'middleLow',
    propAnchor: 'sideArm',
    weirdZone: 'spinePatch',
    bodyHint: 'Start with a rounded vertical blob. Add only a few spine marks.',
    avoid: ['too many spikes', 'desert scene', 'many arms', 'realistic texture']
  },
  'tiny bell oddlet': {
    bodyShape: 'bell',
    bodyLabel: 'small bell charm',
    faceZone: 'frontLow',
    propAnchor: 'topLoop',
    weirdZone: 'bottomRim',
    bodyHint: 'Start with a bell dome, then add a tiny loop at the top.',
    avoid: ['full chain', 'too many shine marks', 'extra charms', 'realistic metal detail']
  },
  'heart locket oddlet': {
    bodyShape: 'heart',
    bodyLabel: 'heart locket body',
    faceZone: 'centerLow',
    propAnchor: 'topLoop',
    weirdZone: 'engraving',
    bodyHint: 'Start with a chunky heart shape. Add one hinge or tiny loop.',
    avoid: ['necklace scene', 'tiny photo inside', 'too many engravings', 'extra hearts']
  }
};


const newSpeciesBlueprints = {
  'envelope creature': {
    bodyShape: 'envelope',
    bodyLabel: 'soft envelope body',
    faceZone: 'frontCenter',
    propAnchor: 'topRight',
    weirdZone: 'flapCenter',
    bodyHint: 'Start with a soft rectangle, then add one simple triangle flap across the front.',
    avoid: ['too much tiny writing', 'mailbox background', 'extra envelopes', 'realistic paper folds']
  },
  'tiny mailbox oddlet': {
    bodyShape: 'mailbox',
    bodyLabel: 'rounded mailbox body',
    faceZone: 'frontCenter',
    propAnchor: 'sideFloat',
    weirdZone: 'flagSide',
    bodyHint: 'Start with a rounded-top box, then add one tiny flag on the side.',
    avoid: ['full street scene', 'realistic metal details', 'too many letters', 'complicated post structure']
  },
  'pocket mirror imp': {
    bodyShape: 'mirror',
    bodyLabel: 'oval pocket mirror body',
    faceZone: 'insideSymbol',
    propAnchor: 'handleSide',
    weirdZone: 'rim',
    bodyHint: 'Start with a simple oval, then add a small handle or thick frame.',
    avoid: ['realistic reflection', 'too many sparkles', 'full vanity setup', 'thin fragile frame']
  },
  'spoon sprite': {
    bodyShape: 'spoon',
    bodyLabel: 'spoon bowl and handle body',
    faceZone: 'largestMass',
    propAnchor: 'toolEnd',
    weirdZone: 'bowlShine',
    bodyHint: 'Start with an oval spoon bowl, then attach one long simple handle.',
    avoid: ['fork details', 'table setting', 'realistic metal shine', 'tiny engraved patterns']
  },
  'clock creature': {
    bodyShape: 'clock',
    bodyLabel: 'round clock body',
    faceZone: 'insideSymbol',
    propAnchor: 'topCenter',
    weirdZone: 'clockHand',
    bodyHint: 'Start with a circle, then add two simple clock hands and a few tiny ticks.',
    avoid: ['too many numbers', 'realistic gears', 'wall background', 'complicated clock face']
  },
  'tiny door creature': {
    bodyShape: 'door',
    bodyLabel: 'rounded door body',
    faceZone: 'frontCenter',
    propAnchor: 'topEdge',
    weirdZone: 'knobSpot',
    bodyHint: 'Start with a tall rounded rectangle, then add one small knob on the side.',
    avoid: ['full house scene', 'realistic wood grain', 'extra windows', 'tiny door panels']
  },
  'mini suitcase oddlet': {
    bodyShape: 'suitcase',
    bodyLabel: 'rounded suitcase body',
    faceZone: 'frontCenter',
    propAnchor: 'topLoop',
    weirdZone: 'labelPatch',
    bodyHint: 'Start with a rounded rectangle, then add a small handle on top.',
    avoid: ['too many travel stickers', 'airport background', 'realistic zippers', 'extra bags']
  },
  'croissant goblin': {
    bodyShape: 'croissant',
    bodyLabel: 'curved croissant body',
    faceZone: 'centerLow',
    propAnchor: 'upperCurve',
    weirdZone: 'butteryStripe',
    bodyHint: 'Start with a chunky crescent bun, then add only two soft segment lines.',
    avoid: ['too many pastry stripes', 'plate scene', 'realistic crumbs', 'extra breakfast items']
  },
  'cinnamon roll creature': {
    bodyShape: 'cinnamonRoll',
    bodyLabel: 'spiral cinnamon roll body',
    faceZone: 'center',
    propAnchor: 'topRight',
    weirdZone: 'innerCurve',
    bodyHint: 'Start with a soft circle, then draw one clear spiral swirl inside it.',
    avoid: ['too many icing lines', 'bakery background', 'realistic crumbs', 'extra pastries']
  },
  'rice ball creature': {
    bodyShape: 'riceBall',
    bodyLabel: 'rounded triangle rice ball body',
    faceZone: 'lowerCenter',
    propAnchor: 'topRight',
    weirdZone: 'seaweedPatch',
    bodyHint: 'Start with a rounded triangle, then add one simple seaweed patch near the bottom.',
    avoid: ['tiny rice grains everywhere', 'plate scene', 'extra food props', 'sharp triangle corners']
  },
  'speech bubble creature': {
    bodyShape: 'speechBubble',
    bodyLabel: 'rounded speech bubble body',
    faceZone: 'frontCenter',
    propAnchor: 'topRight',
    weirdZone: 'bubbleTail',
    bodyHint: 'Start with a rounded blob, then add one small tail pointing outward.',
    avoid: ['long sentences inside', 'comic panel background', 'multiple bubbles', 'tiny punctuation clutter']
  },
  'warning triangle goblin': {
    bodyShape: 'warningTriangle',
    bodyLabel: 'warning triangle body',
    faceZone: 'insideSymbol',
    propAnchor: 'topCenter',
    weirdZone: 'symbolTip',
    bodyHint: 'Start with a rounded triangle, then place the face inside the safe middle area.',
    avoid: ['real hazard signage', 'too many warning symbols', 'sharp aggressive corners', 'background caution tape']
  },
  'paperclip sprite': {
    bodyShape: 'paperclip',
    bodyLabel: 'looped paperclip body',
    faceZone: 'largestMass',
    propAnchor: 'topLoop',
    weirdZone: 'ringEnd',
    bodyHint: 'Start with one long rounded loop, then add a smaller inner loop.',
    avoid: ['realistic wire twists', 'too many loops', 'paper stack background', 'thin unreadable lines']
  },
  'tape roll creature': {
    bodyShape: 'tapeRoll',
    bodyLabel: 'round tape roll body',
    faceZone: 'frontCenter',
    propAnchor: 'topRight',
    weirdZone: 'rim',
    bodyHint: 'Start with a donut ring shape, then show the inner hole clearly.',
    avoid: ['messy tape strips everywhere', 'desktop background', 'realistic dispenser teeth', 'too many circular outlines']
  },
  'scissor charm': {
    bodyShape: 'scissors',
    bodyLabel: 'simplified scissor body',
    faceZone: 'largestMass',
    propAnchor: 'topLoop',
    weirdZone: 'bladeTip',
    bodyHint: 'Start with two soft handle loops, then add two short simple blades.',
    avoid: ['sharp weapon feeling', 'realistic metal blades', 'complex hinge details', 'cut paper background']
  },
  'eraser creature': {
    bodyShape: 'eraser',
    bodyLabel: 'rounded eraser body',
    faceZone: 'frontCenter',
    propAnchor: 'eraserEnd',
    weirdZone: 'wrapperBand',
    bodyHint: 'Start with a soft rounded rectangle, then add one wrapper band across the middle.',
    avoid: ['school desk scene', 'tiny brand lettering', 'realistic worn corners', 'pencil clutter']
  },
  'marker cap sprite': {
    bodyShape: 'markerCap',
    bodyLabel: 'short marker cap body',
    faceZone: 'frontCenter',
    propAnchor: 'toolEnd',
    weirdZone: 'capEdge',
    bodyHint: 'Start with a short rounded cylinder, then add one simple cap rim.',
    avoid: ['full marker body', 'too many grooves', 'realistic plastic texture', 'art supply pile']
  },
  'folder tab creature': {
    bodyShape: 'folderTab',
    bodyLabel: 'folder tab body',
    faceZone: 'frontCenter',
    propAnchor: 'foldedCorner',
    weirdZone: 'labelPatch',
    bodyHint: 'Start with a wide rectangle, then add one tab bump along the top edge.',
    avoid: ['tiny file text', 'office background', 'too many papers', 'sharp flat corners']
  },
  'lightning noodle goblin': {
    bodyShape: 'lightningNoodle',
    bodyLabel: 'zigzag noodle body',
    faceZone: 'largestMass',
    propAnchor: 'upperRight',
    weirdZone: 'edgeWobble',
    bodyHint: 'Start with a thick zigzag line, then round every bend so it feels noodle-soft.',
    avoid: ['thin lightning bolt', 'storm background', 'too many jagged points', 'electric realism']
  },
  'tornado curl creature': {
    bodyShape: 'tornadoCurl',
    bodyLabel: 'spiral tornado body',
    faceZone: 'middleLow',
    propAnchor: 'topEdge',
    weirdZone: 'innerCurve',
    bodyHint: 'Start with a wide spiral cone, larger at the top and smaller near the bottom.',
    avoid: ['destructive storm scene', 'too many wind lines', 'realistic debris', 'tiny background houses']
  },
  'umbrella drip creature': {
    bodyShape: 'umbrella',
    bodyLabel: 'umbrella dome body',
    faceZone: 'frontLow',
    propAnchor: 'topCenter',
    weirdZone: 'raindrop',
    bodyHint: 'Start with a half-circle dome, then add a tiny handle or droplet underneath.',
    avoid: ['full rainy landscape', 'too many raindrops', 'realistic umbrella ribs', 'extra weather symbols']
  },
  'seed packet oddlet': {
    bodyShape: 'seedPacket',
    bodyLabel: 'seed packet body',
    faceZone: 'frontCenter',
    propAnchor: 'topRight',
    weirdZone: 'labelPatch',
    bodyHint: 'Start with a packet rectangle, then add one simple label patch on the front.',
    avoid: ['tiny seed instructions', 'garden background', 'too many plant drawings', 'realistic packaging folds']
  },
  'clover creature': {
    bodyShape: 'clover',
    bodyLabel: 'three-leaf clover body',
    faceZone: 'largestMass',
    propAnchor: 'leafTip',
    weirdZone: 'leafMark',
    bodyHint: 'Start with three round heart-like leaves meeting in the center.',
    avoid: ['too many tiny leaves', 'field background', 'realistic veins', 'four-leaf complexity']
  },
  'succulent sprite': {
    bodyShape: 'succulent',
    bodyLabel: 'layered succulent body',
    faceZone: 'largestMass',
    propAnchor: 'leafTip',
    weirdZone: 'petalEdge',
    bodyHint: 'Start with a simple rosette, then add only a few big layered leaves.',
    avoid: ['too many tiny petals', 'plant pot scene', 'realistic botanical detail', 'sharp cactus spikes']
  },
  'pendant charm': {
    bodyShape: 'pendant',
    bodyLabel: 'teardrop pendant body',
    faceZone: 'centerLow',
    propAnchor: 'topLoop',
    weirdZone: 'engraving',
    bodyHint: 'Start with a teardrop charm shape, then add a tiny loop at the top.',
    avoid: ['complex jewelry chain', 'realistic gemstone facets', 'too many engravings', 'necklace background']
  },
  'wishbone sprite': {
    bodyShape: 'wishbone',
    bodyLabel: 'Y-shaped wishbone body',
    faceZone: 'largestMass',
    propAnchor: 'topEdge',
    weirdZone: 'knot',
    bodyHint: 'Start with a soft Y shape, then round the two upper prongs.',
    avoid: ['real bone texture', 'sharp bony points', 'plate scene', 'too many cracks']
  },
  'glow bead creature': {
    bodyShape: 'glowBead',
    bodyLabel: 'glowing bead body',
    faceZone: 'center',
    propAnchor: 'floatingNear',
    weirdZone: 'orbitDetail',
    bodyHint: 'Start with a simple orb, then add one shine ring or tiny glow halo.',
    avoid: ['too many glow rings', 'space background', 'realistic glass refraction', 'extra floating beads']
  }
};

Object.assign(speciesBlueprints, newSpeciesBlueprints);



const speciesBodyNotes = {
  envelope: 'Start with a soft rectangle, then add one triangle flap across the front.',
  mailbox: 'Start with a rounded-top box, then add one side flag and a simple post if needed.',
  mirror: 'Start with an oval, then add a frame or tiny handle.',
  spoon: 'Start with an oval bowl, then attach one thin rounded handle.',
  clock: 'Start with a circle, then add two clock hands and only a few ticks.',
  door: 'Start with a tall rounded rectangle, then add one knob.',
  suitcase: 'Start with a rounded rectangle, then add a small handle on top.',
  croissant: 'Start with a chunky crescent bun, then add two or three soft segment lines.',
  cinnamonRoll: 'Start with a circle, then add one clear spiral inside.',
  riceBall: 'Start with a rounded triangle, then add one simple seaweed patch.',
  speechBubble: 'Start with a rounded bubble, then add one small tail.',
  warningTriangle: 'Start with a rounded triangle icon body, then keep the face centered inside.',
  paperclip: 'Start with one big loop, then add a smaller inner loop.',
  tapeRoll: 'Start with a donut ring, then make the center hole readable.',
  scissors: 'Start with two handle loops, then add short softened blades.',
  eraser: 'Start with a rounded rectangle, then add one wrapper band.',
  markerCap: 'Start with a short cap cylinder, then add a rim line.',
  folderTab: 'Start with a rectangle, then add one tab bump along the top.',
  lightningNoodle: 'Start with a thick zigzag, then round every bend so it feels soft.',
  tornadoCurl: 'Start with a wide spiral cone, larger at the top and smaller at the bottom.',
  umbrella: 'Start with a half-circle dome, then add a handle or drip underneath.',
  seedPacket: 'Start with a packet rectangle, then add one label patch.',
  clover: 'Start with three round leaves meeting in the center.',
  succulent: 'Start with a rosette, then add a few big layered leaves.',
  pendant: 'Start with a teardrop charm, then add a tiny top loop.',
  wishbone: 'Start with a soft Y shape, then round the two upper prongs.',
  glowBead: 'Start with a simple orb, then add one glow ring or shine halo.'
};

function getSpeciesBodyNote(blueprint) {
  if (!blueprint) return 'Start with the largest simple shape first, then add one weird detail.';
  return speciesBodyNotes[blueprint.bodyShape] || blueprint.bodyHint || 'Start with the largest simple shape first, then add one weird detail.';
}

function inferSpeciesBlueprint(species, lane) {
  const name = String(species || '').toLowerCase();
  if (speciesBlueprints[name]) return speciesBlueprints[name];
  if (name.includes('toast')) return speciesBlueprints['toast slice creature'];
  if (name.includes('lemon') || name.includes('wedge')) return speciesBlueprints['lemon wedge goblin'];
  if (name.includes('waffle')) return speciesBlueprints['waffle square mascot'];
  if (name.includes('question')) return speciesBlueprints['question mark mascot'];
  if (name.includes('star')) return speciesBlueprints['star sticker creature'];
  if (name.includes('ghost')) return speciesBlueprints['sheet ghost oddlet'];
  if (name.includes('cloud')) return speciesBlueprints['rain cloud blob'];
  if (name.includes('drop')) return speciesBlueprints['raindrop gremlin'];
  if (name.includes('sprout')) return speciesBlueprints['tiny sprout creature'];
  if (name.includes('cactus')) return speciesBlueprints['cactus nub goblin'];
  if (name.includes('bell')) return speciesBlueprints['tiny bell oddlet'];
  if (name.includes('heart') || name.includes('locket')) return speciesBlueprints['heart locket oddlet'];
  if (name.includes('pencil')) return speciesBlueprints['pencil stub creature'];
  if (name.includes('sticky')) return speciesBlueprints['sticky note mascot'];
  if (name.includes('button')) return speciesBlueprints['button gremlin'];
  if (name.includes('teacup') || name.includes('cup')) return speciesBlueprints['teacup goblin'];
  if (name.includes('candle')) return speciesBlueprints['melting candle creature'];
  if (name.includes('envelope')) return speciesBlueprints['envelope creature'];
  if (name.includes('mailbox')) return speciesBlueprints['tiny mailbox oddlet'];
  if (name.includes('mirror')) return speciesBlueprints['pocket mirror imp'];
  if (name.includes('spoon')) return speciesBlueprints['spoon sprite'];
  if (name.includes('clock')) return speciesBlueprints['clock creature'];
  if (name.includes('door')) return speciesBlueprints['tiny door creature'];
  if (name.includes('suitcase')) return speciesBlueprints['mini suitcase oddlet'];
  if (name.includes('croissant')) return speciesBlueprints['croissant goblin'];
  if (name.includes('cinnamon')) return speciesBlueprints['cinnamon roll creature'];
  if (name.includes('rice ball')) return speciesBlueprints['rice ball creature'];
  if (name.includes('speech bubble')) return speciesBlueprints['speech bubble creature'];
  if (name.includes('warning triangle')) return speciesBlueprints['warning triangle goblin'];
  if (name.includes('paperclip')) return speciesBlueprints['paperclip sprite'];
  if (name.includes('tape roll') || name.includes('washi tape')) return speciesBlueprints['tape roll creature'];
  if (name.includes('scissor')) return speciesBlueprints['scissor charm'];
  if (name.includes('eraser')) return speciesBlueprints['eraser creature'];
  if (name.includes('marker cap')) return speciesBlueprints['marker cap sprite'];
  if (name.includes('folder tab')) return speciesBlueprints['folder tab creature'];
  if (name.includes('lightning noodle')) return speciesBlueprints['lightning noodle goblin'];
  if (name.includes('tornado')) return speciesBlueprints['tornado curl creature'];
  if (name.includes('umbrella')) return speciesBlueprints['umbrella drip creature'];
  if (name.includes('seed packet')) return speciesBlueprints['seed packet oddlet'];
  if (name.includes('clover')) return speciesBlueprints['clover creature'];
  if (name.includes('succulent')) return speciesBlueprints['succulent sprite'];
  if (name.includes('pendant')) return speciesBlueprints['pendant charm'];
  if (name.includes('wishbone')) return speciesBlueprints['wishbone sprite'];
  if (name.includes('glow bead')) return speciesBlueprints['glow bead creature'];
  if (name.includes('mushroom')) return { bodyShape: 'mushroom', bodyLabel: 'cap-and-stem mushroom body', faceZone: 'middleLow', propAnchor: 'capEdge', weirdZone: 'capSpot', bodyHint: 'Start with a wide cap, then tuck a small stem underneath.', avoid: ['too many cap spots', 'forest scene', 'extra mushrooms', 'realistic gills'] };
  if (name.includes('dumpling') || name.includes('marshmallow') || name.includes('jellybean')) return { bodyShape: 'snackBlob', bodyLabel: 'soft snack blob', faceZone: 'lowerCenter', propAnchor: 'topEdge', weirdZone: 'surfacePatch', bodyHint: 'Start with one rounded snack blob before adding the face.', avoid: ['plate', 'too many toppings', 'extra food friends', 'background meal'] };
  if (name.includes('arrow') || name.includes('sign') || name.includes('label')) return { bodyShape: 'sign', bodyLabel: 'simple sign or label body', faceZone: 'insideSymbol', propAnchor: 'upperRight', weirdZone: 'symbolTip', bodyHint: 'Start with one clear sign shape. Keep the arrow or label readable.', avoid: ['extra signs', 'busy text', 'background map', 'hidden face'] };
  if (name.includes('moon')) return { bodyShape: 'crescent', bodyLabel: 'soft crescent body', faceZone: 'centerLow', propAnchor: 'upperCurve', weirdZone: 'innerCurve', bodyHint: 'Start with a chunky crescent, then add the face inside the curve.', avoid: ['full galaxy', 'too many stars', 'thin crescent points', 'second moon'] };
  if (name.includes('mask')) return { bodyShape: 'mask', bodyLabel: 'rounded mask body', faceZone: 'center', propAnchor: 'topRight', weirdZone: 'eyePatch', bodyHint: 'Start with a rounded mask silhouette and one clear eye zone.', avoid: ['full costume', 'extra face', 'too many stitches', 'background theater'] };
  if (name.includes('key')) return { bodyShape: 'key', bodyLabel: 'simple key body', faceZone: 'plainArea', propAnchor: 'ringEnd', weirdZone: 'keyTeeth', bodyHint: 'Start with a big key ring and a simple shaft.', avoid: ['keychain pile', 'realistic metal detail', 'many teeth', 'background lock'] };
  if (name.includes('sock')) return { bodyShape: 'sock', bodyLabel: 'bent sock body', faceZone: 'middleLow', propAnchor: 'toeEnd', weirdZone: 'heelPatch', bodyHint: 'Start with one bent sock shape, then add a heel patch.', avoid: ['laundry pile', 'many stripes', 'second sock', 'realistic fabric texture'] };
  if (name.includes('bottle') || name.includes('jar')) return { bodyShape: 'bottle', bodyLabel: 'small bottle body', faceZone: 'frontCenter', propAnchor: 'topCenter', weirdZone: 'labelPatch', bodyHint: 'Start with a simple bottle or jar silhouette and one label area.', avoid: ['shelf scene', 'tiny label text', 'extra bottles', 'glass realism'] };
  if (name.includes('ribbon') || name.includes('bow')) return { bodyShape: 'ribbon', bodyLabel: 'soft ribbon body', faceZone: 'center', propAnchor: 'topRight', weirdZone: 'knot', bodyHint: 'Start with a center knot and two soft loops.', avoid: ['too many folds', 'full outfit', 'extra bows', 'fabric texture'] };
  if (name.includes('clock')) return { bodyShape: 'circleButton', bodyLabel: 'round clock body', faceZone: 'lowerCenter', propAnchor: 'topRight', weirdZone: 'clockHand', bodyHint: 'Start with a circle, then add two simple clock hands.', avoid: ['many numbers', 'wall background', 'second clock', 'realistic gears'] };
  if (name.includes('flower') || name.includes('daisy')) return { bodyShape: 'flower', bodyLabel: 'simple flower head body', faceZone: 'center', propAnchor: 'petalEdge', weirdZone: 'petalMark', bodyHint: 'Start with one center circle and a few big petals.', avoid: ['too many petals', 'garden scene', 'realistic pollen', 'extra flowers'] };
  if (name.includes('acorn')) return { bodyShape: 'acorn', bodyLabel: 'acorn cap and seed body', faceZone: 'lowerCenter', propAnchor: 'capEdge', weirdZone: 'capPattern', bodyHint: 'Start with the acorn seed oval, then add one cap shape.', avoid: ['tree background', 'too many cap marks', 'extra nuts', 'realistic shell texture'] };
  const laneFallbacks = {
    object: {
      bodyShape: 'roundedObject',
      bodyLabel: 'simple object body',
      faceZone: 'lowerCenter',
      propAnchor: 'topRight',
      weirdZone: 'surfacePatch',
      bodyHint: 'Start with one readable object silhouette before adding face or props.',
      avoid: ['background', 'extra objects', 'second face', 'too many realistic details']
    },
    food: {
      bodyShape: 'snackBlob',
      bodyLabel: 'simple snack body',
      faceZone: 'lowerCenter',
      propAnchor: 'topEdge',
      weirdZone: 'toppingSpot',
      bodyHint: 'Start with one clear food silhouette before toppings.',
      avoid: ['plate', 'full meal scene', 'too many toppings', 'realistic food texture']
    },
    symbol: {
      bodyShape: 'symbolIcon',
      bodyLabel: 'readable symbol body',
      faceZone: 'insideSymbol',
      propAnchor: 'upperRight',
      weirdZone: 'symbolTip',
      bodyHint: 'Start with the symbol first. The face comes after it still reads.',
      avoid: ['extra symbols', 'hidden face', 'busy decorations', 'warped icon']
    },
    ghost: {
      bodyShape: 'blob',
      bodyLabel: 'soft monster blob',
      faceZone: 'middleLow',
      propAnchor: 'sideFloat',
      weirdZone: 'edgeWobble',
      bodyHint: 'Start with one soft blob or sheet shape.',
      avoid: ['too many ragged edges', 'full scene', 'extra monsters', 'complex arms']
    },
    stationery: {
      bodyShape: 'deskTool',
      bodyLabel: 'desk-tool body',
      faceZone: 'plainArea',
      propAnchor: 'toolEnd',
      weirdZone: 'labelPatch',
      bodyHint: 'Start with the tool shape, then add personality.',
      avoid: ['too many tools', 'tiny text', 'desk background', 'hidden silhouette']
    },
    weather: {
      bodyShape: 'weatherBlob',
      bodyLabel: 'soft weather body',
      faceZone: 'lowerCenter',
      propAnchor: 'floatingNear',
      weirdZone: 'orbitDetail',
      bodyHint: 'Start with one puff, drop, swirl, or moon shape.',
      avoid: ['too many floating bits', 'full sky', 'over-texture', 'weather pileup']
    },
    plant: {
      bodyShape: 'plantMass',
      bodyLabel: 'grouped plant body',
      faceZone: 'largestMass',
      propAnchor: 'leafEdge',
      weirdZone: 'leafMark',
      bodyHint: 'Start with one grouped plant mass before drawing individual leaves.',
      avoid: ['scattered leaves', 'too many stems', 'garden scene', 'realistic botany']
    },
    charm: {
      bodyShape: 'charmIcon',
      bodyLabel: 'small charm body',
      faceZone: 'centerLow',
      propAnchor: 'topLoop',
      weirdZone: 'engraving',
      bodyHint: 'Start with one clean icon-like charm shape.',
      avoid: ['extra chains', 'too many dangling parts', 'tiny unreadable symbols', 'jewelry realism']
    }
  };
  return laneFallbacks[lane] || laneFallbacks.object;
}


const oddBiasMascots = ['paint palette', 'paper bag', 'question mark', 'mask blob', 'ink bottle', 'warning triangle', 'X mark', 'sticky note', 'tiny shadow', 'map pin', 'paint brush', 'arrow sign'];

const extras = ['heart', 'star', 'key', 'note', 'tiny sign', 'moon', 'spoon', 'flower', 'button', 'ribbon', 'spark', 'mini crown', 'glow dot', 'sealed envelope', 'paint drop', 'crumb', 'question mark patch', 'sticker scar', 'arrow label', 'tiny brush', 'folded note', 'scribble star'];

const moodData = {
  bashful: { label: 'bashful', face: 'low eyes, tiny mouth, cheeks doing most of the talking', pose: 'tilted inward, like it is trying to occupy less space', faceZone: 'lower third', eyeStyle: 'lowDots', browStyle: 'softWorry', mouthStyle: 'tinySmile', bodyTilt: -5, propBehavior: 'held close', expressionWeight: 'low eyes + tiny mouth + inward tilt', moodRead: 'Low face + inward tilt makes it feel shy and small.' },
  dramatic: { label: 'dramatic', face: 'arched brows, open mouth, one detail treated like a catastrophe', pose: 'leaning back or presenting the prop like evidence', faceZone: 'middle to upper-middle', eyeStyle: 'wide', browStyle: 'arched', mouthStyle: 'openOval', bodyTilt: 8, propBehavior: 'presented like evidence', expressionWeight: 'arched brows + open mouth + leaned-back pose', moodRead: 'Theatrical brows and a tilted-back body make the tiny problem feel huge.' },
  sleepy: { label: 'sleepy', face: 'half-lidded eyes, relaxed mouth, soft sagging posture', pose: 'slouched with one part drooping', faceZone: 'lower-middle', eyeStyle: 'halfLidded', browStyle: 'none', mouthStyle: 'softLine', bodyTilt: 3, propBehavior: 'drooping nearby', expressionWeight: 'half-lidded eyes + soft slouch', moodRead: 'Flat eyelids and a droopy body instantly read sleepy.' },
  suspicious: { label: 'suspicious', face: 'one narrowed eye, one dot eye, mouth held hostage by doubt', pose: 'leaning toward the odd thing, inspecting it', faceZone: 'middle', eyeStyle: 'sideEye', browStyle: 'oneRaised', mouthStyle: 'flatLine', bodyTilt: -3, propBehavior: 'inspected from a slight distance', expressionWeight: 'side-eye + one raised brow', moodRead: 'Sideways eyes make the mascot look like it distrusts its own prop.' },
  proud: { label: 'proud but tiny', face: 'small smile, lifted brow, face sitting a bit high', pose: 'chest forward, prop displayed like a trophy', faceZone: 'upper-middle', eyeStyle: 'confidentDots', browStyle: 'lifted', mouthStyle: 'smallSmile', bodyTilt: 0, propBehavior: 'trophy pose', expressionWeight: 'upright pose + small confident smile', moodRead: 'A higher face and still body make the little creature look very sure of itself.' },
  confused: { label: 'deeply confused', face: 'uneven eyes, question energy, mouth slightly open', pose: 'body tilted away from the thing it is holding', faceZone: 'middle', eyeStyle: 'uneven', browStyle: 'tilted', mouthStyle: 'smallOpen', bodyTilt: -8, propBehavior: 'nearby but emotionally unclear', expressionWeight: 'uneven eyes + tilted-away body', moodRead: 'Uneven eyes and a small open mouth create instant “wait, what?” energy.' },
  grumpy: { label: 'grumpy-soft', face: 'heavy brows, tiny frown, round cheeks betraying the grumpiness', pose: 'arms close to body, prop held too tightly', faceZone: 'lower-middle', eyeStyle: 'smallDots', browStyle: 'heavy', mouthStyle: 'tinyFrown', bodyTilt: 0, propBehavior: 'clutched close', expressionWeight: 'heavy brows + tiny frown', moodRead: 'The brow does the grump work while the soft shape keeps it cute.' },
  hopeful: { label: 'hopeful', face: 'wide eyes, tiny smile, one sparkle or soft cheek mark', pose: 'reaching forward just a little', faceZone: 'lower-middle', eyeStyle: 'wideSoft', browStyle: 'softLift', mouthStyle: 'smallSmile', bodyTilt: 4, propBehavior: 'offered forward', expressionWeight: 'wide eyes + tiny smile + reach', moodRead: 'A small reach and open eyes make the mascot feel like it believes in the tiny spark.' },
  blank: { label: 'blank-faced', face: 'simple dots or one dot plus one X, expression painfully unreadable', pose: 'standing still while something absurd happens nearby', faceZone: 'center', eyeStyle: 'blankDots', browStyle: 'none', mouthStyle: 'flatLine', bodyTilt: 0, propBehavior: 'odd thing does the acting', expressionWeight: 'stillness + simple dot eyes', moodRead: 'The joke comes from the mascot not reacting while the weird thing does too much.' },
  secret: { label: 'secretly powerful', face: 'small calm smile, one strange eye symbol, quiet confidence', pose: 'still body, odd thing floating or glowing nearby', faceZone: 'center', eyeStyle: 'starCalm', browStyle: 'none', mouthStyle: 'tinySmile', bodyTilt: 0, propBehavior: 'floating close', expressionWeight: 'calm face + one strange eye symbol', moodRead: 'Stillness plus one magical eye makes it feel quietly dangerous.' },
  tinyPanic: { label: 'tiny panic', face: 'wide uneven eyes, tiny open mouth', pose: 'leaning backward like the prop got too close', faceZone: 'middle-high', eyeStyle: 'panicWide', browStyle: 'worriedHigh', mouthStyle: 'openOval', bodyTilt: -10, propBehavior: 'too close or too big', expressionWeight: 'wide eyes + open mouth + backward tilt', moodRead: 'Big eyes and a backward lean make a small problem feel urgent.' },
  smug: { label: 'smug', face: 'half-lidded eyes, one raised brow, tiny curved smile', pose: 'tilted like it knows something', faceZone: 'upper-middle', eyeStyle: 'halfLidded', browStyle: 'oneRaised', mouthStyle: 'smirk', bodyTilt: 5, propBehavior: 'held casually', expressionWeight: 'half-lidded eyes + smirk', moodRead: 'A tiny smirk and one raised brow make the mascot look annoyingly pleased.' },
  melancholyCute: { label: 'melancholy-cute', face: 'low droopy eyes, soft frown, tired cheeks', pose: 'compressed and slightly sinking', faceZone: 'lower third', eyeStyle: 'droopy', browStyle: 'softWorry', mouthStyle: 'softFrown', bodyTilt: -2, propBehavior: 'low and near the body', expressionWeight: 'droopy eyes + downward mouth + low face', moodRead: 'Downward curves and a low face create soft sadness without complexity.' },
  feralCute: { label: 'feral-cute', face: 'big eyes, tiny fang or bitey mouth', pose: 'leaning forward with round-body chaos', faceZone: 'middle', eyeStyle: 'bigFeral', browStyle: 'sharpCute', mouthStyle: 'fang', bodyTilt: 7, propBehavior: 'close to the face', expressionWeight: 'big eyes + one tiny fang + forward lean', moodRead: 'Round body plus one sharp detail makes it cute but bitey.' },
  tooOfficial: { label: 'too official', face: 'serious dot eyes, flat mouth, no nonsense', pose: 'stiff and upright', faceZone: 'center', eyeStyle: 'seriousDots', browStyle: 'flat', mouthStyle: 'flatLine', bodyTilt: 0, propBehavior: 'front-center like a badge or sign', expressionWeight: 'stiff posture + flat mouth + serious dots', moodRead: 'A rigid pose makes the tiny mascot look hilariously overqualified.' },
  secretlyGuilty: { label: 'secretly guilty', face: 'side-looking eyes, tiny nervous mouth', pose: 'angled away from the evidence', faceZone: 'middle', eyeStyle: 'guiltySide', browStyle: 'worriedSoft', mouthStyle: 'wobble', bodyTilt: -7, propBehavior: 'slightly hidden or behind the body', expressionWeight: 'side glance + tiny wobble mouth', moodRead: 'Eye direction tells the whole secret before any extra detail does.' },
  delightedGoblin: { label: 'delighted goblin', face: 'excited eyes and a too-happy open smile', pose: 'reaching forward like it found treasure', faceZone: 'middle', eyeStyle: 'brightWide', browStyle: 'lifted', mouthStyle: 'openSmile', bodyTilt: 8, propBehavior: 'close and active', expressionWeight: 'wide eyes + open smile + reach', moodRead: 'The reach makes the joy feel physical instead of just facial.' },
  dramaticallyOffended: { label: 'dramatically offended', face: 'arched brows, tiny insulted frown', pose: 'leaning back like the prop said something rude', faceZone: 'upper-middle', eyeStyle: 'offended', browStyle: 'archedAngry', mouthStyle: 'offendedFrown', bodyTilt: 10, propBehavior: 'held like evidence', expressionWeight: 'arched brows + leaned-back pose + offended mouth', moodRead: 'Treat the tiny spark like a scandal and the whole drawing becomes theatrical.' },
  cosmicBlank: { label: 'cosmic blank', face: 'empty dot eyes or one star eye, barely any mouth', pose: 'very still', faceZone: 'center', eyeStyle: 'cosmic', browStyle: 'none', mouthStyle: 'tinyLine', bodyTilt: 0, propBehavior: 'floating nearby', expressionWeight: 'still body + star/dot eyes', moodRead: 'Stillness plus a star eye makes it funny in a quiet, spacey way.' },
  clingy: { label: 'clingy', face: 'worried eyes, tiny pleading smile', pose: 'pressed close to the prop or extra', faceZone: 'lower third', eyeStyle: 'worriedWide', browStyle: 'softWorry', mouthStyle: 'tinySmile', bodyTilt: -4, propBehavior: 'touching the body', expressionWeight: 'worried eyes + prop touching body', moodRead: 'Physical closeness turns the weird thing into a relationship.' },
  overprepared: { label: 'overprepared', face: 'determined eyes, small serious mouth', pose: 'standing proud while carrying too much', faceZone: 'middle', eyeStyle: 'determined', browStyle: 'heavy', mouthStyle: 'smallLine', bodyTilt: 2, propBehavior: 'oversized or stacked', expressionWeight: 'determined eyes + overloaded prop', moodRead: 'One oversized object tells the joke better than many little tools.' },
  softlyHaunted: { label: 'softly haunted', face: 'tired eyes, uncertain tiny mouth', pose: 'floating or slightly sagging', faceZone: 'upper-middle', eyeStyle: 'tiredDots', browStyle: 'none', mouthStyle: 'uncertain', bodyTilt: 2, propBehavior: 'shadow or spark nearby', expressionWeight: 'tired eyes + soft sag + empty space', moodRead: 'Soft shapes and quiet spacing create gentle haunted energy.' },
  sneaky: { label: 'sneaky', face: 'sideways eyes and a tiny smirk', pose: 'peeking or tucked inward', faceZone: 'middle-low', eyeStyle: 'sneakySide', browStyle: 'oneRaised', mouthStyle: 'smirk', bodyTilt: -6, propBehavior: 'partly hidden', expressionWeight: 'side-eye + smirk + partial hiding', moodRead: 'Hiding part of the weird thing creates curiosity with almost no scene.' },
  starstruck: { label: 'starstruck', face: 'one star eye, open tiny smile', pose: 'reaching upward toward the spark', faceZone: 'upper-middle', eyeStyle: 'starstruck', browStyle: 'softLift', mouthStyle: 'openSmile', bodyTilt: 6, propBehavior: 'above or near the face', expressionWeight: 'star eye + upward reach', moodRead: 'The gaze direction points the viewer toward the exciting part.' },
  mildlyCursed: { label: 'mildly cursed', face: 'mismatched eyes, calm tiny mouth', pose: 'normal body with one wrong-feeling detail', faceZone: 'center', eyeStyle: 'mismatched', browStyle: 'none', mouthStyle: 'tinyLine', bodyTilt: 0, propBehavior: 'one off-detail', expressionWeight: 'mismatched eyes + calm mouth', moodRead: 'One wrong detail is funny. Five wrong details is a drawer accident.' }
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


const paletteFamilies = {
  milkglassToybox: { name: 'Milkglass Toybox', colors: { body: '#F3DDCF', accent: '#E59C87', face: '#352A39', prop: '#92ABD7', spark: '#FFD46E', outline: '#2A2230', shadow: '#A593A8', bg: '#ECE6F5' } },
  lostNotebook: { name: 'Lost Notebook', colors: { body: '#E9DFD2', accent: '#D9897D', face: '#2E2A35', prop: '#7A8FB3', spark: '#E0B14B', outline: '#3A3240', shadow: '#8C7A86', bg: '#EEE6DD' } },
  candyDusk: { name: 'Candy Dusk', colors: { body: '#F4B8C8', accent: '#C987D1', face: '#33253E', prop: '#8AB8E8', spark: '#FFE17A', outline: '#2A1E33', shadow: '#8E7A95', bg: '#F6E9F2' } },
  jamBiscuit: { name: 'Jam Biscuit', colors: { body: '#E9C39F', accent: '#C66A74', face: '#402B31', prop: '#8E9AC8', spark: '#F4D86C', outline: '#35272C', shadow: '#9F8680', bg: '#F6E9D9' } },
  signalSticker: { name: 'Signal Sticker', colors: { body: '#B7D7FB', accent: '#FF8BA8', face: '#2B2940', prop: '#FFD166', spark: '#7CF0D6', outline: '#232437', shadow: '#7C8EAE', bg: '#EAF2FF' } },
  velvetFog: { name: 'Velvet Fog', colors: { body: '#C9C2E1', accent: '#8D7AAF', face: '#261F34', prop: '#7DA1C8', spark: '#F3C766', outline: '#1E1828', shadow: '#7D7390', bg: '#E8E3F0' } },
  mossRelic: { name: 'Moss Relic', colors: { body: '#C7D2B1', accent: '#6F8A6E', face: '#2D2D2A', prop: '#9AA4D6', spark: '#F4C96D', outline: '#262824', shadow: '#7F8A78', bg: '#E6EAD9' } },
  moonSticker: { name: 'Moon Sticker', colors: { body: '#C9D5F4', accent: '#8E93C9', face: '#24283B', prop: '#F4B5D0', spark: '#FAE37F', outline: '#1F2230', shadow: '#7C84A5', bg: '#EEF2FB' } },
  spookySyrup: { name: 'Spooky Syrup', colors: { body: '#B7A8C7', accent: '#714D85', face: '#1F1B2C', prop: '#D48C9D', spark: '#7CE0CB', outline: '#181520', shadow: '#62586E', bg: '#E8DFF0' } },
  peachStatic: { name: 'Peach Static', colors: { body: '#F3C8B8', accent: '#F38A73', face: '#312630', prop: '#8ECFE0', spark: '#FFE07A', outline: '#2A202A', shadow: '#AA8D8B', bg: '#FBEEE7' } },
  chalkToy: { name: 'Chalk Toy', colors: { body: '#DCDAD4', accent: '#A8B8C2', face: '#34323A', prop: '#D58FA3', spark: '#E3C46A', outline: '#29272E', shadow: '#9D9A99', bg: '#F2F1ED' } },
  beetleBerry: { name: 'Beetle Berry', colors: { body: '#D8A1BA', accent: '#8C3A61', face: '#241B29', prop: '#7AA8A1', spark: '#FFCB6B', outline: '#1D1621', shadow: '#806278', bg: '#F1DFE8' } }
};

const lanePaletteMap = {
  object: ['lostNotebook', 'chalkToy', 'signalSticker', 'peachStatic'],
  food: ['jamBiscuit', 'peachStatic', 'candyDusk', 'milkglassToybox'],
  symbol: ['signalSticker', 'moonSticker', 'candyDusk', 'velvetFog'],
  ghost: ['velvetFog', 'spookySyrup', 'moonSticker', 'milkglassToybox'],
  stationery: ['lostNotebook', 'chalkToy', 'signalSticker', 'peachStatic'],
  weather: ['moonSticker', 'signalSticker', 'velvetFog', 'candyDusk'],
  plant: ['mossRelic', 'milkglassToybox', 'peachStatic', 'chalkToy'],
  charm: ['candyDusk', 'moonSticker', 'milkglassToybox', 'beetleBerry']
};

const moodPaletteMap = {
  bashful: ['milkglassToybox', 'candyDusk', 'moonSticker'],
  dramatic: ['beetleBerry', 'jamBiscuit', 'signalSticker'],
  sleepy: ['velvetFog', 'moonSticker', 'chalkToy'],
  suspicious: ['mossRelic', 'spookySyrup', 'signalSticker'],
  proud: ['jamBiscuit', 'signalSticker', 'beetleBerry'],
  confused: ['chalkToy', 'signalSticker', 'candyDusk'],
  grumpy: ['spookySyrup', 'mossRelic', 'velvetFog'],
  hopeful: ['milkglassToybox', 'peachStatic', 'moonSticker'],
  blank: ['chalkToy', 'velvetFog', 'lostNotebook'],
  secret: ['moonSticker', 'spookySyrup', 'beetleBerry'],
  tinyPanic: ['signalSticker', 'candyDusk', 'spookySyrup'],
  smug: ['beetleBerry', 'mossRelic', 'signalSticker'],
  melancholyCute: ['velvetFog', 'moonSticker', 'chalkToy'],
  feralCute: ['peachStatic', 'beetleBerry', 'spookySyrup'],
  tooOfficial: ['lostNotebook', 'chalkToy', 'signalSticker'],
  secretlyGuilty: ['lostNotebook', 'spookySyrup', 'velvetFog'],
  delightedGoblin: ['candyDusk', 'signalSticker', 'peachStatic'],
  dramaticallyOffended: ['beetleBerry', 'jamBiscuit', 'candyDusk'],
  cosmicBlank: ['moonSticker', 'velvetFog', 'signalSticker'],
  clingy: ['milkglassToybox', 'candyDusk', 'moonSticker'],
  overprepared: ['jamBiscuit', 'signalSticker', 'lostNotebook'],
  softlyHaunted: ['velvetFog', 'spookySyrup', 'moonSticker'],
  sneaky: ['mossRelic', 'spookySyrup', 'lostNotebook'],
  starstruck: ['moonSticker', 'signalSticker', 'candyDusk'],
  mildlyCursed: ['spookySyrup', 'chalkToy', 'beetleBerry']
};

const palettePartLabels = {
  body: 'Main body',
  accent: 'Accent',
  face: 'Face / features',
  prop: 'Prop / extra',
  spark: 'Weird spark',
  outline: 'Outline',
  shadow: 'Shadow',
  bg: 'Background blob'
};

const palettePartUses = {
  body: 'Use on the main mascot shape.',
  accent: 'Use on patches, cheeks, corners, or secondary body spots.',
  face: 'Use on eyes, mouth, symbols, and tiny marks.',
  prop: 'Use on the held thing, attached object, or tiny job prop.',
  spark: 'Use on the weird little thing so it stands out.',
  outline: 'Use on the outline and darkest little marks.',
  shadow: 'Use for one side shadow or grounding shadow only.',
  bg: 'Optional sticker backing or background blob behind the mascot.'
};

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

function updateSpeciesSelect() {
  const speciesSelect = $('#speciesSelect');
  if (!speciesSelect) return;
  const laneValue = $('#laneSelect')?.value || 'surprise';
  let options = [];

  if (laneValue === 'surprise') {
    options = Object.values(speciesByLane).flat();
  } else {
    options = speciesByLane[laneValue] || [];
  }

  speciesSelect.innerHTML = [
    '<option value="surprise">Surprise me</option>',
    ...options.map((item) => `<option value="${item}">${titleCase(item)}</option>`)
  ].join('');

  const hint = $('#speciesHint');
  if (hint) hint.textContent = speciesHints[laneValue] || speciesHints.surprise;
}

function updateTwistSelect() {
  const twistSelect = $('#twistSelect');
  if (!twistSelect) return;
  const sparkValue = $('#sparkSelect')?.value || 'surprise';
  let options = [];

  if (sparkValue === 'surprise') {
    options = Object.values(twistsBySpark).flat();
  } else {
    options = twistsBySpark[sparkValue] || [];
  }

  twistSelect.innerHTML = [
    '<option value="surprise">Surprise me</option>',
    ...options.map((item) => `<option value="${escapeHtml(item)}">${titleCase(item)}</option>`)
  ].join('');
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
    updateSpeciesSelect();
    $('#speciesSelect').value = 'surprise';
    $('#moodSelect').value = 'surprise';
    $('#sparkSelect').value = 'surprise';
    updateTwistSelect();
    $('#twistSelect').value = 'surprise';
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
  const speciesChoice = $('#speciesSelect')?.value || 'surprise';
  const mascot = speciesChoice !== 'surprise' ? speciesChoice : choice(mascotPool);
  const speciesBlueprint = inferSpeciesBlueprint(mascot, lane);
  const mood = moodData[moodKey];
  const extra = choice(extraPool);
  const spark = sparkData[sparkKey];
  const twistChoice = $('#twistSelect')?.value || 'surprise';
  const allTwists = Object.values(twistsBySpark).flat();
  const twist = twistChoice !== 'surprise'
    ? twistChoice
    : choice(twistsBySpark[sparkKey] || allTwists);
  const template = choice(spark.templates);
  const baseOddThing = template.replaceAll('{extra}', extra);
  const oddThing = twist
    ? `${baseOddThing}. Tiny twist: ${twist}`
    : baseOddThing;

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
    speciesChoice,
    mascot,
    species: mascot,
    blueprintSpecies: speciesBlueprint,
    moodKey,
    mood: mood.label,
    sparkKey,
    spark: spark.label,
    twistChoice,
    twist,
    shapeLimit,
    extra,
    title,
    idea: `Draw a ${mood.label} ${mascot} mascot. ${capitalize(oddThing)}. ${energy.extraLine}`,
    oddThing: capitalize(oddThing),
    build,
    poseCue: `${mood.pose}. Expression cue: ${mood.face}.`,
    guardrail: guardrailFor(lane, sparkKey, mutate),
    drawFirst: speciesBlueprint.bodyHint || drawFirstFor(lane, mascot),
    whyWorks: whyWorksFor({ mascot, extra, spark: spark.label }),
    pack: packKey,
    energy: energyKey,
    coach: choice(coachLines),
    tinyVersion: makeTinyVersion({ lane, mascot, extra, mood: mood.label }),
    oddletVersion: makeOddletVersion({ lane, mascot, extra, mood: mood.label, spark: spark.label }),
    extraWeirdVersion: makeExtraWeirdVersion({ lane, mascot, extra, mood: mood.label, spark: spark.label }),
    commentary: makeCommentary({ mascot, extra, spark: spark.label, mood: mood.label, energy: energy.label }),
    blueprint: null,
    paletteMode: 'base',
    palette: null,
    status: 'rolled',
    notes: ''
  };

  currentCard.blueprint = buildBlueprintIntelligence(currentCard);
  currentCard.palette = buildPalettePlacement(currentCard);

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
  updateSpeciesSelect();
  const dailySpecies = speciesByLane[$('#laneSelect').value] || [];
  $('#speciesSelect').value = dailySpecies.length ? seededPick(dailySpecies.map((item) => ({ value: item })), `${today}:species`).value : 'surprise';
  $('#moodSelect').value = seededPick(moods.filter(x => x.value !== 'surprise'), `${today}:mood`).value;
  $('#sparkSelect').value = seededPick(sparks.filter(x => x.value !== 'surprise'), `${today}:spark`).value;
  updateTwistSelect();
  const dailyTwists = twistsBySpark[$('#sparkSelect').value] || [];
  $('#twistSelect').value = dailyTwists.length ? seededPick(dailyTwists.map((item) => ({ value: item })), `${today}:twist`).value : 'surprise';
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
  card.drawFirst = (card.blueprintSpecies || inferSpeciesBlueprint(card.species || card.mascot, card.lane)).bodyHint || drawFirstFor(card.lane, card.mascot);
  card.whyWorks = whyWorksFor(card);
  card.blueprint = buildBlueprintIntelligence(card);
  card.paletteMode = card.paletteMode || 'base';
  card.palette = buildPalettePlacement(card);
  return card;
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3 ? clean.split('').map((x) => x + x).join('') : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = h / 360;
  return {
    r: hue2rgb(p, q, hk + 1/3) * 255,
    g: hue2rgb(p, q, hk) * 255,
    b: hue2rgb(p, q, hk - 1/3) * 255
  };
}

function adjustHex(hex, { h = 0, s = 0, l = 0 } = {}) {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  const rgb = hslToRgb(hsl.h + h, Math.max(0, Math.min(100, hsl.s + s)), Math.max(0, Math.min(100, hsl.l + l)));
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function choosePaletteFamily(card) {
  const laneList = lanePaletteMap[card.lane] || Object.keys(paletteFamilies);
  const moodList = moodPaletteMap[card.moodKey] || [];
  const candidates = [...new Set([...laneList, ...moodList])].map((key) => paletteFamilies[key]).filter(Boolean);
  return seededPick(candidates.length ? candidates : Object.values(paletteFamilies), `${card.mascot}|${card.moodKey}|${card.sparkKey}|${card.pack || ''}`);
}

function transformPaletteColors(colors, mode = 'base') {
  const next = { ...colors };
  if (mode === 'base') return next;
  const applyAll = (delta) => Object.keys(next).forEach((key) => { next[key] = adjustHex(next[key], delta); });
  if (mode === 'softer') {
    ['body', 'accent', 'prop', 'spark', 'bg'].forEach((key) => { next[key] = adjustHex(next[key], { s: -10, l: 8 }); });
    next.shadow = adjustHex(next.shadow, { s: -8, l: 6 });
  } else if (mode === 'darker') {
    ['body', 'accent', 'prop', 'bg'].forEach((key) => { next[key] = adjustHex(next[key], { l: -12, s: 4 }); });
    next.spark = adjustHex(next.spark, { l: -6, s: 6 });
    next.face = adjustHex(next.face, { l: -4 });
    next.outline = adjustHex(next.outline, { l: -6 });
  } else if (mode === 'colorful') {
    applyAll({ s: 12 });
    next.body = adjustHex(next.body, { l: 3 });
    next.spark = adjustHex(next.spark, { s: 18, l: 4 });
    next.accent = adjustHex(next.accent, { s: 18 });
  } else if (mode === 'muted') {
    applyAll({ s: -20 });
    next.spark = adjustHex(next.spark, { s: -8, l: 2 });
    next.outline = adjustHex(next.outline, { l: 2 });
  } else if (mode === 'spooky') {
    ['body', 'accent', 'prop', 'bg'].forEach((key) => { next[key] = adjustHex(next[key], { h: 12, s: -2, l: -8 }); });
    next.spark = adjustHex(next.spark, { h: 25, s: -4, l: -6 });
    next.face = adjustHex(next.face, { h: 8, l: -6 });
    next.outline = adjustHex(next.outline, { h: 8, l: -10 });
    next.shadow = adjustHex(next.shadow, { h: 10, l: -8 });
  } else if (mode === 'sticker') {
    next.body = adjustHex(next.body, { s: 10, l: 10 });
    next.accent = adjustHex(next.accent, { s: 18, l: 4 });
    next.prop = adjustHex(next.prop, { s: 12, l: 6 });
    next.spark = adjustHex(next.spark, { s: 22, l: 6 });
    next.bg = adjustHex(next.bg, { l: 12, s: 2 });
    next.outline = '#201B27';
    next.face = '#2A2330';
    next.shadow = adjustHex(next.shadow, { s: -10, l: 4 });
  }
  return next;
}

function colorWhisperFor(card, mode, paletteName) {
  if (mode === 'sticker') return `Sticker simple mode: use clean flat fills, keep the outline darkest, and let the weird thing be the pop color in ${paletteName}.`;
  if (mode === 'spooky') return 'Spookier mode: let the body stay moodier, keep the face dark, and use the spark color only where you want the eye to go first.';
  if (card.sparkKey === 'wrongScale') return 'Let the oversized prop stay bolder than the body so the size joke reads fast.';
  if (card.sparkKey === 'tinyCompanion') return 'Keep the companion or weird spark brighter than the body, but much smaller.';
  if (card.moodKey === 'bashful' || card.moodKey === 'hopeful') return 'Keep the body soft. Use the darkest color only on the face and outline.';
  if (card.moodKey === 'dramatic' || card.moodKey === 'proud') return 'Let the prop or weird spark hold the loudest color. The body can stay calmer.';
  if (mode === 'muted') return 'If the palette starts feeling muddy, remove one accent and let the outline do more work.';
  return 'Let the weird thing be the brightest color. Keep the outline darkest and use the shadow only once.';
}

function buildPalettePlacement(card) {
  const family = choosePaletteFamily(card);
  const mode = card.paletteMode || 'base';
  const colors = transformPaletteColors(family.colors, mode);
  return {
    family: family.name,
    mode,
    ...colors,
    whisper: colorWhisperFor(card, mode, family.name)
  };
}

function paletteModeLabel(mode) {
  const labels = {
    base: 'base palette',
    softer: 'softer palette',
    darker: 'darker palette',
    colorful: 'more colorful palette',
    muted: 'more muted palette',
    spooky: 'spookier palette',
    sticker: 'sticker simple palette'
  };
  return labels[mode] || 'base palette';
}

function renderPalettePlacement(card) {
  const palette = card?.palette || buildPalettePlacement(card);
  if (card) card.palette = palette;
  $('#paletteName').textContent = palette.family;
  $('#paletteModeTag').textContent = paletteModeLabel(palette.mode);
  $('#paletteWhisper').textContent = palette.whisper;
  const order = ['body', 'accent', 'face', 'prop', 'spark', 'outline', 'shadow', 'bg'];
  $('#paletteSwatches').innerHTML = order.map((key) => `
    <div class="palette-swatch">
      <span class="palette-chip" style="background:${palette[key]}"></span>
      <b>${palettePartLabels[key]}</b>
      <small>${palette[key]}</small>
    </div>
  `).join('');
  $('#paletteAssignments').innerHTML = order.map((key) => `
    <div class="palette-assign">
      <div class="palette-assign-top"><span class="palette-dot" style="background:${palette[key]}"></span><b>${palettePartLabels[key]}</b></div>
      <p>${palettePartUses[key]}</p>
      <small>${palette[key]}</small>
    </div>
  `).join('');
}

function handlePaletteRemix(event) {
  const button = event.target.closest('button[data-palette]');
  if (!button || !currentCard) return;
  currentCard.paletteMode = button.dataset.palette;
  currentCard.palette = buildPalettePlacement(currentCard);
  renderPalettePlacement(currentCard);
  showToast(`${paletteModeLabel(currentCard.paletteMode)} applied.`);
}

function buildBlueprintIntelligence(card) {
  const lane = String(card?.lane || '').toLowerCase();
  const mascot = String(card?.mascot || '').toLowerCase();
  const sparkKey = String(card?.sparkKey || '').toLowerCase();
  const sparkLabel = String(card?.spark || '').toLowerCase();
  const mood = String(card?.mood || '').toLowerCase();
  const moodKey = card?.moodKey || '';
  const moodRule = moodData[moodKey];
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
    doNotAdd: ['background', 'shoes', 'extra face', 'second prop'],
    moodRead: 'The face, tilt, and prop placement reveal the mood.'
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

  const speciesRules = card?.blueprintSpecies || inferSpeciesBlueprint(card?.species || card?.mascot, card?.lane);
  if (speciesRules) {
    blueprint.primarySilhouette = speciesRules.bodyLabel || blueprint.primarySilhouette;
    blueprint.faceZone = speciesRules.faceZone || blueprint.faceZone;
    blueprint.propAnchor = speciesRules.propAnchor || blueprint.propAnchor;
    blueprint.easiestStartingShape = speciesRules.bodyHint || blueprint.easiestStartingShape;
    blueprint.weirdThingPlacement = speciesRules.weirdZone || blueprint.weirdThingPlacement;
    blueprint.doNotAdd = [...new Set([...(speciesRules.avoid || []), ...(blueprint.doNotAdd || [])])].slice(0, 5);
  }

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

  if (moodRule) {
    blueprint.faceZone = moodRule.faceZone || blueprint.faceZone;
    blueprint.expressionWeight = moodRule.expressionWeight || blueprint.expressionWeight;
    blueprint.moodRead = moodRule.moodRead || blueprint.moodRead;
    if (moodRule.propBehavior) blueprint.propAnchor = moodRule.propBehavior;
  }

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

  if (speciesRules) {
    blueprint.primarySilhouette = speciesRules.bodyLabel || blueprint.primarySilhouette;
    blueprint.easiestStartingShape = speciesRules.bodyHint || blueprint.easiestStartingShape;
    blueprint.weirdThingPlacement = speciesRules.weirdZone || blueprint.weirdThingPlacement;
    if (!moodRule?.faceZone) blueprint.faceZone = speciesRules.faceZone || blueprint.faceZone;
    if (!moodRule?.propBehavior) blueprint.propAnchor = speciesRules.propAnchor || blueprint.propAnchor;
    blueprint.doNotAdd = [...new Set([...(speciesRules.avoid || []), ...(blueprint.doNotAdd || [])])].slice(0, 5);
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
  $('#blueMoodRead').textContent = blueprint.moodRead || 'The face, tilt, and prop placement reveal the mood.';
  const speciesBlueprint = card?.blueprintSpecies || inferSpeciesBlueprint(card?.species || card?.mascot, card?.lane);
  $('#blueSpeciesBodyNote').textContent = getSpeciesBodyNote(speciesBlueprint);
  const twistRule = getTwistBlueprintRule(card?.twist);
  const blueTwistNote = $('#blueTwistNote');
  if (blueTwistNote) blueTwistNote.textContent = twistRule.note;
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
  renderPalettePlacement(currentCard);
}

function moodVisualFor(card) {
  const rule = moodData[card?.moodKey] || moodData.blank;
  const propMap = {
    'held close': { x: 190, y: 150, scale: 0.82 },
    'presented like evidence': { x: 218, y: 120, scale: 1.05 },
    'drooping nearby': { x: 208, y: 166, scale: 0.86 },
    'inspected from a slight distance': { x: 224, y: 138, scale: 0.9 },
    'trophy pose': { x: 216, y: 116, scale: 1 },
    'nearby but emotionally unclear': { x: 218, y: 150, scale: 0.9 },
    'clutched close': { x: 190, y: 148, scale: 0.78 },
    'offered forward': { x: 218, y: 138, scale: 1 },
    'odd thing does the acting': { x: 216, y: 144, scale: 1.05 },
    'floating close': { x: 210, y: 92, scale: 0.9 },
    'too close or too big': { x: 202, y: 132, scale: 1.32 },
    'held casually': { x: 214, y: 148, scale: 0.88 },
    'low and near the body': { x: 192, y: 166, scale: 0.8 },
    'close to the face': { x: 206, y: 116, scale: 0.92 },
    'front-center like a badge or sign': { x: 160, y: 158, scale: 0.82 },
    'slightly hidden or behind the body': { x: 218, y: 160, scale: 0.72, opacity: 0.7 },
    'close and active': { x: 216, y: 126, scale: 1 },
    'held like evidence': { x: 222, y: 124, scale: 1.05 },
    'floating nearby': { x: 214, y: 94, scale: 0.88 },
    'touching the body': { x: 188, y: 148, scale: 0.78 },
    'oversized or stacked': { x: 214, y: 130, scale: 1.26 },
    'shadow or spark nearby': { x: 210, y: 156, scale: 0.82, opacity: 0.82 },
    'partly hidden': { x: 208, y: 164, scale: 0.74, opacity: 0.76 },
    'above or near the face': { x: 206, y: 88, scale: 0.94 },
    'one off-detail': { x: 204, y: 148, scale: 0.88 }
  };
  const prop = propMap[rule.propBehavior] || { x: 206, y: 146, scale: 1 };
  return {
    ...rule,
    faceY: rule.faceZone?.includes('lower') ? 10 : rule.faceZone?.includes('upper') ? -8 : 0,
    prop,
    tilt: rule.bodyTilt || 0
  };
}

function renderMoodFace(card, ink = '#111426', blue = '#91b7ff') {
  const visual = moodVisualFor(card);
  const y = visual.faceY || 0;
  const eye = (x, y0, r = 8) => `<circle cx="${x}" cy="${y0 + y}" r="${r}" fill="${ink}" />`;
  const line = (d, w = 6) => `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" />`;
  const brows = {
    none: '',
    softWorry: `${line(`M122 ${96+y} q10 -7 22 0`, 4)}${line(`M178 ${96+y} q10 -7 22 0`, 4)}`,
    arched: `${line(`M118 ${94+y} q16 -14 34 -2`, 4)}${line(`M176 ${92+y} q18 -10 36 4`, 4)}`,
    archedAngry: `${line(`M118 ${94+y} q18 -12 36 4`, 4)}${line(`M176 ${98+y} q18 -16 36 -4`, 4)}`,
    oneRaised: `${line(`M118 ${96+y} q16 -6 34 0`, 4)}${line(`M180 ${88+y} q16 -12 34 -2`, 4)}`,
    lifted: `${line(`M120 ${92+y} q16 -8 32 -2`, 4)}${line(`M178 ${92+y} q16 -8 32 -2`, 4)}`,
    tilted: `${line(`M120 ${94+y} l30 8`, 4)}${line(`M180 ${102+y} l30 -8`, 4)}`,
    heavy: `${line(`M118 ${96+y} l34 -8`, 6)}${line(`M178 ${88+y} l34 8`, 6)}`,
    softLift: `${line(`M120 ${92+y} q16 -10 32 -4`, 4)}${line(`M178 ${92+y} q16 -10 32 -4`, 4)}`,
    flat: `${line(`M118 ${94+y} h34`, 5)}${line(`M178 ${94+y} h34`, 5)}`,
    worriedHigh: `${line(`M118 ${86+y} q14 -12 32 -2`, 4)}${line(`M180 ${86+y} q14 -12 32 -2`, 4)}`,
    sharpCute: `${line(`M118 ${94+y} l32 -10`, 4)}${line(`M180 ${84+y} l32 10`, 4)}`
  };
  const mouth = {
    tinySmile: line(`M150 ${148+y} q12 8 26 0`, 6),
    smallSmile: line(`M150 ${146+y} q14 10 30 0`, 6),
    openOval: `<ellipse cx="163" cy="148" rx="10" ry="13" fill="${ink}" />`,
    softLine: line(`M150 ${149+y} q13 4 28 0`, 5),
    flatLine: line(`M150 ${150+y} h28`, 6),
    smallOpen: `<ellipse cx="164" cy="149" rx="8" ry="9" fill="${ink}" />`,
    tinyFrown: line(`M150 ${154+y} q14 -8 28 0`, 6),
    smirk: line(`M150 ${150+y} q18 10 34 -2`, 6),
    softFrown: line(`M150 ${154+y} q13 -7 28 0`, 5),
    fang: `${line(`M150 ${148+y} q14 10 30 0`, 6)}<path d="M164 ${153+y} l5 11 l5 -11" fill="#fff8f1" stroke="${ink}" stroke-width="3" />`,
    wobble: line(`M150 ${150+y} q8 -5 16 0 t16 0`, 5),
    openSmile: `<path d="M148 ${143+y} q15 24 34 0 q-5 19 -17 20 q-12 -1 -17 -20z" fill="${ink}" />`,
    offendedFrown: line(`M150 ${154+y} q14 -10 30 0`, 6),
    tinyLine: line(`M154 ${150+y} h18`, 5),
    smallLine: line(`M154 ${149+y} h22`, 5),
    uncertain: line(`M150 ${151+y} q10 -4 18 2 t16 -2`, 5)
  };
  const eyes = {
    lowDots: `${eye(132, 118, 8)}${eye(186, 118, 8)}`,
    wide: `${eye(130, 110, 12)}${eye(190, 110, 12)}`,
    halfLidded: `${line(`M120 ${112+y} q15 8 30 0`, 7)}${line(`M178 ${112+y} q15 8 30 0`, 7)}`,
    sideEye: `${line(`M120 ${112+y} q16 -7 32 0`, 7)}${eye(190, 112, 7)}`,
    confidentDots: `${eye(132, 106, 7)}${eye(188, 106, 7)}`,
    uneven: `${eye(128, 110, 10)}${eye(190, 118, 7)}`,
    smallDots: `${eye(132, 116, 7)}${eye(188, 116, 7)}`,
    wideSoft: `${eye(130, 112, 11)}${eye(190, 112, 11)}`,
    blankDots: `${eye(132, 112, 7)}<path d="M184 ${104+y} l18 18 M202 ${104+y} l-18 18" stroke="${ink}" stroke-width="7" stroke-linecap="round" />`,
    starCalm: `${eye(132, 112, 10)}<path d="M190 ${100+y} l5 10 l11 2 l-8 7 l2 11 l-10 -6 l-10 6 l2 -11 l-8 -7 l11 -2z" fill="${ink}" />`,
    panicWide: `${eye(128, 108, 13)}${eye(194, 114, 10)}`,
    droopy: `${line(`M120 ${116+y} q15 10 30 0`, 7)}${line(`M178 ${118+y} q15 10 30 0`, 7)}`,
    bigFeral: `${eye(130, 110, 13)}${eye(190, 110, 13)}`,
    seriousDots: `${eye(132, 112, 7)}${eye(188, 112, 7)}`,
    guiltySide: `${line(`M122 ${112+y} q15 -3 30 3`, 7)}${line(`M180 ${112+y} q15 -3 30 3`, 7)}`,
    brightWide: `${eye(130, 108, 12)}${eye(190, 108, 12)}<circle cx="134" cy="104" r="4" fill="${blue}" />`,
    offended: `${eye(130, 110, 9)}${eye(190, 110, 9)}`,
    cosmic: `${eye(132, 112, 6)}<path d="M190 ${98+y} l5 12 l13 3 l-10 8 l2 13 l-10 -7 l-11 7 l3 -13 l-10 -8 l13 -3z" fill="${blue}" />`,
    worriedWide: `${eye(130, 114, 11)}${eye(190, 114, 11)}`,
    determined: `${line(`M120 ${112+y} q15 -8 30 0`, 8)}${line(`M178 ${112+y} q15 -8 30 0`, 8)}`,
    tiredDots: `${line(`M124 ${114+y} h20`, 7)}${line(`M182 ${114+y} h20`, 7)}`,
    sneakySide: `${line(`M120 ${112+y} q15 -6 30 0`, 7)}${line(`M178 ${112+y} q15 -6 30 0`, 7)}`,
    starstruck: `<path d="M130 ${98+y} l5 12 l13 3 l-10 8 l2 13 l-10 -7 l-11 7 l3 -13 l-10 -8 l13 -3z" fill="${blue}" />${eye(190, 112, 11)}`,
    mismatched: `${eye(130, 112, 9)}<path d="M184 ${104+y} l18 18 M202 ${104+y} l-18 18" stroke="${ink}" stroke-width="7" stroke-linecap="round" />`
  };
  return `${brows[visual.browStyle] || ''}${eyes[visual.eyeStyle] || eyes.blankDots}${mouth[visual.mouthStyle] || mouth.tinyLine}`;
}

function blueprintPoint(zone) {
  const points = {
    lowerCenter: { x: 160, y: 138 },
    centerLow: { x: 160, y: 132 },
    middleLow: { x: 160, y: 125 },
    frontCenter: { x: 154, y: 123 },
    center: { x: 160, y: 120 },
    middle: { x: 150, y: 120 },
    lowerCurve: { x: 162, y: 145 },
    seedCenter: { x: 160, y: 146 },
    frontLow: { x: 160, y: 138 },
    plainArea: { x: 152, y: 120 },
    insideSymbol: { x: 160, y: 125 },
    largestMass: { x: 160, y: 140 },
    lowerThird: { x: 160, y: 145 },
    topRight: { x: 205, y: 76 },
    topLeft: { x: 112, y: 82 },
    topCenter: { x: 160, y: 58 },
    topEdge: { x: 160, y: 78 },
    upperCurve: { x: 190, y: 80 },
    foldedCorner: { x: 198, y: 88 },
    handleSide: { x: 212, y: 122 },
    topLoop: { x: 160, y: 58 },
    sideFloat: { x: 224, y: 118 },
    underCloud: { x: 160, y: 171 },
    leafTip: { x: 200, y: 94 },
    eraserEnd: { x: 104, y: 120 },
    toolEnd: { x: 210, y: 120 },
    upperRight: { x: 205, y: 82 },
    floatingNear: { x: 218, y: 104 },
    surfacePatch: { x: 190, y: 135 },
    buttonHole: { x: 177, y: 139 },
    rim: { x: 160, y: 88 },
    waxDrip: { x: 144, y: 104 },
    crustCorner: { x: 198, y: 86 },
    seedSpot: { x: 178, y: 126 },
    gridCell: { x: 178, y: 105 },
    dot: { x: 162, y: 174 },
    onePoint: { x: 179, y: 98 },
    lowerEdge: { x: 170, y: 176 },
    furTuft: { x: 145, y: 82 },
    woodTip: { x: 211, y: 120 },
    cornerCurl: { x: 198, y: 90 },
    raindrop: { x: 158, y: 171 },
    insideDrop: { x: 160, y: 120 },
    leafMark: { x: 196, y: 105 },
    sideArm: { x: 198, y: 126 },
    spinePatch: { x: 174, y: 113 },
    bottomRim: { x: 160, y: 164 },
    engraving: { x: 160, y: 128 },
    capEdge: { x: 190, y: 88 },
    capSpot: { x: 145, y: 84 },
    symbolTip: { x: 196, y: 94 },
    edgeWobble: { x: 115, y: 160 },
    labelPatch: { x: 160, y: 132 },
    orbitDetail: { x: 215, y: 104 },
    innerCurve: { x: 174, y: 128 },
    eyePatch: { x: 184, y: 116 },
    keyTeeth: { x: 206, y: 126 },
    toeEnd: { x: 198, y: 142 },
    heelPatch: { x: 138, y: 142 },
    knot: { x: 160, y: 120 },
    clockHand: { x: 160, y: 120 },
    petalEdge: { x: 196, y: 112 },
    capPattern: { x: 160, y: 100 },
    ringEnd: { x: 114, y: 120 },
    flapCenter: { x: 160, y: 112 },
    flagSide: { x: 214, y: 92 },
    bowlShine: { x: 150, y: 92 },
    knobSpot: { x: 196, y: 134 },
    butteryStripe: { x: 160, y: 106 },
    seaweedPatch: { x: 160, y: 160 },
    bubbleTail: { x: 202, y: 164 },
    bladeTip: { x: 204, y: 90 },
    wrapperBand: { x: 160, y: 122 },
    innerHole: { x: 160, y: 120 },
    spiralCenter: { x: 160, y: 120 },
    tapeEdge: { x: 205, y: 104 },
    folderTab: { x: 134, y: 84 },
    lightningBend: { x: 162, y: 118 },
    tornadoTip: { x: 160, y: 176 },
    umbrellaHandle: { x: 160, y: 178 },
    seedLabel: { x: 160, y: 116 },
    cloverCenter: { x: 160, y: 132 },
    rosetteCenter: { x: 160, y: 128 },
    pendantLoop: { x: 160, y: 70 },
    wishboneFork: { x: 160, y: 104 },
    glowRing: { x: 160, y: 120 },
    sideAttach: { x: 214, y: 132 },
    underBody: { x: 160, y: 194 },
    bottomEdge: { x: 160, y: 176 },
    faceZone: { x: 160, y: 122 },
  };
  return points[zone] || points.center;
}

function blueprintBodySvg(shape, colors) {
  const { mint, primary, pink, blue } = colors;
  const atlas = (inner) => `<g transform="translate(84 48) scale(1.48)">${inner}</g>`;
  const bodies = {
    envelope: atlas(`
      <rect x="18" y="24" width="68" height="48" rx="8" class="bp-body"/>
      <path d="M20 28 L52 52 L84 28" class="bp-detail"/>
      <path d="M20 70 L45 48" class="bp-detail"/>
      <path d="M84 70 L59 48" class="bp-detail"/>
    `),
    mailbox: atlas(`
      <path d="M20 64 L20 38 Q20 22 36 22 L68 22 Q84 22 84 38 L84 64 Z" class="bp-body"/>
      <rect x="44" y="64" width="16" height="22" rx="4" class="bp-detail"/>
      <path d="M78 34 L94 34 L94 46 L78 46 Z" class="bp-detail"/>
    `),
    mirror: atlas(`
      <ellipse cx="52" cy="38" rx="26" ry="30" class="bp-body"/>
      <ellipse cx="52" cy="38" rx="18" ry="22" class="bp-detail"/>
      <rect x="47" y="64" width="10" height="26" rx="5" class="bp-body"/>
    `),
    spoon: atlas(`
      <ellipse cx="44" cy="32" rx="20" ry="26" class="bp-body"/>
      <rect x="40" y="54" width="8" height="42" rx="4" class="bp-body"/>
      <path d="M36 26 Q44 18 52 26" class="bp-detail"/>
    `),
    clock: atlas(`
      <circle cx="52" cy="52" r="34" class="bp-body"/>
      <circle cx="52" cy="52" r="26" class="bp-detail"/>
      <path d="M52 52 L52 34" class="bp-detail"/>
      <path d="M52 52 L66 60" class="bp-detail"/>
      <circle cx="52" cy="52" r="3" class="bp-detail"/>
      <path d="M52 22 L52 28 M52 76 L52 82 M22 52 L28 52 M76 52 L82 52" class="bp-detail"/>
    `),
    door: atlas(`
      <path d="M30 84 L30 30 Q30 20 40 20 L66 20 Q76 20 76 30 L76 84 Z" class="bp-body"/>
      <circle cx="66" cy="55" r="4" class="bp-detail"/>
      <path d="M38 84 L38 28" class="bp-detail"/>
    `),
    suitcase: atlas(`
      <rect x="22" y="34" width="64" height="46" rx="10" class="bp-body"/>
      <path d="M42 34 Q42 24 54 24 Q66 24 66 34" class="bp-detail"/>
      <path d="M32 42 L32 76 M76 42 L76 76" class="bp-detail"/>
    `),
    croissant: atlas(`
      <path d="M18 58 Q34 22 56 32 Q76 22 92 58 Q72 48 56 54 Q38 48 18 58 Z" class="bp-body"/>
      <path d="M38 36 Q34 48 38 58" class="bp-detail"/>
      <path d="M56 32 Q52 46 56 58" class="bp-detail"/>
      <path d="M74 36 Q70 48 74 58" class="bp-detail"/>
    `),
    cinnamonRoll: atlas(`
      <circle cx="52" cy="52" r="34" class="bp-body"/>
      <path d="M52 52 m-4 0 q0 -10 12 -10 q14 0 14 14 q0 20 -24 20 q-26 0 -26 -24 q0 -28 30 -28 q30 0 30 30" class="bp-detail"/>
    `),
    riceBall: atlas(`
      <path d="M52 20 Q78 44 82 76 Q52 88 22 76 Q26 44 52 20 Z" class="bp-body"/>
      <path d="M38 66 Q52 58 66 66 L66 82 Q52 88 38 82 Z" class="bp-detail"/>
    `),
    speechBubble: atlas(`
      <path d="M24 28 Q18 28 18 36 L18 60 Q18 68 26 68 L62 68 L78 82 L74 68 L80 68 Q88 68 88 60 L88 36 Q88 28 80 28 Z" class="bp-body"/>
    `),
    warningTriangle: atlas(`
      <path d="M52 18 L88 82 L16 82 Z" class="bp-body"/>
      <path d="M52 38 L52 60" class="bp-detail"/>
      <circle cx="52" cy="70" r="3" class="bp-detail"/>
    `),
    paperclip: atlas(`
      <path d="M42 76 Q24 76 24 58 L24 34 Q24 18 42 18 Q60 18 60 34 L60 68 Q60 88 40 88 Q20 88 20 68 L20 38" class="bp-body"/>
      <path d="M42 28 Q50 28 50 36 L50 66 Q50 76 40 76" class="bp-detail"/>
    `),
    tapeRoll: atlas(`
      <circle cx="52" cy="52" r="34" class="bp-body"/>
      <circle cx="52" cy="52" r="16" class="bp-hole"/>
      <path d="M76 40 Q90 44 88 58 Q82 54 74 56" class="bp-detail"/>
    `),
    scissors: atlas(`
      <circle cx="34" cy="68" r="13" class="bp-body"/>
      <circle cx="58" cy="68" r="13" class="bp-body"/>
      <circle cx="46" cy="54" r="4" class="bp-detail"/>
      <path d="M46 54 L78 24" class="bp-body"/>
      <path d="M46 54 L22 24" class="bp-body"/>
      <path d="M54 50 L82 36" class="bp-detail"/>
      <path d="M38 50 L18 36" class="bp-detail"/>
    `),
    eraser: atlas(`
      <rect x="22" y="34" width="68" height="40" rx="10" class="bp-body"/>
      <rect x="48" y="34" width="20" height="40" rx="3" class="bp-detail"/>
      <path d="M28 42 L42 42" class="bp-detail"/>
    `),
    markerCap: atlas(`
      <path d="M34 28 L72 28 Q78 28 78 36 L78 72 Q78 80 72 80 L34 80 Q28 80 28 72 L28 36 Q28 28 34 28 Z" class="bp-body"/>
      <path d="M32 38 L78 38" class="bp-detail"/>
      <path d="M36 80 L70 80" class="bp-detail"/>
    `),
    folderTab: atlas(`
      <path d="M18 34 L38 34 L46 26 L70 26 L78 34 L88 34 L88 78 L18 78 Z" class="bp-body"/>
      <path d="M18 42 L88 42" class="bp-detail"/>
    `),
    lightningNoodle: atlas(`
      <path d="M58 14 L30 48 L50 48 L38 90 L78 42 L56 42 Z" class="bp-body"/>
      <path d="M52 26 Q46 38 40 48" class="bp-detail"/>
    `),
    tornadoCurl: atlas(`
      <path d="M24 26 Q52 10 82 26 Q66 38 36 38 Q68 46 74 58 Q56 70 38 62 Q50 76 56 88 Q42 84 40 74 Q38 62 50 56 Q30 50 32 40 Q34 30 52 28" class="bp-body"/>
      <path d="M34 32 Q52 42 76 32" class="bp-detail"/>
      <path d="M38 54 Q54 64 72 56" class="bp-detail"/>
    `),
    umbrella: atlas(`
      <path d="M18 54 Q52 18 86 54 Z" class="bp-body"/>
      <path d="M18 54 Q30 62 42 54 Q52 62 62 54 Q74 62 86 54" class="bp-detail"/>
      <path d="M52 54 L52 82 Q52 92 62 86" class="bp-detail"/>
    `),
    seedPacket: atlas(`
      <rect x="28" y="20" width="52" height="68" rx="8" class="bp-body"/>
      <rect x="36" y="36" width="36" height="24" rx="5" class="bp-detail"/>
      <path d="M36 72 L72 72" class="bp-detail"/>
    `),
    clover: atlas(`
      <circle cx="42" cy="42" r="18" class="bp-body"/>
      <circle cx="62" cy="42" r="18" class="bp-body"/>
      <circle cx="52" cy="62" r="18" class="bp-body"/>
      <path d="M52 66 Q48 82 38 88" class="bp-detail"/>
    `),
    succulent: atlas(`
      <path d="M52 18 Q64 42 52 56 Q40 42 52 18 Z" class="bp-body"/>
      <path d="M30 32 Q54 42 52 62 Q32 58 30 32 Z" class="bp-body"/>
      <path d="M74 32 Q72 58 52 62 Q50 42 74 32 Z" class="bp-body"/>
      <path d="M36 62 Q52 48 68 62 Q54 84 36 62 Z" class="bp-body"/>
      <circle cx="52" cy="54" r="5" class="bp-detail"/>
    `),
    pendant: atlas(`
      <circle cx="52" cy="20" r="7" class="bp-detail"/>
      <path d="M52 26 Q78 50 52 86 Q26 50 52 26 Z" class="bp-body"/>
      <path d="M42 52 Q52 44 62 52" class="bp-detail"/>
    `),
    wishbone: atlas(`
      <path d="M52 84 Q50 62 42 48 Q34 34 28 24" class="bp-body"/>
      <path d="M52 84 Q54 62 62 48 Q70 34 76 24" class="bp-body"/>
      <path d="M52 84 Q52 68 52 54" class="bp-detail"/>
    `),
    glowBead: atlas(`
      <circle cx="52" cy="52" r="28" class="bp-body"/>
      <circle cx="52" cy="52" r="38" class="bp-glow"/>
      <path d="M42 38 Q48 30 58 34" class="bp-detail"/>
    `),
    roundedObject: `
      <rect x="105" y="62" width="110" height="112" rx="28"
        fill="rgba(255,255,255,.08)" stroke="${mint}" stroke-width="3"/>
    `,
    snackBlob: `
      <path d="M105 92 C112 54 187 54 205 92 C225 139 193 180 151 178 C109 176 88 135 105 92Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
    `,
    circleButton: `
      <circle cx="160" cy="120" r="58"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <circle cx="143" cy="108" r="5" fill="${mint}"/>
      <circle cx="177" cy="108" r="5" fill="${mint}"/>
      <circle cx="143" cy="139" r="5" fill="${mint}"/>
      <circle cx="177" cy="139" r="5" fill="${mint}"/>
    `,
    cup: `
      <path d="M112 88 H194 L184 166 H124 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M192 105 C226 100 226 145 188 139"
        fill="none" stroke="${mint}" stroke-width="3" stroke-linecap="round"/>
      <path d="M112 88 C132 76 174 76 194 88"
        fill="none" stroke="${blue}" stroke-width="3" stroke-linecap="round"/>
    `,
    candle: `
      <rect x="124" y="82" width="72" height="100" rx="22"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M160 52 C174 70 162 82 160 86 C154 76 145 68 160 52Z"
        fill="rgba(255,255,255,.15)" stroke="${pink}" stroke-width="3"/>
      <path d="M134 94 C139 112 151 99 151 119"
        fill="none" stroke="${mint}" stroke-width="3" stroke-linecap="round"/>
    `,
    toast: `
      <path d="M108 105 C108 65 137 52 160 72 C183 52 212 65 212 105 L212 176 H108 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3" stroke-linejoin="round"/>
    `,
    wedge: `
      <path d="M96 154 C128 82 183 65 224 135 C187 174 137 181 96 154Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M125 145 C152 114 180 105 205 132"
        fill="none" stroke="${mint}" stroke-width="2" stroke-linecap="round"/>
    `,
    waffle: `
      <rect x="106" y="68" width="108" height="108" rx="22"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M142 73 V172 M178 73 V172 M111 104 H209 M111 140 H209"
        stroke="${mint}" stroke-width="2" opacity=".7"/>
    `,
    questionMark: `
      <path d="M133 85 C137 54 187 50 197 82 C206 111 169 113 166 139"
        fill="none" stroke="${primary}" stroke-width="18" stroke-linecap="round"/>
      <circle cx="162" cy="174" r="11" fill="${primary}"/>
    `,
    star: `
      <path d="M160 55 L179 98 L225 101 L190 130 L201 176 L160 151 L119 176 L130 130 L95 101 L141 98 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3" stroke-linejoin="round"/>
    `,
    sheetGhost: `
      <path d="M104 179 V107 C104 72 129 54 160 54 C191 54 216 72 216 107 V179
        C200 164 187 190 170 175 C154 160 139 190 122 175 C114 168 109 174 104 179Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3" stroke-linejoin="round"/>
    `,
    fluffBlob: `
      <path d="M109 128 C83 101 107 72 135 82 C144 52 183 55 190 84 C222 78 235 113 213 135 C226 165 190 188 166 170 C139 194 96 168 109 128Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3"/>
    `,
    pencilStub: `
      <path d="M98 98 H195 L225 120 L195 142 H98 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M195 98 L225 120 L195 142"
        fill="none" stroke="${mint}" stroke-width="3"/>
    `,
    stickyNote: `
      <path d="M106 70 H214 V176 H106 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M184 70 V100 H214"
        fill="none" stroke="${mint}" stroke-width="3"/>
    `,
    cloud: `
      <path d="M101 139 C82 111 106 84 132 94 C141 68 178 64 190 94 C217 91 235 115 218 140 C208 158 122 161 101 139Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3"/>
    `,
    drop: `
      <path d="M160 54 C196 101 211 128 197 156 C184 183 136 183 123 156 C109 128 124 101 160 54Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3"/>
    `,
    sprout: `
      <ellipse cx="160" cy="146" rx="46" ry="36"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M160 111 C140 79 112 86 108 108 C132 116 150 117 160 111Z"
        fill="rgba(255,255,255,.08)" stroke="${mint}" stroke-width="3"/>
      <path d="M160 111 C180 79 208 86 212 108 C188 116 170 117 160 111Z"
        fill="rgba(255,255,255,.08)" stroke="${mint}" stroke-width="3"/>
    `,
    cactus: `
      <path d="M130 172 V99 C130 72 151 62 160 62 C169 62 190 72 190 99 V172 Z"
        fill="rgba(255,255,255,.08)" stroke="${mint}" stroke-width="3"/>
      <path d="M130 120 C104 116 105 150 130 145 M190 112 C217 107 216 143 190 137"
        fill="none" stroke="${mint}" stroke-width="3" stroke-linecap="round"/>
    `,
    bell: `
      <path d="M118 158 C130 143 124 105 133 88 C144 68 176 68 187 88 C196 105 190 143 202 158 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="160" cy="65" r="9" fill="none" stroke="${mint}" stroke-width="3"/>
      <path d="M138 169 H182" stroke="${mint}" stroke-width="3" stroke-linecap="round"/>
    `,
    heart: `
      <path d="M160 178 C116 144 93 119 106 91 C117 67 148 73 160 96 C172 73 203 67 214 91 C227 119 204 144 160 178Z"
        fill="rgba(255,255,255,.08)" stroke="${pink}" stroke-width="3" stroke-linejoin="round"/>
    `,
    mushroom: `
      <path d="M100 112 C105 68 215 68 220 112 C196 127 126 127 100 112Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <rect x="135" y="110" width="50" height="70" rx="22"
        fill="rgba(255,255,255,.08)" stroke="${mint}" stroke-width="3"/>
    `,
    sign: `
      <rect x="103" y="72" width="114" height="84" rx="18"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M160 156 V188" stroke="${mint}" stroke-width="4" stroke-linecap="round"/>
    `,
    crescent: `
      <path d="M195 60 C154 76 132 124 154 170 C118 158 96 127 102 96 C109 60 149 42 195 60Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3"/>
    `,
    mask: `
      <path d="M104 96 C122 62 198 62 216 96 C208 154 187 180 160 180 C133 180 112 154 104 96Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
    `,
    key: `
      <circle cx="122" cy="118" r="32" fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M154 118 H220 M198 118 V138 M214 118 V132" stroke="${mint}" stroke-width="7" stroke-linecap="round"/>
    `,
    sock: `
      <path d="M122 70 H178 V134 C178 158 210 148 212 172 C186 186 132 180 122 150 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
    `,
    bottle: `
      <path d="M140 60 H180 V92 C198 101 205 121 202 172 H118 C115 121 122 101 140 92Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3"/>
      <rect x="132" y="126" width="56" height="30" rx="8" fill="none" stroke="${mint}" stroke-width="3"/>
    `,
    ribbon: `
      <path d="M160 120 C128 84 98 88 96 120 C98 152 128 156 160 120Z"
        fill="rgba(255,255,255,.08)" stroke="${pink}" stroke-width="3"/>
      <path d="M160 120 C192 84 222 88 224 120 C222 152 192 156 160 120Z"
        fill="rgba(255,255,255,.08)" stroke="${pink}" stroke-width="3"/>
      <circle cx="160" cy="120" r="14" fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
    `,
    flower: `
      <circle cx="160" cy="120" r="24" fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <circle cx="160" cy="78" r="22" fill="rgba(255,255,255,.08)" stroke="${pink}" stroke-width="3"/>
      <circle cx="202" cy="120" r="22" fill="rgba(255,255,255,.08)" stroke="${pink}" stroke-width="3"/>
      <circle cx="160" cy="162" r="22" fill="rgba(255,255,255,.08)" stroke="${pink}" stroke-width="3"/>
      <circle cx="118" cy="120" r="22" fill="rgba(255,255,255,.08)" stroke="${pink}" stroke-width="3"/>
    `,
    acorn: `
      <path d="M116 112 C122 72 198 72 204 112 C196 162 178 186 160 186 C142 186 124 162 116 112Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M112 105 C126 76 194 76 208 105 C184 119 136 119 112 105Z"
        fill="rgba(255,255,255,.08)" stroke="${mint}" stroke-width="3"/>
    `,
    symbolIcon: `
      <path d="M160 58 L217 120 L160 182 L103 120 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
    `,
    blob: `
      <path d="M105 126 C88 78 130 52 165 72 C210 48 236 104 210 145 C228 190 145 195 126 166 C98 166 91 145 105 126Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3"/>
    `,
    deskTool: `
      <rect x="105" y="86" width="120" height="74" rx="20"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <path d="M205 86 L230 123 L205 160" fill="none" stroke="${mint}" stroke-width="3"/>
    `,
    weatherBlob: `
      <path d="M100 132 C90 92 128 74 158 88 C186 58 229 91 212 130 C230 162 180 178 154 160 C130 178 90 160 100 132Z"
        fill="rgba(255,255,255,.08)" stroke="${blue}" stroke-width="3"/>
    `,
    plantMass: `
      <path d="M160 186 C126 162 108 128 125 96 C142 64 178 64 195 96 C212 128 194 162 160 186Z"
        fill="rgba(255,255,255,.08)" stroke="${mint}" stroke-width="3"/>
      <path d="M160 98 C136 76 110 82 100 106 C126 112 148 112 160 98Z M160 98 C184 76 210 82 220 106 C194 112 172 112 160 98Z"
        fill="none" stroke="${primary}" stroke-width="3"/>
    `,
    charmIcon: `
      <path d="M160 54 L218 120 L160 186 L102 120 Z"
        fill="rgba(255,255,255,.08)" stroke="${primary}" stroke-width="3"/>
      <circle cx="160" cy="54" r="10" fill="none" stroke="${mint}" stroke-width="3"/>
    `
  };
  return bodies[shape] || bodies.roundedObject;
}

function blueprintFaceSvg(zone, card, colors) {
  const { x, y } = blueprintPoint(zone);
  const ink = colors.ink;
  const blue = colors.blue;
  const moodKey = card?.moodKey || 'blank';
  const line = (d, w = 3) => `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const dot = (cx, cy, r = 4) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${ink}"/>`;
  const brow = (kind = 'soft') => {
    if (kind === 'angry') return `${line(`M${x-24} ${y-16} l18 6`, 3)}${line(`M${x+8} ${y-10} l18 -6`, 3)}`;
    if (kind === 'raised') return `${line(`M${x-24} ${y-16} q10 -8 20 -2`, 3)}${line(`M${x+8} ${y-22} q10 -8 20 -2`, 3)}`;
    if (kind === 'flat') return `${line(`M${x-25} ${y-15} h18`, 3)}${line(`M${x+8} ${y-15} h18`, 3)}`;
    if (kind === 'worried') return `${line(`M${x-25} ${y-18} q10 -6 20 0`, 3)}${line(`M${x+8} ${y-18} q10 -6 20 0`, 3)}`;
    return '';
  };
  const smile = line(`M${x-8} ${y+20} q9 7 20 0`, 3);
  const frown = line(`M${x-8} ${y+23} q10 -7 20 0`, 3);
  const flat = line(`M${x-8} ${y+20} h20`, 3);
  const open = `<ellipse cx="${x+2}" cy="${y+20}" rx="6" ry="8" fill="${ink}"/>`;
  const smirk = line(`M${x-9} ${y+20} q16 9 27 -2`, 3);
  const star = `<path d="M${x+14} ${y-12} l4 8 l9 2 l-7 5 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -5 l9 -2z" fill="${blue}"/>`;

  if (['sleepy', 'melancholyCute', 'softlyHaunted'].includes(moodKey)) {
    return `${brow('worried')}${line(`M${x-26} ${y} q10 6 20 0`, 4)}${line(`M${x+8} ${y} q10 6 20 0`, 4)}${moodKey === 'melancholyCute' ? frown : flat}`;
  }
  if (['suspicious', 'sneaky', 'secretlyGuilty'].includes(moodKey)) {
    return `${brow('raised')}${line(`M${x-26} ${y} q12 -5 24 0`, 4)}${dot(x+18, y+2, 4)}${moodKey === 'sneaky' ? smirk : flat}`;
  }
  if (['dramatic', 'dramaticallyOffended', 'grumpy', 'tinyPanic'].includes(moodKey)) {
    return `${brow(moodKey === 'tinyPanic' ? 'worried' : 'angry')}${dot(x-18, y, moodKey === 'tinyPanic' ? 7 : 5)}${dot(x+18, y+2, moodKey === 'tinyPanic' ? 7 : 5)}${moodKey === 'tinyPanic' ? open : frown}`;
  }
  if (['proud', 'smug', 'tooOfficial', 'overprepared'].includes(moodKey)) {
    return `${brow(moodKey === 'tooOfficial' ? 'flat' : 'raised')}${moodKey === 'smug' ? line(`M${x-26} ${y} q10 5 22 0`, 4) + line(`M${x+8} ${y} q10 5 22 0`, 4) : dot(x-18, y, 4) + dot(x+18, y, 4)}${moodKey === 'smug' ? smirk : flat}`;
  }
  if (['hopeful', 'delightedGoblin', 'starstruck'].includes(moodKey)) {
    return `${brow('soft')}${moodKey === 'starstruck' ? star : dot(x-18, y, 7)}${dot(x+18, y, 7)}${moodKey === 'delightedGoblin' ? open : smile}`;
  }
  if (['feralCute', 'mildlyCursed', 'blank', 'cosmicBlank', 'secret'].includes(moodKey)) {
    const right = moodKey === 'cosmicBlank' || moodKey === 'secret' ? star : `<path d="M${x+10} ${y-7} l15 15 M${x+25} ${y-7} l-15 15" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`;
    const mouth = moodKey === 'feralCute' ? `${smile}<path d="M${x+2} ${y+25} l4 8 l4 -8" fill="#fff8f1" stroke="${ink}" stroke-width="2"/>` : flat;
    return `${dot(x-18, y, moodKey === 'feralCute' ? 7 : 5)}${right}${mouth}`;
  }
  if (['bashful', 'clingy'].includes(moodKey)) {
    return `${brow('worried')}${dot(x-18, y+3, 5)}${dot(x+18, y+3, 5)}${smile}<circle cx="${x-32}" cy="${y+14}" r="5" fill="${colors.pink}" opacity=".55"/><circle cx="${x+34}" cy="${y+14}" r="5" fill="${colors.pink}" opacity=".55"/>`;
  }
  return `${dot(x-18, y, 5)}${dot(x+18, y, 5)}${smile}`;
}

function blueprintMarkerSvg(zone, label, colors) {
  const point = blueprintPoint(zone);
  return `
    <g>
      <circle cx="${point.x}" cy="${point.y}" r="13"
        fill="rgba(120,224,194,.15)" stroke="${colors.mint}" stroke-width="2"/>
      <path d="M${point.x - 5} ${point.y} H${point.x + 5} M${point.x} ${point.y - 5} V${point.y + 5}"
        stroke="${colors.mint}" stroke-width="2" stroke-linecap="round"/>
      <text x="${point.x}" y="${point.y + 28}" text-anchor="middle"
        fill="${colors.primary}" font-size="8" font-weight="800">${label}</text>
    </g>
  `;
}

function sparkAdjustedWeirdZone(speciesRules, card) {
  const spark = card?.sparkKey || '';
  if (spark === 'tinyCompanion') return 'sideFloat';
  if (spark === 'quietMagic') return 'floatingNear';
  if (spark === 'wrongScale') return speciesRules.propAnchor || 'topRight';
  if (spark === 'secretSymbol') return speciesRules.weirdZone || 'surfacePatch';
  if (spark === 'tinyJob') return speciesRules.propAnchor || 'frontCenter';
  if (spark === 'attachedOddity') return speciesRules.weirdZone || speciesRules.propAnchor || 'topRight';
  return speciesRules.weirdZone || speciesRules.propAnchor || 'topRight';
}

function renderBlueprint(card) {
  const svg = $('#blueprintSvg');
  if (!svg || !card) return;
  const styles = getComputedStyle(document.documentElement);
  const colors = {
    mint: styles.getPropertyValue('--mint').trim() || '#78e0c2',
    primary: styles.getPropertyValue('--primary').trim() || '#ff7f73',
    pink: styles.getPropertyValue('--pink').trim() || '#ff8fbd',
    blue: styles.getPropertyValue('--blue').trim() || '#91b7ff',
    ink: '#111426'
  };
  const speciesRules = card.blueprintSpecies || inferSpeciesBlueprint(card.species || card.mascot, card.lane);
  const visual = moodVisualFor(card);
  const tilt = visual.tilt || 0;
  const faceZone = speciesRules.faceZone || 'lowerCenter';
  const propAnchor = speciesRules.propAnchor || 'topRight';
  const weirdZone = sparkAdjustedWeirdZone(speciesRules, card);
  const twistRule = getTwistBlueprintRule(card?.twist);
  const twistZone = twistRule.zone || weirdZone;
  const moodLabel = escapeHtml(card?.mood || 'mood');
  const bodyLabel = escapeHtml(speciesRules.bodyLabel || 'blueprint body');
  const moodRead = escapeHtml(card?.blueprint?.moodRead || moodData[card?.moodKey]?.moodRead || 'Face, tilt, and prop placement reveal the mood.');

  svg.innerHTML = `
    <defs>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000" flood-opacity=".22"/>
      </filter>
    </defs>
    <rect x="16" y="16" width="288" height="208" rx="28"
      fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.12)" />
    <g opacity="0.34" stroke="currentColor" fill="none" stroke-width="2" stroke-dasharray="8 10">
      <path d="M58 120 H264" />
      <path d="M160 34 V214" />
      <circle cx="160" cy="120" r="78" />
    </g>
    <g filter="url(#softShadow)" transform="translate(160 132) rotate(${tilt}) translate(-160 -132)">
      ${blueprintBodySvg(speciesRules.bodyShape, colors)}
      ${blueprintFaceSvg(faceZone, card, colors)}
      ${blueprintMarkerSvg(propAnchor, 'prop', colors)}
      ${blueprintMarkerSvg(weirdZone, 'weird', colors)}
      ${blueprintMarkerSvg(twistZone, twistRule.label || 'twist', colors)}
    </g>
    <g opacity="0.96">
      <rect x="20" y="18" width="280" height="42" rx="16" fill="rgba(17,20,38,.44)" />
      <text x="36" y="44" fill="${colors.blue}" font-size="15" font-weight="900">Moodprint: ${moodLabel}</text>
      <text x="160" y="216" text-anchor="middle" fill="${colors.mint}" font-size="10" font-weight="900">${bodyLabel}</text>
      <text x="36" y="232" fill="currentColor" font-size="10" opacity="0.66">${moodRead.slice(0, 82)}${moodRead.length > 82 ? '…' : ''}</text>
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
      <div class="stash-tags"><span>${escapeHtml(item.lane || 'odd')}</span><span>${escapeHtml(item.mascot || 'species')}</span><span>${escapeHtml(item.spark || 'spark')}</span><span>${escapeHtml(item.energy || 'normal')}</span><span>${escapeHtml(item.shapeLimit || 'simple')} shapes</span></div>
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
  const palette = card.palette || buildPalettePlacement(card);
  return `${card.title}

${card.idea}

Tiny version: ${card.tinyVersion || makeTinyVersion(card)}

Oddlet version: ${card.oddletVersion || makeOddletVersion(card)}

Creature commentary: ${card.commentary || makeCommentary(card)}

Oddlet species: ${card.species || card.mascot}
Species blueprint: ${(card.blueprintSpecies || inferSpeciesBlueprint(card.species || card.mascot, card.lane)).bodyLabel}
Species start hint: ${(card.blueprintSpecies || inferSpeciesBlueprint(card.species || card.mascot, card.lane)).bodyHint}
Species body note: ${getSpeciesBodyNote(card.blueprintSpecies || inferSpeciesBlueprint(card.species || card.mascot, card.lane))}
Tiny twist: ${card.twist || 'surprise'}
Tiny twist note: ${getTwistBlueprintRule(card.twist).note}

Odd little thing: ${card.oddThing}

Build it from:
- ${card.build.join('\n- ')}

Pose + expression: ${card.poseCue}

Beginner guardrail: ${card.guardrail}

Blueprint breakdown:
- Primary silhouette: ${blueprint.primarySilhouette}
- Face zone: ${blueprint.faceZone}
- Prop anchor: ${blueprint.propAnchor}
- Expression weight: ${blueprint.expressionWeight}
- Detail danger: ${blueprint.detailDanger}
- Easiest starting shape: ${blueprint.easiestStartingShape}
- Weird thing placement: ${blueprint.weirdThingPlacement}
- What not to add: ${blueprint.doNotAdd.join(', ')}
- Mood read: ${blueprint.moodRead || 'The face, tilt, and prop placement reveal the mood.'}
- Tiny twist note: ${getTwistBlueprintRule(card.twist).note}

Palette placement: ${palette.family} (${paletteModeLabel(palette.mode)})
- Main body: ${palette.body}
- Accent: ${palette.accent}
- Face / features: ${palette.face}
- Prop / extra: ${palette.prop}
- Weird spark: ${palette.spark}
- Outline: ${palette.outline}
- Shadow: ${palette.shadow}
- Background blob: ${palette.bg}
- Color whisper: ${palette.whisper}

Redraw spin: ${choice(redrawSpins).text}`;
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

async function resetApp() {
  const confirmed = confirm('Reset Oddlet on this device? This clears saved cards, favorites, settings, and old app caches so the newest build can wake up clean.');
  if (!confirmed) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(FAVORITES_KEY);
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.update()));
    }
  } catch (error) {
    console.warn('Reset app warning:', error);
  }
  location.reload();
}

function initEvents() {
  $$('.tab').forEach((button) => button.addEventListener('click', () => switchTab(button.dataset.tab)));
  $('#laneSelect').addEventListener('change', updateSpeciesSelect);
  $('#sparkSelect').addEventListener('change', updateTwistSelect);
  $('#rollBtn').addEventListener('click', () => rollCard());
  $('#surpriseBtn').addEventListener('click', () => rollCard({ fullSurprise: true }));
  $('#dailyBtn').addEventListener('click', () => rollCard({ daily: true }));
  $('#remixBar').addEventListener('click', handleMoodRemix);
  $('#paletteBar').addEventListener('click', handlePaletteRemix);
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
  $('#resetAppBtn').addEventListener('click', resetApp);
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
  updateSpeciesSelect();
  fillSelect('#moodSelect', moods);
  fillSelect('#sparkSelect', sparks);
  updateTwistSelect();
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
