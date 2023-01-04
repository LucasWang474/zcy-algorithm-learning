/**
 * 在一个数组中，任何一个前面的数a，和任何一个后面的数b，如果(a,b)是降序的，就称为降序对
 * 给定一个数组arr，求数组的降序对总数量
 */
function reversePairs(nums: number[]): number {
  const aux = Array(nums.length);
  return mergeSortRecur(nums, aux, 0, nums.length - 1);
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

function merge(nums: number[], aux: number[], L: number, M: number, R: number): number {
  for (let i = L; i <= R; i++) {
    aux[i] = nums[i];
  }

  let i = L,
    j = M + 1,
    sum = 0;

  while (i <= M && j <= R) {
    if (aux[i] > aux[j]) {
      sum += M - i + 1;
      j++;
    } else {
      i++;
    }
  }

  i = L;
  j = M + 1;

  for (let k = L; k <= R; k++) {
    if (i > M || (j <= R && aux[j] < aux[i])) {
      nums[k] = aux[j++];
    } else {
      nums[k] = aux[i++];
    }
  }
  return sum;
}

function bfReversePairs(nums: number[]): number {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        sum++;
      }
    }
  }
  return sum;
}

function getRandomArray(length: number, max: number) {
  const nums = Array(~~(Math.random() * length));
  for (let i = 0; i < length; i++) {
    nums[i] = Math.floor(Math.random() * max - Math.random() * max);
  }
  return nums;
}

function test(times: number, length: number, maxNum: number) {
  const label = `test times: ${times}, length: ${length}, maxNum: ${maxNum}`;
  console.time(label);

  for (let i = 0; i < times; i++) {
    const input = getRandomArray(length, maxNum);
    const expected = bfReversePairs(input.slice());
    const actual = reversePairs(input.slice());
    if (actual !== expected) {
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
