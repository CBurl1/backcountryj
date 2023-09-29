import React, { useState, useEffect } from 'react';
import SnowForestBackground from './Background.js';
import Skier from './Skier';
import CharacterSelection from './CharacterSelection';
import Obstacles from './Obstacles';
// import croc from './bj-croc.png';
// import ian from './bj-ian.png'
import jadon from './bj-jadon.png'
// import jake from './bj-jake.png'
import christian from './bj-christian.png'
// import greg from './bj-greg.png'
// import grizz from './bj-grizz.png'
// import mac from './bj-mac.png'
// import nate from './bj-nate.png'
// import ben from './bj-ben.png'

const GameView = () => {
  const [skierPosition, setSkierPosition] = useState({ x: 400, y: 300 });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [type, setType] = useState(null);
  const [obstacles, setObstacles] = useState([]);

  const characters = [
    { name: 'Jadon', image: jadon, type: 'snowboard' },
    { name: 'Christian', image: christian, type: 'ski' },
    // { name: 'Greg', image: greg, type: 'ski' },
    // { name: 'Grizz', image: grizz, type: 'snowboard' },
    // { name: 'Mac', image: mac, type: 'ski' },
    // { name: 'Nate', image: nate, type: 'ski' },
    // { name: 'Ben', image: ben, type: 'ski' },
    // { name: 'Ian', image: ian, type: 'snowboard' },
    // { name: 'Croc', image: croc, type: 'ski' },
    // { name: 'Jake', image: jake, type: 'ski'},
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
          <Obstacles obstacles={obstacles} />
        </>
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Let's Go Skiing!</h1>
          <CharacterSelection characters={characters} onSelect={handleCharacterSelect} />
        </>
      )}
    </div>
  );
};

export default GameView;






  








// commit 8