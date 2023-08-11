import React, { useRef, useEffect, useState } from 'react';

const SkiingGame = () => {
  const canvasRef = useRef(null);
  const obstacles = useRef([]);
  const [score, setScore] = useState(0);

  const jadon = {
    x: 400,
    y: 500,
    width: 40,
    height: 80,
    speed: 15,
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' && jadon.x - jadon.speed > 40) {
      jadon.x -= jadon.speed;
    } else if (event.key === 'ArrowRight' && jadon.x + jadon.speed < canvasRef.current.width - 40 - jadon.width) {
      jadon.x += jadon.speed;
    }
  };

  const generateObstacle = () => {
    const type = Math.random() < 0.5 ? 'tree' : 'rock';
    const size = 20 + Math.random() * 40;

    const obstacle = {
      x: Math.random() * (canvasRef.current.width - 80) + 40, // Adjusted to keep obstacles within the trail
      y: 0,
      width: size,
      height: size,
      type: type,
    };
    obstacles.current.push(obstacle);
  };

  const updateObstacles = () => {
    obstacles.current.forEach((obstacle) => {
      obstacle.y += 20;
    });
  };

  const detectCollisions = () => {
    obstacles.current.forEach((obstacle) => {
      if (
        jadon.x < obstacle.x + obstacle.width &&
        jadon.x + jadon.width > obstacle.x &&
        jadon.y < obstacle.y + obstacle.height &&
        jadon.y + jadon.height > obstacle.y
      ) {
        alert('Game Over!');
        window.location.reload();
      }
    });
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
    context.fillStyle = '#8B4513';
    context.fillRect(x + width / 3, y + (3 * height) / 4, width / 3, height / 4);
    context.strokeStyle = '#5A2D0C';
    context.beginPath();
    context.moveTo(x + width / 3, y + (3 * height) / 4);
    context.lineTo(x + width / 3, y + height);
    context.moveTo(x + 2 * width / 3, y + (3 * height) / 4);
    context.lineTo(x + 2 * width / 3, y + height);
    context.stroke();
  };

  const drawRock = (context, x, y, width, height) => {
    context.fillStyle = '#A9A9A9';
    context.beginPath();
    context.moveTo(x, y + height / 2);
    context.lineTo(x + width / 4, y);
    context.lineTo(x + (3 * width) / 4, y);
    context.lineTo(x + width, y + height / 3);
    context.lineTo(x + (3 * width) / 4, y + height);
    context.lineTo(x + width / 4, y + height);
    context.closePath();
    context.fill();
    context.strokeStyle = '#696969';
    context.beginPath();
    context.moveTo(x + width / 4, y);
    context.lineTo(x + width / 4, y + height);
    context.moveTo(x + (3 * width) / 4, y);
    context.lineTo(x + (3 * width) / 4, y + height);
    context.stroke();
  };


  const drawSkier = (context, x, y, width, height) => {
    context.fillStyle = '#000'; // Black color for the skier
    context.fillRect(x, y, width, height);
  };

  const drawForest = (context) => {
    const treeWidth = 40;
    const treeHeight = 40;
    const numberOfTrees = canvasRef.current.height / treeHeight;

    for (let i = 0; i < numberOfTrees; i++) {
      drawTree(context, 0, i * treeHeight, treeWidth, treeHeight); // Left side
      drawTree(context, canvasRef.current.width - treeWidth, i * treeHeight, treeWidth, treeHeight); // Right side
    }
  };

  const draw = (context) => {
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawForest(context); // Draw the forest
    drawSkier(context, jadon.x, jadon.y, jadon.width, jadon.height);

    obstacles.current.forEach((obstacle) => {
      if (obstacle.type === 'tree') {
        drawTree(context, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      } else {
        drawRock(context, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      }
    });
  };

  const updateScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    const obstacleInterval = setInterval(generateObstacle, 2000);
    const scoreInterval = setInterval(updateScore, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(obstacleInterval);
      clearInterval(scoreInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const interval = setInterval(() => {
      draw(context);
      updateObstacles();
      detectCollisions();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Score: {score}</h2>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default SkiingGame;





