function myEval(expr: string): number {
  expr = expr.replaceAll(' ', '');
  return evalHelper(expr, { i: 0 });
}

function evalHelper(expr: string, info: { i: number }): number {
  const operands: number[] = [],
    operators: string[] = [];

  let curOperand = 0;
  let prevChar = undefined,
    curChar = undefined;
  while (info.i < expr.length) {
    prevChar = curChar;
    curChar = expr[info.i];
    info.i++;

    if (curChar >= '0' && curChar <= '9') {
      curOperand = curOperand * 10 + Number(curChar);
      continue;
    }

    if (curChar === '(') {
      curOperand = evalHelper(expr, info);
      continue;
    }

    if (curChar === ')') {
      break;
    }

    const curOperator = curChar;

    // Special case for: 1++2, 1+-2, 1*-2, 1*+2
    if (isOperator(prevChar)) {
      operands.push(curOperator === '+' ? 1 : -1);
      operators.push('*');
      continue;
    }

    consumeLastTimesOrDivide(operands, operators, curOperand);
    operators.push(curOperator);
    curOperand = 0;
  }

  consumeLastTimesOrDivide(operands, operators, curOperand);
  return consumeAddOrMinus(operands, operators);
}

function isOperator(s?: string) {
  if (!s) return false;
  return ['+', '-', '*', '/'].includes(s);
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
  let lastOperator = operators.at(-1);

  while (lastOperator === '*' || lastOperator === '/') {
    operators.pop();
    const lastOperand = operands.pop() as number;

    if (lastOperator === '*') {
      curOperand = lastOperand * curOperand;
    } else {
      curOperand = lastOperand / curOperand;
    }

    lastOperator = operators.at(-1);
  }

  operands.push(curOperand);
}

function validator() {
  let i1, e1, a1;

  i1 = '1+-2';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }
  i1 = '-10';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '+10';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '1+-10';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '2*(+10)';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '2*+10';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '2*-10';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

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

  i1 = '1 + 1';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = ' 6-4 / 2 ';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '2*(5+5*2)/3+(6/2+8)';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  i1 = '(2+6* 3+5- (-3*14/7+2)*5)+3';
  e1 = eval(i1);
  a1 = myEval(i1);
  if (e1 !== a1) {
    console.error(e1, a1, i1);
    return;
  }

  console.log('>>> All passed!');
}

validator();
