import { expect, test } from "vitest";
import { day2Part1, day2Part2 } from "./day2";
import { day2input } from "./input";

const day2Example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

test("day 2 part 1 example", () => {
  expect(day2Part1(day2Example)).toEqual(8);
});

test("day 2 part 1 real", () => {
  expect(day2Part1(day2input)).toEqual(2486);
});

test("day 2 part 2 example", () => {
  expect(day2Part2(day2Example)).toEqual(2286);
});

test("day 2 part 2 real", () => {
  expect(day2Part2(day2input)).toEqual(87984);
});
