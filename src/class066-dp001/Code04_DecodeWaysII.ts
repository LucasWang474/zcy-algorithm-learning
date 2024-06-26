// https://leetcode.com/problems/decode-ways-ii/

const UPPER = 26,
  LOWER = 1;
const MOD = 10 ** 9 + 7;

function numDecodings(s: string): number {
  return numDecodingsBottomUp2(s);
}

function numDecodingsBottomUp2(s: string): number {
  let nextCount = 1,
    nextNextCount = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const curChar = s[i];
    if (curChar === '0') {
      [nextCount, nextNextCount] = [0, nextCount];
      continue;
    }

    let curCount = curChar === '*' ? 9 * nextCount : nextCount;

    if (i + 1 < s.length) {
      const nextChar = s[i + 1];

      if (nextChar === '*') {
        curCount +=
          // 11-19
          curChar === '1'
            ? 9 * nextNextCount
            : // 21-26
            curChar === '2'
            ? 6 * nextNextCount
            : // 11-19, 21-26
            curChar === '*'
            ? 15 * nextNextCount
            : 0;
      } else {
        // nextChar: 0-9
        curCount +=
          curChar === '*'
            ? // 1*, 2*
              (+nextChar > 6 ? 1 : 2) * nextNextCount
            : +curChar * 10 + +nextChar <= UPPER
            ? nextNextCount
            : 0;
      }
    }

    [nextCount, nextNextCount] = [curCount % MOD, nextCount];
  }

  return nextCount;
}

function numDecodingsBottomUp(s: string): number {
  const dp = new Array(s.length + 1).fill(0);
  dp[s.length] = 1;

  for (let i = s.length - 1; i >= 0; i--) {
    const curChar = s[i];
    if (curChar === '0') continue;

    const nextCount = dp[i + 1];
    let curCount = curChar === '*' ? 9 * nextCount : nextCount;

    if (i + 1 < s.length) {
      const nextChar = s[i + 1];
      const nextNextCount = dp[i + 2];

      if (nextChar === '*') {
        curCount +=
          // 11-19
          curChar === '1'
            ? 9 * nextNextCount
            : // 21-26
            curChar === '2'
            ? 6 * nextNextCount
            : // 11-19, 21-26
            curChar === '*'
            ? 15 * nextNextCount
            : 0;
      } else {
        // nextChar: 0-9
        curCount +=
          curChar === '*'
            ? // 1*, 2*
              (+nextChar > 6 ? 1 : 2) * nextNextCount
            : +curChar * 10 + +nextChar <= UPPER
            ? nextNextCount
            : 0;
      }
    }

    dp[i] = curCount % MOD;
  }

  return dp[0];
}

function numDecodingsRecur(s: string, dp: number[], i: number): number {
  if (i >= s.length) return 1;
  if (dp[i] !== undefined) return dp[i];

  const curChar = s[i];

  if (i === s.length - 1) {
    if (curChar === '*') {
      dp[i] = 9;
    } else if (+s[i] >= LOWER && +s[i] <= UPPER) {
      dp[i] = 1;
    } else {
      dp[i] = 0;
    }

    return dp[i];
  }

  if (curChar === '0') {
    dp[i] = 0;
    return 0;
  }

  const next = numDecodingsRecur(s, dp, i + 1);
  let count = curChar === '*' ? 9 * next : next;
  if (i + 1 < s.length) {
    const nextChar = s[i + 1];
    const nextNext = numDecodingsRecur(s, dp, i + 2);

    if (nextChar === '*') {
      count +=
        // 11-19
        curChar === '1'
          ? 9 * nextNext
          : // 21-26
          curChar === '2'
          ? 6 * nextNext
          : // 11-19, 21-26
          curChar === '*'
          ? 15 * nextNext
          : 0;
    } else {
      // nextChar: 0-9
      count +=
        curChar === '*'
          ? // 1*, 2*
            (+nextChar > 6 ? 1 : 2) * nextNext
          : +curChar * 10 + +nextChar <= UPPER
          ? nextNext
          : 0;
    }
  }

  dp[i] = count % MOD;
  return dp[i];
}

function validator() {
  let expected, actual, input;

  // input = '*';
  // expected = 9;
  // actual = numDecodings(input);
  // if (expected !== actual) {
  //   console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
  //   return;
  // }

  input = '1*';
  expected = 18;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  input = '2*';
  expected = 15;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  input = '**';
  expected = 96;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  input = '*1';
  expected = 11;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  input = '1*72*';
  expected = 285;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  input = '*********';
  expected = 291868912;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  input =
    '1*6*7*1*9*6*2*9*2*3*3*6*3*2*2*4*7*2*9*6*0*6*4*4*1*6*9*0*5*9*2*5*7*7*0*6*9*7*1*5*5*9*3*0*4*9*2*6*2*5*7*6*1*9*4*5*8*4*7*4*2*7*1*2*1*9*1*3*0*6*';
  expected = 882201566;
  actual = numDecodings(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  console.log('All test cases passed');
}

validator();
