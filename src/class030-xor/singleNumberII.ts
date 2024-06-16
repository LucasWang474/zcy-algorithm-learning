// https://leetcode.com/problems/single-number-ii/
function singleNumber(nums: number[]): number {
  const counts = new Array(32).fill(0);

  for (const num of nums) {
    for (let i = 0; i < 32; i++) {
      if ((num & (1 << i)) !== 0) {
        counts[i]++;
      }
    }
  }

  let res = 0;
  for (let i = 0; i < 32; i++) {
    if (counts[i] % 3 !== 0) {
      res |= 1 << i;
    }
  }
  return res;
}
