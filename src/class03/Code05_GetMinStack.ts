/**
 * https://leetcode.com/problems/min-stack/submissions/
 *
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * Implement the MinStack class:
 *
 * void push(int val) pushes the element val onto the stack.
 * void pop() removes the element on the top of the stack.
 * int top() gets the top element of the stack.
 * int getMin() retrieves the minimum element in the stack.
 *
 * You must implement a solution with O(1) time complexity for each function.
 */
class MinStack {
  private dataStack: number[] = [];
  private minStack: number[] = [];

  constructor() {}

  push(val: number): void {
    this.dataStack.push(val);

    if (!this.minStack.length || val < this.getMin()) {
      this.minStack.push(val);
    } else {
      this.minStack.push(this.getMin());
    }
  }

  pop(): void {
    this.dataStack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.dataStack.at(-1) as number;
  }

  getMin(): number {
    return this.minStack.at(-1) as number;
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
