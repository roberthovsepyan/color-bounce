import Matter from 'matter-js';

import Constants from '../Constants';
import Wall, { Position } from '../components/Wall';
import Ball from '../components/Ball';
import Floor from '../components/Floor';

const createWorld = (engine: Matter.Engine) => {
  const world = engine.world;

  const ball = Matter.Bodies.circle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT / 2,
    Constants.BALL_RADIUS
  );
  const floor = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT / 2,
    Constants.MAX_WIDTH,
    Constants.FLOOR_HEIGHT,
    { isStatic: true }
  );
  const ceiling = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.FLOOR_HEIGHT / 2,
    Constants.MAX_WIDTH,
    Constants.FLOOR_HEIGHT,
    { isStatic: true }
  );
  const leftWall = Matter.Bodies.rectangle(
    Constants.WALL_THICKNESS / 2,
    Constants.MAX_HEIGHT / 2,
    Constants.WALL_THICKNESS,
    Constants.MAX_HEIGHT,
    { isStatic: true }
  );
  const rightWall = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH - Constants.WALL_THICKNESS / 2,
    Constants.MAX_HEIGHT / 2,
    Constants.WALL_THICKNESS,
    Constants.MAX_HEIGHT,
    { isStatic: true }
  );

  world.gravity.y = 0;

  Matter.World.add(world, [ball, floor, ceiling, leftWall, rightWall]);

  return {
    physics: { engine, world },
    ball: {
      body: ball,
      radius: Constants.BALL_RADIUS,
      renderer: Ball,
    },
    floor: {
      body: floor,
      size: [Constants.MAX_WIDTH, Constants.FLOOR_HEIGHT],
      renderer: Floor,
    },
    ceiling: {
      body: ceiling,
      size: [Constants.MAX_WIDTH, Constants.FLOOR_HEIGHT],
      renderer: Floor,
    },
    leftWall: {
      body: leftWall,
      size: [Constants.WALL_THICKNESS, Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT * 2],
      position: Position.Left,
      renderer: Wall,
    },
    rightWall: {
      body: rightWall,
      size: [Constants.WALL_THICKNESS, Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT * 2],
      position: Position.Right,
      renderer: Wall,
    },
  };
};

export default createWorld;
