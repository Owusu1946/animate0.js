import { suite, test } from 'mocha';
import { expect } from 'chai';
import { round, clamp } from '../../src/helpers.js';

suite('node-only helpers', () => {
  test('round and clamp', () => {
    expect(round(1.23456, 2)).to.equal(1.23);
    expect(clamp(10, 0, 5)).to.equal(5);
  });
});


