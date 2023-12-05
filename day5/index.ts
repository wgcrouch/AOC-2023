import { day5Input } from "./input";

const exampleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

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

let maps: Record<MapId, Array<DestSourceMap>> = {
  "seed-to-soil": [],
  "soil-to-fertilizer": [],
  "fertilizer-to-water": [],
  "water-to-light": [],
  "light-to-temperature": [],
  "temperature-to-humidity": [],
  "humidity-to-location": [],
};

function mapId(id: number, source: MapId, destination: MapId) {
  const map = maps[source].find(
    ({ sourceStart, destinationStart, length }) =>
      id >= sourceStart && id <= sourceStart + length,
  );

  if (map) {
    return map.destinationStart + id - map.sourceStart;
  }

  return id;
}

function day5Part1(input: string) {
  const [seedsSection, ...mapsSection] = input.split("\n\n");
  const seeds = seedsSection.split(": ").slice(1)[0].split(" ").map(Number);

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

  let locations = [];
  for (const seed of seeds) {
    const location = mapOrder.reduce((id, source, index) => {
      const next = mapId(id, source, mapOrder[index - 1]);
      return next;
    }, seed);

    locations.push(location);
  }

  return Math.min(...locations);
}

function day5Part2(input: string) {
  const [seedsSection, ...mapsSection] = input.split("\n\n");
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
      const location = mapOrder.reduce((id, source, index) => {
        const next = mapId(id, source, mapOrder[index - 1]);
        return next;
      }, seed);
      console.log(seed);
      minLocation = Math.min(location, minLocation);
    }
  }

  return minLocation;
}

console.log("* Day 5 *");
console.log("Part 1:", day5Part1(day5Input));
console.log("Part 2:", day5Part2(day5Input));
