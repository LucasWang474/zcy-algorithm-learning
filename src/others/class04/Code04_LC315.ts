/**
 * https://leetcode.com/problems/count-of-smaller-numbers-after-self/description/
 * Given an integer array nums, return an integer array counts
 * where counts[i] is the number of smaller elements to the right of nums[i].
 */

function countSmaller(nums: number[]): number[] {
  const aux = Array(nums.length);
  const res = Array(nums.length).fill(0);
  mergeSortRecur(
    nums.map((ele, index) => [ele, index]),
    aux,
    res,
    0,
    nums.length - 1,
  );
  return res;
}

function mergeSortRecur(
  nums: [number, number][],
  aux: [number, number][],
  res: number[],
  L: number,
  R: number,
) {
  if (L >= R) return 0;

  const M = (L + R) >>> 1;
  mergeSortRecur(nums, aux, res, L, M);
  mergeSortRecur(nums, aux, res, M + 1, R);
  merge(nums, aux, res, L, M, R);
}

function merge(
  nums: [number, number][],
  aux: [number, number][],
  res: number[],
  L: number,
  M: number,
  R: number,
) {
  for (let i = L; i <= R; i++) {
    aux[i] = nums[i];
  }

  let i = L,
    j = M + 1;

  let lessCount = 0;
  while (i <= M && j <= R) {
    if (aux[i][0] > aux[j][0]) {
      lessCount++;
      j++;
    } else {
      res[aux[i][1]] += lessCount;
      i++;
    }
  }
  while (i <= M) {
    res[aux[i][1]] += lessCount;
    i++;
  }

  i = L;
  j = M + 1;

  for (let k = L; k <= R; k++) {
    if (i > M || (j <= R && aux[j][0] < aux[i][0])) {
      nums[k] = aux[j++];
    } else {
      nums[k] = aux[i++];
    }
  }
}

function bf(nums: number[]) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        sum++;
      }
    }
    res.push(sum);
  }
  return res;
}

function getRandomArray(length: number, max: number) {
  const nums = Array(~~(Math.random() * length));
  for (let i = 0; i < length; i++) {
    nums[i] = Math.floor(Math.random() * max - Math.random() * max);
  }
  return nums;
}

function isSameArray(arr1: number[], arr2: number[]) {
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
    const expected = bf(input.slice());
    const actual = countSmaller(input.slice());
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
