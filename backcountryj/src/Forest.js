import React, { useRef, useEffect, useState } from 'react';

const Forest = () => {
  const canvasRef = useRef(null);
  const [forestPattern, setForestPattern] = useState([]);

  const drawTree = (context, x, y, width, height) => {
    const levels = 3;
    for (let i = 0; i < levels; i++) {
      context.fillStyle = '#228B22'; // Green color for the leaves
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

    forestPattern.forEach((variation, index) => {
      const y = index * treeHeight;
      for (let x = 0; x < variation; x += treeWidth) {
        drawTree(context, x, y, treeWidth, treeHeight);
      }
      for (let x = canvasRef.current.width - variation; x < canvasRef.current.width; x += treeWidth) {
        drawTree(context, x, y, treeWidth, treeHeight);
      }
    });
  };

  const draw = (context) => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawForest(context);
  };

  const generateForestPattern = () => {
    const pattern = [];
    for (let i = 0; i < 30; i++) {
      pattern.push(Math.random() * 200 + 40); // Increased range for wider variation
    }
    setForestPattern(pattern);
  };

  useEffect(() => {
    generateForestPattern();
    const forestInterval = setInterval(() => {
      setForestPattern((prevPattern) => {
        const newPattern = [...prevPattern.slice(1), Math.random() * 200 + 40]; // Increased range for wider variation
        return newPattern;
      });
    }, 300); // Change rate as needed

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

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default Forest;