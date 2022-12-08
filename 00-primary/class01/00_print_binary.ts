/**
 * print the binary version of an integer
 * test this code based on Number(num).toString(2)
 */

function printBinary(num: number): string {
  if (!num) return '0';

  const isNegative = num < 0;
  num = Math.abs(num);
  let res = '';
  while (num > 0) {
    res = (num & 1) + res;
    num = Math.trunc(num / 2);
    // num >>= 1 // 仅限于 31 位整数
  }

  return (isNegative ? '-' : '') + res;
}

function test(times: number = 10000): void {
  for (let i = -times; i < times; i++) {
    const input = Math.trunc((Math.random() - 0.5) * Number.MAX_SAFE_INTEGER);
    const result = printBinary(input);
    const expected = input.toString(2);
    if (result !== expected) {
      console.log(`Test failed: input: ${input}, expected: ${expected}, result: ${result}`);
      return;
    }
  }

  console.log(`Test passed for ${times} times!`);
}

test();
