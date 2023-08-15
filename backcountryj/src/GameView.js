import React from 'react';
import Forest from './Forest.js';
import SnowBackground from './SnowBackground.js';

const GameView = () => {
  return (
    <div>
      <h1>Welcome to Ski Adventure</h1>
      <SnowBackground width={800} height={600} />
      <Forest />
    </div>
  );
};

export default GameView;





