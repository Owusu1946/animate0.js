const { suite, test } = window;
const expect = window.chai.expect;
import { draw } from '../../src/svg.js';

suite('svg', () => {
  test('draw sets stroke dash properties', () => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    const path = document.createElementNS(ns, 'path');
    // Mock length
    path.getTotalLength = () => 100;
    svg.appendChild(path);
    document.getElementById('fixtures').appendChild(svg);
    draw(path, 0.5);
    expect(path.style.strokeDasharray).to.equal('100');
  });
});


