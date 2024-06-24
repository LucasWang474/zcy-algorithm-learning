function fib1(n: number, dp: number[] = []): number {
  if (n === 0) return 0;
  if (n === 1) return 1;

  if (dp[n] !== undefined) return dp[n];
  const res = fib1(n - 1, dp) + fib1(n - 2, dp);
  dp[n] = res;
  return res;
}

function fib2(n: number) {
  if (n <= 1) return n;

  let a = 0,
    b = 1;

  while (n-- > 1) {
    [a, b] = [b, a + b];
  }

  return b;
}
