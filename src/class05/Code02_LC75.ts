/**
 * https://leetcode.com/problems/sort-colors/description/
 */
function sortColors(nums: number[]): void {
  partition(nums, 1, 0, nums.length - 1);
}

function partition(nums: number[], pivot: number, lo: number, hi: number) {
  if (lo >= hi) return [-1, -1];

  let lt = lo - 1,
    gt = hi + 1,
    i = lo;

  while (i < gt) {
    const cur = nums[i];

    if (cur < pivot) {
      lt++;
      [nums[i], nums[lt]] = [nums[lt], nums[i]];
      i++;
    } else if (cur > pivot) {
      gt--;
      [nums[i], nums[gt]] = [nums[gt], nums[i]];
    } else {
      i++;
    }
  }

  return [lt, gt];
}
