class MyCircularDeque {
  private readonly deque: number[];

  // front element's index
  private front: number;
  // the index for putting a new element in the rear
  private rear: number;
  private size: number;
  private readonly limit: number;

  constructor(k: number) {
    this.deque = new Array(k);
    this.front = 0;
    this.rear = 0;
    this.size = 0;
    this.limit = k;
  }

  insertFront(value: number): boolean {
    if (this.isFull()) return false;

    const newFront = (this.front - 1 + this.limit) % this.limit;
    this.deque[newFront] = value;
    this.front = newFront;
    this.size++;
    return true;
  }

  insertLast(value: number): boolean {
    if (this.isFull()) return false;

    this.deque[this.rear] = value;
    this.rear = (this.rear + 1) % this.limit;
    this.size++;
    return true;
  }

  deleteFront(): boolean {
    if (this.isEmpty()) return false;

    // if (this.size === 1) {
    //   this.front = 0;
    //   this.rear = 0;
    //   this.size = 0;
    //   return true;
    // }

    this.size--;
    this.front = (this.front + 1) % this.limit;
    return true;
  }

  deleteLast(): boolean {
    if (this.isEmpty()) return false;

    // if (this.size === 1) {
    //   this.front = 0;
    //   this.rear = 0;
    //   this.size = 0;
    //   return true;
    // }

    this.size--;
    this.rear = (this.rear - 1 + this.limit) % this.limit;
    return true;
  }

  getFront(): number {
    if (this.isEmpty()) return -1;
    return this.deque[this.front];
  }

  getRear(): number {
    if (this.isEmpty()) return -1;
    return this.deque[(this.rear - 1 + this.limit) % this.limit];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.limit;
  }
}
