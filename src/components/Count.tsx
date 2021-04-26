import React from 'react';
import { View, Text } from 'react-native';

import Constants from '../Constants';
import { backgroundColors } from '../utils/colors';

interface Props {
  activeColorIdx: number;
  count?: number;
}

const WIDTH = 225;

const Count = ({ count, activeColorIdx }: Props) => (
  <View
    style={{
      width: WIDTH,
      height: WIDTH,
      borderRadius: WIDTH,
      position: 'absolute',
      left: Constants.MAX_WIDTH / 2 - WIDTH / 2,
      top: Constants.MAX_HEIGHT / 2 - WIDTH / 2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 120,
        color: backgroundColors[activeColorIdx],
        fontFamily: 'RussoOne',
      }}
    >
      {count}
    </Text>
  </View>
);

export default Count;
