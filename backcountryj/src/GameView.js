import React, { useState, useEffect } from 'react';
import SnowForestBackground from './Background.js';
import Skier from './Skier';
import CharacterSelection from './CharacterSelection';
import croc from './bj-croc.png';
import ian from './bj-ian.jpg'
import jadon from './bj-jadon.png'
import christian from './bj-christian.jpg'

const GameView = () => {
  const [skierPosition, setSkierPosition] = useState({ x: 400, y: 300 });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const characters = [
    { name: 'Jadon', image: jadon },
    { name: 'Christian', image: christian },
    { name: 'Ian', image: ian },
    { name: 'Croc', image: croc },
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
      {selectedCharacter ? (
        <>
          <SnowForestBackground width={800} height={600} />
          <Skier character={selectedCharacter} x={skierPosition.x} y={skierPosition.y} />
        </>
      ) : (
        <>
          <h1>Welcome to Ski Adventure</h1>
          <CharacterSelection characters={characters} onSelect={handleCharacterSelect} />
        </>
      )}
    </div>
  );
};

export default GameView;






  







