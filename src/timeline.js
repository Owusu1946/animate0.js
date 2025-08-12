import { engine } from './engine.js';
import { createTimer } from './timer.js';

/** Minimal timeline for sequencing JSAnimation-like objects */
export class Timeline {
  constructor() {
    /** @type {{start:number, play:()=>Promise<void>, _started?:boolean}[]} */
    this.items = [];
    this.duration = 0;
  }

  /** @param {{ then?:()=>Promise<void>, play?:()=>Promise<void> }} anim @param {number} offset */
  add(anim, offset = 0) {
    const play = () => (anim.then ? anim.then() : anim.play ? anim.play() : Promise.resolve());
    this.items.push({ start: offset, play });
    this.duration = Math.max(this.duration, offset);
    return this;
  }

  play() {
    const timer = createTimer();
    let elapsed = 0;
    timer.set((delta) => {
      elapsed += delta;
      for (const it of this.items) {
        if (!it._started && elapsed >= it.start) {
          it._started = true;
          // fire and forget
          it.play();
        }
      }
    });
    engine.add(/** @type {any} */(timer));
    return this;
  }
}

export function createTimeline() { return new Timeline(); }


