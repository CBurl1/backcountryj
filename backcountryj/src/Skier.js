import React from 'react';

const Skier = ({ x, y }) => {
  const skierStyle = {
    position: 'absolute',
    left: x + 'px',
    top: y + 'px',
    width: '0',
    height: '0',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '20px solid #000',
  };

  return <div style={skierStyle}></div>;
};

export default Skier;
