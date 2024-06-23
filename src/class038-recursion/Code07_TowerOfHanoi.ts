function printHanoi(total: number) {
  if (total > 0) {
    printHanoiRecur(total, 'A', 'C', 'B');
  }
}

function printHanoiRecur(total: number, from: string, to: string, other: string) {
  if (total === 1) {
    console.log(`Move disk 1 from ${from} to ${to}`);
  } else {
    printHanoiRecur(total - 1, from, other, to);
    console.log(`Move disk ${total} from ${from} to ${to}`);
    printHanoiRecur(total - 1, other, to, from);
  }
}

// n = 1
// disk 1 from A to C

// n = 2
// disk 1 from A to B
// disk 2 from A to C
// disk 1 from B to C

printHanoi(+process.argv[2]);
