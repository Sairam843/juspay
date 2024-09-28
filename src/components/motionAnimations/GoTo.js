import React, { useState } from "react";

const GoTo = () => {
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", `Go to X - ${xValue}  Y - ${yValue}`);
  };

  return (
    <div
      style={{
        border: "solid black 1px",
        padding: "10px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
      }}
      className="draggable mb-3"
      draggable 
      onDragStart={handleDragStart}
    >
      <span className="drag-label">Go to</span>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <span style={{ marginRight: "1px" }}>X:</span>
          <input
            type="number"
            value={xValue}
            onChange={(e) => setXValue(parseInt(e.target.value))}
            className="input-field"
            style={{
              border: "solid Aqua 2px",
              borderRadius: "10px",
              width: "60px",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "5px" }}>Y:</span>
          <input
            type="number"
            value={yValue}
            onChange={(e) => setYValue(parseInt(e.target.value))}
            className="input-field"
            style={{
              border: "solid Aqua 2px",
              borderRadius: "10px",
              width: "60px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GoTo;