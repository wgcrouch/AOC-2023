import { isPropertyAccessOrQualifiedName } from "typescript";

type Node = {
  id: string;
  L: string;
  R: string;
};
type Graph = { [key: string]: Node };

function parseInput(input: string) {
  const [movesString, nodesString] = input.split("\n\n");

  const moves = movesString.split("") as Array<"L" | "R">;

  let graph: Graph = {};
  const lines = nodesString.split("\n");

  for (const line of lines) {
    const [node, nextString] = line.split(" = ");
    const matches = nextString.match(/\(([1-9A-Z]+), ([1-9A-Z]+)\)/)!;
    graph[node] = { id: node, L: matches[1], R: matches[2] };
  }

  return [moves, graph] as const;
}

export function day8Part1(input: string) {
  const [moves, graph] = parseInput(input);

  let current: string = "AAA";
  let count = 0;

  let i = 0;

  while (current !== "ZZZ") {
    const nextMove = moves[i];
    i = i + 1 === moves.length ? 0 : i + 1;
    current = graph[current][nextMove];
    count++;
  }

  return count;
}

const lcm = (...arr: Array<number>) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

export function day8Part2(input: string) {
  const [moves, graph] = parseInput(input);

  const startingNodes = Object.keys(graph).filter((key) => key.endsWith("A"));

  // Track how many steps it takes to get to a Z end for each of the
  // starting nodes
  const stepsToFirstZ: Array<number> = [];

  for (let nodeIndex = 0; nodeIndex < startingNodes.length; nodeIndex++) {
    let count = 0;
    let moveIndex = 0;
    let current = startingNodes[nodeIndex];
    while (!current.endsWith("Z")) {
      const nextMove = moves[moveIndex];
      moveIndex = moveIndex + 1 === moves.length ? 0 : moveIndex + 1;
      current = graph[current][nextMove];
      count++;
    }

    stepsToFirstZ[nodeIndex] = count;
  }

  // Find the lowest common multiple, which will show when
  // all the paths to Z repeat at the same point
  return lcm(...stepsToFirstZ);
}
