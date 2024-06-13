/**
 * https://leetcode.com/problems/implement-queue-using-stacks/description/
 */
class MyQueue {
  private readonly pushStack: number[] = [];
  private readonly popStack: number[] = [];

  constructor() {}

  push(x: number): void {
    this.pushStack.push(x);
  }

  pop(): number {
    this.peek();
    return this.popStack.pop();
  }

  peek(): number {
    if (this.popStack.length === 0) {
      while (this.pushStack.length) {
        this.popStack.push(this.pushStack.pop());
      }
    }
    return this.popStack.at(-1);
  }

  empty(): boolean {
    return this.pushStack.length === 0 && this.popStack.length === 0;
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
