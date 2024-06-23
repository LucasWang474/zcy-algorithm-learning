// https://leetcode.com/problems/subsets-ii/description/

function subsetsWithDup(nums: number[]): number[][] {
  const res: number[][] = [];
  nums = nums.sort((a, b) => a - b);
  subsetsWithDupRecur(nums, 0, [], res);
  return res;
}

function subsetsWithDupRecur(nums: number[], i: number, path: number[], res: number[][]) {
  if (i >= nums.length) {
    res.push([...path]);
    return;
  }

  let nextGroupIdx = i + 1;
  while (nextGroupIdx < nums.length && nums[nextGroupIdx] === nums[i]) {
    nextGroupIdx++;
  }

  subsetsWithDupRecur(nums, nextGroupIdx, path, res);

  for (let k = i; k < nextGroupIdx; k++) {
    path.push(nums[i]);
    subsetsWithDupRecur(nums, nextGroupIdx, path, res);
  }
  for (let k = i; k < nextGroupIdx; k++) {
    path.pop();
  }
}

const res1 = subsetsWithDup([1, 2, 2]);
console.log('>>> a1', res1);

const res2 = subsetsWithDup([0]);
console.log('>>> a1', res2);
