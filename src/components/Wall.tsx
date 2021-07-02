import React, { useContext, useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { range, shuffle } from 'lodash';
import * as Animatable from 'react-native-animatable';

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
  const wall = useRef<any>(null);
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
  const hiddenX = position === Position.Left ? x - width : x + width;

  useEffect(() => {
    setColors(shuffle(mainColors.filter((c, i) => i !== activeColorIdx)));
  }, [direction, activeColorIdx]);

  useEffect(() => {
    if (isActive) {
      if (position === Position.Left) {
        wall?.current?.slideInLeft(350);
      } else {
        wall?.current?.slideInRight(350);
      }
    }
  }, [isActive, wall, position]);

  return (
    <Animatable.View
      ref={wall}
      style={{
        position: 'absolute',
        top: y,
        left: isActive ? x : hiddenX,
        width,
        height,
        opacity: 1,
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
    </Animatable.View>
  );
};

export default Wall;
