import * as process from 'process';

function printBinary(num: number, bits = 32) {
  let res = '';
  for (let i = bits - 1; i >= 0; i--) {
    res += ((1 << i) & num) === 0 ? '0' : '1';
  }
  console.log('>>> res', res);
}

const num = +process.argv[2] || 0;
const bits = +process.argv[3] || 32;
printBinary(num, bits);
