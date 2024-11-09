"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Direction } from '@/lib/game-types';

interface GameControlsProps {
  isPlaying: boolean;
  direction: Direction;
  onDirectionChange: (newDirection: Direction) => void;
  onPlayPause: () => void;
  onReset: () => void;
}

export function GameControls({ 
  isPlaying, 
  direction, 
  onDirectionChange, 
  onPlayPause, 
  onReset 
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          className="text-white"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="text-white"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div />
        <Button
          variant="outline"
          size="icon"
          onClick={() => direction !== 'DOWN' && onDirectionChange('UP')}
          className="text-white"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <div />
        <Button
          variant="outline"
          size="icon"
          onClick={() => direction !== 'RIGHT' && onDirectionChange('LEFT')}
          className="text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div />
        <Button
          variant="outline"
          size="icon"
          onClick={() => direction !== 'LEFT' && onDirectionChange('RIGHT')}
          className="text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div />
        <Button
          variant="outline"
          size="icon"
          onClick={() => direction !== 'UP' && onDirectionChange('DOWN')}
          className="text-white"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
        <div />
      </div>
    </div>
  );
}