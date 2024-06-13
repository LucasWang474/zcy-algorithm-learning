class MyStack {
  private readonly queue: number[] = [];

  constructor() {}

  push(x: number): void {
    this.queue.push(x);

    const N = this.queue.length;
    for (let i = 0; i < N - 1; i++) {
      this.queue.push(this.queue.shift());
    }
  }

  pop(): number {
    return this.queue.shift();
  }

  top(): number {
    return this.queue[0];
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
