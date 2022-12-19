function getKNumOfKM(arr: number[], K: number, M: number): number {
  let counts = Array(64).fill(0);

  for (let num of arr) {
    let i = 0;
    while (num !== 0) {
      counts[i] += num % 2;
      num >>= 1;
      i++;
    }
  }

  counts = counts.map((count) => (count % M ? 1 : 0));
  return parseInt(counts.reverse().join(''), 2);
}

function getRandomInput(
  K: number,
  M: number,
): {
  KNum: number;
  arr: number[];
  randomArr: number[];
} {
  const arr = [];

  const KNum = Math.trunc(Math.random() * 1000000);
  for (let i = 0; i < K; i++) {
    arr.push(KNum);
  }

  const times = Math.trunc(Math.random() * 20) + 1;
  let MNum;
  for (let i = 0; i < times; i++) {
    MNum = Math.trunc(Math.random() * 1000000);
    for (let j = 0; j < M; j++) {
      arr.push(MNum);
    }
  }

  return {
    KNum,
    arr: arr.slice(),
    randomArr: arr.sort(() => Math.random() - Math.random()),
  };
}

function test(times = 100) {
  const label = `Code03_KM.ts: ${times} times`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const K = Math.trunc(Math.random() * 10) + 1;
    const M = Math.trunc(Math.random() * 10) + K + 1;
    console.assert(K === ~~K, 'K must be integer');
    console.assert(M === ~~M, 'M must be integer');
    console.assert(K > 0, 'K must be greater than 0');
    console.assert(M > K, 'M must be greater than K');

    const input = getRandomInput(K, M);

    const expected = input.KNum;
    const actual = getKNumOfKM(input.randomArr, K, M);

    if (expected !== actual) {
      console.assert(false, {
        K,
        M,
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
