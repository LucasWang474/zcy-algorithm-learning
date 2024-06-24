function myEval(expr: string): number {
  return evalHelper(expr, { i: 0 });
}

function evalHelper(expr: string, info: { i: number }): number {
  const operands: number[] = [],
    operators: string[] = [];

  let curOperand = 0;
  while (info.i < expr.length) {
    const char = expr[info.i];
    info.i++;

    if (char >= '0' && char <= '9') {
      curOperand = curOperand * 10 + Number(char);
      continue;
    }

    if (char === '(') {
      curOperand = evalHelper(expr, info);
      continue;
    }

    if (char === ')') {
      break;
    }

    const curOperator = char;
    consumeLastTimesOrDivide(operands, operators, curOperand);
    operators.push(curOperator);
    curOperand = 0;
  }

  consumeLastTimesOrDivide(operands, operators, curOperand);
  return consumeAddOrMinus(operands, operators);
}

function consumeAddOrMinus(operands: number[], operators: string[]): number {
  if (!operands.length) return 0;

  let res = operands[0];

  for (let i = 1; i < operands.length; i++) {
    const operator = operators[i - 1];
    const cur = operands[i];

    if (operator === '+') {
      res += cur;
    } else {
      res -= cur;
    }
  }

  return res;
}

function consumeLastTimesOrDivide(operands: number[], operators: string[], curOperand: number) {
  const lastOperator = operators.at(-1);
  if (lastOperator === '*' || lastOperator === '/') {
    operators.pop();
    const lastOperand = operands.pop() as number;

    if (lastOperator === '*') {
      operands.push(lastOperand * curOperand);
    } else {
      operands.push(lastOperand / curOperand);
    }
  } else {
    operands.push(curOperand);
  }
}

function validator() {
  let i1, e1, a1;

  i1 = '10';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '-10/2+3';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '78+2*10/4-1';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '78+2-3+9-10/2+9+8/2-1';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '(-10)';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '(3-2*4/2)+9';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '36-(4*(3+2*(1-6))+5)+17';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '-5+9*3-(2)+1/1';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  console.log('>>> All passed!');
}

validator();
