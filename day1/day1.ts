export function day1part1(input: string) {
  const lines = input.split("\n");
  let total = 0;
  for (let line of lines) {
    const matches = line.match(/\d/g) as Array<number> | null;
    if (matches) {
      total += Number(matches[0] + matches[matches.length - 1]);
    }
  }

  return total;
}

const values: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberMatch = "\\d|" + Object.keys(values).join("|");

function parseNumber(input: string | undefined): number {
  if (input == undefined) {
    throw new Error("cant parse undefined value");
  }
  return values[input] ?? parseInt(input);
}

export function day1part2(input: string) {
  const lines = input.toLowerCase().split("\n");
  let total = 0;
  for (let line of lines) {
    const first = line.match(new RegExp(numberMatch))?.[0];
    const last = line.match(new RegExp(`.*(${numberMatch}).*$`))?.[1];

    total += parseNumber(first) * 10 + parseNumber(last);
  }

  return total;
}
