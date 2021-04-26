import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Constants from '../Constants';

interface Props {
  score: number;
}

const HighScore = ({ score }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`HIGH SCORE: ${score}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - 100,
    width: Constants.MAX_WIDTH,
  },
  text: {
    fontFamily: 'RussoOne',
    fontSize: 24,
    textAlign: 'center',
    color: 'hsl(200, 25%, 30%)',
  },
});

export default HighScore;
