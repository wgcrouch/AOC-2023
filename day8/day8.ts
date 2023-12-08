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

  const graph = nodesString.split("\n").reduce((out, s) => {
    const [node, nextString] = s.split(" = ");
    const matches = nextString.match(/\(([1-9A-Z]+), ([1-9A-Z]+)\)/)!;

    out[node] = { id: node, L: matches[1], R: matches[2] };
    return out;
  }, {} as Graph);
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
  let currentNodes = [...startingNodes];

  let state = startingNodes.map((node) => node[2]).join("");
  const expected = startingNodes.map(() => "Z").join("");

  let count = 0;
  let zCount = 0;

  let i = 0;

  // Track how many steps it takes to get to a Z end, for each of the
  // simultaneous paths
  const stepsToZ: Array<number> = [];

  // When we get to 'ZZZZZZ', or we have found the first Z for each, we can stop
  while (state !== expected && zCount < startingNodes.length) {
    let nextState = "";
    const nextMove = moves[i];
    i = i + 1 === moves.length ? 0 : i + 1;
    for (let j = 0; j < currentNodes.length; j++) {
      if (stepsToZ[j]) {
        continue;
      }
      const node = currentNodes[j];
      const next = graph[node][nextMove];
      currentNodes[j] = graph[node][nextMove];
      nextState = nextState + next[2];

      if (next.endsWith("Z")) {
        stepsToZ[j] = count + 1;
        zCount++;
      }
    }

    state = nextState;
    count++;
  }

  // Find the lowest common multiple, which will show when
  // all the paths to Z repeat at the same point
  return lcm(...stepsToZ);
}
