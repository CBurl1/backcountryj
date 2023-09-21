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

  const drawRock = (context, x, y, width, height) => {
    context.fillStyle = '#808080';  // Gray color for rock
    context.beginPath();
    context.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
    context.fill();
  };

  const drawForest = (context) => {
    const treeWidth = 40;
    const treeHeight = 40;
    const rockWidth = 30;
    const rockHeight = 20;

    forestPattern.forEach((variation, index) => {
      const y = index * treeHeight;
      for (let x = 0; x < variation; x += treeWidth) {
        drawTree(context, x, y, treeWidth, treeHeight);
      }
      for (let x = canvasRef.current.width - variation; x < canvasRef.current.width; x += treeWidth) {
        drawTree(context, x, y, treeWidth, treeHeight);
      }

      // Draw rocks and trees randomly in the middle of the trail
      const numberOfRocksAndTrees = Math.floor(Math.random() * 3);  // 0 to 2 rocks or trees
      for (let i = 0; i < numberOfRocksAndTrees; i++) {
        const minX = variation + treeWidth;  // Just after the forest on the left
        const maxX = canvasRef.current.width - variation - treeWidth - rockWidth;  // Just before the forest on the right
        const x = Math.random() * (maxX - minX) + minX;

        if (Math.random() > 0.5) {
          drawTree(context, x, y, treeWidth, treeHeight);
        } else {
          drawRock(context, x, y, rockWidth, rockHeight);
        }
      }
    });
  };

  const draw = (context) => {
    drawSnowBackground(context);
    drawForest(context);
  };

  const generateForestPattern = () => {
    const pattern = [];
    const amplitude = 50;
    const frequency = 1;
    for (let i = 0; i < 1000; i++) {
      const sineValue = Math.sin(i * frequency) * amplitude;
      pattern.push(200 + sineValue);
    }
    setForestPattern(pattern);
  };

  useEffect(() => {
    generateForestPattern();
    const forestInterval = setInterval(() => {
      setForestPattern((prevPattern) => {
        const newPattern = [Math.random() * 200 + 40, ...prevPattern.slice(0, -1)];
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



