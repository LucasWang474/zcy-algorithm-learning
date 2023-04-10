/**
 * https://leetcode.com/problems/valid-palindrome/description/
 */
function isPalindrome(s: string): boolean {
  const processed = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let i = 0,
    j = processed.length - 1;
  while (i < j) {
    if (processed[i] !== processed[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
}
