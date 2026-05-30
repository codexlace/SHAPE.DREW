# Oddlet

Oddlet is a static, GitHub Pages-ready PWA for rolling simple weird mascot ideas to draw.

It is intentionally not a texture lab, not a full drawing school, and not an image generator. It gives you a mascot-object, one tiny spark, a beginner-safe build path, and redraw spins so drawing stays playful.

## Files

Upload all files to the root of your GitHub Pages repository:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `service-worker.js`
- `ICON-192x192.png`
- `ICON-512x512.png`

## Features

- Roll mascot/object ideas with varied spark types
- Notebook oddball bias for signs, symbols, X eyes, object creatures, and sketchy weirdness
- Simple generated blueprint preview
- Beginner guardrails: body first, face second, odd thing third
- Redraw spins for practice without boredom
- Local Sketch Stash with drawn/favorite tracking
- JSON export
- Light/dark desk mode
- Optional OpenRouter text remix with a blank model field for you to choose yourself

## Deploy

1. Create or open a GitHub repository.
2. Upload these files into the root folder.
3. Go to Settings → Pages.
4. Deploy from the main branch root.
5. Open your Pages URL.

## Notes

All saved cards are stored locally in the browser with `localStorage`. OpenRouter settings are also stored locally if you choose to save them.


## V1.1 update

- Added a Mood Remix Bar on the current card.
- Presets now include Cuter, Weirder, Simpler, More dramatic, More me, More creative, and New tiny twist.
- More Creative keeps the mascot simple while changing the idea logic, so it feels fresher without becoming a big scene.


## V1.2 Tiny Spark Update

Added Tiny Version / Oddlet Version so every prompt has an easy starter build and a stranger, still-simple version. Added Creature Commentary for a small entertaining observation on every rolled or remixed card.


## V1.3 Delight Drawer Update

- Added Prompt Packs so rolls can lean into Notebook Creatures, Art Desk Oddlets, Soft Cryptids, Snack Gremlins, Symbol Pets, or Lost Object Club.
- Added Daily Oddlet for one no-pressure tiny creature of the day.
- Added Draw This First and Why This Works to make cards easier to start and quietly more educational.
- Added Not Feeling It buttons: Too boring, Too complex, Too normal, Too cute, and Hard to start.
- Added Sketch Stash museum stats and compact tags so saved ideas feel more collectible.


## V1.4 Sketch Ritual upgrades

- Drawing Energy selector: Low Energy, Normal, Feeling Playful, and Unhinged but Drawable.
- Tiny / Oddlet / Extra Weird versions for each prompt.
- Creature Notes on the current card, saved into Sketch Stash.
- Quick note chips for fast drawing reflections.
- Favorite Ingredients bias, so future rolls can lean toward your recurring symbols, objects, and sparks.
- Oddlet Bingo in Sketch Stash for tiny drawing goals.
- OpenRouter helper model is prefilled and locked to `openrouter/free` for ease.

The app is still fully static and GitHub Pages-ready.


## V1.5 Blueprint Intelligence

Each card now includes a Blueprint Breakdown with:
- primary silhouette
- face zone
- prop anchor
- expression weight
- detail danger
- easiest starting shape
- where to place the weird thing
- what not to add


## V1.6 Palette Placement

Each card now includes a Palette Placement Layer with:
- a palette name
- labeled swatches
- color-to-part assignments
- a color rule whisper
- palette remix modes: base, softer, darker, more colorful, more muted, spookier, and sticker simple


## V1.7 Moodprint Layer

Added 15 new moods and upgraded every mood with its own drawing logic:
- mood-specific face zone
- mood-specific eye, brow, and mouth behavior
- body tilt in the blueprint preview
- prop/extra placement behavior
- Mood read explanation in Blueprint Breakdown
- Moodprint label inside the SVG blueprint preview

New moods include tiny panic, smug, melancholy-cute, feral-cute, too official, secretly guilty, delighted goblin, dramatically offended, cosmic blank, clingy, overprepared, softly haunted, sneaky, starstruck, and mildly cursed.


## V1.8 Species Drawer

Adds a second pointed dropdown called **Oddlet Species**.

Flow:
Mascot lane → Oddlet Species → Mood → Spark type → Shape limit

The species dropdown updates based on the chosen lane, with 20 specific choices per lane and a small instructional hint for each lane.


## V1.9 Species Blueprint Engine

Adds species-specific blueprint logic.

Now:
- Lane chooses broad blueprint grammar
- Oddlet Species chooses actual SVG body shape
- Mood adjusts face/expression/tilt
- Spark adjusts the prop and weird marker placement

Also adds a **Reset app** button in the header to clear local storage and old caches when updating builds.
Service worker cache updated to **v1.9.0**.


## V2.0 Full Species Body Atlas

Adds the full species body atlas:
- 27 new species blueprint entries
- 27 new SVG body renderers
- new blueprint zone coordinates
- species body note in the Blueprint Breakdown
- safer fallback matching for new species/body shapes
- service worker cache bumped to oddlet-v2-0-0
