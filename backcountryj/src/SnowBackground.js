import React, { useRef, useEffect } from 'react';

const SnowBackground = ({ width, height }) => {
  const canvasRef = useRef(null);

  const drawSnowBackground = (context) => {
    if (!context) return;

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(0.5, '#e6e6e6');
    gradient.addColorStop(1, '#f0f0f0');

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawSnowBackground(context);
  }, [canvasRef]); // Re-run effect if canvasRef changes

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default SnowBackground;



