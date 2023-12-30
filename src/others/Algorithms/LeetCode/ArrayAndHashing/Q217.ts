/**
 * https://leetcode.com/problems/contains-duplicate/
 */
function containsDuplicate(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}
