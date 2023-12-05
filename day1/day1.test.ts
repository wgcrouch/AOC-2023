import { expect, test } from "vitest";
import { day1part1, day1part2 } from "./day1";
import { day1input } from "./input";

const day1Example1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const day1Example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

test("day 1 part 1 example", () => {
  expect(day1part1(day1Example1)).toEqual(142);
});

test("day 1 part 1 real", () => {
  expect(day1part1(day1input)).toEqual(56465);
});

test("day 1 part 2 example", () => {
  expect(day1part2(day1Example2)).toEqual(281);
});

test("day 1 part 2 real", () => {
  expect(day1part2(day1input)).toEqual(55902);
});
