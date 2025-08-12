# animate0.js

High‑performance web animation engine (ESM‑first) with UMD/IIFE/CJS outputs and rich TypeScript typings generated from JSDoc. It mirrors the ergonomics of anime‑style APIs while focusing on performance, predictable timing, and developer experience.

• Tiny core with adaptive ticking, batched transforms, and low‑GC loops  
• Friendly API: `animate`, `timeline`, `stagger`, waapi wrapper, `draggable`, `scroll`, SVG, text splitting  
• Works in modern browsers and Node (limited tests)

## Installation

```bash
npm i animate0.js
# or
pnpm add animate0.js
```

CDN/IIFE (global `animate0`):
```html
<script src="./lib/animate0.iife.min.js"></script>
```

## Usage (ESM)

```html
<div class="box"></div>
<script type="module">
  import { animate, eases } from 'animate0.js';
  const box = document.querySelector('.box');
  animate({ targets: box, duration: 800, props: { opacity: [0, 1], translateX: [0, 200] }, ease: eases.easeInOutQuad });
</script>
```

### Timeline
```js
import { createTimeline, animate } from 'animate0.js';
const el = document.querySelector('.box');
const a1 = animate({ targets: el, duration: 300, props: { opacity: [0, 1] } });
const a2 = animate({ targets: el, duration: 300, props: { translateX: [0, 150] } });
createTimeline().add(a1, 0).add(a2, 320).play();
```

### Stagger
```js
import { animate, stagger } from 'animate0.js';
const items = document.querySelectorAll('.item');
items.forEach((el, i) => animate({ targets: el, delay: i*40, duration: 400, props: { translateY: [16, 0], opacity: [0, 1] } }));
```

### Draggable
```js
import { createDraggable } from 'animate0.js';
createDraggable(document.querySelector('#drag'));
```

### WAAPI
```js
import { waapi } from 'animate0.js';
waapi(document.querySelector('#el'),
  [ { transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' } ],
  { duration: 1200, iterations: Infinity, easing: 'ease-in-out' }
);
```

## API Reference

All exports come from `src/animate0.js`:

- `animate(params)` → `JSAnimation`
- `createTimeline()` → `Timeline`
- `stagger(opts)` → function(i,total) → delay
- `eases` → common easing functions
- `engine` → control `timeUnit('ms'|'s')` and precision
- `createTimer`, `Timer`
- `createDraggable`, `Draggable`
- `onScroll`, `ScrollObserver`, `scrollContainers`
- `waapi`, `WAAPIAnimation`
- `svg` → `draw()` helpers
- `text` → `TextSplitter`
- `utils` → basic DOM helpers like `$()`

See inline JSDoc for parameter details. The public API is stable for the 1.0 line.

## Development

```bash
npm i
npm run dev           # watch bundle
npm run open-examples # serve examples with live reload
npm run test-browser  # run browser tests (Mocha + Chai)
npm run test-node     # run node tests
npm run build         # build all formats and generate types
```

Outputs:
- ESM: `lib/animate0.esm.js`, `lib/animate0.esm.min.js`
- UMD: `lib/animate0.umd.js`, `lib/animate0.umd.min.js`
- IIFE: `lib/animate0.iife.js`, `lib/animate0.iife.min.js`
- CJS: `lib/animate0.cjs`, `lib/animate0.min.cjs`
- Types: `types/*.d.ts` with `types/index.d.ts`

## Contributing

PRs welcome. Please:
- Keep changes focused, with tests and docs
- Use JSDoc types and follow the control‑flow rules in `CONTRIBUTING.md`
- Ensure `npm run build` and both test suites are green before submitting

## Versioning and Releases

- Run `npm run release` to produce production bundles
- Tag a release on GitHub and (optionally) automate publish via GitHub Actions

## License

MIT © animate0 contributors

