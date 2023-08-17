import React, { useState, useEffect } from 'react';
import SnowForestBackground from './Background.js';
import Skier from './Skier';

const GameView = () => {
  const [skierPosition, setSkierPosition] = useState({ x: 400, y: 300 });

  const handleKeyPress = (e) => {
    const { x, y } = skierPosition;
    switch (e.key) {
      case 'ArrowUp':
        setSkierPosition({ x, y: y - 10 });
        break;
      case 'ArrowDown':
        setSkierPosition({ x, y: y + 10 });
        break;
      case 'ArrowLeft':
        setSkierPosition({ x: x - 10, y });
        break;
      case 'ArrowRight':
        setSkierPosition({ x: x + 10, y });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [skierPosition]);

  return (
    <div>
      <h1>Welcome to Ski Adventure</h1>
      <SnowForestBackground width={800} height={600} />
      <Skier x={skierPosition.x} y={skierPosition.y} />
    </div>
  );
};

export default GameView;






