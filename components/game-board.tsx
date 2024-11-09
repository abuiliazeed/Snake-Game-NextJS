"use client";

import React from 'react';
import { CELL_SIZE, GRID_SIZE } from '@/lib/game-constants';

interface GameBoardProps {
  food: { x: number; y: number };
  snake: { x: number; y: number }[];
}

export function GameBoard({ food, snake }: GameBoardProps) {
  return (
    <div 
      className="relative border-2 border-gray-700 rounded-lg overflow-hidden"
      style={{ 
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
        backgroundColor: '#1a1a1a'
      }}
    >
      {/* Food */}
      <div
        className="absolute w-[18px] h-[18px] bg-red-500 rounded-full transition-all duration-100 ease-in-out"
        style={{
          left: food.x * CELL_SIZE + 1,
          top: food.y * CELL_SIZE + 1,
        }}
      />

      {/* Snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`absolute w-[20px] h-[20px] transition-all duration-100 ease-in-out ${
            index === 0 ? 'bg-green-400' : 'bg-green-600'
          } ${index === 0 ? 'rounded-full' : 'rounded-sm'}`}
          style={{
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
          }}
        />
      ))}
    </div>
  );
}