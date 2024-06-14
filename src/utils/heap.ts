export class MyHeap<T> {
  public size: number = 0;
  public data: T[] = [];
  private readonly comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  heapify(arr: T[], i: number, heapSize: number) {
    let L = i * 2 + 1;
    while (L < heapSize) {
      let larger = L + 1 < heapSize && this.comparator(arr[L + 1], arr[L]) > 0 ? L + 1 : L;
      larger = this.comparator(arr[larger], arr[i]) > 0 ? larger : i;

      if (larger === i) return;

      swap(arr, larger, i);
      i = larger;
      L = i * 2 + 1;
    }
  }

  heapInsert(arr: T[], i: number) {
    while (this.comparator(arr[i], arr[~~((i - 1) / 2)]) > 0) {
      swap(arr, i, ~~((i - 1) / 2));
      i = ~~((i - 1) / 2);
    }
  }

  add(val: T) {
    this.data.push(val);
    this.size++;
    this.heapInsert(this.data, this.size - 1);
  }

  peek() {
    return this.data[0];
  }

  pop() {
    swap(this.data, 0, this.size - 1);
    const res = this.data.pop();
    this.heapify(this.data, 0, --this.size);
    return res;
  }
}

function swap<T>(arr: T[], i: number, j: number) {
  if (i === j) return;

  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
