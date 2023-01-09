/**
 * https://leetcode.com/problems/count-of-range-sum/description/
 *
 * Given an integer array nums and two integers lower and upper,
 * return the number of range sums that lie in [lower, upper] inclusive.
 *
 * Range sum S(i, j) is defined as the sum of the elements in nums
 * between indices i and j inclusive, where i <= j.
 */
function countRangeSum(nums: number[], lower: number, upper: number): number {
  // O(N2)
  const prevSums = [];
  let sum = 0;
  for (let num of nums) {
    sum += num;
    prevSums.push(sum);
  }

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const sum = prevSums[j] - (prevSums[i - 1] || 0);
      if (sum >= lower && sum <= upper) {
        count++;
      }
    }
  }
  return count;
}

// O(N^3)
function bf(nums: number[], lower: number, upper: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const sum = sumRange(nums, i, j);
      if (sum >= lower && sum <= upper) {
        count++;
      }
    }
  }
  return count;
}

function sumRange(nums: number[], i: number, j: number): number {
  let sum = 0;
  for (let k = i; k <= j; k++) {
    sum += nums[k];
  }
  return sum;
}

function randomArray(n: number, min: number, max: number): number[] {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

function test(times: number, n: number, min: number, max: number) {
  const label = `test ${times} times, n=${n}, min=${min}, max=${max}`;
  console.time(label);

  for (let i = 0; i < times; i++) {
    const arr = randomArray(n, min, max);
    let lower = Math.floor(Math.random() * (max - min + 1)) + min;
    let upper = Math.floor(Math.random() * (max - min + 1)) + min;
    lower = Math.min(lower, upper);
    upper = Math.max(lower, upper);

    const expected = bf(arr, lower, upper);
    const actual = countRangeSum(arr, lower, upper);
    if (expected !== actual) {
      console.assert(false, {
        arr,
        lower,
        upper,
        expected,
        actual,
      });
      return;
    }
  }

  console.timeEnd(label);
}

test(
  +process.argv[2] || 100,
  +process.argv[3] || 100,
  +process.argv[4] || 0,
  +process.argv[5] || 100,
);
