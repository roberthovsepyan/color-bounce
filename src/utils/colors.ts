import { range } from 'lodash';

import Constants from '../Constants';

export const generateColors = (n = 1, saturation = 100, lightness = 50): Array<string> => {
  const circuit = 360;

  let denominator = 2;

  let index = 1;

  const numbers = range(n - 1)
    .reduce(
      (acc) => {
        const fraction = circuit / denominator;
        const number = index * fraction;
        const isWholeCircuit = acc.length + 1 === denominator;
        const nextIndex = acc.includes(number + fraction) ? index + 2 : index + 1;

        index = isWholeCircuit ? 1 : nextIndex;
        denominator *= isWholeCircuit ? 2 : 1;
        return [...acc, number];
      },
      [0]
    )
    .sort((a, b) => a - b);

  return numbers.map((n) => `hsl(${Math.round(n)}, ${saturation}%, ${lightness}%)`);
};

export const backgroundColors = generateColors(Constants.COLORS_NUMBER, 85, 95);

export const mainColors = generateColors(Constants.COLORS_NUMBER, 85, 80);
