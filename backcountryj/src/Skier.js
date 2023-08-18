const Skier = ({ character, x, y }) => {
  const skierStyle = {
    position: 'absolute',
    left: x + 'px',
    top: y + 'px',
    backgroundImage: `url(${character.image})`,
    backgroundSize: 'contain',
    width: '40px',
    height: '40px',
  };

  return <div style={skierStyle}></div>;
};

export default Skier;


