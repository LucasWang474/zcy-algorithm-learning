// https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/
class RandomizedCollection {
  public valueToIndexMap = new Map<number, Set<number>>();
  public arr: number[] = [];

  constructor() {}

  insert(val: number): boolean {
    this.arr.push(val);
    if (!this.valueToIndexMap.has(val)) {
      this.valueToIndexMap.set(val, new Set());
    }

    const indicesSet = this.valueToIndexMap.get(val) as Set<number>;
    indicesSet.add(this.arr.length - 1);
    return indicesSet.size === 1;
  }

  remove(val: number): boolean {
    if (!this.valueToIndexMap.has(val)) return false;

    const setForVal = this.valueToIndexMap.get(val);
    const indexForVal = setForVal?.values().next().value as number;
    setForVal?.delete(indexForVal);
    if (!setForVal?.size) {
      this.valueToIndexMap.delete(val);
    }

    if (indexForVal !== this.arr.length - 1) {
      this.arr[indexForVal] = this.arr[this.arr.length - 1];
      const setForSwappedVal = this.valueToIndexMap.get(this.arr[indexForVal]);
      setForSwappedVal?.delete(this.arr.length - 1);
      setForSwappedVal?.add(indexForVal);
    }

    this.arr.pop();

    return true;
  }

  getRandom(): number {
    return this.arr[Math.trunc(Math.random() * this.arr.length)];
  }
}
