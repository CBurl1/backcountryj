import React, { useRef, useEffect, useState } from 'react';

const SkiingGame = () => {
  const canvasRef = useRef(null);
  const obstacles = useRef([]);
  const [score, setScore] = useState(0);

  const jadon = {
    x: 400,
    y: 550,
    width: 20,
    height: 40,
    speed: 5,
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      jadon.x -= jadon.speed;
    } else if (event.key === 'ArrowRight') {
      jadon.x += jadon.speed;
    }
  };

  const generateObstacle = () => {
    const type = Math.random() < 0.5 ? 'tree' : 'rock';
    const size = 20 + Math.random() * 40;

    const obstacle = {
      x: Math.random() * canvasRef.current.width,
      y: 0,
      width: size,
      height: size,
      type: type,
    };
    obstacles.current.push(obstacle);
  };

  const updateObstacles = () => {
    obstacles.current.forEach((obstacle) => {
      obstacle.y += 5;
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

  const drawSkier = (context, x, y, width, height) => {
    // Draw the head (circle)
    context.fillStyle = '#FFC1C1'; // Skin color for the head
    context.beginPath();
    context.arc(x + width / 2, y, width / 4, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  
    // Draw the body (rectangle)
    context.fillStyle = '#FF4500'; // Orange color for the body
    context.fillRect(x, y + width / 4, width, height - width / 4);
  
    // Draw the arms (lines)
    context.strokeStyle = '#FF4500';
    context.beginPath();
    context.moveTo(x, y + height / 2);
    context.lineTo(x - width / 2, y + height / 2);
    context.moveTo(x + width, y + height / 2);
    context.lineTo(x + 1.5 * width, y + height / 2);
    context.stroke();
  
    // Draw the skis (long rectangles)
    context.fillStyle = '#0000FF'; // Blue color for the skis
    context.fillRect(x - width / 2, y + height, width * 2, height / 4);
    context.fillRect(x - width / 2, y + height, width * 2, height / 4);
  
    // Draw the ski poles (lines with circles for handles)
    context.strokeStyle = '#8B4513'; // Brown color for the poles
    context.beginPath();
    context.moveTo(x, y + height / 2);
    context.lineTo(x - width, y + height * 1.5);
    context.moveTo(x + width, y + height / 2);
    context.lineTo(x + 2 * width, y + height * 1.5);
    context.stroke();
    context.fillStyle = '#8B4513';
    context.beginPath();
    context.arc(x - width, y + height / 2, width / 8, 0, Math.PI * 2);
    context.arc(x + 2 * width, y + height / 2, width / 8, 0, Math.PI * 2);
    context.fill();
    context.closePath();
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
  

  const draw = (context) => {
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
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




