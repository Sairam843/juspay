// components/TurnLeft.js
import React, { useState } from 'react';
import { cardStyles } from './MoveLeft';

const TurnLeft = () => {
  const [turnValue, setTurnValue] = useState(15);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `Turn Left ${turnValue}`);
  };

  return (
    <div
    style={cardStyles}
    className="draggable mb-3"
    draggable onDragStart={handleDragStart}
  >
    <span className="drag-label" >
    Turn Left
    </span>
    <input
      type="number"
      value={turnValue}
      onChange={(e) => setTurnValue(e.target.value)}
      className="input-field"
      style={{
        border: "solid Aqua 2px",
        borderRadius: "10px",
        width: "70px",
        marginLeft: "5px",
      }}
    />
  </div>
  );
};

export default TurnLeft;