import React, { useRef, useEffect } from 'react';
import Forest from './Forest.js';
import SnowBackground from './SnowBackground.js';

const GameView = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    SnowBackground({ width: 800, height: 600, context });

    Forest({ context });
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default GameView;






