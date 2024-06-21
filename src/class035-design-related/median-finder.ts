class MedianFinder {
  maxHeap = new MyHeap<number>((a, b) => b - a); // small values
  minHeap = new MyHeap<number>((a, b) => a - b); // larger values

  constructor() {}

  addNum(num: number): void {
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.add(num);
    } else {
      this.minHeap.add(num);
    }

    const sizeMaxHeap = this.maxHeap.size;
    const sizeMinHeap = this.minHeap.size;
    if (Math.abs(sizeMinHeap - sizeMaxHeap) === 2) {
      if (sizeMaxHeap > sizeMinHeap) {
        this.minHeap.add(this.maxHeap.pop());
      } else {
        this.maxHeap.add(this.minHeap.pop());
      }
    }
  }

  findMedian(): number {
    const sizeMaxHeap = this.maxHeap.size;
    const sizeMinHeap = this.minHeap.size;

    if (sizeMaxHeap > sizeMinHeap) {
      return this.maxHeap.peek();
    } else if (sizeMinHeap > sizeMaxHeap) {
      return this.minHeap.peek();
    } else {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
  }
}

class MyHeap<T> {
  public size: number = 0;
  public readonly data: T[] = [];
  public readonly comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  heapify(arr: T[], i: number, heapSize: number) {
    let L = i * 2 + 1;
    while (L < heapSize) {
      let smaller = L + 1 < heapSize && this.comparator(arr[L + 1], arr[L]) < 0 ? L + 1 : L;
      smaller = this.comparator(arr[smaller], arr[i]) < 0 ? smaller : i;

      if (smaller === i) return;

      swap(arr, smaller, i);
      i = smaller;
      L = i * 2 + 1;
    }
  }

  heapInsert(arr: T[], i: number) {
    while (this.comparator(arr[i], arr[~~((i - 1) / 2)]) < 0) {
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

  pop(): T {
    swap(this.data, 0, this.size - 1);
    const res = this.data.pop() as T;
    this.heapify(this.data, 0, --this.size);
    return res;
  }

  isEmpty() {
    return this.size === 0;
  }
}

function swap<T>(arr: T[], i: number, j: number) {
  if (i === j) return;

  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
