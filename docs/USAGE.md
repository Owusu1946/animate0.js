# animate0.js – Usage Guide

This guide complements the README with practical recipes and patterns.

## Getting started

Install:
```bash
npm i animate0.js
```

ESM import in the browser (during dev use local `lib/animate0.esm.js`):
```html
<script type="module">
  import { animate, eases } from './lib/animate0.esm.js';
  animate({ targets: document.querySelector('#box'), duration: 600, ease: eases.easeInOutQuad, props: { opacity: [0,1], translateX: [0, 160] } });
  
</script>
```

## Animations

### Basic numeric properties
```js
animate({ targets: el, duration: 300, props: { opacity: [0, 1] }});
```

### Transforms
```js
animate({ targets: el, duration: 400, props: { translateX: [0, 120], translateY: [0, 24], scaleX: [0.9, 1], scaleY: [0.9, 1] }});
```

### Easing
```js
import { eases } from './lib/animate0.esm.js';
animate({ targets: el, duration: 500, ease: eases.easeInOutQuad, props: { opacity: [0,1] }});
```

## Timelines
```js
import { createTimeline, animate } from './lib/animate0.esm.js';
const t1 = animate({ targets: a, duration: 200, props: { opacity: [0,1] }});
const t2 = animate({ targets: a, duration: 200, props: { translateX: [0, 80] }});
createTimeline().add(t1, 0).add(t2, 240).play();
```

## Stagger
```js
import { animate, stagger } from './lib/animate0.esm.js';
const els = document.querySelectorAll('.item');
els.forEach((el, i) => animate({ targets: el, delay: i*40, duration: 300, props: { translateY: [12,0], opacity: [0,1] }}));
```

## Draggable
```js
import { createDraggable } from './lib/animate0.esm.js';
createDraggable(document.querySelector('#drag'));
```

## Scroll observer
```js
import { onScroll, animate } from './lib/animate0.esm.js';
onScroll(section, (progress) => {
  animate({ targets: section, duration: 200, props: { opacity: [progress, 1] }});
});
```

## WAAPI wrapper
```js
import { waapi } from './lib/animate0.esm.js';
const pulse = waapi(el, [ { transform:'scale(1)' }, { transform:'scale(1.04)' }, { transform:'scale(1)' } ], { duration: 1200, iterations: Infinity, easing: 'ease-in-out' });
```

## SVG helpers
```js
import { svg } from './lib/animate0.esm.js';
svg.draw(pathEl, 0.5); // 50% stroke draw
```

## Text splitter
```js
import { text } from './lib/animate0.esm.js';
const splitter = new text.TextSplitter(el);
// ... animate splitter.element.children ...
splitter.revert();
```

## Tips
- Keep durations small in tests; prefer deterministic waits
- Batch transforms; avoid animating layout properties where possible
- Use the engine’s precision if you need consistent rounding


