// https://leetcode.com/problems/unique-substrings-in-wraparound-string/description/

function findSubstringInWraproundString(s: string): number {
  const dp = new Array(26).fill(0);
  dp[s.charCodeAt(0) - 'a'.charCodeAt(0)] = 1;

  for (let i = 1, length = 1; i < s.length; i++) {
    const curChar = s[i];
    const curCharIdx = curChar.charCodeAt(0) - 'a'.charCodeAt(0);
    const prevCharIdx = s[i - 1].charCodeAt(0) - 'a'.charCodeAt(0);

    if ((curCharIdx - 1 + 26) % 26 === prevCharIdx) {
      length += 1;
    } else {
      length = 1;
    }

    dp[curCharIdx] = Math.max(length, dp[curCharIdx]);
  }

  return dp.reduce((prev, cur) => prev + cur);
}
