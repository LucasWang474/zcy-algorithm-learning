/**
 * https://leetcode.com/problems/two-sum/
 */
function twoSum(nums: number[], target: number): number[] {
  const numToIdx = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const left = target - num;
    if (numToIdx[left] !== undefined) {
      return [i, numToIdx[left]];
    }
    numToIdx[num] = i;
  }
  return [-1, -1];
}
