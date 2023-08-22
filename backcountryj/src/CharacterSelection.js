import React, { useState } from 'react';
import './CharacterSelection.css';

const CharacterSelection = ({ characters, onSelect }) => {
  const [selectedType, setSelectedType] = useState('all');

  const sortCharacters = () => {
    return characters.sort((a, b) => {
      if (selectedType === 'all' || a.type === b.type) {
        return a.name.localeCompare(b.name); // Sort alphabetically by name if types are the same
      }
      if (a.type === selectedType) return -1;
      if (b.type === selectedType) return 1;
      return 0;
    });
  };

  const renderCharacters = () => {
    if (selectedType === 'all') {
      return sortCharacters().map((character, index) => (
        <div key={index} className="character-box">
          <button onClick={() => onSelect(character)} className="character-button">
            <img src={character.image} alt={character.name} className="character-image" />
          </button>
          <span className="character-name">{character.name}</span>
        </div>
      ));
    }
  
    const sortedCharacters = sortCharacters();
    let lastType = null;
    const elements = [];
  
    sortedCharacters.forEach((character, index) => {
      if (character.type !== lastType) {
        elements.push(<h3 className="character-header" key={`header-${character.type}`}>{character.type === 'ski' ? 'Skiers 🎿' : 'Boarders 🏂'}</h3>);
        lastType = character.type;
      }
      elements.push(
        <div key={index} className="character-box">
          <button onClick={() => onSelect(character)} className="character-button">
            <img src={character.image} alt={character.name} className="character-image" />
          </button>
          <span className="character-name">{character.name}</span>
        </div>
      );
    });
  
    return elements;
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
        {renderCharacters()}
      </div>
    </div>
  );
};

export default CharacterSelection;







