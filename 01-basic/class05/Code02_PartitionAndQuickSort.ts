/**
 * https://leetcode.com/problems/sort-an-array/
 */
function sortArray(nums: number[]): number[] {
  // sort(nums, 0, nums.length - 1);
  iterSort(nums, 0, nums.length - 1);
  return nums;
}

function iterSort(nums: number[], lo: number, hi: number) {
  const stack = [[lo, hi]];
  while (stack.length) {
    const [lo, hi] = stack.pop();
    if (lo >= hi) continue;

    const pivot = nums[Math.trunc(Math.random() * (hi - lo + 1) + lo)];
    const [lt, gt] = partition(nums, pivot, lo, hi);
    stack.push([lo, lt]);
    stack.push([gt, hi]);
  }
}

function sort(nums: number[], lo: number, hi: number) {
  if (lo >= hi) return;

  const pivot = nums[Math.trunc(Math.random() * (hi - lo + 1) + lo)];
  const [lt, gt] = partition(nums, pivot, lo, hi);
  sort(nums, lo, lt);
  sort(nums, gt, hi);
}

function partition(nums: number[], pivot: number, lo: number, hi: number) {
  if (lo >= hi) return [-1, -1];

  let lt = lo - 1,
    gt = hi + 1,
    i = lo;

  while (i < gt) {
    const cur = nums[i];

    if (cur < pivot) {
      lt++;
      [nums[i], nums[lt]] = [nums[lt], nums[i]];
      i++;
    } else if (cur > pivot) {
      gt--;
      [nums[i], nums[gt]] = [nums[gt], nums[i]];
    } else {
      i++;
    }
  }

  return [lt, gt];
}

function isSameArray(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function randomArray(n: number, min: number, max: number): number[] {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

function test() {
  // Time test
  let prevTotalTime = 0,
    totalTime = 0;
  const times = 1000;
  for (let N = 10; N <= Number.MAX_VALUE; N *= 2) {
    const min = -10000,
      max = 10000;
    const timeStart = Date.now();

    for (let i = 0; i < times; i++) {
      const arr = randomArray(N, min, max);

      const expected = arr.slice().sort((a, b) => a - b);
      const actual = sortArray(arr.slice());
      // const actual = sortArray(arr);
      if (!isSameArray(expected, actual)) {
        console.assert(false, {
          arr,
          expected,
          actual,
        });
        return;
      }
    }

    const timeEnd = Date.now();
    prevTotalTime = totalTime;
    totalTime = timeEnd - timeStart;
    console.log(`N: ${N}, time: ${totalTime}ms, prevTotalTime: ${prevTotalTime}ms`);
    const ratio = totalTime / prevTotalTime;
    const bigO = Math.log2(ratio);
    console.log(`ratio: ${ratio}, bigO: ${bigO}`);
  }
}

test();
