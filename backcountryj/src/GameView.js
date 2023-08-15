import React from 'react';
import Forest from './Forest.js';
import SnowBackground from './SnowBackground.js';

const MainGame = () => {
  const width = 800;
  const height = 600;

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
      <h1>Welcome to Ski Adventure</h1>
      <SnowBackground width={width} height={height} />
      <Forest width={width} height={height} />
    </div>
  );
};

export default MainGame;







