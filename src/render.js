import { globals } from './globals.js';
import { round } from './helpers.js';
import { composeNumberWithUnit } from './values.js';
import { normalizeProperty } from './properties.js';
import { composeTransform } from './transforms.js';

/**
 * Render a single frame for one target with provided tweens.
 * Only supports numeric CSS properties for the initial slice.
 * @param {HTMLElement|SVGElement} target
 * @param {import('./types.js').Tween[]} tweens
 * @param {number} progress 0..1
 */
export function renderTarget(target, tweens, progress) {
  const precision = globals.precision;
  /** @type {Record<string, string|number>} */
  const styleBatch = {};
  /** @type {Record<string, number>} */
  const transforms = {};

  for (let i = 0; i < tweens.length; i++) {
    const tw = tweens[i];
    const eased = tw.ease(progress);
    const value = tw.from + (tw.to - tw.from) * eased;
    const rounded = round(value, precision);
    const unit = tw.unit || '';
    const { prop, isTransform } = normalizeProperty(tw.prop);
    if (prop === 'opacity') {
      styleBatch.opacity = rounded;
      continue;
    }
    if (isTransform) {
      transforms[prop] = rounded;
      continue;
    }
    const composed = composeNumberWithUnit(rounded, unit);
    styleBatch[prop] = composed;
  }

  const style = /** @type {any} */ (target.style);
  for (const k in styleBatch) {
    style[k] = /** @type {any} */ (styleBatch[k]);
  }
  if (Object.keys(transforms).length) {
    style.transform = composeTransform(transforms);
  }
}


