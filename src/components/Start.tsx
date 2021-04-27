import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Constants from '../Constants';
import { GameStatus } from '../contexts/game';
import HighScore from './HighScore';

interface Props {
  highScore: number;
  gameStatus: GameStatus;
}

const Start = ({ highScore, gameStatus }: Props) => {
  const header = useRef<any>(null);
  const content = useRef<any>(null);
  const footer = useRef<any>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      header?.current?.bounceInDown(750);
      content?.current?.bounceInLeft(750);
      footer?.current?.bounceInUp(750);
    }
  }, [isMounted, header, content, footer]);

  useEffect(() => {
    if (gameStatus === GameStatus.NotStarted) {
      setMounted(true);
    } else if (gameStatus === GameStatus.Started) {
      header?.current?.bounceOutUp(750).then(() => setMounted(false));
      content?.current?.bounceOutLeft(750);
      footer?.current?.bounceOutDown(750);
    }
  }, [gameStatus, header, content, footer]);

  return !isMounted ? null : (
    <View style={styles.container}>
      <Animatable.View style={styles.title} ref={header}>
        <Text style={styles.titleText}>COLOR BOUNCE</Text>
      </Animatable.View>
      <Animatable.View style={styles.instruction} ref={content}>
        <Text style={styles.instructionText}>TAP</Text>
        <Text style={styles.instructionText}>TO JUMP</Text>
      </Animatable.View>
      <Animatable.View ref={footer}>
        <HighScore score={highScore} />
      </Animatable.View>
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
