// components/Show.js
import React, { useState } from "react";

const Show = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", `Show`);
  };

  return (
    <div
      style={{
        border: "solid black 1px",
        padding: "10px",
        backgroundColor: "#e7eb8a",
        cursor: "pointer",
      }}
      className="draggable mb-3"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="drag-label">Show</span>
    </div>
  );
};

export default Show;
