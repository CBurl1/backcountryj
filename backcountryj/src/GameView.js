import React, { useState, useEffect } from 'react';
import SnowForestBackground from './Background.js';
import Skier from './Skier';
import CharacterSelection from './CharacterSelection';

const GameView = () => {
  const [skierPosition, setSkierPosition] = useState({ x: 400, y: 300 });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const characters = [
    { name: 'Jadon', image: 'character1.png' },
    { name: 'Christian', image: 'character2.png' },
    { name: 'Ian', image: 'character2.png' },
    { name: 'The Croc', image: 'character2.png' },
  ];

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleKeyPress = (e) => {
    const { x, y } = skierPosition;
    switch (e.key) {
      case 'ArrowUp':
        setSkierPosition({ x, y: y - 10 });
        break;
      case 'ArrowDown':
        setSkierPosition({ x, y: y + 10 });
        break;
      case 'ArrowLeft':
        setSkierPosition({ x: x - 10, y });
        break;
      case 'ArrowRight':
        setSkierPosition({ x: x + 10, y });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [skierPosition]);

  return (
    <div>
      <h1>Welcome to Ski Adventure</h1>
      {selectedCharacter ? (
        <>
          <SnowForestBackground width={800} height={600} />
          <Skier character={selectedCharacter} x={skierPosition.x} y={skierPosition.y} />
        </>
      ) : (
        <CharacterSelection characters={characters} onSelect={handleCharacterSelect} />
      )}
    </div>
  );
};

export default GameView;







