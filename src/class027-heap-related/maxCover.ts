// https://www.nowcoder.com/practice/1ae8d0b6bb4e4bcdbf64ec491f63fc37

import { MyHeap } from '@/utils/heap';

// const readline = require('readline');
//
// let N;
// let segments: [number, number][] = [];
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// rl.on('line', function (line: string) {
//   if (N === undefined) {
//     N = +line.trim();
//     return;
//   }
//
//   N--;
//
//   const segment = line.split(' ').map(Number) as [number, number];
//   segments.push(segment);
//
//   if (N === 0) {
//     console.log(maxCover(segments));
//   }
// });

function maxCover(segments: [number, number][]) {
  const sortedByFirstEle = segments.sort((a, b) => a[0] - b[0]);

  // Store the end value of the segment
  const minHeap = new MyHeap<number>((a, b) => a - b);

  let max = 0;

  for (const [start, end] of sortedByFirstEle) {
    while (minHeap.peek() <= start) {
      minHeap.pop();
    }

    minHeap.add(end);
    max = Math.max(minHeap.size, max);
  }

  return max;
}

function maxCoverBF(arr: [number, number][]) {
  let max = 0;

  const maxEnd = Math.max(...arr.map((ele) => ele[1]));

  for (let cursor = 0.5; cursor < maxEnd; cursor += 1) {
    let cur = 0;
    for (const [start, end] of arr) {
      if (cursor > start && cursor < end) cur++;
    }

    max = Math.max(cur, max);
  }

  return max;
}

function getRandomSegments(size = 10) {
  const res: [number, number][] = [];

  for (let i = 0; i < size; i++) {
    const start = Math.trunc(Math.random() * size * 10);
    const end = Math.trunc(Math.random() * size * 10);

    if (start === end) {
      res.push([start, end + 1]);
      continue;
    }

    res.push([start, end].sort((a, b) => a - b) as [number, number]);
  }

  return res;
}

function validator(times = 100, arrSize = 10) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomSegments(arrSize);

    const expected = maxCoverBF(inputArr.slice());
    const actual = maxCover(inputArr.slice());
    if (expected !== actual) {
      console.error(expected, actual, inputArr);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2], +process.argv[3]);
