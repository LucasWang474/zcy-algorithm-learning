// https://leetcode.com/problems/min-stack/
class MinStack {
  private readonly minStack: number[] = [];
  private readonly stack: number[] = [];

  constructor() {}

  push(val: number): void {
    if (this.minStack.length) {
      this.minStack.push(val);
    } else {
      const curMin = this.minStack.at(-1);
      this.minStack.push(val < curMin ? val : curMin);
    }

    this.stack.push(val);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack.at(-1);
  }

  getMin(): number {
    return this.minStack.at(-1);
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
