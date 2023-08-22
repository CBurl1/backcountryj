import React, { useState } from 'react';
import './CharacterSelection.css';

const CharacterSelection = ({ characters, onSelect }) => {
  const [selectedType, setSelectedType] = useState('all');

  const sortCharacters = () => {
    return characters.sort((a, b) => {
      if (selectedType === 'all') return 0;
      if (a.type === selectedType && b.type !== selectedType) return -1;
      if (b.type === selectedType && a.type !== selectedType) return 1;
      return 0;
    });
  };

  return (
    <div className="character-selection">
      <h2>Select Your Shredder</h2>
      <div className="character-type-toggle">
        <button onClick={() => setSelectedType('ski')}>Skier 🎿</button>
        <button onClick={() => setSelectedType('snowboard')}>Boarder 🏂</button>
        <button onClick={() => setSelectedType('all')}>All</button>
      </div>
      <div className="character-grid">
        {sortCharacters().map((character, index) => (
          <div key={index} className="character-box">
            <button onClick={() => onSelect(character)} className="character-button">
              <img src={character.image} alt={character.name} className="character-image" />
            </button>
            <span className="character-name">{character.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;





