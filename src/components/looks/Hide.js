// components/Hide.js
import React, { useState } from 'react';

const Hide = () => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `Hide`);
  };

  return (
    <div
      style={{
        border: "solid black 1px",
        padding: "10px",
        backgroundColor: "#e7eb8a",
        cursor: 'pointer',
      }}
      className="draggable mb-3"
      draggable onDragStart={handleDragStart}
    >
      <span className="drag-label" >
      Hide
      </span>
    </div>
  );
};

export default Hide;