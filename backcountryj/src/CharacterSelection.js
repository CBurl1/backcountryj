import React from 'react';
import './CharacterSelection.css';

const CharacterSelection = ({ characters, onSelect }) => {
  return (
    <div className="character-selection">
      <h2>Select Your Character</h2>
      <div className="character-grid">
        {characters.map((character, index) => (
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


