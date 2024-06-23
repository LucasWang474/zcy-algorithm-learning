import { getRandomArray } from '../utils/random';
import { isEqualArray } from '../utils/array';

function sortStack(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const max = extractMax(nums);
  sortStack(nums);
  nums.push(max);
  return nums;
}

function extractMax(nums: number[]): number {
  if (nums.length === 1) {
    return nums.pop() as number;
  }

  const top = nums.pop() as number;
  const nextMax = extractMax(nums);

  if (top >= nextMax) {
    nums.push(nextMax);
    return top;
  }

  nums.push(top);
  return nextMax;
}

function validatorSortStack(times = 100, arrSize = 10) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(arrSize);
    const expected = inputArr.slice().sort((a, b) => a - b);
    const actual = sortStack(inputArr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual);
      return;
    }
  }

  console.log('>>> Validate sortStack. All passed!', times);
}

validatorSortStack(+process.argv[2], +process.argv[3]);

function validatorExtractMax(times = 1000) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(100);
    const expectedMax = Math.max(...inputArr);

    const arrCopy = inputArr.slice();
    const actualMax = extractMax(arrCopy);
    if (actualMax !== expectedMax) {
      console.error('Max not right', expectedMax, actualMax, inputArr);
      return;
    }
    if (arrCopy.length !== inputArr.length - 1) {
      console.error('Arr size not right', inputArr, arrCopy);
      return;
    }
  }

  console.log('>>> Validate extractMax. All passed!', times);
}

validatorExtractMax();

// public static void sort(Stack<Integer> stack) {
//   int deep = deep(stack);
//   while (deep > 0) {
//     int max = max(stack, deep);
//     int k = times(stack, deep, max);
//     down(stack, deep, max, k);
//     deep -= k;
//   }
// }
//
// // 返回栈的深度
// // 不改变栈的数据状况
// public static int deep(Stack<Integer> stack) {
//   if (stack.isEmpty()) {
//     return 0;
//   }
//   int num = stack.pop();
//   int deep = deep(stack) + 1;
//   stack.push(num);
//   return deep;
// }
//
// // 从栈当前的顶部开始，往下数deep层
// // 返回这deep层里的最大值
// public static int max(Stack<Integer> stack, int deep) {
//   if (deep == 0) {
//     return Integer.MIN_VALUE;
//   }
//   int num = stack.pop();
//   int restMax = max(stack, deep - 1);
//   int max = Math.max(num, restMax);
//   stack.push(num);
//   return max;
// }
//
// // 从栈当前的顶部开始，往下数deep层，已知最大值是max了
// // 返回，max出现了几次，不改变栈的数据状况
// public static int times(Stack<Integer> stack, int deep, int max) {
//   if (deep == 0) {
//     return 0;
//   }
//   int num = stack.pop();
//   int restTimes = times(stack, deep - 1, max);
//   int times = restTimes + (num == max ? 1 : 0);
//   stack.push(num);
//   return times;
// }
//
// // 从栈当前的顶部开始，往下数deep层，已知最大值是max，出现了k次
// // 请把这k个最大值沉底，剩下的数据状况不变
// public static void down(Stack<Integer> stack, int deep, int max, int k) {
//   if (deep == 0) {
//     for (int i = 0; i < k; i++) {
//       stack.push(max);
//     }
//   } else {
//     int num = stack.pop();
//     down(stack, deep - 1, max, k);
//     if (num != max) {
//       stack.push(num);
//     }
//   }
// }