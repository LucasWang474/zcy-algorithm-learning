/**
 * https://leetcode.com/problems/sort-an-array/description/
 * @param nums
 */
function sortArray(nums: number[]): number[] {
  const aux = Array(nums.length);
  // mergeSortRecur(nums, aux, 0, nums.length - 1);
  mergeSortIter(nums);
  return nums;
}

// -------------------- Merge sort START --------------------
function mergeSortIter(nums: number[]) {
  const aux = new Array(nums.length);

  const N = nums.length;
  for (let step = 1; step < N; step *= 2) {
    for (let L = 0; L < N - step; L += step * 2) {
      merge(nums, aux, L, L + step - 1, Math.min(N - 1, L + step * 2 - 1));
    }
  }
}

function merge(nums: number[], aux: number[], L: number, M: number, R: number) {
  for (let i = L; i <= R; i++) {
    aux[i] = nums[i];
  }

  let i = L,
    j = M + 1;
  for (let k = L; k <= R; k++) {
    if (i > M || (j <= R && aux[j] < aux[i])) {
      nums[k] = aux[j++];
    } else {
      nums[k] = aux[i++];
    }
  }
}

function mergeSortRecur(nums: number[], aux: number[], L: number, R: number) {
  if (L >= R) return;

  const M = (L + R) >>> 1;
  mergeSortRecur(nums, aux, L, M);
  mergeSortRecur(nums, aux, M + 1, R);
  merge(nums, aux, L, M, R);
}

// -------------------- Merge sort END --------------------

function getRandomArray(length: number, max: number) {
  const nums = Array(length);
  for (let i = 0; i < length; i++) {
    nums[i] = Math.floor(Math.random() * max - Math.random() * max);
  }
  return nums;
}

function isSameArray(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function test(times: number, length: number, maxNum: number) {
  const label = `test times: ${times}, length: ${length}, maxNum: ${maxNum}`;
  console.time(label);

  for (let i = 0; i < times; i++) {
    const input = getRandomArray(length, maxNum);
    const expected = input.slice().sort((a, b) => a - b);
    const actual = sortArray(input.slice());
    if (!isSameArray(expected, actual)) {
      console.assert(false, {
        input,
        expected,
        actual,
      });
      return;
    }
  }

  console.timeEnd(label);
}

test(+process.argv[2] || 1000, +process.argv[3] || 100, +process.argv[4] || 100);
