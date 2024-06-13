class MyCircularDeque {
  private readonly deque: number[];
  private size: number;
  private limit: number;
  private L: number;
  private R: number;

  constructor(k: number) {
    this.limit = k;
    this.size = 0;
    this.L = 0;
    this.R = 0;
    this.deque = new Array(k);
  }

  private insertFirst(value: number) {
    this.L = 0;
    this.R = 0;
    this.deque[0] = value;
    this.size = 1;
  }

  insertFront(value: number): boolean {
    if (this.isFull()) return false;
    if (this.isEmpty()) {
      this.insertFirst(value);
      return true;
    }

    const newL = (this.L - 1 + this.limit) % this.limit;
    this.deque[newL] = value;
    this.L = newL;
    this.size++;
    return true;
  }

  insertLast(value: number): boolean {
    if (this.isFull()) return false;
    if (this.isEmpty()) {
      this.insertFirst(value);
      return true;
    }

    const newR = (this.R + 1) % this.limit;
    this.deque[newR] = value;
    this.R = newR;
    this.size++;
    return true;
  }

  deleteFront(): boolean {
    if (this.isEmpty()) return false;

    this.size--;
    this.L = (this.L + 1) % this.limit;

    return true;
  }

  deleteLast(): boolean {
    if (this.isEmpty()) return false;

    this.size--;
    this.R = (this.R - 1 + this.limit) % this.limit;

    return true;
  }

  getFront(): number {
    if (this.isEmpty()) return -1;
    return this.deque[this.L];
  }

  getRear(): number {
    if (this.isEmpty()) return -1;
    return this.deque[this.R];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.limit;
  }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
