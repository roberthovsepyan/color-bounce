import React, { useRef, useState, useEffect } from 'react';
import { Animated, View } from 'react-native';
import { GameEngine, GameEngineSystem } from 'react-native-game-engine';
import Matter from 'matter-js';
import { random } from 'lodash';

import Constants from '../Constants';
import { backgroundColors } from '../utils/colors';
import createWorld from '../utils/createWorld';
import { generateSteps, getFractionsNumber, getActiveZoneCoordinates } from '../utils/steps';
import GameContext, { Direction } from '../contexts/game';
import Count from '../components/Count';

const engine = Matter.Engine.create({ enableSleeping: false });
const world = createWorld(engine);

const Game = () => {
  const gameEngine = useRef<any>(null);
  const [direction, setDirection] = useState(Direction.LTR);
  const [activeColorIdx, setActiveColorIdx] = useState(random(0, Constants.COLORS_NUMBER - 1));
  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState(generateSteps());
  const [activeZone, setActiveZone] = useState(1);
  const [isRunning, setRunning] = useState(true);
  const currentFractions = getFractionsNumber(steps, count);
  const [activeZoneStart, activeZoneEnd] = getActiveZoneCoordinates(currentFractions, activeZone);

  const generateNextStep = (direction: Direction) => {
    setDirection(direction);
    setActiveColorIdx(random(0, Constants.COLORS_NUMBER - 1));
    setCount(count + 1);
    setActiveZone(random(1, currentFractions));
  };

  const physics: GameEngineSystem = (entities, { touches, time }) => {
    const engine = entities.physics.engine;
    const ball = entities.ball.body;

    touches
      .filter((t) => t.type === 'press')
      .forEach(() => {
        Matter.Body.applyForce(ball, ball.position, { x: 0.0, y: -0.04 });
        Matter.Body.setVelocity(ball, { x: 0.0, y: 0.0 });
      });

    if (direction === Direction.LTR) {
      Matter.Body.translate(ball, { x: 3.0, y: 0.0 });
    } else if (direction === Direction.RTL) {
      Matter.Body.translate(ball, { x: -3.0, y: 0.0 });
    }

    Matter.Engine.update(engine, time.delta);

    return entities;
  };

  const handleEvent = ({ type, ballY }: { type: string; ballY?: number }) => {
    if (ballY && ballY > activeZoneStart && ballY < activeZoneEnd) {
      if (type === 'hit-right-wall') {
        generateNextStep(Direction.RTL);
      } else if (type === 'hit-left-wall') {
        generateNextStep(Direction.LTR);
      }
    } else if (['hit-right-wall', 'hit-left-wall', 'hit-floor'].includes(type)) {
      setRunning(false);
    }
  };

  useEffect(() => {
    const leftWallX = Constants.WALL_THICKNESS / 2;
    const rightWallX = Constants.MAX_WIDTH - Constants.WALL_THICKNESS / 2;

    if (gameEngine && gameEngine.current) {
      Matter.Events.on(engine, 'collisionStart', (e) => {
        const { position } = e.pairs[0].bodyB;
        const ballY = e.pairs[0].bodyA.position.y;

        if (position.x === rightWallX) {
          gameEngine.current.dispatch({ type: 'hit-right-wall', ballY });
        } else if (position.x === leftWallX) {
          gameEngine.current.dispatch({ type: 'hit-left-wall', ballY });
        } else {
          gameEngine.current.dispatch({ type: 'hit-floor' });
        }
      });
    }
  }, [gameEngine]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: backgroundColors[activeColorIdx],
      }}
    >
      <GameContext.Provider value={{ activeColorIdx, direction, currentFractions, activeZone }}>
        <View style={{ zIndex: 1, flex: 1 }}>
          <GameEngine
            ref={gameEngine}
            entities={world}
            systems={[physics]}
            onEvent={handleEvent}
            running={true}
          />
        </View>
        <Count count={count} activeColorIdx={activeColorIdx} />
      </GameContext.Provider>
    </Animated.View>
  );
};

export default Game;
