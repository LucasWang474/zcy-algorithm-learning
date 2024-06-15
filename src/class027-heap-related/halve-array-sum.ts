// https://leetcode.com/problems/minimum-operations-to-halve-array-sum/description/

function halveArray(nums: number[]): number {
  let sum = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    nums[i] = nums[i] * 2 ** 30;
    sum += nums[i];
    heapify(nums, i, nums.length);
  }

  let target = sum / 2;
  let count = 0;
  while (target > 0) {
    count++;

    const val = nums[0] / 2;
    target -= val;
    nums[0] = val;
    heapify(nums, 0, nums.length);
  }

  return count;
}

function heapify(arr: number[], i: number, heapSize: number) {
  let L = i * 2 + 1;
  while (L < heapSize) {
    let larger = L + 1 < heapSize && arr[L + 1] > arr[L] ? L + 1 : L;
    larger = arr[larger] > arr[i] ? larger : i;

    if (larger === i) return;

    swap(arr, larger, i);
    i = larger;
    L = i * 2 + 1;
  }
}

function swap<T>(arr: T[], i: number, j: number) {
  if (i === j) return;

  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
