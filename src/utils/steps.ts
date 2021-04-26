import { random, range, findIndex } from 'lodash';

import Constants from '../Constants';

export const generateSteps = (): Array<number> =>
  range(1, Constants.LEVELS - 1).reduce(
    (acc, cur) => {
      const multiplier = cur + 1;
      const next = acc[cur - 1] + Constants.STEP_DELTA * multiplier;

      return [...acc, random(next, next + multiplier * Constants.RANDOM_STEP)];
    },
    [random(5, 5 + Constants.RANDOM_STEP)]
  );

export const getFractionsNumber = (steps: Array<number>, count: number): number => {
  const lastStep = steps.length - 1;
  const index = count > steps[lastStep - 1] ? lastStep : findIndex(steps, (step) => count <= step);

  return index + 2;
};

export const getActiveZoneCoordinates = (
  currentFractions: number,
  activeZone: number
): [number, number] => {
  const zoneStart = Constants.FLOOR_HEIGHT;
  const zoneEnd = Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT;
  const zoneHeight = zoneEnd - zoneStart;
  const activeZoneHeight = zoneHeight / currentFractions;
  const activeZoneStart = zoneStart + (activeZone - 1) * activeZoneHeight;
  const activeZoneEnd = activeZoneStart + activeZoneHeight;

  return [activeZoneStart, activeZoneEnd];
};
