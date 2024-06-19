// https://leetcode.com/problems/bitwise-and-of-numbers-range/
function rangeBitwiseAnd(left: number, right: number): number {
  while (right > left) {
    right -= right & -right;
  }

  return right;
}
