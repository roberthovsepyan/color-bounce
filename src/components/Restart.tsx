import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Constants from '../Constants';
import { GameStatus } from '../contexts/game';
import HighScore from './HighScore';

interface Props {
  score: number;
  highScore: number;
  onClick: () => void;
  gameStatus: GameStatus;
}

const Restart = ({ score, highScore, onClick, gameStatus }: Props) => {
  const header = useRef<any>(null);
  const content = useRef<any>(null);
  const footer = useRef<any>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      header?.current?.bounceInLeft(750);
      content?.current?.bounceInRight(750);
      footer?.current?.bounceInUp(750);
    }
  }, [isMounted, header, content, footer]);

  useEffect(() => {
    if (gameStatus === GameStatus.Finished) {
      setMounted(true);
    } else if (gameStatus === GameStatus.NotStarted) {
      header?.current?.bounceOutLeft(750).then(() => setMounted(false));
      content?.current?.bounceOutRight(750);
      footer?.current?.bounceOutDown(750);
    }
  }, [gameStatus, header, content, footer]);

  return !isMounted ? null : (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animatable.View style={styles.button} ref={header}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.pointsText}>POINTS</Text>
        </Animatable.View>
        <Animatable.View style={styles.replay} ref={content}>
          <TouchableHighlight onPress={onClick} style={styles.touchable}>
            <View style={styles.button}>
              <Text style={styles.replayText}>REPLAY</Text>
            </View>
          </TouchableHighlight>
        </Animatable.View>
      </View>
      <Animatable.View ref={footer}>
        <HighScore score={highScore} />
      </Animatable.View>
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
