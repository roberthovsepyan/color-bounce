import { createContext } from 'react';
import { random } from 'lodash';

import Constants from '../Constants';

export enum Direction {
  LTR = 'ltr',
  RTL = 'rtl',
}

const GameContext = createContext({
  activeColorIdx: random(0, Constants.COLORS_NUMBER - 1),
  direction: Direction.LTR,
  currentFractions: 2,
  activeZone: 1,
});

export default GameContext;
