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

export function day8Part2(input: string) {
  const [moves, graph] = parseInput(input);

  const startingNodes = Object.keys(graph).filter((key) => key.endsWith("A"));
  let maxMoves = 0;
  let currentNodes = [...startingNodes];
  const length = startingNodes.length;
  let state = startingNodes.map((node) => node[2]).join("");
  const expected = startingNodes.map(() => "Z").join("");
  console.log(state, expected);
  let count = 0;

  let i = 0;

  while (state !== expected) {
    if (count > 1000000) {
      console.log(state);
      break;
    }
    let nextState = "";
    const nextMove = moves[i];
    i = i + 1 === moves.length ? 0 : i + 1;
    for (let j = 0; j < currentNodes.length; j++) {
      const node = currentNodes[j];
      const next = graph[node][nextMove];
      currentNodes[j] = graph[node][nextMove];
      nextState = nextState + next[2];
    }
    state = nextState;
    count++;
  }

  return count;
}
