/** @module transforms */

/**
 * Compose transform string from pieces.
 * Supports translateX/Y, scaleX/Y, rotate (deg)
 * @param {Partial<Record<'translateX'|'translateY'|'scaleX'|'scaleY'|'rotate', number>>} t
 */
export function composeTransform(t) {
  const parts = [];
  if (t.translateX != null || t.translateY != null) {
    const x = t.translateX || 0; const y = t.translateY || 0;
    parts.push(`translate(${x}px, ${y}px)`);
  }
  if (t.scaleX != null || t.scaleY != null) {
    const sx = t.scaleX == null ? 1 : t.scaleX;
    const sy = t.scaleY == null ? 1 : t.scaleY;
    parts.push(`scale(${sx}, ${sy})`);
  }
  if (t.rotate != null) parts.push(`rotate(${t.rotate}deg)`);
  return parts.join(' ');
}


