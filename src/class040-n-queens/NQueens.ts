// https://leetcode.com/problems/n-queens-ii/description/

function totalNQueens(n: number): number {
  return totalNQueensRecur(n, [], 0);
}

function totalNQueensRecur(n: number, queens: [number, number][], row: number) {
  if (row >= n) return 1;

  let count = 0;

  for (let col = 0; col < n; col++) {
    const pos: [number, number] = [row, col];
    if (isValidPosition(pos, queens)) {
      queens.push(pos);
      count += totalNQueensRecur(n, queens, row + 1);
      queens.pop();
    }
  }

  return count;
}

// https://leetcode.com/problems/n-queens/description/
function solveNQueens(n: number, row = 0, queens: [number, number][] = [], res: string[][] = []) {
  if (row >= n) {
    res.push(queens.map((pos) => getRowString(pos[1], n)));
    return res;
  }

  for (let col = 0; col < n; col++) {
    const pos: [number, number] = [row, col];
    if (isValidPosition(pos, queens)) {
      queens.push(pos);
      solveNQueens(n, row + 1, queens, res);
      queens.pop();
    }
  }

  return res;
}

function getRowString(col: number, n: number) {
  return '.'.repeat(Math.max(0, col)) + 'Q' + '.'.repeat(n - col - 1);
}

function isValidPosition(cur: [number, number], taken: [number, number][]) {
  const [x1, y1] = cur;
  return taken.every(([x2, y2]) => {
    return x1 !== x2 && y1 !== y2 && Math.abs(x1 - x2) !== Math.abs(y1 - y2);
  });
}

function testTotalNQueens() {
  let actual, expected, n;

  // Test 1
  n = 1;
  expected = 1;
  actual = totalNQueens(n);
  if (actual !== expected) {
    console.error(`Test 1 failed. Expected: ${expected}, got: ${actual}`);
    return;
  }

  // Test 2
  n = 2;
  expected = 0; // No solutions exist for 2 queens
  actual = totalNQueens(n);
  if (actual !== expected) {
    console.error(`Test 2 failed. Expected: ${expected}, got: ${actual}`);
    return;
  }

  // Test 3
  n = 4;
  expected = 2;
  actual = totalNQueens(n);
  if (actual !== expected) {
    console.error(`Test 3 failed. Expected: ${expected}, got: ${actual}`);
    return;
  }

  console.log('All test cases passed');
}

testTotalNQueens();
