# Character Signal

A single-page static PWA for generating character concepts, emotional archetypes, drawable blueprints, Procreate-friendly layer plans, and optional OpenRouter AI expansions.

## Files

- `index.html` — complete app
- `manifest.json` — PWA manifest
- `service-worker.js` — offline cache
- `ICON-512x512.png` — app icon
- `ICON-192x192.png` — app icon
- `character-signal-logo.png` — header/logo image

## OpenRouter

The app intentionally leaves the model empty in the code:

```js
const OPENROUTER_MODEL = "";
```

You can add the model directly in `index.html`, or use the app's Settings tab to store your API key and model locally on your device.

Do not commit your private API key into a public GitHub repository.

## Deploy

Upload all files to GitHub Pages, Netlify, Cloudflare Pages, or Vercel as a static site.


## V2 additions

- Service worker cache bumped to `character-signal-v3-repair-practice`.
- Added Repair Cards for your real drawing style: weird mascots, object pals, paper spirits, and icon creatures.
- Added Practice Deck with short drills and seen tracking.
- Added beginner-friendly redraw guidance that protects the weirdness while improving structure.
