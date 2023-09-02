const Obstacle = ({ x, y, type }) => {
    const baseStyle = {
      position: 'absolute',
      left: x,
      top: y,
    };
  
    let obstacleElement;
  
    if (type === 'rock') {
      const rockStyle = {
        ...baseStyle,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'grey',
      };
      obstacleElement = <div style={rockStyle}></div>;
    } else if (type === 'tree') {
      const treeTrunkStyle = {
        ...baseStyle,
        width: '10px',
        height: '30px',
        backgroundColor: 'brown',
      };
      const treeLeavesStyle = {
        ...baseStyle,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'green',
        left: x - 15,
        top: y - 20,
      };
      obstacleElement = (
        <>
          <div style={treeTrunkStyle}></div>
          <div style={treeLeavesStyle}></div>
        </>
      );
    }
  
    return obstacleElement;
  };
  