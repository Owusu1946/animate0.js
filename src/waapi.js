/** @module waapi */

/**
 * Create a WAAPI animation with normalized keyframes and options.
 * @param {Element} el
 * @param {Keyframe[]|PropertyIndexedKeyframes} keyframes
 * @param {KeyframeAnimationOptions} options
 */
export function waapi(el, keyframes, options) {
  if (!el || !el.animate) throw new Error('WAAPI not supported or invalid element');
  const anim = el.animate(keyframes, options);
  return new WAAPIAnimation(anim);
}

export class WAAPIAnimation {
  /** @param {Animation} anim */
  constructor(anim) {
    this.anim = anim;
  }
  play() { this.anim.play(); return this; }
  pause() { this.anim.pause(); return this; }
  cancel() { this.anim.cancel(); return this; }
  /** @returns {Promise<void>} */
  then() { return new Promise((r) => { this.anim.addEventListener('finish', () => r(undefined)); }); }
}


