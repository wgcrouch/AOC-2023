export function parseInputPart1(input: string) {
  const [times, distances] = input
    .split("\n")
    .map((s) => s.split(/:\s+/)[1])
    .filter((s) => !!s)
    .map((s) => s.split(/\s+/));

  let result: Array<[time: number, distance: number]> = [];
  for (let i = 0; i < times.length; i++) {
    result.push([Number(times[i]), Number(distances[i])]);
  }
  return result;
}

export function day6Part1(input: string) {
  const races = parseInputPart1(input);

  const results: Array<number> = [];
  for (let [raceNumber, [time, distance]] of races.entries()) {
    for (let holdTime = 1; holdTime <= time; holdTime++) {
      const completedDistance = holdTime * (time - holdTime);
      if (completedDistance > distance) {
        results[raceNumber] = (results[raceNumber] ?? 0) + 1;
      }
    }
  }

  return results.reduce((out, result) => out * result, 1);
}

export function parseInputPart2(input: string) {
  const [times, distances] = input
    .split("\n")
    .map((s) => s.split(/:\s+/)[1])
    .filter((s) => !!s)
    .map((s) => Number(s.split(/\s+/).join("")));

  return [times, distances];
}

export function day6Part2(input: string) {
  const [time, distance] = parseInputPart2(input);

  let total = 0;

  for (let holdTime = 1; holdTime <= time; holdTime++) {
    const completedDistance = holdTime * (time - holdTime);
    if (completedDistance > distance) {
      total++;
    }
  }

  return total;
}
