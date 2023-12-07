import { expect, test } from "vitest";
import { day7Part1, day7Part2, parseInputPart1 } from "./day7";
import { day7input } from "./input";

const day7Example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

test("parseInputPart1", () => {
  expect(parseInputPart1(day7Example)).toMatchSnapshot();
});

test("day 7 part 1 example", () => {
  expect(day7Part1(day7Example)).toEqual(6440);
});

test("day 7 part 1 real", () => {
  expect(day7Part1(day7input)).toEqual(245794640);
});

test("day 7 part 2 example", () => {
  expect(day7Part2(day7Example)).toEqual(5905);
});

test("day 7 part 2 real", () => {
  expect(day7Part2(day7input)).toEqual(247899149);
});
