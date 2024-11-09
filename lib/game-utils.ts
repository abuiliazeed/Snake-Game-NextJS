import { Position } from './game-types';
import { GRID_SIZE } from './game-constants';

export function wrapPosition(position: Position): Position {
  return {
    x: (position.x + GRID_SIZE) % GRID_SIZE,
    y: (position.y + GRID_SIZE) % GRID_SIZE
  };
}