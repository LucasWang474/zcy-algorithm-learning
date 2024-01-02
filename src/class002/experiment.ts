// Sources:
// - https://github.com/algorithmzuo/algorithm-journey/blob/main/src/class002/Experiment.java
// - https://www.bilibili.com/video/BV1Q14y1B7DH

// 一开始有100个人，每个人都有100元
// 在每一轮都做如下的事情 :
// 每个人都必须拿出1元钱给除自己以外的其他人，给谁完全随机
// 如果某个人在这一轮的钱数为0，那么他可以不给，但是可以接收
// 发生很多很多轮之后，这100人的社会财富分布很均匀吗？

import * as process from 'process';

const INITIAL_WEALTH_PER_PERSON = 100;

function experiment(size: number, times: number) {
  const wealthArray: number[] = new Array(size).fill(INITIAL_WEALTH_PER_PERSON);
  const hasMoneyArray: boolean[] = new Array(size).fill(false);

  while (times--) {
    for (let i = 0; i < size; i++) {
      hasMoneyArray[i] = wealthArray[i] > 0;
    }

    for (let i = 0; i < size; i++) {
      if (!hasMoneyArray[i]) continue;

      let other = i;
      while (other === i) {
        other = Math.trunc(Math.random() * size);
      }

      wealthArray[i]--;
      wealthArray[other]++;
    }
  }

  wealthArray.sort((a, b) => a - b);

  let str = '';
  for (let i = 0; i < size; i++) {
    const curWealth = wealthArray[i];

    if (i % 9 === 0) {
      console.log(str);
      str = '';
    }

    // str += (curWealth + '        ').slice(0, 8);
    str += curWealth + '\t';
  }
  console.log(str);
  console.log();

  console.log('>>> 这个社会的基尼系数为: ' + calculateGini(wealthArray));
}

function calculateGini(wealthArr: number[]): number {
  const sumOfWealth = wealthArr.reduce((prev, cur) => prev + cur, 0);
  let sumOfAbsDifferencesOfWealth = 0;

  const N = wealthArr.length;
  for (let i = 0; i < N; i++) {
    const curWealth = wealthArr[i];

    for (let j = 0; j < N; j++) {
      sumOfAbsDifferencesOfWealth += Math.abs(wealthArr[j] - curWealth);
    }
  }

  return sumOfAbsDifferencesOfWealth / (2 * N * sumOfWealth);
}

function main(size: number, times: number) {
  console.log('一个社会的基尼系数是一个在 0~1 之间的小数');
  console.log('基尼系数为0代表所有人的财富完全一样');
  console.log('基尼系数为1代表有1个人掌握了全社会的财富');
  console.log('基尼系数越小，代表社会财富分布越均衡；越大则代表财富分布越不均衡');
  console.log('在2022年，世界各国的平均基尼系数为 0.44');
  console.log('目前普遍认为，当基尼系数到达 0.5 时');
  console.log('就意味着社会贫富差距非常大，分布非常不均匀');
  console.log('社会可能会因此陷入危机，比如大量的犯罪或者经历社会动荡');

  console.log('>>> 测试开始');
  const startTime = Date.now();
  console.log('人数: ' + size);
  console.log('轮数: ' + times);
  experiment(size, times);
  console.log('>>> 测试结束');
  const duration = (Date.now() - startTime) / 1000;
  console.log('>>> duration', duration + 's');
}

const size = +process.argv[2] || 100;
const times = +process.argv[3] || 100;
main(size, times);
