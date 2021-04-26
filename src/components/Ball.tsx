import React, { useContext } from 'react';
import { Animated } from 'react-native';

import { mainColors } from '../utils/colors';
import GameContext from '../contexts/game';

interface Props {
  radius: number;
  body: Matter.Body;
}

const Ball = ({ radius, body }: Props) => {
  const { activeColorIdx } = useContext(GameContext);
  const diameter = radius * 2;
  const x = body.position.x - radius;
  const y = body.position.y - radius;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: diameter,
        height: diameter,
        borderRadius: 50,
        backgroundColor: mainColors[activeColorIdx],
      }}
    />
  );
};

export default Ball;
