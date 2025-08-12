import { engine } from './engine.js';
import { Timer, createTimer } from './timer.js';
import { JSAnimation } from './animation.js';
import { eases } from './eases.js';
import { stagger as createStagger } from './stagger.js';
import { createTimeline, Timeline } from './timeline.js';
import { TextSplitter } from './text.js';
import { onScroll, ScrollObserver, scrollContainers } from './scroll.js';
import { createDraggable, Draggable } from './draggable.js';
import { waapi, WAAPIAnimation } from './waapi.js';
import * as svg from './svg.js';
import * as utils from './utils.js';

/**
 * Create and run a JS animation.
 * @param {ConstructorParameters<typeof JSAnimation>[0]} params
 */
export function animate(params) {
  const anim = new JSAnimation(params);
  const timer = createTimer();
  timer.set((delta) => anim._advance(delta));
  engine.add(/** @type {any} */(timer));
  anim.then().then(() => { engine.remove(/** @type {any} */(timer)); });
  return anim;
}

// Stubs for future modules will be implemented fully through the steps.
export { utils };
export { svg };
export const text = { TextSplitter };
export const stagger = createStagger;

export { engine, Timer, createTimer, JSAnimation, eases, createTimeline, Timeline, TextSplitter, onScroll, ScrollObserver, scrollContainers, createDraggable, Draggable, waapi, WAAPIAnimation };

// Public API placeholders exported for parity; to be fully implemented in later steps
// timeline re-exported above
export const createAnimatable = () => ({});
export class Animatable {}
export const createScope = () => ({});
export class Scope {}
export const createSpring = () => ({});
export class Spring {}
// re-exports above


