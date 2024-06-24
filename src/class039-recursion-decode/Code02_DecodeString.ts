// https://leetcode.com/problems/decode-string/description/

function decodeString(s: string): string {
  return decodeStringHelper(s, { i: 0 });
}

function decodeStringHelper(s: string, info: { i: number }): string {
  if (info.i >= s.length) return '';

  let k = 0,
    totalPath = '',
    curPath = '';

  while (info.i < s.length) {
    const char = s[info.i++];

    if (char >= '0' && char <= '9') {
      k = k * 10 + Number(char);

      totalPath += curPath;
      curPath = '';

      continue;
    }

    if (char === '[') {
      curPath = decodeStringHelper(s, info);
      totalPath += curPath.repeat(k);

      k = 0;
      curPath = '';
      continue;
    }

    if (char === ']') {
      break;
    }

    curPath += char;
  }

  totalPath += curPath;
  return totalPath;
}

function validator() {
  let input, expected, actual;

  input = '3[a]2[bc]';
  expected = 'aaabcbc';
  actual = decodeString(input);
  if (expected !== actual) {
    console.error(`Failed: input = ${input}. Expected: ${expected}. Got: ${actual}.`);
    return;
  }

  input = '3[a2[c]]';
  expected = 'accaccacc';
  actual = decodeString(input);
  if (expected !== actual) {
    console.error(`Failed: input = ${input}. Expected: ${expected}. Got: ${actual}.`);
    return;
  }

  input = '2[abc]3[cd]ef';
  expected = 'abcabccdcdcdef';
  actual = decodeString(input);
  if (expected !== actual) {
    console.error(`Failed: input = ${input}. Expected: ${expected}. Got: ${actual}.`);
    return;
  }

  console.log('All test cases passed');
}

validator();
