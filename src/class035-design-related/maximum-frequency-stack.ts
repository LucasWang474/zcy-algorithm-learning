// https://leetcode.com/problems/maximum-frequency-stack/description/

class FreqStack {
  valToFreqMap = new Map<number, number>();
  freq2d: number[][] = [];

  constructor() {}

  push(val: number): void {
    const count = this.valToFreqMap.get(val) || 0;

    if (!this.freq2d[count]) this.freq2d[count] = [];
    this.freq2d[count].push(val);

    this.valToFreqMap.set(val, count + 1);
  }

  pop(): number {
    const res = this.freq2d[this.freq2d.length - 1].pop() as number;
    if (!this.freq2d[this.freq2d.length - 1].length) this.freq2d.pop();

    this.valToFreqMap.set(res, (this.valToFreqMap.get(res) as number) - 1);
    if (!this.valToFreqMap.get(res)) {
      this.valToFreqMap.delete(res);
    }

    return res;
  }
}
