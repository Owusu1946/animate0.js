/** @module eases */

/** @param {number} t */
const easeInQuad = (t) => t * t;
/** @param {number} t */
const easeOutQuad = (t) => t * (2 - t);
/** @param {number} t */
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/** @type {{ [k:string]: (t:number)=>number, linear:(t:number)=>number, easeInQuad:(t:number)=>number, easeOutQuad:(t:number)=>number, easeInOutQuad:(t:number)=>number }} */
export const eases = {
  linear: (t) => t,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
};

/**
 * Parse easing which can be a function or a string key of `eases`.
 * @param {import('./types.js').Ease | keyof eases} e
 */
export function parseEasing(e) {
  if (typeof e === 'function') return e;
  if (typeof e === 'string' && e in eases) return /** @type {(t:number)=>number} */ (eases[/** @type {keyof typeof eases} */(e)]);
  return eases.linear;
}


