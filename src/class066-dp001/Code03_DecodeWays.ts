// https://leetcode.com/problems/decode-ways/
function numDecodings(s: string): number {
  return numDecodingsRecur(s, new Set(new Array(26).fill(0).map((_, idx) => idx + 1)), [], 0);
}

function numDecodingsRecur(s: string, set: Set<number>, dp: number[], i: number): number {
  if (i >= s.length) return 1;
  if (dp[i] !== undefined) return dp[i];

  if (i === s.length - 1) {
    if (set.has(+s[i])) {
      dp[i] = 1;
      return 1;
    }

    dp[i] = 0;
    return 0;
  }

  if (s[i] === '0') {
    dp[i] = 0;
    return 0;
  }

  let count = numDecodingsRecur(s, set, dp, i + 1);
  if (i + 1 < s.length && +s[i] * 10 + +s[i + 1] <= 26) {
    count += numDecodingsRecur(s, set, dp, i + 2);
  }

  dp[i] = count;
  return count;
}

function validator() {
  let expected, actual, input;

  // Test 1
  input = '12';
  expected = 2;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(expected, actual, input);
    return;
  }

  // Test 2
  input = '226';
  expected = 3;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(expected, actual, input);
    return;
  }

  // Test 3
  input = '06';
  expected = 0;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(expected, actual, input);
    return;
  }

  console.log('All test cases passed');
}

validator();
