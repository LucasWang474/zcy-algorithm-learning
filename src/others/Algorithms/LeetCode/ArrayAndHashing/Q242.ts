/**
 * https://leetcode.com/problems/valid-anagram/
 */
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const sMap = {},
    tMap = {};
  let charS, charT;

  for (let i = 0; i < s.length; i++) {
    charS = s[i];
    charT = t[i];
    sMap[charS] = (sMap[charS] ?? 0) + 1;
    tMap[charT] = (tMap[charT] ?? 0) + 1;
  }

  return Object.keys(sMap).every((key) => sMap[key] === tMap[key]);
}

function isAnagram2(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const map = {};
  let charS, charT;

  for (let i = 0; i < s.length; i++) {
    charS = s[i];
    map[charS] = (map[charS] ?? 0) + 1;
    charT = t[i];
    map[charT] = (map[charT] ?? 0) - 1;
  }

  return Object.keys(map).every((key) => map[key] === 0);
}
