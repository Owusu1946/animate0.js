/** @module utils */

/**
 * Register targets helper; accepts CSS selector, element, or array.
 * @param {string|Element|Element[]} targets
 */
export function $(targets) {
  if (typeof targets === 'string') return Array.from(document.querySelectorAll(targets));
  if (targets instanceof Element) return [targets];
  if (Array.isArray(targets)) return targets;
  return [];
}


