const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

export function day2Part1(input: string) {
  const lines = input.split("\n");

  let total = 0;

  for (let line of lines) {
    const [game, gamesText] = line.split(": ");
    const id = game.match(/\d+/)?.[0];

    const rounds = gamesText.split("; ");
    const allowed = rounds.every((round) => {
      const parts = round.split(", ").map((part) => part.split(" "));
      return parts.every(
        ([count, color]) =>
          (color === "blue" && +count <= MAX_BLUE) ||
          (color === "green" && +count <= MAX_GREEN) ||
          (color === "red" && +count <= MAX_RED)
      );
    });

    if (allowed) {
      total += Number(id);
    }
  }

  return total;
}

export function day2Part2(input: string) {
  const lines = input.split("\n");

  let total = 0;

  for (let line of lines) {
    let maxGreen = 0,
      maxRed = 0,
      maxBlue = 0;
    const [_, gamesText] = line.split(": ");

    const rounds = gamesText.split("; ");
    for (let round of rounds) {
      const parts = round.split(", ").map((part) => part.split(" "));
      for (let [count, color] of parts) {
        switch (color) {
          case "red":
            maxRed = Math.max(maxRed, +count);
            break;
          case "green":
            maxGreen = Math.max(maxGreen, +count);
            break;
          case "blue":
            maxBlue = Math.max(maxBlue, +count);
            break;
        }
      }
    }

    total += maxRed * maxGreen * maxBlue;
  }

  return total;
}
