/** @module svg */

/**
 * Compute stroke dasharray/offset to draw an SVG path-like element.
 * @param {SVGPathElement|SVGLineElement|SVGPolylineElement|SVGPolygonElement} el
 * @param {number} progress 0..1
 */
export function draw(el, progress) {
  const total = getTotalLength(el);
  const p = Math.max(0, Math.min(1, progress));
  el.style.strokeDasharray = `${total}`;
  el.style.strokeDashoffset = String(total * (1 - p));
}

/** @param {SVGPathElement|SVGLineElement|SVGPolylineElement|SVGPolygonElement} el */
export function getTotalLength(el) {
  if ('getTotalLength' in el) return /** @type {any} */(el).getTotalLength();
  return 0;
}


