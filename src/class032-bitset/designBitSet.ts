// https://leetcode.com/problems/design-bitset/
import { getRandomInteger } from '@/utils/random';
import process from 'node:process';

class Bitset {
  public readonly bitSet: number[] = [];
  private readonly maxBits: number;

  private ones: number; // means fixed count
  private zeros: number; // means unfixed count

  private reversed: boolean;

  constructor(bits: number) {
    this.bitSet = new Array(Math.ceil(bits / 32)).fill(0);
    this.maxBits = bits;
    this.ones = 0;
    this.zeros = bits;
    this.reversed = false;
  }

  fix(idx: number): void {
    const i = Math.trunc(idx / 32);
    const count = idx % 32;

    if (!this.reversed) {
      // 1: fixed
      // 0: unfixed

      if ((this.bitSet[i] & (1 << count)) === 0) {
        this.bitSet[i] |= 1 << count;

        this.ones++;
        this.zeros--;
      }
    } else {
      // 1: unfixed
      // 0: fixed
      if ((this.bitSet[i] & (1 << count)) !== 0) {
        // this.bitSet[i] ^= 1 << count;
        this.bitSet[i] &= ~(1 << count);

        this.ones++;
        this.zeros--;
      }
    }
  }

  unfix(idx: number): void {
    const i = Math.trunc(idx / 32);
    const count = idx % 32;

    if (!this.reversed) {
      // 1: fixed
      // 0: unfixed

      if ((this.bitSet[i] & (1 << count)) !== 0) {
        this.bitSet[i] ^= 1 << count;

        this.ones--;
        this.zeros++;
      }
    } else {
      // 1: unfixed
      // 0: fixed
      if ((this.bitSet[i] & (1 << count)) === 0) {
        this.bitSet[i] |= 1 << count;

        this.ones--;
        this.zeros++;
      }
    }
  }

  flip(): void {
    this.reversed = !this.reversed;
    [this.ones, this.zeros] = [this.zeros, this.ones];
  }

  all(): boolean {
    return this.ones === this.maxBits;
  }

  one(): boolean {
    return this.ones > 0;
  }

  count(): number {
    return this.ones;
  }

  toString(): string {
    let res = '';

    for (let num = 0; num < this.maxBits; num++) {
      const i = Math.trunc(num / 32);
      const count = num % 32;

      const val = this.bitSet[i] & (1 << count);
      if (val === 0) {
        res += this.reversed ? '1' : '0';
      } else {
        res += this.reversed ? '0' : '1';
      }
    }
    return res;
  }
}

/**
 * Your Bitset object will be instantiated and called as such:
 * var obj = new Bitset(size)
 * obj.fix(idx)
 * obj.unfix(idx)
 * obj.flip()
 * var param_4 = obj.all()
 * var param_5 = obj.one()
 * var param_6 = obj.count()
 * var param_7 = obj.toString()
 */

function validator(times = 10000) {
  for (let i = 0; i < times; i++) {
    const bits = 1 + getRandomInteger(1e5, { nonNegative: true });

    let hashSet = new Set<number>();
    const bitSet = new Bitset(bits);

    const innerTimes = 1 + Math.trunc(Math.random() * 100);
    for (let j = 0; j < innerTimes; j++) {
      const num = Math.trunc(Math.random() * bits);
      const option = Math.trunc(Math.random() * 2);
      switch (option) {
        case 0:
          // fix
          hashSet.add(num);
          bitSet.fix(num);
          break;
        case 1:
          // unfix
          hashSet.delete(num);
          bitSet.unfix(num);
          break;
        case 2:
          // flip
          hashSet = new Set(
            new Array(bits)
              .map((_, index) => {
                return hashSet.has(index) ? -1 : index;
              })
              .filter((num) => num !== -1),
          );
          bitSet.flip();
          break;
      }
    }

    // all
    const hashSetAll = [...hashSet].sort((a, b) => a - b).length === bits;
    const bitSetAll = bitSet.all();
    if (hashSetAll !== bitSetAll) {
      console.error('all', hashSetAll, bitSetAll, hashSet, bitSet);
      return;
    }

    // one
    const hashSetOne = hashSet.size > 0;
    const bitSetOne = bitSet.one();
    if (hashSetOne !== bitSetOne) {
      console.error('one', hashSetOne, bitSetOne, hashSet, bitSet);
      return;
    }

    // count
    const hashSetCount = hashSet.size;
    const bitSetCount = bitSet.count();
    if (hashSetCount !== bitSetCount) {
      console.error('count', hashSetCount, bitSetCount, hashSet, bitSet);
      return;
    }

    // toString
    const expected = new Array(bits)
      .fill(0)
      .map((_, index) => {
        return hashSet.has(index) ? '1' : '0';
      })
      .join('');
    const actual = bitSet.toString();
    if (expected !== actual) {
      console.log('>>> bits', bits);
      console.error('toString');
      console.error('expected', expected);
      console.error('actual', actual);
      console.error(hashSet, bitSet.bitSet);

      console.log('>>>>>>');
      return;
    }
  }

  console.log('>> All passed!', times);
}

validator(+process.argv[2]);
