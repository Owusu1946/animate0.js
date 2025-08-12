import { createClock } from './clock.js';
import { globals } from './globals.js';
import { DEFAULT_PRECISION } from './consts.js';

/** @typedef {import('./timer.js').Timer} Timer */

const raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || ((cb) => setTimeout(() => cb(Date.now()), 16));

/**
 * Engine orchestrates timers and renders, providing adaptive ticking and pausing.
 */
class Engine {
  constructor() {
    /** @type {Set<Timer>} */
    this.timers = new Set();
    this.clock = createClock();
    this.running = false;
    globals.precision = DEFAULT_PRECISION;
  }

  /** @param {Timer} t */
  add(t) {
    this.timers.add(t);
    if (!this.running) this.start();
  }

  /** @param {Timer} t */
  remove(t) {
    this.timers.delete(t);
    if (this.timers.size === 0) this.stop();
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      const delta = this.clock.tick();
      if (delta > 0) {
        this.timers.forEach((t) => t._advance(delta));
      }
      raf(loop);
    };
    raf(loop);
  }

  stop() {
    this.running = false;
  }

  /** @param {'ms'|'s'} unit */
  setTimeUnit(unit) {
    globals.timeUnit = unit;
    globals.timeScale = unit === 's' ? 0.001 : 1;
  }

  /** @param {number} p */
  setPrecision(p) {
    globals.precision = p | 0;
  }
}

export const engine = new Engine();


