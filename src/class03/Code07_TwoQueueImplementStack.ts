/**
 * https://leetcode.com/problems/implement-queue-using-stacks/
 *
 * Implement a first in first out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
 *
 * Notes:
 * You must use only standard operations of a stack,
 * which means only push to top, peek/pop from top, size,
 * and is empty operations are valid.
 *
 * Depending on your language, the stack may not be supported natively.
 * You may simulate a stack using a list or deque (double-ended queue)
 * as long as you use only a stack's standard operations.
 *
 * NOTE: All the calls to pop and peek are valid.
 */
class MyQueue {
	private dataStack: number[] = [];
	private queueStack: number[] = [];

	constructor() {
	}

	push(x: number): void {
		this.dataStack.push(x);
	}

	pop(): number {
		this.peek();
		return this.queueStack.pop() as number;
	}

	/**
	 * Returns the element at the front of the queue.
	 */
	peek(): number {
		if (!this.queueStack.length) {
			while (this.dataStack.length) {
				this.queueStack.push(this.dataStack.pop() as number);
			}
		}

		return this.queueStack.at(-1) as number;
	}

	/**
	 * Returns true if the queue is empty, false otherwise.
	 */
	empty(): boolean {
		return !this.dataStack.length && !this.queueStack.length;
	}
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
