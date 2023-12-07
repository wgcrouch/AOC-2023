const cardTypes = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "7",
  "8",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

type CardType = (typeof cardTypes)[number];
const CardRank: Record<CardType, number> = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
};

const CardRankWithJoker: Record<CardType, number> = {
  A: 13,
  K: 12,
  Q: 11,
  T: 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
  J: 0,
};

enum GameRank {
  HIGH_CARD,
  PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

type Game = {
  cards: Array<CardType>;
  bid: number;
  rank: GameRank;
};

function parseInput(
  input: string,
): Array<[cards: Array<CardType>, bid: number]> {
  const lines = input.split("\n");
  const games = lines
    .map((line) => line.split(" "))
    .map(([cardsString, bidString]): [Array<CardType>, number] => [
      cardsString.split("") as Array<CardType>,
      Number(bidString),
    ]);

  return games;
}

function countCards(cards: Array<CardType>) {
  let cardCounts: { [key: string]: number } = {};

  for (let cardType of cardTypes) {
    cardCounts[cardType] = 0;
  }

  for (let card of cards) {
    cardCounts[card] = cardCounts[card] + 1;
  }

  return cardCounts as Record<CardType, number>;
}

export function parseInputPart1(input: string): Array<Game> {
  const rawGames = parseInput(input);
  const games = rawGames.map(([cards, bid]) => {
    let cardCounts = countCards(cards);

    let threeOfAKind = false;
    let pairs = 0;

    const game: Game = {
      cards,
      bid: bid,
      rank: GameRank.HIGH_CARD,
    };

    for (let cardType of cardTypes) {
      const count = cardCounts[cardType];
      if (count === 5) {
        game.rank = GameRank.FIVE_OF_A_KIND;
      } else if (count === 4) {
        game.rank = GameRank.FOUR_OF_A_KIND;
      } else if (count === 3) {
        threeOfAKind = true;
        game.rank = GameRank.THREE_OF_A_KIND;
      } else if (count === 2) {
        pairs++;
      }
    }

    if (pairs === 2) {
      game.rank = GameRank.TWO_PAIR;
    } else if (pairs === 1) {
      if (threeOfAKind) {
        game.rank = GameRank.FULL_HOUSE;
      } else {
        game.rank = GameRank.PAIR;
      }
    }

    return game;
  });

  return games;
}

function compareGames(withJokers = false) {
  const cardRankToUse = withJokers ? CardRankWithJoker : CardRank;
  return (a: Game, b: Game) => {
    const rankCompare = a.rank - b.rank;

    if (rankCompare !== 0) {
      return rankCompare;
    }

    for (let i = 0; i < a.cards.length; i++) {
      const cardCompare = cardRankToUse[a.cards[i]] - cardRankToUse[b.cards[i]];
      if (cardCompare !== 0) {
        return cardCompare;
      }
    }

    return 0;
  };
}

function sortGames(games: Array<Game>, withJokers = false) {
  return [...games].sort(compareGames(withJokers));
}

export function day7Part1(input: string) {
  const games = parseInputPart1(input);

  const sorted = sortGames(games);
  const total = sorted.reduce(
    (out, game, index) => out + (index + 1) * game.bid,
    0,
  );

  return total;
}

export function parseInputPart2(input: string): Array<Game> {
  const rawGames = parseInput(input);
  const games = rawGames.map(([cards, bid]) => {
    let cardCounts = countCards(cards);

    let threeOfAKind = false;
    let pairs = 0;

    const game: Game = {
      cards,
      bid: bid,
      rank: GameRank.HIGH_CARD,
    };

    let maxCount = 0;

    for (let cardType of cardTypes) {
      if (cardType === "J") {
        continue;
      }
      const count = cardCounts[cardType];
      maxCount = Math.max(maxCount, count);
      if (count === 4) {
        game.rank = GameRank.FOUR_OF_A_KIND;
      } else if (count === 3) {
        threeOfAKind = true;
        game.rank = GameRank.THREE_OF_A_KIND;
      } else if (count === 2) {
        pairs++;
      }
    }
    const jokerCount = cardCounts["J"];
    if (!jokerCount) {
      if (pairs === 2) {
        game.rank = GameRank.TWO_PAIR;
      } else if (pairs === 1) {
        if (threeOfAKind) {
          game.rank = GameRank.FULL_HOUSE;
        } else {
          game.rank = GameRank.PAIR;
        }
      }
    } else {
      if (pairs === 2) {
        game.rank = GameRank.FULL_HOUSE;
      } else {
        const count = maxCount + jokerCount;
        if (count === 5) {
          game.rank = GameRank.FIVE_OF_A_KIND;
        } else if (count === 4) {
          game.rank = GameRank.FOUR_OF_A_KIND;
        } else if (count === 3) {
          game.rank = GameRank.THREE_OF_A_KIND;
        } else {
          game.rank = GameRank.PAIR;
        }
      }
    }

    return game;
  });

  return games;
}

export function day7Part2(input: string) {
  const games = parseInputPart2(input);

  const sorted = sortGames(games, true);
  const total = sorted.reduce(
    (out, game, index) => out + (index + 1) * game.bid,
    0,
  );

  return total;
}
