import { eases, parseEasing } from '../../src/eases.js';
const { suite, test } = window;
const expect = window.chai.expect;

suite('eases', () => {
  test('parseEasing resolves names and functions', () => {
    expect(parseEasing('linear')(0.5)).to.equal(0.5);
    expect(parseEasing(eases.easeInOutQuad)(0.5)).to.be.greaterThan(0.49);
  });
});


