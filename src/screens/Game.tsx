import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated, View } from 'react-native';
import { GameEngine, GameEngineSystem } from 'react-native-game-engine';
import Matter from 'matter-js';
import { random } from 'lodash';

import Constants from '../Constants';
import { backgroundColors } from '../utils/colors';
import createWorld from '../utils/createWorld';
import { generateSteps, getFractionsNumber, getActiveZoneCoordinates } from '../utils/steps';
import { storeData, getData } from '../utils/asyncStorage';
import GameContext, { Direction, GameStatus } from '../contexts/game';
import Count from '../components/Count';
import Start from '../components/Start';
import Restart from '../components/Restart';

const engine = Matter.Engine.create({ enableSleeping: false });
const world = createWorld(engine);

let intervalId: ReturnType<typeof setInterval>;

const Game = () => {
  const gameEngine = useRef<any>(null);
  const [direction, setDirection] = useState(Direction.LTR);
  const [activeColorIdx, setActiveColorIdx] = useState(random(0, Constants.COLORS_NUMBER - 1));
  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState(generateSteps());
  const [activeZone, setActiveZone] = useState(1);
  const [gameStatus, setGameStatus] = useState(GameStatus.NotStarted);
  const [highScore, setHighScore] = useState(0);
  const currentFractions = getFractionsNumber(steps, count);
  const [activeZoneStart, activeZoneEnd] = getActiveZoneCoordinates(currentFractions, activeZone);

  const addEvents = useCallback(() => {
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

  const generateNextStep = (direction: Direction) => {
    setDirection(direction);
    setActiveColorIdx(random(0, Constants.COLORS_NUMBER - 1));
    setCount(count + 1);
    setActiveZone(random(1, currentFractions));
  };

  const reset = () => {
    setDirection(Direction.LTR);
    setActiveColorIdx(random(0, Constants.COLORS_NUMBER - 1));
    setCount(0);
    setActiveZone(1);
    setGameStatus(GameStatus.NotStarted);
    gameEngine.current.swap(createWorld(engine));
    addEvents();
    gameEngine.current.start();
  };

  const start = () => {
    engine.world.gravity.y = 1.25;
    setGameStatus(GameStatus.Started);
  };

  const finish = () => {
    if (count > highScore) {
      storeData('highScore', count.toString());
      setHighScore(count);
    }
    gameEngine.current.stop();
    setGameStatus(GameStatus.Finished);
  };

  const physics: GameEngineSystem = (entities, { touches, time }) => {
    const engine = entities.physics.engine;
    const ball = entities.ball.body;

    touches
      .filter((t) => t.type === 'press')
      .forEach(() => {
        if (gameStatus === GameStatus.NotStarted) start();
        Matter.Body.applyForce(ball, ball.position, { x: 0.0, y: -0.04 });
        Matter.Body.setVelocity(ball, { x: 0.0, y: 0.0 });
      });

    if (gameStatus === GameStatus.Started) {
      if (direction === Direction.LTR) {
        Matter.Body.translate(ball, { x: 3.0, y: 0.0 });
      } else if (direction === Direction.RTL) {
        Matter.Body.translate(ball, { x: -3.0, y: 0.0 });
      }
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
      finish();
    }
  };

  useEffect(() => {
    addEvents();
  }, [addEvents]);

  useEffect(() => {
    getData('highScore').then((score) => {
      if (score) setHighScore(parseInt(score, 10));
    });
  }, []);

  useEffect(() => {
    if (gameStatus === GameStatus.NotStarted) {
      intervalId = setInterval(
        () => setActiveColorIdx(random(0, Constants.COLORS_NUMBER - 1)),
        3000
      );
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStatus]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: backgroundColors[activeColorIdx],
      }}
    >
      <GameContext.Provider
        value={{ activeColorIdx, direction, currentFractions, activeZone, gameStatus }}
      >
        <View style={{ zIndex: 1, flex: 1 }}>
          <GameEngine ref={gameEngine} entities={world} systems={[physics]} onEvent={handleEvent} />
        </View>
        <Count
          count={gameStatus === GameStatus.NotStarted ? undefined : count}
          activeColorIdx={activeColorIdx}
        />
        {gameStatus === GameStatus.NotStarted && <Start highScore={highScore} />}
        {gameStatus === GameStatus.Finished && (
          <Restart score={count} highScore={highScore} onClick={reset} />
        )}
      </GameContext.Provider>
    </Animated.View>
  );
};

export default Game;
