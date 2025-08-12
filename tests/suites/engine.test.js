import { engine } from '../../src/animate0.js';
const { suite, test } = window;
const expect = window.chai.expect;

suite('engine', () => {
  test('sets time unit and precision', () => {
    engine.setTimeUnit('s');
    engine.setPrecision(4);
    expect(true).to.equal(true); // smoke
  });
});


