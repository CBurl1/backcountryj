import React, { useRef, useEffect, useState } from 'react';
import backgroundImageSrc from './crestedbutteambopost.jpg';


const SkiingGame = () => {
  const canvasRef = useRef(null);
  const obstacles = useRef([]);
  const [score, setScore] = useState(0);

  const jadon = {
    x: 400,
    y: canvasRef.current ? canvasRef.current.height - 50 : 400, // Position him at the bottom
    width: 200, // Increase width
    height: 200, // Increase height
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
    const obstacle = {
      x: Math.random() * canvasRef.current.width,
      y: 0,
      width: 40, // Increase width
      height: 40, // Increase height
    };
    obstacles.current.push(obstacle);
  };
  

  const updateObstacles = () => {
    obstacles.current.forEach((obstacle) => {
      obstacle.y += 5; // Move obstacle down
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
        // Collision detected
        alert('Game Over!');
        window.location.reload(); // Reload the game
      }
    });
  };
  

  const draw = (context) => {
    // Create a new Image object
    const backgroundImage = new Image();
  
    // Set the source of the image
    backgroundImage.src = backgroundImageSrc;
  
    // Draw the image once it's loaded
    backgroundImage.onload = () => {
      context.drawImage(backgroundImage, 0, 0, context.canvas.width, context.canvas.height);
    };
  
    // Draw Jadon (the skier)
    context.fillStyle = 'red';
    context.fillRect(jadon.x, jadon.y, jadon.width, jadon.height);
  
    // Draw obstacles (rocks)
    obstacles.current.forEach((obstacle) => {
      context.fillStyle = '#8B4513'; // Brown color for rocks
      context.beginPath();
      context.arc(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, obstacle.width / 2, 0, Math.PI * 2);
      context.fill();
      context.closePath();
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

    // Game loop
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

