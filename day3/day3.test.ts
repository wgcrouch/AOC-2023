import { expect, test } from "vitest";
import { day3Part1, day3Part2 } from "./day3";
import { day3input } from "./input";

const day3Example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test("day 3 part 1 example", () => {
  expect(day3Part1(day3Example)).toEqual(4361);
});

test("day 3 part 1 real", () => {
  expect(day3Part1(day3input)).toEqual(514969);
});

test("day 3 part 2 example", () => {
  expect(day3Part2(day3Example)).toEqual(467835);
});

test("day 3 part 2 real", () => {
  expect(day3Part2(day3input)).toEqual(78915902);
});
