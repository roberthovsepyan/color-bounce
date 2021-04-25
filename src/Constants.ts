import { Dimensions } from 'react-native';

const Constants = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  BALL_RADIUS: 20,
  FLOOR_HEIGHT: 75,
  WALL_THICKNESS: 25,
  COLORS_NUMBER: 15,
  LEVELS: 10,
  RANDOM_STEP: 3,
  STEP_DELTA: 5,
};

export default Constants;
