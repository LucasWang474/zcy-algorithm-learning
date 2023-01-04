/**
 *
 * 在一个数组中，一个数左边比它小的数的总和，叫该数的小和
 * 所有数的小和累加起来，叫数组小和
 * 例子： [1,3,4,2,5]
 * 1左边比1小的数：没有
 * 3左边比3小的数：1
 * 4左边比4小的数：1、3
 * 2左边比2小的数：1
 * 5左边比5小的数：1、3、4、 2
 * 所以数组的小和为1+1+3+1+1+3+4+2=16
 * 给定一个数组arr，求数组小和
 */
function smallSum(nums: number[]): number {
  const aux = Array(nums.length);
  return mergeSortRecur(nums, aux, 0, nums.length - 1);
}

function bfSmallSum(nums: number[]): number {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) sum += nums[j];
    }
  }
  return sum;
}

function merge(nums: number[], aux: number[], L: number, M: number, R: number): number {
  for (let i = L; i <= R; i++) {
    aux[i] = nums[i];
  }

  let i = L,
    j = M + 1,
    sum = 0;

  for (let k = L; k <= R; k++) {
    if (i > M) {
      nums[k] = aux[j++];
    } else if (j > R) {
      nums[k] = aux[i++];
    } else if (aux[j] <= aux[i]) {
      nums[k] = aux[j++];
    } else {
      sum += aux[i] * (R - j + 1);
      nums[k] = aux[i++];
    }
  }
  return sum;
}

function mergeSortRecur(nums: number[], aux: number[], L: number, R: number): number {
  if (L >= R) return 0;

  const M = (L + R) >>> 1;
  return (
    mergeSortRecur(nums, aux, L, M) +
    mergeSortRecur(nums, aux, M + 1, R) +
    merge(nums, aux, L, M, R)
  );
}

function getRandomArray(length: number, max: number) {
  const nums = Array(~~(Math.random() * length));
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
    const expected = bfSmallSum(input.slice());
    const actual = smallSum(input.slice());
    if (expected !== actual) {
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
