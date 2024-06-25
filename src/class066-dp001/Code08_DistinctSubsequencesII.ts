// https://leetcode.com/problems/distinct-subsequences-ii/description/

const BASE_CHARCODE = 'a'.charCodeAt(0);
const MOD = 10 ** 9 + 7;

function distinctSubseqII(s: string): number {
  const counts = new Array(26).fill(0);

  let total = 1;

  for (const char of s) {
    const idx = char.charCodeAt(0) - BASE_CHARCODE;
    const curNew = (total - counts[idx] + MOD) % MOD;
    total = (curNew + total) % MOD;
    counts[idx] = (curNew + counts[idx]) % MOD;
  }

  return (total - 1 + MOD) % MOD;
}
