import React, { useRef, useEffect, useState } from 'react';

const SnowForestBackground = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [forestPattern, setForestPattern] = useState([]);

  const drawSnowBackground = (context) => {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(0.5, '#e6e6e6');
    gradient.addColorStop(1, '#f0f0f0');

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  };

  const drawTree = (context, x, y, width, height) => {
    const levels = 3;
    for (let i = 0; i < levels; i++) {
      context.fillStyle = '#228B22';
      context.beginPath();
      context.moveTo(x + width / 2, y + (i * height) / (levels + 1));
      context.lineTo(x, y + ((i + 1) * height) / (levels + 1));
      context.lineTo(x + width, y + ((i + 1) * height) / (levels + 1));
      context.closePath();
      context.fill();
    }
    context.fillStyle = '#8B4513'; // Brown color for the trunk
    context.fillRect(x + width / 3, y + (3 * height) / 4, width / 3, height / 4);
    context.strokeStyle = '#5A2D0C'; // Darker brown for the trunk lines
    context.beginPath();
    context.moveTo(x + width / 3, y + (3 * height) / 4);
    context.lineTo(x + width / 3, y + height);
    context.moveTo(x + 2 * width / 3, y + (3 * height) / 4);
    context.lineTo(x + 2 * width / 3, y + height);
    context.stroke();
  };

  const drawForest = (context) => {
    const treeWidth = 40;
    const treeHeight = 40;


  const draw = (context) => {
    drawSnowBackground(context);
    drawForest(context);
  };

  const generateForestPattern = () => {
    const pattern = [];
    for (let i = 0; i < 30; i++) {
      pattern.push(Math.random() * 200 + 40);
    }
    setForestPattern(pattern);
  };

  useEffect(() => {
    generateForestPattern();
    const forestInterval = setInterval(() => {
      setForestPattern((prevPattern) => {
        const newPattern = [...prevPattern.slice(1), Math.random() * 200 + 40];
        return newPattern;
      });
    }, 300);

    return () => clearInterval(forestInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const interval = setInterval(() => {
      draw(context);
    }, 100);

    return () => clearInterval(interval);
  }, [forestPattern]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default SnowForestBackground;
