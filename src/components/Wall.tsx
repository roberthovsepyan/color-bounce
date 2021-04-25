import React, { useContext } from 'react';
import { Animated, View } from 'react-native';
import { range } from 'lodash';

import Constants from '../Constants';
import { backgroundColors, mainColors } from '../utils/colors';
import GameContext, { Direction } from '../contexts/game';

export enum Position {
  Left = 'left',
  Right = 'right',
}

interface Props {
  size: [number, number];
  body: Matter.Body;
  position: Position;
}

const Wall = ({ size, body, position }: Props) => {
  const { direction, activeColorIdx, activeZone, currentFractions } = useContext(GameContext);
  const [width, height] = size;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  const isActive =
    (position === Position.Left && direction === Direction.RTL) ||
    (position === Position.Right && direction === Direction.LTR);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        opacity: isActive ? 1 : 0,
      }}
    >
      {range(currentFractions).map((idx) => (
        <View
          key={idx}
          style={{
            flex: 1,
            backgroundColor: activeZone === idx + 1 ? mainColors[activeColorIdx] : 'red',
          }}
        />
      ))}
    </Animated.View>
  );
};

export default Wall;
