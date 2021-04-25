import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts, RussoOne_400Regular } from '@expo-google-fonts/russo-one';

import GameScreen from './src/screens/Game';

export default function App() {
  const [fontsLoaded] = useFonts({
    RussoOne: RussoOne_400Regular,
  });

  return (
    <View style={styles.container}>
      {fontsLoaded && <GameScreen />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
