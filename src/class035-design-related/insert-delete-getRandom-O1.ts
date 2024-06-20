// https://leetcode.com/problems/insert-delete-getrandom-o1/
class RandomizedSet {
  public valueToIndexMap = new Map<number, number>();
  public arr: number[] = [];

  constructor() {}

  insert(val: number): boolean {
    if (this.valueToIndexMap.has(val)) return false;

    this.arr.push(val);
    this.valueToIndexMap.set(val, this.arr.length - 1);
    return true;
  }

  remove(val: number): boolean {
    if (!this.valueToIndexMap.has(val)) return false;

    const index = this.valueToIndexMap.get(val) as number;
    this.arr[index] = this.arr[this.arr.length - 1];
    this.valueToIndexMap.set(this.arr[index], index);
    this.arr.pop();
    this.valueToIndexMap.delete(val);
    return true;
  }

  getRandom(): number {
    return this.arr[Math.trunc(Math.random() * this.arr.length)];
  }
}
