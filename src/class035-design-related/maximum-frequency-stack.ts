// https://leetcode.com/problems/maximum-frequency-stack/description/

class FreqStack {
  valToFrequencyMap = new Map<number, number>();
  stack: number[][] = [];
  maxFreq = 0;

  constructor() {}

  push(val: number): void {
    this.valToFrequencyMap.set(val, (this.valToFrequencyMap.get(val) || 0) + 1);
    const newFreq = this.valToFrequencyMap.get(val) as number;

    if (newFreq > this.maxFreq) {
      this.maxFreq = newFreq;
      this.stack.push([val]);
    } else {
      this.stack[newFreq - 1].push(val);
    }
  }

  pop(): number {
    const res = this.stack[this.maxFreq - 1].pop() as number;
    this.valToFrequencyMap.set(res, (this.valToFrequencyMap.get(res) as number) - 1);
    if (!this.stack[this.maxFreq - 1].length) {
      this.maxFreq--;
      this.stack.pop();
    }
    return res;
  }
}
