// https://leetcode.com/problems/number-of-atoms/description/

function countOfAtoms(formula: string): string {
  const map = new Map<string, number>();
  countOfAtomsRecur(formula, { i: 0 }, map);

  return [...map.keys()]
    .sort()
    .map((key) => {
      return key + map.get(key);
    })
    .join('');
}

function countOfAtomsRecur(formula: string, info: { i: number }, map: Map<string, number>) {
  if (info.i >= formula.length) return;

  const curMap = new Map<string, number>();

  let curEle = '';
  let times = 0;
  while (info.i < formula.length) {
    const char = formula[info.i++];

    if (char >= '0' && char <= '9') {
      times = times * 10 + Number(char);
      continue;
    }

    if (char === '(') {
      if (times && curEle) {
        curMap.set(curEle, (curMap.get(curEle) || 0) + times);
        times = 0;
        curEle = '';
      }

      const nextMap = new Map<string, number>();
      countOfAtomsRecur(formula, info, nextMap);
      updateMap({
        fromMap: nextMap,
        toMap: curMap,
      });
      continue;
    }

    if (char === ')') {
      break;
    }

    if (times && curEle) {
      curMap.set(curEle, (curMap.get(curEle) || 0) + times);
      times = 0;
      curEle = '';
    }

    curEle += char;
  }

  if (times && curEle) {
    curMap.set(curEle, (curMap.get(curEle) || 0) + times);
  }

  updateMap({
    fromMap: curMap,
    toMap: map,
  });
}

function updateMap(params: { fromMap: Map<string, number>; toMap: Map<string, number> }) {
  const { fromMap, toMap } = params;
  for (const [key, value] of fromMap) {
    toMap.set(key, (toMap.get(key) || 0) + value);
  }
}

function validator() {
  let expected, actual, input;

  input = 'H2O';
  expected = 'H2O';
  actual = countOfAtoms(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }
}

validator();
