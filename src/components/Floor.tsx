import React from 'react';
import { View } from 'react-native';

interface Props {
  size: [number, number];
  body: Matter.Body;
}

const Floor = ({ size, body }: Props) => {
  const [width, height] = size;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        backgroundColor: 'hsl(200, 35%, 85%)',
        zIndex: 1,
      }}
    />
  );
};

export default Floor;
