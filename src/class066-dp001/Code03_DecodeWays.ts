// https://leetcode.com/problems/decode-ways/

const UPPER = 26,
  LOWER = 1;

function numDecodings(s: string): number {
  return numDecodingsBottomUp2(s);
}

function numDecodingsBottomUp2(s: string): number {
  let next = 1,
    nextNext = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    let cur = 0;

    if (s[i] === '0') {
      [next, nextNext] = [cur, next];
      continue;
    }

    cur += next;
    if (i + 1 < s.length && +s[i] * 10 + +s[i + 1] <= UPPER) {
      cur += nextNext;
    }

    [next, nextNext] = [cur, next];
  }

  return next;
}

function numDecodingsBottomUp(s: string): number {
  const dp = new Array(s.length + 1).fill(0);
  dp[s.length] = 1;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '0') {
      dp[i] = 0;
      continue;
    }

    dp[i] += dp[i + 1];
    if (i + 1 < s.length && +s[i] * 10 + +s[i + 1] <= UPPER) {
      dp[i] += dp[i + 2];
    }
  }

  return dp[0];
}

function numDecodingsRecur(s: string, dp: number[], i: number): number {
  if (i >= s.length) return 1;
  if (dp[i] !== undefined) return dp[i];

  if (i === s.length - 1) {
    if (+s[i] >= LOWER && +s[i] <= UPPER) {
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

  let count = numDecodingsRecur(s, dp, i + 1);
  if (i + 1 < s.length && +s[i] * 10 + +s[i + 1] <= UPPER) {
    count += numDecodingsRecur(s, dp, i + 2);
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
