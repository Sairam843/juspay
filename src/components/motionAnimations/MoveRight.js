// components/MoveRight.js
import React, { useState } from 'react';
import { cardStyles } from './MoveLeft';

const MoveRight = () => {
  const [rightValue, setRightValue] = useState(10);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `Move Right ${rightValue}`);
  };

  return (
    <div
    style={cardStyles}
      className="draggable mb-3"
      draggable onDragStart={handleDragStart}
    >
      <span className="drag-label" >
        Move Right
      </span>
      <input
        type="number"
        value={rightValue}
        onChange={(e) => setRightValue(e.target.value)}
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

export default MoveRight;