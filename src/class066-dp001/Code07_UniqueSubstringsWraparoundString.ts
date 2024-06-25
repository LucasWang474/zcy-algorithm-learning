// https://leetcode.com/problems/unique-substrings-in-wraparound-string/description/

function findSubstringInWraproundString(s: string): number {
  const dp = new Array(26).fill(0);
  dp[getChatCodeIdx(s[0])] = 1;

  for (let i = 1, length = 1; i < s.length; i++) {
    const curChar = s[i];
    const curCharIdx = getChatCodeIdx(curChar);
    const prevCharIdx = getChatCodeIdx(s[i - 1]);

    if ((curCharIdx - 1 + 26) % 26 === prevCharIdx) {
      length += 1;
    } else {
      length = 1;
    }

    dp[curCharIdx] = Math.max(length, dp[curCharIdx]);
  }

  return dp.reduce((prev, cur) => prev + cur);
}

function getChatCodeIdx(s: string) {
  return s.charCodeAt(0) - 'a'.charCodeAt(0);
}
