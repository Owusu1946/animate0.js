import { $ } from '../../src/utils.js';
const { suite, test } = window;
const expect = window.chai.expect;

suite('utils', () => {
  test('$ selects elements', () => {
    const d = document.createElement('div');
    d.id = 'x';
    document.getElementById('fixtures').appendChild(d);
    const res = $('#x');
    expect(res.length).to.equal(1);
  });
});


