function parseInput(input: string) {
  const lines = input.split("\n");
  const histories = lines.map((line) => line.split(" ").map(Number));
  return histories;
}

function last<T>(arr: Array<T>): T {
  return arr[arr.length - 1];
}

function getRowsFromHistory(history: Array<number>): Array<Array<number>> {
  let rows: Array<Array<number>> = [history];

  let lastRow: Array<number> = history;
  while (!lastRow.every((item) => !item)) {
    let nextRow = [];
    for (let j = 0; j < lastRow.length - 1; j++) {
      nextRow.push(lastRow[j + 1] - lastRow[j]);
    }
    rows.unshift(nextRow);
    lastRow = nextRow;
  }

  return rows;
}

export function day9Part1(input: string) {
  const histories = parseInput(input);

  let total = 0;
  for (let history of histories) {
    const rows = getRowsFromHistory(history);

    for (let i = 0; i < rows.length - 1; i++) {
      rows[i + 1].push(last(rows[i]) + last(rows[i + 1]));
    }

    total += last(last(rows));
  }

  return total;
}

export function day9Part2(input: string) {
  const histories = parseInput(input);

  let total = 0;
  for (let history of histories) {
    const rows = getRowsFromHistory(history);

    rows[0].unshift(0);
    for (let i = 1; i < rows.length; i++) {
      rows[i].unshift(rows[i][0] - rows[i - 1][0]);
    }

    total += last(rows)[0];
  }

  return total;
}
