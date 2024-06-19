import { getRandomInteger } from '@/utils/random';
import process from 'node:process';

const MAX_BITS = 32;

class BitSet {
  private readonly bitSet: number[] = [];

  constructor(maxNum: number) {
    this.bitSet = new Array(Math.ceil(maxNum / MAX_BITS)).fill(0);
  }

  add(num: number) {
    this.bitSet[Math.trunc(num / MAX_BITS)] |= 1 << num % 32;
  }

  remove(num: number) {
    this.bitSet[Math.trunc(num / MAX_BITS)] &= ~(1 << num % 32);
  }

  reverse(num: number) {
    this.bitSet[Math.trunc(num / MAX_BITS)] ^= 1 << num % 32;
  }

  contains(num: number) {
    return ((this.bitSet[Math.trunc(num / MAX_BITS)] >>> num % 32) & 1) === 1;
  }
}

function validator(times = 100) {
  const maxNum = 1000;

  const hashSet = new Set<number>();
  const bitSet = new BitSet(maxNum);

  for (let i = 0; i < times; i++) {
    const random = Math.random();

    const num = getRandomInteger(maxNum, { nonNegative: true });
    if (random < 1 / 3) {
      // add
      hashSet.add(num);
      bitSet.add(num);
    } else if (random < 2 / 3) {
      // remove
      hashSet.delete(num);
      bitSet.remove(num);
    } else {
      // reverse
      bitSet.reverse(num);

      if (hashSet.has(num)) {
        hashSet.delete(num);
      } else {
        hashSet.add(num);
      }
    }
  }

  console.log('>>> Result hashSet', hashSet);
  for (const num of hashSet) {
    if (!bitSet.contains(num)) {
      console.error(num, hashSet, bitSet);
      return;
    }
  }

  console.log('>> All passed!', times);
}

validator(+process.argv[2]);
