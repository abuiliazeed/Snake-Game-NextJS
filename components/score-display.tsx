"use client";

import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

export function ScoreDisplay({ score, highScore }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="text-lg font-semibold text-yellow-500">{highScore}</span>
      </div>
      <div className="text-lg font-semibold text-white">Score: {score}</div>
    </div>
  );
}