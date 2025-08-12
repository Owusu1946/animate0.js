/** @module draggable */

export class Draggable {
  /** @param {HTMLElement} el */
  constructor(el) {
    this.el = el;
    /** @param {PointerEvent} e */
    this._onDown = (e) => this._down(e);
    /** @param {PointerEvent} e */
    this._onMove = (e) => this._move(e);
    this._onUp = () => this._up();
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', this._onDown);
  }

  /** @param {PointerEvent} e */
  _down(e) {
    this.active = true;
    this.startX = e.clientX; this.startY = e.clientY;
    // Parse current translate from inline/computed styles (handles matrix and translate forms)
    const tr = this.el.style.transform || getComputedStyle(this.el).transform || '';
    let tx = 0, ty = 0;
    const m1 = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(tr);
    if (m1) { tx = parseFloat(m1[1]); ty = parseFloat(m1[2]); }
    else if (tr.startsWith('matrix(')) {
      const parts = tr.replace('matrix(', '').replace(')', '').split(',').map(s => parseFloat(s));
      if (parts.length === 6) { tx = parts[4] || 0; ty = parts[5] || 0; }
    } else if (tr.startsWith('matrix3d(')) {
      const parts = tr.replace('matrix3d(', '').replace(')', '').split(',').map(s => parseFloat(s));
      if (parts.length === 16) { tx = parts[12] || 0; ty = parts[13] || 0; }
    }
    this.baseTX = tx; this.baseTY = ty;
    this.pointerId = e.pointerId;
    if (this.el.setPointerCapture) try { this.el.setPointerCapture(this.pointerId); } catch {}
    this.el.style.cursor = 'grabbing';
    e.preventDefault();
    window.addEventListener('pointermove', this._onMove);
    window.addEventListener('pointerup', this._onUp);
  }

  /** @param {PointerEvent} e */
  _move(e) {
    if (!this.active) return;
    const dx = e.clientX - /** @type {number} */(this.startX || 0);
    const dy = e.clientY - /** @type {number} */(this.startY || 0);
    const tx = /** @type {number} */(this.baseTX || 0) + dx;
    const ty = /** @type {number} */(this.baseTY || 0) + dy;
    this.el.style.transform = `translate(${tx}px, ${ty}px)`;
  }

  _up() {
    this.active = false;
    this.el.style.cursor = '';
    try { if (this.el.releasePointerCapture && this.pointerId != null) this.el.releasePointerCapture(this.pointerId); } catch {}
    this.pointerId = null;
    window.removeEventListener('pointermove', this._onMove);
    window.removeEventListener('pointerup', this._onUp);
  }

  destroy() { this.el.removeEventListener('pointerdown', this._onDown); }
}

/** @param {HTMLElement} el */
export function createDraggable(el) { return new Draggable(el); }


