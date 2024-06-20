// https://www.nowcoder.com/practice/7c4559f138e74ceb9ba57d76fd169967
const readline = require('readline');

class ImprovedMap {
  private readonly map = new Map<number, [number, number]>();
  private operationCount = 0;
  private setAllValue: number = -1;
  private setAllValueTime: number = -1;

  set(key: number, value: number) {
    this.map.set(key, [value, this.operationCount++]);
  }

  get(key: number) {
    if (!this.map.has(key)) return -1;
    const [val, time] = this.map.get(key) as [number, number];
    return time > this.setAllValueTime ? val : this.setAllValue;
  }

  setAll(value: number) {
    this.setAllValue = value;
    this.setAllValueTime = this.operationCount++;
  }
}

let N;
let map = new ImprovedMap();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('line', function (line: string) {
  if (N === undefined) {
    N = line;
    return;
  }

  const [operation, ...args] = line.split(' ');
  switch (operation) {
    case '1':
      map.set(+args[0], +args[1]);
      return;
    case '2':
      console.log(map.get(+args[0]));
      return;
    case '3':
      map.setAll(+args[0]);
      return;
  }
});
