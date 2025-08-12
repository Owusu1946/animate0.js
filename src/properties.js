/** @module properties */

const transformProps = new Set([
  'translateX', 'translateY', 'scaleX', 'scaleY', 'rotate'
]);

/**
 * Normalize property names.
 * - Returns { prop, isTransform }
 * @param {string} name
 */
export function normalizeProperty(name) {
  if (transformProps.has(name)) return { prop: name, isTransform: true };
  // Convert CSS property to camelCase for style access
  const parts = name.split('-');
  if (parts.length > 1) {
    const base = parts[0];
    const rest = parts.slice(1).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    return { prop: base + rest, isTransform: false };
  }
  return { prop: name, isTransform: false };
}


