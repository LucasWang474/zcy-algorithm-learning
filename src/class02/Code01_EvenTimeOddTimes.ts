function getEvenTimeNum(arr: number[]): number {
  return arr.reduce((prev, cur) => prev ^ cur, 0);
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
  oddTimesNum: number;
  arr: number[];
  randomArr: number[];
} {
  const arr = [];
  const len = Math.trunc(Math.random() * 10);
  for (let i = 0; i < len; i++) {
    const num = Math.trunc(Math.random() * 100);
    const times = getRandomEvenNum();
    for (let j = 0; j < times; j++) {
      arr.push(num);
    }
  }

  const oddTimesNum = Math.trunc(Math.random() * 100);
  const times = getRandomOddNum();
  for (let i = 0; i < times; i++) {
    arr.push(oddTimesNum);
  }

  return {
    oddTimesNum,
    arr: arr.slice(),
    randomArr: arr.sort(() => Math.random() - Math.random()),
  };
}

function test(times = 100) {
  const label = `EvenTimesOddTimes: ${times} times`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const input = randomInput();

    const expected = input.oddTimesNum;
    const actual = getEvenTimeNum(input.randomArr);

    if (expected !== actual) {
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

const times = +process.argv[2] || 100;
test(times);
