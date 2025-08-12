/** @module text */

/** Split text content into spans for characters. */
export class TextSplitter {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.original = element.innerHTML;
    this.split();
  }

  split() {
    const text = this.element.textContent || '';
    const frag = document.createDocumentFragment();
    for (const ch of Array.from(text)) {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.display = 'inline-block';
      frag.appendChild(span);
    }
    this.element.innerHTML = '';
    this.element.appendChild(frag);
    return this.element.children;
  }

  revert() {
    this.element.innerHTML = this.original;
  }
}


