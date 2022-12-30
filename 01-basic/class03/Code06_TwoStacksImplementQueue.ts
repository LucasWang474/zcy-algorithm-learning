/**
 * https://leetcode.com/problems/implement-stack-using-queues/
 *
 * Implement a last-in-first-out (LIFO) stack using only two queues.
 * The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).
 *
 * Notes:
 *
 * You must use only standard operations of a queue,
 * which means that only push to back, peek/pop from front, size and is empty operations are valid.
 *
 * Depending on your language, the queue may not be supported natively.
 * You may simulate a queue using a list or deque (double-ended queue)
 * as long as you use only a queue's standard operations.
 */
class MyStack {
  private queue: number[] = [];

  constructor() {}

  push(x: number): void {
    this.queue.push(x);
  }

  pop(): number {
    const size = this.queue.length;
    for (let i = 0; i < size - 1; i++) {
      this.queue.push(this.queue.shift() as number);
    }
    return this.queue.shift() as number;
  }

  top(): number {
    const size = this.queue.length;
    for (let i = 0; i < size - 1; i++) {
      this.queue.push(this.queue.shift() as number);
    }
    const res = this.queue.shift() as number;
    this.queue.push(res);
    return res;
  }

  empty(): boolean {
    return this.queue.length === 0;
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
