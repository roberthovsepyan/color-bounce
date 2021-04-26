import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Constants from '../Constants';
import HighScore from './HighScore';

interface Props {
  score: number;
  onClick: () => void;
}

const Restart = ({ score, onClick }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.button}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.pointsText}>POINTS</Text>
        </View>
        <View style={styles.replay}>
          <TouchableHighlight onPress={onClick} style={styles.touchable}>
            <View style={styles.button}>
              <Text style={styles.replayText}>REPLAY</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <HighScore score={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
  },
  content: {
    position: 'absolute',
    top: Constants.MAX_HEIGHT / 2 - 100,
    width: Constants.MAX_WIDTH,
    alignItems: 'center',
  },
  scoreText: {
    fontFamily: 'RussoOne',
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },
  pointsText: {
    fontFamily: 'RussoOne',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
  replay: {
    marginTop: 8,
  },
  replayText: {
    fontFamily: 'RussoOne',
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    width: 240,
    backgroundColor: 'hsl(350, 85%, 60%)',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  touchable: {
    borderRadius: 8,
  },
});

export default Restart;
