/**
 * https://leetcode.com/problems/product-of-array-except-self/
 */
function productExceptSelf(nums: number[]): number[] {
  const res: number[] = Array(nums.length);

  let prefix = 1;
  for (let i = 0; i < res.length; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = res.length - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }

  return res;
}
