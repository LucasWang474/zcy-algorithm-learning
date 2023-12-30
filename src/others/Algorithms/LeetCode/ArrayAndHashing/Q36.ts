/**
 * https://leetcode.com/problems/valid-sudoku/
 */
function isValidSudoku(board: string[][]): boolean {
  const set = new Set<string>();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const rowStr = `row${i}${board[i][j]}`;
      if (board[i][j] !== ".") {
        if (set.has(rowStr)) return false;
        set.add(rowStr);
      }

      const colStr = `col${i}${board[j][i]}`;
      if (board[j][i] !== ".") {
        if (set.has(colStr)) return false;
        set.add(colStr);
      }

      const row = Math.trunc(i / 3) * 3 + Math.trunc(j / 3);
      const col = (i % 3) * 3 + (j % 3);
      const str = board[row][col];
      const subGridStr = `sub${i}${str}}`;
      if (str !== ".") {
        if (set.has(subGridStr)) return false;
        set.add(subGridStr);
      }
    }
  }

  return true;
}
