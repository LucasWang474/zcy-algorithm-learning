/**
 * https://leetcode.com/problems/sort-an-array/
 */
function sortArray(nums: number[]): number[] {
  sort(nums, 0, nums.length - 1);
  return nums;
}

function sort(nums: number[], lo: number, hi: number) {
  if (lo >= hi) return;

  const pivot = nums[Math.trunc(Math.random() * (hi - lo + 1) + lo)];
  const [L, R] = partition(nums, pivot, lo, hi);
  sort(nums, lo, L - 1);
  sort(nums, R + 1, hi);
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

  return [lt + 1, gt - 1];
}
