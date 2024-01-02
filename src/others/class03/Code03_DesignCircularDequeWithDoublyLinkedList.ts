class DList<T> {
  public value: T;
  public prev: DList<T> | null;
  public next: DList<T> | null;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  toArray() {
    const res = [this.value];
    let head = this.next;
    while (head) {
      res.push(head.value);
      head = head.next;
    }
    return res;
  }
}

/**
 * https://leetcode.com/problems/design-circular-deque/description/
 * Implementation 01: using doubly linked list
 */
class MyCircularDeque {
  private head: DList<number> | null = null;
  private tail: DList<number> | null = null;
  private readonly maxSize: number;
  private size: number;

  /**
   * Initializes the deque with a maximum size of maxSize.
   * @param maxSize
   */
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.size = 0;
  }

  /**
   * Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
   */
  insertFront(value: number): boolean {
    if (this.isFull()) {
      return false;
    }
    if (!this.head) {
      this.init(value);
      return true;
    }

    const node = new DList<number>(value);

    node.next = this.head;
    this.head.prev = node;
    this.head = node;

    this.size++;

    return true;
  }

  /**
   * Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
   */
  insertLast(value: number): boolean {
    if (this.isFull()) {
      return false;
    }
    if (!this.tail) {
      this.init(value);
      return true;
    }

    const node = new DList<number>(value);

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;

    this.size++;

    return true;
  }

  /**
   * Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
   */
  deleteFront(): boolean {
    if (this.isEmpty()) {
      return false;
    }

    if (!this.head?.next) {
      this.reset();
      return true;
    }

    const newHead = this.head.next;
    this.head.next = null;
    newHead.prev = null;
    this.head = newHead;
    this.size--;

    return true;
  }

  /**
   * Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
   */
  deleteLast(): boolean {
    if (this.isEmpty()) {
      return false;
    }

    if (!this.tail?.prev) {
      this.reset();
      return true;
    }

    const newTail = this.tail.prev;
    this.tail.prev = null;
    newTail.next = null;
    this.tail = newTail;
    this.size--;

    return true;
  }

  /**
   * Returns the front item from the Deque. Returns -1 if the deque is empty.
   */
  getFront(): number {
    return this.head?.value ?? -1;
  }

  /**
   * Returns the last item from Deque. Returns -1 if the deque is empty.
   */
  getRear(): number {
    return this.tail?.value ?? -1;
  }

  /**
   * Returns true if the deque is empty, or false otherwise.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns true if the deque is full, or false otherwise.
   */
  isFull(): boolean {
    return this.size === this.maxSize;
  }

  private reset() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  private init(value: number) {
    this.head = new DList<number>(value);
    this.tail = this.head;
    this.size++;
  }
}
