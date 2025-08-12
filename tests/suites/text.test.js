const { suite, test } = window;
const expect = window.chai.expect;
import { TextSplitter } from '../../src/text.js';

suite('text', () => {
  test('split and revert', () => {
    const el = document.createElement('div');
    el.textContent = 'abc';
    document.getElementById('fixtures').appendChild(el);
    const s = new TextSplitter(el);
    expect(el.children.length).to.equal(3);
    s.revert();
    expect(el.textContent).to.equal('abc');
  });
});


