const { suite, test } = window;
const expect = window.chai.expect;
import { ScrollObserver } from '../../src/scroll.js';

suite('scroll', () => {
  test('constructs and destroys', () => {
    const el = document.createElement('div');
    el.style.height = '10px';
    document.getElementById('fixtures').appendChild(el);
    const s = new ScrollObserver(el, () => {});
    s.destroy();
    expect(true).to.equal(true);
  });
});


