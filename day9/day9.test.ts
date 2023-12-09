import { expect, test } from "vitest";
import { day9Part1, day9Part2 } from "./day9";
import { day9input } from "./input";

const day9Example = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test("day 9 part 1 example", () => {
  expect(day9Part1(day9Example)).toEqual(114);
});

test("day 9 part 1 real", () => {
  expect(day9Part1(day9input)).toEqual(2043183816);
});

test("day 9 part 2 example", () => {
  expect(day9Part2(day9Example)).toEqual(2);
});

test("day 9 part 2 real", () => {
  expect(day9Part2(day9input)).toEqual(1118);
});
