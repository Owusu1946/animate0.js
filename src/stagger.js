/**
 * Basic stagger implementation for arrays or NodeLists.
 * @param {number|{each?:number, from?:'start'|'center'|'end'|number, ease?:(t:number)=>number}} opts
 * @returns {(el:any, i:number, total:number)=>number}
 */
export function stagger(opts = 100) {
  const cfg = typeof opts === 'number' ? { each: opts } : { each: 100, ...opts };
  const each = Math.max(0, cfg.each || 0);
  const ease = cfg.ease || ((t) => t);
  return (_el, i, total) => {
    const fromIndex = cfg.from === 'center' ? (total - 1) / 2 : cfg.from === 'end' ? total - 1 : Number(cfg.from || 0);
    const dist = Math.abs(i - fromIndex);
    const maxDist = Math.max(fromIndex, total - 1 - fromIndex);
    const t = maxDist === 0 ? 0 : dist / maxDist;
    return each * ease(t) * i / Math.max(1, i || 1);
  };
}


