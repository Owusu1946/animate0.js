/** @module timer */

/**
 * Minimal Timer abstraction controlled by the engine.
 */
export class Timer {
  constructor() {
    this.running = true;
    /** @type {(delta:number)=>void} */
    this.onTick = () => {};
  }

  /** @param {(delta:number)=>void} cb */
  set(cb) { this.onTick = cb; }

  /** @param {number} delta */
  _advance(delta) {
    if (!this.running) return;
    this.onTick(delta);
  }

  pause() { this.running = false; }
  play() { this.running = true; }
}

/** @returns {Timer} */
export function createTimer() { return new Timer(); }


