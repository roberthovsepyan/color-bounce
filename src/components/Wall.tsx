import React, { useContext, useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { range, shuffle } from 'lodash';

import { mainColors } from '../utils/colors';
import GameContext, { Direction, GameStatus } from '../contexts/game';

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
  const { direction, activeColorIdx, activeZone, currentFractions, gameStatus } = useContext(
    GameContext
  );
  const [colors, setColors] = useState(shuffle(mainColors.filter((c, i) => i !== activeColorIdx)));
  const [width, height] = size;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  const isActive =
    gameStatus !== GameStatus.NotStarted &&
    ((position === Position.Left && direction === Direction.RTL) ||
      (position === Position.Right && direction === Direction.LTR));

  useEffect(() => {
    setColors(shuffle(mainColors.filter((c, i) => i !== activeColorIdx)));
  }, [direction, activeColorIdx]);

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
            backgroundColor: activeZone === idx + 1 ? mainColors[activeColorIdx] : colors[idx],
          }}
        />
      ))}
    </Animated.View>
  );
};

export default Wall;
