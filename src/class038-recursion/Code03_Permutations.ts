// https://leetcode.com/problems/permutations/

function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  permuteRecur(nums, 0, res);
  return res;
}

function permuteRecur(nums: number[], i: number, res: number[][]) {
  if (i >= nums.length) return;

  if (i === nums.length - 1) {
    res.push([...nums]);
    return;
  }

  for (let j = i; j < nums.length; j++) {
    swap(nums, i, j);
    permuteRecur(nums, i + 1, res);
    swap(nums, i, j);
  }
}

function swap<T>(arr: T[], i: number, j: number) {
  if (i === j) return;

  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const res1 = permute([1, 2, 3]);
console.log('>>> res1', res1);
