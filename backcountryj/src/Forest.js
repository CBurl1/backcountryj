import { useRef, useEffect, useState } from 'react';

const Forest = ({ width = 800, height = 600 }) => {
  const canvasRef = useRef(null);
  const [forestPattern, setForestPattern] = useState([]);

  const drawTree = (context, x, y, treeWidth, treeHeight) => {
    const levels = 3;
    for (let i = 0; i < levels; i++) {
      context.fillStyle = '#228B22'; // Green color for the leaves
      context.beginPath();
      context.moveTo(x + treeWidth / 2, y + (i * treeHeight) / (levels + 1));
      context.lineTo(x, y + ((i + 1) * treeHeight) / (levels + 1));
      context.lineTo(x + treeWidth, y + ((i + 1) * treeHeight) / (levels + 1));
      context.closePath();
      context.fill();
    }
    context.fillStyle = '#8B4513'; // Brown color for the trunk
    context.fillRect(x + treeWidth / 3, y + (3 * treeHeight) / 4, treeWidth / 3, treeHeight / 4);
  };

  const drawForest = (context) => {
    const treeWidth = 40;
    const treeHeight = 40;

    forestPattern.forEach((variation, index) => {
      const y = index * treeHeight;
      for (let x = 0; x < variation; x += treeWidth) {
        drawTree(context, x, y, treeWidth, treeHeight);
      }
      for (let x = width - variation; x < width; x += treeWidth) {
        drawTree(context, x, y, treeWidth, treeHeight);
      }
    });
  };

  const generateForestPattern = () => {
    const pattern = [];
    for (let i = 0; i < 30; i++) {
      pattern.push(Math.random() * 80 + 40); // Increased width variation
    }
    setForestPattern(pattern);
  };

  useEffect(() => {
    generateForestPattern();
    const forestInterval = setInterval(() => {
      setForestPattern((prevPattern) => {
        const newPattern = [...prevPattern.slice(1), Math.random() * 80 + 40];
        return newPattern;
      });
    }, 2000);

    return () => clearInterval(forestInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const draw = () => {
      drawForest(context);
    };

    const interval = setInterval(() => {
      draw();
    }, 100);

    return () => clearInterval(interval);
  }, [forestPattern]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Forest;
