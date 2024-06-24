// https://leetcode.com/problems/minimum-cost-for-tickets/

const costIdxToDuration = [1, 7, 30];

function mincostTickets(days: number[], costs: number[]): number {
  // return mincostTicketsRecur(days, costs, 0, new Array(days.length));
  return mincostTicketsBottomUp(days, costs);
}

function mincostTicketsBottomUp(days: number[], costs: number[]): number {
  const dp = new Array(days.length + 1).fill(Infinity);
  dp[days.length] = 0;

  for (let i = days.length - 1; i >= 0; i--) {
    for (let j = 0; j < costs.length; j++) {
      let nextI = i;
      while (nextI < days.length && days[nextI] <= days[i] + costIdxToDuration[j] - 1) {
        nextI++;
      }

      dp[i] = Math.min(costs[j] + dp[nextI], dp[i]);
    }
  }

  return dp[0];
}

// i: index for days
function mincostTicketsRecur(days: number[], costs: number[], i: number, dp: number[]): number {
  if (i >= days.length) return 0;

  if (dp[i] !== undefined) {
    return dp[i];
  }

  if (i === days.length - 1) {
    const res = Math.min(...costs);
    dp[i] = res;
    return res;
  }

  const vals: number[] = [];
  for (let j = 0, nextI = i; j < costs.length; j++) {
    while (nextI < days.length && days[nextI] <= days[i] + costIdxToDuration[j] - 1) {
      nextI++;
    }
    vals.push(costs[j] + mincostTicketsRecur(days, costs, nextI, dp));
  }

  const res = Math.min(...vals);
  dp[i] = res;
  return res;
}

function validator() {
  const res1 = mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]);
  if (res1 !== 11) {
    console.error(11, res1);
    return;
  }

  const res2 = mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]);
  if (res2 !== 17) {
    console.error(17, res2);
    return;
  }
  const res3 = mincostTickets(
    [
      1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 24, 25, 27, 28, 29, 30,
      31, 34, 37, 38, 39, 41, 43, 44, 45, 47, 48, 49, 54, 57, 60, 62, 63, 66, 69, 70, 72, 74, 76,
      78, 80, 81, 82, 83, 84, 85, 88, 89, 91, 93, 94, 97, 99,
    ],
    [2, 7, 15],
  );
  if (res3 !== 51) {
    console.error(53, res3);
    return;
  }

  const res4 = mincostTickets(
    new Array(365).fill(0).map((_, index) => index + 1),
    [2, 7, 15],
  );
  if (res4 !== 187) {
    console.error(187, res4);
    return;
  }

  console.log('>>> All passed!');
}

validator();
