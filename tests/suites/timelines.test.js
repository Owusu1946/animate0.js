import { animate, createTimeline } from '../../src/animate0.js';
const { suite, test } = window;
const expect = window.chai.expect;
import { createBox } from '../setup.js';

suite('timelines', () => {
  test('plays two animations in sequence', async function () {
    this.timeout(5000);
    const el = createBox();
    const a1 = animate({ targets: el, duration: 50, props: { opacity: [0, 1] } });
    const a2 = animate({ targets: el, duration: 50, props: { translateX: [0, 50] } });
    const tl = createTimeline().add(a1, 0).add(a2, 60).play();
    await a1.then();
    await a2.then();
    expect(parseFloat(el.style.opacity)).to.be.closeTo(1, 0.01);
  });
});


