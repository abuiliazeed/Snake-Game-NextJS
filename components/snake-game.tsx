"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { GameBoard } from './game-board';
import { GameControls } from './game-controls';
import { ScoreDisplay } from './score-display';
import { wrapPosition } from '@/lib/game-utils';
import { GRID_SIZE, INITIAL_SPEED } from '@/lib/game-constants';
import type { Position, Direction } from '@/lib/game-types';

const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = 'RIGHT';

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // Ensure food doesn't spawn on snake
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }
    return newFood;
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setIsPlaying(false);
    setScore(0);
  }, []);

  const checkCollision = useCallback((head: Position) => {
    // Only check for self-collision, edges wrap around
    return snake.some((segment) => segment.x === head.x && segment.y === head.y);
  }, [snake]);

  const moveSnake = useCallback(() => {
    const head = { ...snake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Wrap around edges
    const wrappedHead = wrapPosition(head);

    if (checkCollision(wrappedHead)) {
      if (score > highScore) {
        setHighScore(score);
        toast({
          title: "New High Score!",
          description: `You achieved a new high score of ${score}!`,
        });
      }
      resetGame();
      return;
    }

    const newSnake = [wrappedHead];
    const ateFood = wrappedHead.x === food.x && wrappedHead.y === food.y;

    if (ateFood) {
      setScore((prev) => prev + 1);
      setFood(generateFood());
      newSnake.push(...snake);
    } else {
      newSnake.push(...snake.slice(0, -1));
    }

    setSnake(newSnake);
  }, [snake, direction, food, score, highScore, checkCollision, generateFood, resetGame, toast]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPlaying((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, moveSnake]);

  return (
    <Card className="p-6 w-[90vw] max-w-[500px] bg-black/90 border-gray-800">
      <div className="flex flex-col items-center gap-4">
        <ScoreDisplay score={score} highScore={highScore} />
        <GameBoard food={food} snake={snake} />
        <GameControls
          isPlaying={isPlaying}
          direction={direction}
          onDirectionChange={setDirection}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onReset={resetGame}
        />
      </div>
    </Card>
  );
}