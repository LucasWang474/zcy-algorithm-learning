/**
 * https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
 * Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it.
 * That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].
 * Return the answer in an array.
 */

function smallerNumbersThanCurrent(nums: number[]): number[] {
  const numToCount: Record<string, number> = {};
  const sortedNums = nums.slice().sort((a, b) => a - b);
  for (let i = 0; i < sortedNums.length; i++) {
    numToCount[sortedNums[i]] = numToCount[sortedNums[i]] ?? i;
  }
  return nums.map((num) => numToCount[num]);
}
