/** @module consts */

/** @type {number} Max FPS for engine scheduling */
export const MAX_FPS = 120;

/** @type {number} Default precision for rendering numeric values */
export const DEFAULT_PRECISION = 3;

/** Package version injected by build */
// In dev builds this may be replaced; define a fallback string for type-checking.
// @ts-ignore
export const VERSION = /** @type {string} */ (typeof __packageVersion__ !== 'undefined' ? __packageVersion__ : '0.0.0');


