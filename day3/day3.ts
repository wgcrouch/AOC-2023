function getNeighbours(
  lines: Array<string>,
  startX: number,
  y: number,
  length: number
) {
  let neighbours: Array<[number, number]> = [];
  for (let i = 0; i < length; i++) {
    let x = startX + i;
    if (x > 0) {
      if (x === startX) {
        neighbours.push([x - 1, y]);
      }

      if (y > 0) {
        neighbours.push([x - 1, y - 1]);
      }

      if (y < lines.length - 1) {
        neighbours.push([x - 1, y + 1]);
      }
    }

    if (x < lines[0].length - 1) {
      if (i === length - 1) {
        neighbours.push([x + 1, y]);
      }

      if (y > 0) {
        neighbours.push([x + 1, y - 1]);
      }

      if (y < lines.length - 1) {
        neighbours.push([x + 1, y + 1]);
      }
    }

    if (y > 0) {
      neighbours.push([x, y - 1]);
    }

    if (y < lines.length - 1) {
      neighbours.push([x, y + 1]);
    }
  }

  return neighbours;
}

export function day3Part1(input: string) {
  const lines = input.split("\n");

  let total = 0;
  for (let [y, line] of lines.entries()) {
    const matches = line.matchAll(/(\d+)/g);

    for (const match of matches) {
      const { "0": number, index } = match;

      const neighbours = getNeighbours(lines, index!, y, number.length);
      if (
        neighbours.some(([testX, testY]) => {
          const value = lines[testY][testX];

          return !value.match(/[\d\.]/);
        })
      ) {
        total += Number(number);
      }
    }
  }

  return total;
}

export function day3Part2(input: string) {
  const lines = input.split("\n");

  const found: { [key: string]: Array<string> } = {};

  for (let [y, line] of lines.entries()) {
    const matches = line.matchAll(/(\d+)/g);

    for (const match of matches) {
      const { "0": number, index } = match;

      const neighbours = getNeighbours(lines, index!, y, number.length);
      for (let [testX, testY] of neighbours) {
        const value = lines[testY][testX];

        if (value === "*") {
          const key = `${testX}/${testY}`;
          found[key] = found[key] ?? [];
          found[key].push(number);
          break;
        }
      }
    }
  }

  let total = 0;
  for (let list of Object.values(found)) {
    if (list.length === 2) {
      total += Number(list[0]) * Number(list[1]);
    }
  }
  return total;
}
