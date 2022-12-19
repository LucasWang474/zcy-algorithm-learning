function getTwoEvenTimeNum(arr: number[]): number[] {
  const xorAll = (prev: number, cur: number) => prev ^ cur;
  const aXORb = arr.reduce(xorAll, 0);
  const rightMostOne = aXORb & -aXORb;
  const a = arr.filter((num) => (num & rightMostOne) !== 0).reduce(xorAll, 0);
  return [a, aXORb ^ a].sort();
}

function getRandomEvenNum(max = 10) {
  max = max / 2;
  return Math.trunc(Math.random() * max) * 2;
}

function getRandomOddNum(max = 10) {
  max = max / 2;
  return Math.trunc(Math.random() * max) * 2 + 1;
}

function randomInput(): {
  oddTimesNum1: number;
  oddTimesNum2: number;
  arr: number[];
  randomArr: number[];
} {
  const arr = [];
  const len = Math.trunc(Math.random() * 10);
  for (let i = 0; i < len; i++) {
    const num = Math.trunc(Math.random() * 100000000);
    const times = getRandomEvenNum();
    for (let j = 0; j < times; j++) {
      arr.push(num);
    }
  }

  const oddTimesNum1 = Math.trunc(Math.random() * 100000000 + 1);
  let times = getRandomOddNum();
  for (let i = 0; i < times; i++) {
    arr.push(oddTimesNum1);
  }

  const oddTimesNum2 = Math.trunc(Math.random() * 100000000 + 1);
  times = getRandomOddNum();
  for (let i = 0; i < times; i++) {
    arr.push(oddTimesNum2);
  }

  return {
    oddTimesNum1,
    oddTimesNum2,
    arr: arr.slice(),
    randomArr: arr.sort(() => Math.random() - Math.random()),
  };
}

function arrEquals(arr1: any[], arr2: any[]): boolean {
  if (arr1?.length !== arr2?.length) return false;
  for (let i = 0; i < arr1?.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function test(times = 100) {
  const label = `Code02_TwoEvenTimesOthersOddTimes: ${times} times`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const input = randomInput();

    const expected = [input.oddTimesNum1, input.oddTimesNum2].sort();
    const actual = getTwoEvenTimeNum(input.randomArr).sort();

    if (!arrEquals(expected, actual)) {
      console.assert(false, {
        input,
        expected,
        actual,
      });
      return;
    }
  }
  console.timeEnd(label);
}

test(+process.argv[2] || 100);
