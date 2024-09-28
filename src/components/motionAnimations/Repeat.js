// components/Repeat.js
import React, { useState } from "react";
import { useAppContext } from "../AppContext";
const Repeat = () => {
  const [repeatValue, setRepeatValue] = useState(1);
  const { setCats, activeCat } = useAppContext();

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", `Repeat ${repeatValue}`);
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
      Repeat
      </span>
      <input
        type="number"
        value={repeatValue}
        onChange={(e) => setRepeatValue(e.target.value)}
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

export default Repeat;
