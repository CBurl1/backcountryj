const SnowBackground = ({ width, height, context }) => {
  const drawSnowBackground = () => {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(0.5, '#e6e6e6');
    gradient.addColorStop(1, '#f0f0f0');

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  };

  drawSnowBackground();

  return null;
};

export default SnowBackground;


