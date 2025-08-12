import { now } from './helpers.js';
import { MAX_FPS } from './consts.js';

/**
 * Clock handles time deltas and fps limiting per instance.
 * @typedef {Object} Clock
 * @property {number} last
 * @property {number} fps
 * @property {number} minDelta
 * @property {() => number} tick Returns delta in ms
 */

/**
 * @param {number} [fps]
 * @returns {Clock}
 */
export function createClock(fps = MAX_FPS) {
  const minDelta = 1000 / Math.max(1, Math.min(fps, MAX_FPS));
  let last = now();
  return {
    last,
    fps,
    minDelta,
    tick() {
      const t = now();
      const d = t - last;
      if (d < minDelta) return 0;
      last = t;
      return d;
    },
  };
}


