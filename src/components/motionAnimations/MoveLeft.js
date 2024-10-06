// components/MoveLeft.js
import React, { useState } from "react";
export const cardStyles = {
  border: "solid black 1px",
  padding: "10px",
  backgroundColor: "#34d2eb",
  cursor: 'pointer',
};
const MoveLeft = () => {
  const [leftValue, setLeftValue] = useState(10);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", `Move Left ${leftValue}`);
  };
  return (
    <div
      style={cardStyles}
      className="draggable mb-3"
      draggable onDragStart={handleDragStart}
    >
      <span className="drag-label" >
        Move Left
      </span>
      <input
        type="number"
        value={leftValue}
        onChange={(e) => setLeftValue(e.target.value)}
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

export default MoveLeft;
