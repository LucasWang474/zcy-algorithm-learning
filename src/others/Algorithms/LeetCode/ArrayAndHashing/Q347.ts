/**
 * https://leetcode.com/problems/top-k-frequent-elements/
 */
function topKFrequent(nums: number[], k: number): number[] {
  const numToTimes: Record<string, number> = {};
  for (let num of nums) {
    numToTimes[num] = (numToTimes[num] ?? 0) + 1;
  }

  const freq: number[][] = Array(nums.length);
  Object.entries(numToTimes).forEach(([num, times]) => {
    if (freq[times]) {
      freq[times].push(+num);
    } else {
      freq[times] = [+num];
    }
  });

  const res = [];

  for (let i = freq.length - 1; i >= 0; i--) {
    const ele = freq[i];
    if (ele) {
      for (let num of ele) {
        if (res.length === k) return res;
        res.push(num);
      }
    }
  }

  return res;
}
