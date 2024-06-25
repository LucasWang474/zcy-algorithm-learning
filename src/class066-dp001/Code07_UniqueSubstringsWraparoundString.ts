// https://leetcode.com/problems/unique-substrings-in-wraparound-string/description/

function findSubstringInWraproundString(s: string): number {
  const charCodeIdxToCount = new Array(26).fill(0);
  charCodeIdxToCount[s.charCodeAt(0) - 'a'.charCodeAt(0)] = 1;
  const dp = new Array(s.length).fill(1);

  for (let i = 1; i < s.length; i++) {
    const curChar = s[i];
    const curCharIdx = curChar.charCodeAt(0) - 'a'.charCodeAt(0);
    const prevCharIdx = s[i - 1].charCodeAt(0) - 'a'.charCodeAt(0);

    if ((curCharIdx - 1 + 26) % 26 === prevCharIdx) {
      dp[i] = dp[i - 1] + 1;
    } else {
      dp[i] = 1;
    }

    charCodeIdxToCount[curCharIdx] = Math.max(dp[i], charCodeIdxToCount[curCharIdx]);
  }

  return charCodeIdxToCount.reduce((prev, cur) => prev + cur);
}
