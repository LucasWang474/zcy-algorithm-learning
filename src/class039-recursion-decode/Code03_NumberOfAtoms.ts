// https://leetcode.com/problems/number-of-atoms/description/

function countOfAtoms(formula: string): string {
  const map = new Map<string, number>();
  countOfAtomsRecur(formula, { i: 0 }, map);

  return [...map.entries()]
    .sort()
    .map(([key, val]) => {
      return key + (val === 1 ? '' : String(val));
    })
    .join('');
}

function countOfAtomsRecur(formula: string, info: { i: number }, map: Map<string, number>) {
  if (info.i >= formula.length) return;

  let mapForRecur: Map<string, number> | undefined;
  let curEle = '';
  let times: undefined | number = undefined;

  function updateMap() {
    if (curEle) {
      map.set(curEle, (map.get(curEle) || 0) + (times || 1));
    } else if (mapForRecur) {
      for (const [key, value] of mapForRecur) {
        map.set(key, (map.get(key) || 0) + value * (times || 1));
      }
    }
		
    mapForRecur = undefined;
    curEle = '';
    times = undefined;
  }

  while (info.i < formula.length) {
    const char = formula[info.i++];

    if (char >= '0' && char <= '9') {
      times = times === undefined ? Number(char) : times * 10 + Number(char);
      continue;
    }

    if (char === '(') {
      updateMap();

      mapForRecur = new Map<string, number>();
      countOfAtomsRecur(formula, info, mapForRecur);
      continue;
    }

    if (char === ')') {
      break;
    }

    if (char.toUpperCase() === char) {
      updateMap();
    }

    curEle += char;
  }

  updateMap();
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

  // Test 2
  input = 'Mg(OH)2';
  expected = 'H2MgO2';
  actual = countOfAtoms(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  // Test 3
  input = 'K4(ON(SO3)2)2';
  expected = 'K4N2O14S4';
  actual = countOfAtoms(input);
  if (expected !== actual) {
    console.error(`Expected: ${expected}, actual: ${actual}, input: ${input}`);
    return;
  }

  console.log('All test cases passed');
}

validator();
