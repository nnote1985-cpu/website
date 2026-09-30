import { test } from 'node:test';
import assert from 'node:assert/strict';
import { monthlyPayment, affordableLoan } from '../lib/finance.mjs';

test('monthly payment for 2.2m at 4% for 30 years matches independent amortization value', () => {
  assert.ok(Math.abs(monthlyPayment(2200000, 4, 30) - 10503.14) < 0.02);
});
test('zero-interest payment and affordability remain finite', () => {
  assert.equal(monthlyPayment(1200000, 0, 10), 10000);
  assert.equal(affordableLoan(40000, 0, 30), 5040000);
});
test('invalid input never produces NaN or Infinity', () => {
  for (const args of [[-1,4,30], [1,-1,30], [1,4,0], [NaN,4,30], [Infinity,4,30]]) assert.equal(monthlyPayment(...args), 0);
  assert.equal(affordableLoan(-1,4,30),0);
});
test('affordable loan amortizes to the stated 35 percent income assumption', () => {
  const loan = affordableLoan(40000, 4, 30);
  assert.ok(Math.abs(monthlyPayment(loan, 4, 30) - 14000) < 0.001);
});
