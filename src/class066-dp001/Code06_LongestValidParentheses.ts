// https://leetcode.com/problems/longest-valid-parentheses/description/
function longestValidParentheses(s: string): number {
  if (!s) return 0;

  let max = 0;

  const dp = new Array(s.length).fill(0);
  dp[0] = 0;

  for (let i = 1; i < s.length; i++) {
    const curChar = s[i];
    if (curChar === '(') continue;

    // Otherwise, it's a ")"
    const leftLength = dp[i - 1];
    const leftIdx = i - leftLength - 1;
    const leftChar = s[leftIdx];

    if (leftChar === '(') {
      dp[i] = leftLength + 2 + (dp[leftIdx - 1] || 0);
      max = Math.max(dp[i], max);
    }
  }

  return max;
}

function validator() {
  let expected, actual, input;

  // Test 1
  input = '(()';
  expected = 2;
  actual = longestValidParentheses(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  // Test 2
  input = ')()())';
  expected = 4;
  actual = longestValidParentheses(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  // Test 3
  input = '';
  expected = 0;
  actual = longestValidParentheses(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  // Test 4
  input = '()(()';
  expected = 2;
  actual = longestValidParentheses(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  // Test 5
  input = '(()()';
  expected = 4;
  actual = longestValidParentheses(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  console.log('All test cases passed');
}

validator();
