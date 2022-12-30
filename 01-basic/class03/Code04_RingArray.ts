/**
 * https://leetcode.com/problems/design-circular-queue/description/
 *
 * Design your implementation of the circular queue.
 * The circular queue is a linear data structure
 * in which the operations are performed based on FIFO (First In First Out) principle,
 * and the last position is connected back to the first position to make a circle.
 * It is also called "Ring Buffer".
 *
 * One of the benefits of the circular queue is that we can make use of the spaces in front of the queue.
 * In a normal queue, once the queue becomes full,
 * we cannot insert the next element even if there is a space in front of the queue.
 * But using the circular queue, we can use the space to store new values.
 */
class MyCircularQueue {
  private readonly maxSize: number;
  private size: number = 0;
  private head: number = 0;
  private tail: number = 0;
  private readonly items: number[];

  /**
   * Initializes the object with the size of the queue to be maxSize.
   * @param maxSize
   */
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.items = Array(maxSize);
  }

  /**
   * Inserts an element into the circular queue. Return true if the operation is successful.
   */
  enQueue(value: number): boolean {
    if (this.isFull()) return false;

    if (this.isEmpty()) {
      this.head = 0;
      this.tail = 0;
    } else {
      this.tail = (this.tail + 1) % this.items.length;
    }

    this.items[this.tail] = value;
    this.size++;

    return true;
  }

  /**
   * Deletes an element from the circular queue. Return true if the operation is successful.
   */
  deQueue(): boolean {
    if (this.isEmpty()) return false;

    this.head = (this.head + 1) % this.items.length;
    this.size--;

    return true;
  }

  /**
   * Gets the front item from the queue. If the queue is empty, return -1.
   */
  Front(): number {
    if (this.isEmpty()) return -1;
    return this.items[this.head];
  }

  /**
   * Gets the last item from the queue. If the queue is empty, return -1.
   */
  Rear(): number {
    if (this.isEmpty()) return -1;
    return this.items[this.tail];
  }

  /**
   * Checks whether the circular queue is empty or not.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Checks whether the circular queue is full or not.
   */
  isFull(): boolean {
    return this.size === this.maxSize;
  }
}
