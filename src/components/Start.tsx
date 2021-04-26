import React from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

import Constants from '../Constants';
import HighScore from './HighScore';

const Start = () => {
  return (
    <View style={styles.container}>
      <Animated.View style={styles.title}>
        <Text style={styles.titleText}>COLOR BOUNCE</Text>
      </Animated.View>
      <Animated.View style={styles.instruction}>
        <Text style={styles.instructionText}>TAP</Text>
        <Text style={styles.instructionText}>TO JUMP</Text>
      </Animated.View>
      <HighScore score={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  title: {
    position: 'absolute',
    top: Constants.FLOOR_HEIGHT + 10,
    width: Constants.MAX_WIDTH,
  },
  titleText: {
    fontFamily: 'RussoOne',
    fontSize: 40,
    textAlign: 'center',
    color: 'hsl(200, 25%, 30%)',
  },
  instruction: {
    position: 'absolute',
    top: Constants.MAX_HEIGHT / 2 - 100,
    width: Constants.MAX_WIDTH,
  },
  instructionText: {
    fontFamily: 'RussoOne',
    fontSize: 24,
    textAlign: 'center',
    color: 'hsl(200, 25%, 30%)',
  },
});

export default Start;
