import { expect, test } from "vitest";
import { day8Part1, day8Part2, parseInputPart1 } from "./day8";
import { day8input } from "./input";

const day8Example1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const day8Example2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const day8Example3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

test("day 8 part 1 example", () => {
  expect(day8Part1(day8Example1)).toEqual(2);
  expect(day8Part1(day8Example2)).toEqual(6);
});

test("day 8 part 1 real", () => {
  expect(day8Part1(day8input)).toEqual(245794640);
});

test("day 8 part 2 example", () => {
  expect(day8Part2(day8Example3)).toEqual(6);
});

test.only("day 8 part 2 real", () => {
  expect(day8Part2(day8input)).toEqual(247899149);
});
