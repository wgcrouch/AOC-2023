import { day5Input } from "./input";

type DestSourceMap = {
  destinationStart: number;
  sourceStart: number;
  length: number;
};

const mapOrder = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
] as const;

type MapId = (typeof mapOrder)[number];
type Maps = Record<MapId, Array<DestSourceMap>>;

function parseMaps(input: string) {
  let maps: Maps = {
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": [],
  };

  const [_, ...mapsSection] = input.split("\n\n");

  for (const mapString of mapsSection) {
    const [id, valuesString] = mapString.split(" map:\n");
    for (let row of valuesString.split("\n")) {
      const [destinationStart, sourceStart, length] = row
        .split(" ")
        .map(Number);

      maps[id as keyof typeof maps].push({
        destinationStart,
        sourceStart,
        length,
      });
    }
  }

  for (let id of mapOrder) {
    maps[id] = maps[id].sort((a, b) => a.sourceStart - b.sourceStart);
  }

  return maps;
}

function mapId(maps: Maps, id: number, source: MapId) {
  const map = maps[source].find(
    ({ sourceStart, length }) => id >= sourceStart && id < sourceStart + length,
  );

  if (map) {
    return map.destinationStart + id - map.sourceStart;
  }

  return id;
}

function findSeedLocation(maps: Maps, seed: number) {
  const location = mapOrder.reduce((id, source) => {
    const next = mapId(maps, id, source);
    return next;
  }, seed);

  return location;
}

function day5Part1(input: string) {
  const maps = parseMaps(input);
  const [seedsSection] = input.split("\n\n");
  const seeds = seedsSection.split(": ").slice(1)[0].split(" ").map(Number);

  let minLocation = Number.POSITIVE_INFINITY;
  for (const seed of seeds) {
    const location = findSeedLocation(maps, seed);

    minLocation = Math.min(location, minLocation);
  }

  return minLocation;
}

function day5Part2(input: string) {
  let maps = parseMaps(input);
  const [seedsSection] = input.split("\n\n");
  const seedRanges = seedsSection
    .split(": ")
    .slice(1)[0]
    .split(" ")
    .map(Number);

  let minLocation = Number.POSITIVE_INFINITY;

  for (let i = 0; i < seedRanges.length; i += 2) {
    const start = seedRanges[i];
    const end = start + seedRanges[i + 1];
    for (let seed = start; seed < end; seed++) {
      const location = findSeedLocation(maps, seed);
      minLocation = Math.min(location, minLocation);
    }
  }

  return minLocation;
}

console.log("* Day 5 *");
console.log("Part 1:", day5Part1(day5Input));
console.log("Part 2:", day5Part2(day5Input));
