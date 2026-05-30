/*
 * Oddlet Lab – v2.3
 *
 * This file implements a simplified version of the Oddlet generator.
 * It provides controls to roll a little creature, choose a lane, species,
 * mood, spark type, tiny twist and little object. The blueprint preview
 * shows a basic body shape, a face and the chosen little object at an
 * appropriate anchor point. The breakdown below the blueprint explains
 * the construction.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----- Data definitions -----
  // Lane definitions and their human-friendly labels. These map to broad
  // categories of creatures. Each lane has an array of species that live in
  // that category. For brevity we include a few representative species.
  const lanes = {
    object: 'Object gremlin',
    food: 'Snack creature',
    symbol: 'Symbol creature',
    ghost: 'Soft monster',
    stationery: 'Stationery oddball',
    weather: 'Weather blob',
    plant: 'Plant sprout',
    charm: 'Tiny charm'
  };

  const speciesByLane = {
    object: [
      'button gremlin',
      'teacup goblin',
      'melting candle creature',
      'tiny mailbox oddlet',
      'spoon sprite'
    ],
    food: [
      'toast slice creature',
      'lemon wedge goblin',
      'waffle square mascot',
      'croissant goblin',
      'cinnamon roll creature'
    ],
    symbol: [
      'question mark mascot',
      'star sticker creature',
      'warning triangle goblin'
    ],
    ghost: [
      'sheet ghost oddlet',
      'dust bunny creature'
    ],
    stationery: [
      'pencil stub creature',
      'eraser creature'
    ],
    weather: [
      'rain cloud blob',
      'raindrop gremlin'
    ],
    plant: [
      'tiny sprout creature',
      'cactus nub goblin'
    ],
    charm: [
      'tiny bell oddlet',
      'heart locket oddlet'
    ]
  };

  // Species blueprint definitions. Each species maps to a basic body shape.
  const speciesBlueprints = {
    'button gremlin': { bodyShape: 'button', bodyLabel: 'button' },
    'teacup goblin': { bodyShape: 'cup', bodyLabel: 'teacup' },
    'melting candle creature': { bodyShape: 'candle', bodyLabel: 'candle' },
    'tiny mailbox oddlet': { bodyShape: 'mailbox', bodyLabel: 'mailbox' },
    'spoon sprite': { bodyShape: 'spoon', bodyLabel: 'spoon' },
    'toast slice creature': { bodyShape: 'toast', bodyLabel: 'toast slice' },
    'lemon wedge goblin': { bodyShape: 'wedge', bodyLabel: 'lemon wedge' },
    'waffle square mascot': { bodyShape: 'waffle', bodyLabel: 'waffle square' },
    'croissant goblin': { bodyShape: 'croissant', bodyLabel: 'croissant' },
    'cinnamon roll creature': { bodyShape: 'cinnamonRoll', bodyLabel: 'cinnamon roll' },
    'question mark mascot': { bodyShape: 'questionMark', bodyLabel: 'question mark' },
    'star sticker creature': { bodyShape: 'star', bodyLabel: 'star' },
    'warning triangle goblin': { bodyShape: 'warningTriangle', bodyLabel: 'warning triangle' },
    'sheet ghost oddlet': { bodyShape: 'sheetGhost', bodyLabel: 'sheet ghost' },
    'dust bunny creature': { bodyShape: 'fluffBlob', bodyLabel: 'fluffy dust' },
    'pencil stub creature': { bodyShape: 'pencilStub', bodyLabel: 'pencil stub' },
    'eraser creature': { bodyShape: 'eraser', bodyLabel: 'eraser' },
    'rain cloud blob': { bodyShape: 'cloud', bodyLabel: 'rain cloud' },
    'raindrop gremlin': { bodyShape: 'drop', bodyLabel: 'raindrop' },
    'tiny sprout creature': { bodyShape: 'sprout', bodyLabel: 'sprout' },
    'cactus nub goblin': { bodyShape: 'cactus', bodyLabel: 'cactus nub' },
    'tiny bell oddlet': { bodyShape: 'bell', bodyLabel: 'tiny bell' },
    'heart locket oddlet': { bodyShape: 'heart', bodyLabel: 'heart locket' }
  };

  // Moods define the emotional tone. Each mood can specify a vertical adjustment
  // for the face position. Additional moods can be added by extending this map.
  const moods = {
    bashful: { label: 'bashful', faceOffset: 20 },
    dramatic: { label: 'dramatic', faceOffset: -10 },
    sleepy: { label: 'sleepy', faceOffset: 10 },
    suspicious: { label: 'suspicious', faceOffset: 0 },
    smug: { label: 'smug', faceOffset: -5 },
    'melancholy-cute': { label: 'melancholy-cute', faceOffset: 15 },
    'feral-cute': { label: 'feral-cute', faceOffset: -5 },
    'tiny panic': { label: 'tiny panic', faceOffset: -5 },
    'too official': { label: 'too official', faceOffset: 0 },
    'secretly guilty': { label: 'secretly guilty', faceOffset: 10 },
    'delighted goblin': { label: 'delighted goblin', faceOffset: -8 },
    'dramatically offended': { label: 'dramatically offended', faceOffset: -10 },
    'cosmic blank': { label: 'cosmic blank', faceOffset: -2 },
    clingy: { label: 'clingy', faceOffset: 12 },
    overprepared: { label: 'overprepared', faceOffset: -5 },
    'softly haunted': { label: 'softly haunted', faceOffset: 5 },
    sneaky: { label: 'sneaky', faceOffset: 5 },
    starstruck: { label: 'starstruck', faceOffset: -10 },
    'mildly cursed': { label: 'mildly cursed', faceOffset: 0 }
  };

  // Spark types act like larger categories of weird prompts. We keep labels simple.
  const sparkTypes = {
    livingDetail: 'Living detail',
    tinyJob: 'Tiny job',
    secretSymbol: 'Secret symbol',
    wrongScale: 'Wrong scale',
    microProblem: 'Mini problem',
    costumeLogic: 'Costume logic',
    quietMagic: 'Almost magic',
    attachedOddity: 'Attached oddity',
    tinyCompanion: 'Tiny companion',
    fakeImportance: 'Fake importance'
  };

  // Tiny twist options were provided by the user. They add specific flavor.
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

  // List of little objects the user can select. These influence where the
  // blueprint places the extra shape and which object icon to draw.
  const littleObjects = [
    'tiny crown',
    'small key',
    'soft heart',
    'warning label',
    'tiny spoon',
    'paper tag',
    'single sparkle',
    'little envelope',
    'button',
    'moon charm',
    'crumb',
    'tiny certificate',
    'ribbon bow',
    'glow dot',
    'mini sign',
    'small bell',
    'puddle',
    'sticker patch',
    'tiny mask',
    'little flower'
  ];

  // Determine where to place a given little object. This function returns a
  // zone key used to look up coordinates. The mapping is intentionally
  // heuristic; it can be customized for more precision.
  function getObjectZone(objectName) {
    const name = (objectName || '').toLowerCase();
    if (name.includes('crown') || name.includes('halo')) return 'topCenter';
    if (name.includes('key')) return 'sideFloat';
    if (name.includes('heart')) return 'frontCenter';
    if (name.includes('warning')) return 'labelPatch';
    if (name.includes('spoon') || name.includes('key') || name.includes('spatula')) return 'sideFloat';
    if (name.includes('tag') || name.includes('label') || name.includes('certificate')) return 'labelPatch';
    if (name.includes('sparkle') || name.includes('star') || name.includes('moon')) return 'upperRight';
    if (name.includes('envelope')) return 'sideFloat';
    if (name.includes('button')) return 'surfacePatch';
    if (name.includes('bell')) return 'topCenter';
    if (name.includes('puddle') || name.includes('shadow')) return 'underBody';
    if (name.includes('mask')) return 'faceZone';
    if (name.includes('flower') || name.includes('sprout')) return 'sideFloat';
    if (name.includes('bow') || name.includes('ribbon')) return 'sideAttach';
    // default
    return 'sideFloat';
  }

  // Map blueprint zones to coordinates within a 200x200 viewBox. These
  // coordinates determine where markers and objects appear. Feel free to
  // adjust these values for better balance.
  const zoneCoords = {
    topCenter: { x: 100, y: 30 },
    topRight: { x: 160, y: 40 },
    topLeft: { x: 40, y: 40 },
    upperRight: { x: 160, y: 70 },
    frontCenter: { x: 100, y: 120 },
    labelPatch: { x: 100, y: 80 },
    surfacePatch: { x: 120, y: 100 },
    sideFloat: { x: 170, y: 110 },
    sideAttach: { x: 170, y: 130 },
    underBody: { x: 100, y: 170 },
    faceZone: { x: 100, y: 100 },
    bottomEdge: { x: 100, y: 180 },
    foldedCorner: { x: 160, y: 80 },
    // fallback
    default: { x: 120, y: 110 }
  };

  // Body shape renderers. Each function returns SVG snippets to draw the
  // creature silhouette. Paths are scaled down to fit nicely within the
  // 200×200 viewBox by wrapping them in a group with transform.
  const bodyShapeRenderers = {
    button: () => `
      <g transform="translate(50 50) scale(1.6)">
        <circle cx="32" cy="32" r="32" class="bp-body" />
        <circle cx="24" cy="24" r="4" class="bp-detail" />
        <circle cx="40" cy="24" r="4" class="bp-detail" />
        <circle cx="24" cy="40" r="4" class="bp-detail" />
        <circle cx="40" cy="40" r="4" class="bp-detail" />
      </g>
    `,
    cup: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M16 24 H48 L44 64 H20 Z" class="bp-body" />
        <path d="M48 32 C60 30 60 50 48 48" class="bp-detail" />
        <path d="M16 24 C24 18 40 18 48 24" class="bp-detail" />
      </g>
    `,
    candle: () => `
      <g transform="translate(50 50) scale(1.6)">
        <rect x="20" y="20" width="24" height="48" rx="10" class="bp-body" />
        <path d="M32 0 C36 8 32 14 32 16 C28 10 24 6 32 0 Z" class="bp-detail" />
      </g>
    `,
    mailbox: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M0 32 L0 8 Q0 0 8 0 L40 0 Q48 0 48 8 L48 32 Z" class="bp-body" />
        <rect x="22" y="32" width="12" height="20" class="bp-detail" />
      </g>
    `,
    spoon: () => `
      <g transform="translate(50 50) scale(1.6)">
        <ellipse cx="20" cy="16" rx="10" ry="14" class="bp-body" />
        <rect x="18" y="30" width="4" height="32" class="bp-body" />
      </g>
    `,
    toast: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M0 24 C0 8 16 0 32 12 C48 0 64 8 64 24 L64 64 H0 Z" class="bp-body" />
      </g>
    `,
    wedge: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M0 32 C8 8 32 0 48 24 C64 48 48 64 24 64 C0 64 -8 48 0 32 Z" class="bp-body" />
      </g>
    `,
    waffle: () => `
      <g transform="translate(50 50) scale(1.6)">
        <rect x="0" y="0" width="64" height="64" rx="10" class="bp-body" />
        <path d="M16 0 V64 M32 0 V64 M48 0 V64 M0 16 H64 M0 32 H64 M0 48 H64" class="bp-detail" />
      </g>
    `,
    croissant: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M0 40 Q16 0 32 8 Q48 0 64 40 Q48 32 32 36 Q16 32 0 40 Z" class="bp-body" />
        <path d="M16 8 Q12 24 16 40" class="bp-detail" />
        <path d="M32 8 Q28 24 32 40" class="bp-detail" />
        <path d="M48 8 Q44 24 48 40" class="bp-detail" />
      </g>
    `,
    cinnamonRoll: () => `
      <g transform="translate(50 50) scale(1.6)">
        <circle cx="32" cy="32" r="32" class="bp-body" />
        <path d="M32 32 m-8 0 q0 -16 24 -16 q28 0 28 28 q0 40 -48 40 q-52 0 -52 -40 q0 -56 60 -56 q60 0 60 60" class="bp-detail" />
      </g>
    `,
    questionMark: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M32 12 C36 0 60 0 60 20 C60 32 44 32 40 48" class="bp-body" stroke-width="16" stroke-linecap="round" />
        <circle cx="40" cy="64" r="10" class="bp-body" />
      </g>
    `,
    star: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M32 0 L40 20 L64 24 L46 40 L52 64 L32 52 L12 64 L18 40 L0 24 L24 20 Z" class="bp-body" />
      </g>
    `,
    warningTriangle: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M32 0 L64 64 L0 64 Z" class="bp-body" />
        <path d="M32 20 L32 40" class="bp-detail" />
        <circle cx="32" cy="50" r="4" class="bp-detail" />
      </g>
    `,
    sheetGhost: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M0 64 V24 C0 8 16 0 32 0 C48 0 64 8 64 24 V64 C58 56 48 64 40 56 C30 64 22 56 16 64 Z" class="bp-body" />
      </g>
    `,
    fluffBlob: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M16 32 C8 16 24 0 36 8 C40 -2 56 0 60 8 C72 6 80 20 72 32 C80 44 72 58 60 56 C48 62 32 60 24 56 C14 58 10 50 16 32 Z" class="bp-body" />
      </g>
    `,
    pencilStub: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M0 16 H48 L64 32 L48 48 H0 Z" class="bp-body" />
        <path d="M48 16 L64 32 L48 48" class="bp-detail" />
      </g>
    `,
    eraser: () => `
      <g transform="translate(50 50) scale(1.6)">
        <rect x="0" y="16" width="64" height="32" rx="8" class="bp-body" />
        <rect x="24" y="16" width="16" height="32" class="bp-detail" />
      </g>
    `,
    cloud: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M8 40 C2 24 18 12 28 16 C32 6 48 6 52 16 C64 14 72 24 68 36 C62 48 20 48 8 40 Z" class="bp-body" />
      </g>
    `,
    drop: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M32 0 C52 32 56 44 48 56 C40 68 24 68 16 56 C8 44 12 32 32 0 Z" class="bp-body" />
      </g>
    `,
    sprout: () => `
      <g transform="translate(50 50) scale(1.6)">
        <ellipse cx="32" cy="56" rx="24" ry="18" class="bp-body" />
        <path d="M32 32 C24 16 10 20 8 28 C18 32 24 36 32 32" class="bp-detail" />
        <path d="M32 32 C40 16 54 20 56 28 C46 32 40 36 32 32" class="bp-detail" />
      </g>
    `,
    cactus: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M20 64 V24 C20 8 32 4 36 4 C40 4 52 8 52 24 V64 Z" class="bp-body" />
        <path d="M20 32 C8 30 8 46 20 44 M52 28 C64 26 64 42 52 40" class="bp-detail" />
      </g>
    `,
    bell: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M16 48 C20 40 20 16 24 10 C28 2 40 2 44 10 C48 16 48 40 52 48 Z" class="bp-body" />
        <circle cx="32" cy="4" r="4" class="bp-detail" />
        <line x1="24" y1="50" x2="40" y2="50" class="bp-detail" />
      </g>
    `,
    heart: () => `
      <g transform="translate(50 50) scale(1.6)">
        <path d="M32 60 C8 44 0 28 8 16 C16 4 32 8 32 20 C32 8 48 4 56 16 C64 28 56 44 32 60 Z" class="bp-body" />
      </g>
    `
  };

  // Renderers for little object shapes. These return small SVG snippets sized
  // around 16×16. They will be positioned via translate in the blueprint.
  const objectShapeRenderers = {
    'tiny crown': color => `
      <g>
        <path d="M2 12 L4 4 L6 12 L8 4 L10 12 L10 14 L2 14 Z" fill="${color}" stroke="${color}" stroke-width="1" />
      </g>
    `,
    'small key': color => `
      <g>
        <circle cx="4" cy="4" r="2" fill="${color}" />
        <rect x="3.5" y="4" width="1" height="6" fill="${color}" />
        <rect x="2" y="10" width="4" height="2" fill="${color}" />
      </g>
    `,
    'soft heart': color => `
      <g>
        <path d="M4 3 C4 1 3 0 2 0 C1 0 0 1 0 2 C0 4 4 6 4 6 C4 6 8 4 8 2 C8 1 7 0 6 0 C5 0 4 1 4 3 Z" fill="${color}" />
      </g>
    `,
    'warning label': color => `
      <g>
        <path d="M2 2 L10 2 L6 10 Z" fill="${color}" />
      </g>
    `,
    'tiny spoon': color => `
      <g>
        <ellipse cx="4" cy="3" rx="3" ry="2" fill="${color}" />
        <rect x="3.5" y="4" width="1" height="6" fill="${color}" />
      </g>
    `,
    'paper tag': color => `
      <g>
        <rect x="1" y="2" width="8" height="6" rx="1" fill="${color}" />
      </g>
    `,
    'single sparkle': color => `
      <g>
        <path d="M5 0 L6 3 L9 4 L6 5 L5 8 L4 5 L1 4 L4 3 Z" fill="${color}" />
      </g>
    `,
    'little envelope': color => `
      <g>
        <rect x="0" y="2" width="10" height="6" fill="${color}" />
        <path d="M0 2 L5 7 L10 2" fill="none" stroke="${color}" stroke-width="1" />
      </g>
    `,
    'button': color => `
      <g>
        <circle cx="5" cy="5" r="4" fill="${color}" />
        <circle cx="4" cy="4" r="1" fill="#fff" />
        <circle cx="6" cy="4" r="1" fill="#fff" />
        <circle cx="4" cy="6" r="1" fill="#fff" />
        <circle cx="6" cy="6" r="1" fill="#fff" />
      </g>
    `,
    'moon charm': color => `
      <g>
        <path d="M6 2 C2 2 0 6 2 10 C4 14 10 14 12 10 C8 10 4 8 6 2 Z" fill="${color}" />
      </g>
    `,
    'crumb': color => `
      <g>
        <circle cx="4" cy="4" r="2" fill="${color}" />
      </g>
    `,
    'tiny certificate': color => `
      <g>
        <rect x="0" y="2" width="10" height="6" fill="${color}" />
        <line x1="0" y1="4" x2="10" y2="4" stroke="#fff" stroke-width="0.5" />
      </g>
    `,
    'ribbon bow': color => `
      <g>
        <path d="M0 4 L4 0 L8 4 L4 8 Z" fill="${color}" />
      </g>
    `,
    'glow dot': color => `
      <g>
        <circle cx="4" cy="4" r="3" fill="${color}" />
      </g>
    `,
    'mini sign': color => `
      <g>
        <rect x="0" y="2" width="10" height="6" fill="${color}" />
        <rect x="4.5" y="8" width="1" height="4" fill="${color}" />
      </g>
    `,
    'small bell': color => `
      <g>
        <path d="M2 6 C3 4 3 2 4 1 C5 0 7 0 8 1 C9 2 9 4 10 6 Z" fill="${color}" />
        <circle cx="6" cy="0.5" r="0.5" fill="${color}" />
      </g>
    `,
    puddle: color => `
      <g>
        <ellipse cx="5" cy="5" rx="5" ry="3" fill="${color}" />
      </g>
    `,
    'sticker patch': color => `
      <g>
        <rect x="0" y="0" width="10" height="8" fill="${color}" />
        <polyline points="10,8 8,8 8,10" fill="${color}" />
      </g>
    `,
    'tiny mask': color => `
      <g>
        <rect x="1" y="2" width="8" height="5" fill="${color}" />
        <rect x="2" y="3" width="1" height="2" fill="#fff" />
        <rect x="7" y="3" width="1" height="2" fill="#fff" />
      </g>
    `,
    'little flower': color => `
      <g>
        <circle cx="5" cy="5" r="1" fill="${color}" />
        <circle cx="3" cy="3" r="2" fill="${color}" />
        <circle cx="7" cy="3" r="2" fill="${color}" />
        <circle cx="3" cy="7" r="2" fill="${color}" />
        <circle cx="7" cy="7" r="2" fill="${color}" />
      </g>
    `
  };

  // Fallback renderer for any unknown little object.
  function renderFallbackObject(color) {
    return `<g><circle cx="5" cy="5" r="4" fill="${color}" /></g>`;
  }

  // Utility to choose a random element from an array.
  function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Populate lane select
  const laneSelect = document.getElementById('laneSelect');
  Object.entries(lanes).forEach(([key, label]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    laneSelect.appendChild(opt);
  });

  // Populate mood select
  const moodSelect = document.getElementById('moodSelect');
  Object.keys(moods).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = moods[key].label;
    moodSelect.appendChild(opt);
  });

  // Populate spark select
  const sparkSelect = document.getElementById('sparkSelect');
  Object.entries(sparkTypes).forEach(([key, label]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    sparkSelect.appendChild(opt);
  });

  // Populate little object select
  const objectSelect = document.getElementById('objectSelect');
  function populateObjectSelect() {
    objectSelect.innerHTML = '';
    const surpriseOpt = document.createElement('option');
    surpriseOpt.value = 'surprise';
    surpriseOpt.textContent = 'Surprise me';
    objectSelect.appendChild(surpriseOpt);
    littleObjects.forEach(obj => {
      const opt = document.createElement('option');
      opt.value = obj;
      opt.textContent = obj;
      objectSelect.appendChild(opt);
    });
  }
  populateObjectSelect();

  // Species select population based on lane
  const speciesSelect = document.getElementById('speciesSelect');
  function updateSpeciesSelect() {
    const lane = laneSelect.value;
    const list = speciesByLane[lane] || [];
    speciesSelect.innerHTML = '';
    const surpriseOpt = document.createElement('option');
    surpriseOpt.value = 'surprise';
    surpriseOpt.textContent = 'Surprise me';
    speciesSelect.appendChild(surpriseOpt);
    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      speciesSelect.appendChild(opt);
    });
  }
  laneSelect.addEventListener('change', updateSpeciesSelect);
  updateSpeciesSelect();

  // Twist select population based on spark type
  const twistSelect = document.getElementById('twistSelect');
  function updateTwistSelect() {
    const spark = sparkSelect.value;
    twistSelect.innerHTML = '';
    const surpriseOpt = document.createElement('option');
    surpriseOpt.value = 'surprise';
    surpriseOpt.textContent = 'Surprise me';
    twistSelect.appendChild(surpriseOpt);
    const list = twistsBySpark[spark] || [];
    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      twistSelect.appendChild(opt);
    });
  }
  sparkSelect.addEventListener('change', updateTwistSelect);
  updateTwistSelect();

  // Shape limit select is filled in HTML static. We'll just fetch it by ID.
  const shapeLimitSelect = document.getElementById('shapeLimitSelect');

  // Roll button event handler
  const rollButton = document.getElementById('rollButton');
  rollButton.addEventListener('click', () => {
    // Determine lane and species
    const lane = laneSelect.value;
    let species = speciesSelect.value;
    if (species === 'surprise') {
      const options = speciesByLane[lane] || [];
      species = choice(options);
    }
    // Determine species blueprint
    const blueprint = speciesBlueprints[species] || { bodyShape: 'waffle', bodyLabel: species };
    // Determine mood
    let moodKey = moodSelect.value;
    const mood = moods[moodKey] || moods.bashful;
    // Determine spark and twist
    const spark = sparkSelect.value;
    let twist = twistSelect.value;
    const twistList = twistsBySpark[spark] || [];
    if (twist === 'surprise') {
      twist = choice(twistList);
    }
    // Determine little object
    let littleObject = objectSelect.value;
    if (littleObject === 'surprise') {
      littleObject = choice(littleObjects);
    }
    // Determine face vertical offset
    const faceOffset = mood.faceOffset || 0;
    // Compose card idea
    const idea = `Draw a ${mood.label} ${species}. Tiny twist: ${twist}. Little object: ${littleObject}.`;
    // Populate card details
    const detailsList = document.getElementById('cardDetails');
    detailsList.innerHTML = '';
    const li1 = document.createElement('li');
    li1.textContent = `Lane: ${lanes[lane]}`;
    detailsList.appendChild(li1);
    const li2 = document.createElement('li');
    li2.textContent = `Species: ${species}`;
    detailsList.appendChild(li2);
    const li3 = document.createElement('li');
    li3.textContent = `Mood: ${mood.label}`;
    detailsList.appendChild(li3);
    const li4 = document.createElement('li');
    li4.textContent = `Spark type: ${sparkTypes[spark]}`;
    detailsList.appendChild(li4);
    const li5 = document.createElement('li');
    li5.textContent = `Tiny twist: ${twist}`;
    detailsList.appendChild(li5);
    const li6 = document.createElement('li');
    li6.textContent = `Little object: ${littleObject}`;
    detailsList.appendChild(li6);
    // Render idea
    document.getElementById('cardIdea').textContent = idea;
    // Render blueprint
    renderBlueprint({ blueprint, mood: moodKey, littleObject });
  });

  /**
   * Render the blueprint SVG and breakdown information.
   * @param {Object} cardData Contains blueprint, mood and littleObject
   */
  function renderBlueprint(cardData) {
    const { blueprint, mood, littleObject } = cardData;
    const svg = document.getElementById('blueprintSvg');
    // Clear existing content
    svg.innerHTML = '';
    // Determine colors from CSS variables
    const styles = getComputedStyle(document.documentElement);
    const bodyColor = styles.getPropertyValue('--primary').trim() || '#7965c4';
    const detailColor = styles.getPropertyValue('--accent').trim() || '#78e0c2';
    const objectColor = styles.getPropertyValue('--secondary').trim() || '#ffb874';
    // Draw body shape
    const bodyRenderer = bodyShapeRenderers[blueprint.bodyShape] || bodyShapeRenderers.waffle;
    const bodyHtml = bodyRenderer();
    // Draw face: simple eyes and mouth with offset
    const faceY = 100 + (moods[mood]?.faceOffset || 0);
    const faceSvg = `
      <g class="bp-face">
        <circle cx="80" cy="${faceY - 10}" r="6" fill="${detailColor}" />
        <circle cx="120" cy="${faceY - 10}" r="6" fill="${detailColor}" />
        <path d="M90 ${faceY + 6} Q100 ${faceY + 12} 110 ${faceY + 6}" stroke="${detailColor}" stroke-width="3" fill="none" stroke-linecap="round" />
      </g>
    `;
    // Determine object placement and renderer
    const objectZone = getObjectZone(littleObject);
    const coords = zoneCoords[objectZone] || zoneCoords.default;
    const objectRenderer = objectShapeRenderers[littleObject] || renderFallbackObject;
    const objectSvg = objectRenderer(objectColor);
    const objectWrapper = `
      <g transform="translate(${coords.x - 8} ${coords.y - 8}) scale(2)">
        ${objectSvg}
      </g>
    `;
    // Build final SVG content
    svg.innerHTML = `
      <defs>
        <style>
          .bp-body { fill: ${bodyColor}; stroke: ${bodyColor}; stroke-width: 1; }
          .bp-detail { fill: none; stroke: ${detailColor}; stroke-width: 1.5; stroke-linecap: round; }
        </style>
      </defs>
      ${bodyHtml}
      ${faceSvg}
      ${objectWrapper}
    `;
    // Build breakdown text
    const info = document.getElementById('blueprintInfo');
    info.innerHTML = '';
    const p1 = document.createElement('p');
    p1.textContent = `Body: ${blueprint.bodyLabel}`;
    info.appendChild(p1);
    const p2 = document.createElement('p');
    p2.textContent = `Face offset: ${moods[mood]?.faceOffset || 0}`;
    info.appendChild(p2);
    const p3 = document.createElement('p');
    p3.textContent = `Little object goes to: ${objectZone}`;
    info.appendChild(p3);
    const p4 = document.createElement('p');
    p4.textContent = `Shape limit: ${shapeLimitSelect.value}`;
    info.appendChild(p4);
  }
});