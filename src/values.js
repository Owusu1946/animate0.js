import { isNumber, isString } from './helpers.js';

/**
 * Detect number with optional unit like "20px" or "1.5".
 * Returns { value:number, unit:string }
 * @param {string|number} v
 */
export function parseNumberWithUnit(v) {
  if (isNumber(v)) return { value: v, unit: '' };
  if (!isString(v)) throw new TypeError('Expected string or number');
  const m = /([-+]?\d*\.?\d+)([a-z%]*)/i.exec(v.trim());
  if (!m) throw new Error(`Invalid numeric value: ${v}`);
  return { value: parseFloat(m[1]), unit: m[2] || '' };
}

/**
 * Compose number and unit back to a string or number when unit empty.
 * @param {number} value
 * @param {string} unit
 */
export function composeNumberWithUnit(value, unit) {
  return unit ? String(value) + unit : value;
}

/**
 * Parse complex values: numbers, colors, arrays of numbers (e.g., transform decompositions)
 * For this milestone, support numbers and colors only.
 */
/** @param {any} v */
export function parseValue(v) {
  if (isNumber(v) || (isString(v) && /^[-+]?\d/.test(v))) {
    const { value, unit } = parseNumberWithUnit(v);
    return { type: 'number', value, unit };
  }
  if (isString(v)) {
    const rgba = parseColor(v);
    if (rgba) return { type: 'color', value: rgba };
  }
  throw new Error(`Unsupported value: ${String(v)}`);
}

/**
 * Parse hex/rgb/rgba/hsl(a) strings to RGBA array.
 * @param {string} s
 * @returns {number[]|null}
 */
export function parseColor(s) {
  const str = s.trim();
  // #RRGGBB or #RGB
  let m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(str);
  if (m) {
    let hex = m[1];
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const num = parseInt(hex, 16);
    return [ (num >> 16) & 255, (num >> 8) & 255, num & 255, 1 ];
  }
  // rgb(a)
  m = /^rgba?\(([^)]+)\)$/i.exec(str);
  if (m) {
    const parts = m[1].split(',').map((p) => p.trim());
    const r = parseFloat(parts[0]);
    const g = parseFloat(parts[1]);
    const b = parseFloat(parts[2]);
    const a = parts[3] != null ? parseFloat(parts[3]) : 1;
    return [r, g, b, a];
  }
  return null;
}



