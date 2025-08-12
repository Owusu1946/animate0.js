/** @module scroll */

/** Minimal ScrollObserver for entering viewport */
export class ScrollObserver {
  /** @param {Element} target @param {(progress:number)=>void} onProgress */
  constructor(target, onProgress) {
    this.target = target;
    this.onProgress = onProgress;
    this._onScroll = () => this._measure();
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onScroll);
    this._measure();
  }

  _measure() {
    const rect = this.target.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const start = vh;
    const end = -rect.height;
    const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
    this.onProgress(progress);
  }

  destroy() {
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onScroll);
  }
}

/** @param {Element} el @param {(p:number)=>void} cb */
export function onScroll(el, cb) { return new ScrollObserver(el, cb); }
/** @type {any[]} */
export const scrollContainers = [];


