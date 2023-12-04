import { day4input } from "./input";

type Card = [winning: Array<string>, ours: Array<string>];

function parseCards(input: string): Array<Card> {
  return input
    .split("\n")
    .map((line) => line.split(": "))
    .map(([_, sections]) => sections.split(" | "))
    .map(([first, second]) => {
      const winning = first
        .split(" ")
        .map((s) => s.trim())
        .filter((x) => x !== undefined && x !== "");
      const ours = second
        .split(" ")
        .map((s) => s.trim())
        .filter((x) => x !== undefined && x !== "");
      return [winning, ours];
    });
}

function day4Part1(input: string) {
  let total = 0;

  const cards = parseCards(input);

  for (const card of cards) {
    const wins = countWins(card);
    total += wins ? 2 ** (wins - 1) : 0;
  }

  return total;
}

function countWins([winning, ours]: Card) {
  let wins = 0;
  for (let winNo of winning) {
    if (ours.includes(winNo)) {
      wins++;
    }
  }
  return wins;
}

function day4Part2(input: string) {
  const cards = parseCards(input);

  const cardCounts: { [index: number]: number } = {};

  for (let index = 0; index < cards.length; index++) {
    const wins = countWins(cards[index]);

    // Add a count for the card we own;
    cardCounts[index] = (cardCounts[index] ?? 0) + 1;

    for (let i = 1; i <= wins; i++) {
      const nextIndex = i + index;

      // Cant add cards we dont have
      if (nextIndex >= cards.length) {
        break;
      }

      cardCounts[nextIndex] = cardCounts[nextIndex]
        ? cardCounts[nextIndex] + cardCounts[index]
        : cardCounts[index];
    }
  }

  const total = Object.values(cardCounts).reduce((out, next) => out + next, 0);

  return total;
}

console.log("* Day 4 *");
console.log("Part 1:", day4Part1(day4input));
console.log("Part 2:", day4Part2(day4input));
