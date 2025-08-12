import { animate } from '../../src/animate0.js';
const { suite, test } = window;
const expect = window.chai.expect;
import { createBox } from '../setup.js';

suite('animations', () => {
  test('animates opacity 0->1', async function () {
    this.timeout(5000);
    const el = createBox();
    const a = animate({ targets: el, duration: 50, props: { opacity: [0, 1] } });
    await a.then();
    expect(parseFloat(el.style.opacity)).to.be.closeTo(1, 0.01);
  });
});


