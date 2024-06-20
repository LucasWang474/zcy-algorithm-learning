// https://leetcode.com/problems/divide-two-integers/description/
import process from 'node:process';
import { getRandomInteger } from '@/utils/random';

function add(num1: number, num2: number) {
  let res = num1;

  while (num2) {
    const xorRes = num1 ^ num2;
    const carryRes = (num1 & num2) << 1;

    res = xorRes;
    num1 = xorRes;
    num2 = carryRes;
  }

  return res;
}

function minus(num1: number, num2: number) {
  return add(num1, neg(num2));
}

function neg(num: number) {
  return add(~num, 1);
}

function multiply(num1: number, num2: number) {
  let res = 0;

  while (num2) {
    if (num2 & 1) {
      res = add(res, num1);
    }

    num1 <<= 1;
    num2 >>>= 1;
  }

  return res;
}

function divideSimple(a: number, b: number) {
  if (b === 0) {
    throw new Error('divisor can not be zero');
  }

  let res = 0;

  let num1 = a < 0 ? neg(a) : a;
  const num2 = b < 0 ? neg(b) : b;

  for (let i = 30; i >= 0; i--) {
    if (num1 >>> i >= num2) {
      res |= 1 << i;
      num1 = minus(num1, num2 << i);
    }
  }

  return Number(a < 0) ^ Number(b < 0) ? neg(res) : res;
}

const MIN_VALUE = -(2 ** 31);

function divide(dividend: number, divisor: number): number {
  if (dividend === MIN_VALUE && divisor === MIN_VALUE) {
    return 1;
  }

  if (dividend !== MIN_VALUE && divisor !== MIN_VALUE) {
    return divideSimple(dividend, divisor);
  }

  if (divisor === MIN_VALUE) {
    return 0;
  }

  if (divisor === neg(1)) {
    return 2 ** 31 - 1;
  }

  dividend = add(divisor > 0 ? divisor : neg(divisor), dividend);
  const res = divideSimple(dividend, divisor);
  return add(res, divisor > 0 ? neg(1) : 1);
}

function validator(times = 100) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  for (let i = 0; i < times; i++) {
    const num1 = getRandomInteger(2 ** 31 + 1);
    const num2 = getRandomInteger(2 ** 31 + 1);

    const expected = (num1 + num2) | 0; // for overflow case
    const actual = add(num1, num2);
    if (expected !== actual) {
      console.error('add', expected, actual, num1, num2);
      return;
    }
  }
  console.log('>>> All tests for add passed!', times);

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  for (let i = 0; i < times; i++) {
    const num1 = getRandomInteger(2 ** 31 + 1);
    const num2 = getRandomInteger(2 ** 31 + 1);

    const expected = (num1 - num2) | 0; // for overflow case
    const actual = minus(num1, num2);
    if (expected !== actual) {
      console.error('minus', expected, actual, num1, num2);
      return;
    }
  }
  console.log('>>> All tests for minus passed!', times);

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  for (let i = 0; i < times; i++) {
    const num1 = getRandomInteger(2 ** 20);
    const num2 = getRandomInteger(2 ** 20);

    const expected = (num1 * num2) | 0; // for overflow case
    const actual = multiply(num1, num2);
    if (expected !== actual) {
      console.error('multiply', expected, actual, num1, num2);
      return;
    }
  }
  console.log('>>> All tests for multiply passed!', times);

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  for (let i = 0; i < times; i++) {
    const num1 = getRandomInteger(2 ** 31 + 1);
    const num2 = getRandomInteger(2 ** 31 + 1);

    if (num2 === 0) continue;

    const expected = ~~Math.trunc(num1 / num2); // for overflow case
    const actual = divide(num1, num2);
    if (expected !== actual) {
      console.error('divide', expected, actual, num1, num2);
      return;
    }
  }
  console.log('>>> All tests for divide passed!', times);
}

validator(+process.argv[2]);
