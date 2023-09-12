import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterSelection from './CharacterSelection';


describe('<CharacterSelection />', () => {
  const mockOnSelect = jest.fn();
  const characters = [
    { name: 'Alice', type: 'ski', image: 'alice.jpg' },
    { name: 'Bob', type: 'snowboard', image: 'bob.jpg' },
    { name: 'Charlie', type: 'ski', image: 'charlie.jpg' },
    { name: 'Diana', type: 'snowboard', image: 'diana.jpg' }
  ];

  beforeEach(() => {
    render(<CharacterSelection characters={characters} onSelect={mockOnSelect} />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Select Your Shredder')).toBeInTheDocument();
  });

  it('renders all characters by default', () => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();

  });

  it('filters characters by type when buttons are clicked', () => {
    fireEvent.click(screen.getByText('Skier 🎿'));
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    expect(screen.queryByText('Diana')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Boarder 🏂'));
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Diana')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
  });

  it('sorts characters alphabetically', () => {
    const renderedNames = screen.getAllByClassName('character-name').map(e => e.textContent);
    expect(renderedNames).toEqual(['Alice', 'Bob', 'Charlie', 'Diana']);
  });

  it('invokes onSelect when character is clicked', () => {
    fireEvent.click(screen.getByText('Alice').closest('button'));
    expect(mockOnSelect).toHaveBeenCalledWith(characters[0]);
  });
});

// work on test
