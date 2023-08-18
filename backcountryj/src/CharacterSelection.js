import React from 'react';

const CharacterSelection = ({ characters, onSelect }) => {
  return (
    <div>
      <h2>Select Your Character</h2>
      <div>
        {characters.map((character, index) => (
          <button key={index} onClick={() => onSelect(character)}>
            <img src={character.image} alt={character.name} />
            <span>{character.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
