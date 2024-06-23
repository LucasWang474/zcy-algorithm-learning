// https://www.nowcoder.com/practice/92e6247998294f2c933906fdedbc6e6a

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * @param s string字符串
 * @return string字符串一维数组
 */
export function generatePermutation(s: string): string[] {
  if (!s) return [''];

  const strSet = new Set<string>();
  generatePermutationRecur(s, 0, [], strSet);
  return Array.from(strSet.values());
}

function generatePermutationRecur(s: string, idx: number, path: string[], strSet: Set<string>) {
  if (!s || idx >= s.length) return;

  if (idx === s.length - 1) {
    path.push(s[idx]);
    strSet.add(getStrFromPath(path));
    path.pop();

    strSet.add(getStrFromPath(path));
    return;
  }

  path.push(s[idx]);
  generatePermutationRecur(s, idx + 1, path, strSet);
  path.pop();
  generatePermutationRecur(s, idx + 1, path, strSet);
}

function getStrFromPath(path: string[]) {
  return path.reduce((prev, cur) => prev + cur, '');
}

const res1 = generatePermutation('ab');
console.log('>>> res1', res1.length === ['', 'a', 'ab', 'b'].length);
const res2 = generatePermutation('dbcq');
console.log(
  '>>> res2',
  res2.length ===
    ['', 'b', 'bc', 'bcq', 'bq', 'c', 'cq', 'd', 'db', 'dbc', 'dbcq', 'dbq', 'dc', 'dcq', 'dq', 'q']
      .length,
);
const res3 = generatePermutation('aab');
console.log('>>> res3', res3.length === ['', 'a', 'aa', 'aab', 'ab', 'b'].length);
const res4 = generatePermutation('dasdbhkuhoijaklsdja');
console.log('>>> res4.length', res4.length);
