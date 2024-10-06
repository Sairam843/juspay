// components/SayHello.js
import React, { useState } from 'react';

const SayHello = () => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `Say Hello`);
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
        Say Hello
      </span>
    </div>
  );
};

export default SayHello;