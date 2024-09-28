// components/TurnRight.js
import React, { useState } from 'react';

const TurnRight = () => {
  const [turnValue, setTurnValue] = useState(15);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `Turn Right ${turnValue}`);
  };

  return (
    <div
    style={{
      border: "solid black 1px",
      padding: "10px",
      backgroundColor: "white",
    }}
    className="draggable mb-3"
    draggable onDragStart={handleDragStart}
  >
    <span className="drag-label" >
    Turn Right
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

export default TurnRight;