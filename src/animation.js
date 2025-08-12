import { parseNumberWithUnit } from './values.js';
import { parseEasing } from './eases.js';
import { renderTarget } from './render.js';

/**
 * JSAnimation: minimal initial version supporting numeric CSS props
 * @typedef {import('./types.js').Target} Target
 */

export class JSAnimation {
  /**
   * @param {{ targets: Target|Target[], duration?: number, delay?: number, ease?: import('./types.js').Ease, props: Record<string, [any, any]> }} params
   */
  constructor(params) {
    const targets = Array.isArray(params.targets) ? params.targets : [params.targets];
    /** @type {Target[]} */
    this.targets = targets;
    this.duration = Math.max(0, params.duration ?? 1000);
    this.delay = Math.max(0, params.delay ?? 0);
    this.ease = parseEasing(params.ease || 'easeInOutQuad');
    /** @type {Map<Target, import('./types.js').Tween[]>} */
    this.map = new Map();
    for (const t of targets) {
      /** @type {import('./types.js').Tween[]} */
      const tweens = [];
      for (const prop in params.props) {
        const [from, to] = params.props[prop];
        const a = parseNumberWithUnit(from);
        const b = parseNumberWithUnit(to);
        tweens.push({ from: a.value, to: b.value, unit: b.unit || a.unit, prop, ease: this.ease });
      }
      this.map.set(t, tweens);
    }
    this.elapsed = 0;
    this.started = false;
    this.finished = false;
    /** @type {(() => void)[]} */
    this._onComplete = [];
  }

  /** @param {number} delta */
  _advance(delta) {
    this.elapsed += delta;
    const t = Math.max(0, this.elapsed - this.delay);
    const progress = this.duration === 0 ? 1 : Math.min(1, t / this.duration);
    for (const [target, tweens] of this.map) renderTarget(/** @type {any} */(target), tweens, progress);
    if (progress >= 1 && !this.finished) {
      this.finished = true;
      const cbs = this._onComplete.slice();
      this._onComplete.length = 0;
      for (const cb of cbs) cb();
    }
  }

  then() {
    /** @type {Promise<void>} */
    const p = new Promise((resolve) => {
      if (this.finished) { resolve(undefined); return; }
      this._onComplete.push(() => resolve(undefined));
    });
    return p;
  }
}


