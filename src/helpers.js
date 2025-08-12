/** @module helpers */

/** @returns {number} */
export const now = () => Date.now();

/** @param {number} value @param {number} min @param {number} max */
export function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/** @param {number} value @param {number} precision */
export function round(value, precision) {
  const p = Math.pow(10, precision | 0);
  return Math.round(value * p) / p;
}

/** @param {any} v */
export const isNumber = (v) => typeof v === 'number' && Number.isFinite(v);

/** @param {any} v */
export const isFunction = (v) => typeof v === 'function';

/** @param {any} v */
export const isString = (v) => typeof v === 'string';

/** @param {any} v */
export const isArray = Array.isArray;

/** @param {any} v */
export const isObject = (v) => v != null && typeof v === 'object';

/** @param {number} t milliseconds */
export function normalizeTime(t) {
  if (!Number.isFinite(t)) return 0;
  return t < 0 ? 0 : t;
}

/** @template T @param {T} value */
export function clampInfinity(value) {
  if (value === Infinity) return Number.MAX_SAFE_INTEGER;
  if (value === -Infinity) return -Number.MAX_SAFE_INTEGER;
  return value;
}


