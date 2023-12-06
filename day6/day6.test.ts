import { expect, test } from "vitest";
import { parseInputPart2 } from "./day6";
import { parseInputPart1, day6Part1, day6Part2 } from "./day6";
import { day6input } from "./input";

const day6Example = `Time:      7  15   30
Distance:  9  40  200
`;

test("parseInputPart1", () => {
  expect(parseInputPart1(day6Example)).toEqual([
    [7, 9],
    [15, 40],
    [30, 200],
  ]);
});

test("day 6 part 1 example", () => {
  expect(day6Part1(day6Example)).toEqual(288);
});

test("day 6 part 1 real", () => {
  expect(day6Part1(day6input)).toEqual(170000);
});

test("parseInputPart2", () => {
  expect(parseInputPart2(day6Example)).toEqual([71530, 940200]);
});

test("day 6 part 2 example", () => {
  expect(day6Part2(day6Example)).toEqual(71503);
});

test("day 6 part 2 real", () => {
  expect(day6Part2(day6input)).toEqual(20537782);
});
