// 返回大于等于n的最小的2某次方
// 如果int范围内不存在这样的数，返回整数最小值

import { getRandomInteger } from '@/utils/random';
import process from 'node:process';

function near2Power(num: number) {
  if (num <= 0) return 1;

  num--; // 用来解决 num 已经是2的幂的边界条件
  num |= num >>> 1;
  num |= num >>> 2;
  num |= num >>> 4;
  num |= num >>> 8;
  num |= num >>> 16;
  return num + 1;
}

function bf(num: number) {
  if (num <= 0) return 1;

  const exponent = Math.ceil(Math.log2(num));
  return 2 ** exponent;
}

function validator(times = 100, size = 2 ** 31 + 4) {
  for (let i = 0; i < times; i++) {
    const num = getRandomInteger(size);
    const expected = bf(num);
    const actual = near2Power(num);
    if (expected !== actual) {
      console.error(expected, actual, num);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

if (+process.argv[3]) {
  validator(+process.argv[2], +process.argv[3]);
} else {
  validator(+process.argv[2]);
}
