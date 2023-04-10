/**
 * https://leetcode.com/problems/group-anagrams/
 */
function groupAnagrams(strs: string[]): string[][] {
  const map = {};

  for (let str of strs) {
    const key = getHash(str);
    if (map[key]) {
      map[key].push(str);
    } else {
      map[key] = [str];
    }
  }

  return Object.values(map);
}

const getOrd = (c: string): number => c.charCodeAt(0) - "a".charCodeAt(0);
const getHash = (str: string): string => {
  const chars = Array(26).fill(0);
  for (let c of str) {
    chars[getOrd(c)] += 1;
  }
  return String(chars);
};
