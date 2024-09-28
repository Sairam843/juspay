// components/PreviewArea.js
import React from 'react';
import { useAppContext } from './AppContext';
import CatSprite from './CatSprite';

const PreviewArea = () => {
  const { cats, setCats } = useAppContext();

  const handleAddCat = () => {
    const newCatId = cats.length + 1;
    setCats((prevCats) => [...prevCats, { id: newCatId, instructions: [], position: { x: 0, y: 0 }, rotation: 0 }]);
  };

  const handlePlay = async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
    const checkCollisions = (cats) => {
      const collisions = [];
      for (let i = 0; i < cats.length; i++) {
        for (let j = i + 1; j < cats.length; j++) {
          if (
            Math.abs(cats[i].position.x - cats[j].position.x) < 5 &&
            Math.abs(cats[i].position.y - cats[j].position.y) < 5
          ) {
            collisions.push([cats[i], cats[j]]);
          }
        }
      }
      return collisions;
    };
  
    const exchangeInstructions = (cat1, cat2) => {
      const temp = cat1.instructions;
      cat1.instructions = cat2.instructions;
      cat2.instructions = temp;
    };
  
    const executeInstructions = async (cat, allCats) => {
      let newPosition = { ...cat.position };
      let newRotation = cat.rotation;
  
      for (const instr of cat.instructions) {
        if (instr.startsWith('Repeat')) {
          const repeatCount = parseInt(instr.match(/\d+/)[0], 10);
          const previousInstructions = cat.instructions.slice(0, cat.instructions.indexOf(instr));
          for (let i = 0; i < repeatCount; i++) {
            const result = await executeInstructions({ ...cat, instructions: previousInstructions }, allCats);
            newPosition = result.position;
            newRotation = result.rotation;
          }
        } else {
          const matches = instr.match(/(-?\d+)/g);
          const value = matches ? parseInt(matches[0], 10) : 0;
  
          if (instr.includes('Move Right')) {
            const radians = (newRotation * Math.PI) / 180;
            newPosition.x += Math.cos(radians) * value;
            newPosition.y += Math.sin(radians) * value;
          } else if (instr.includes('Move Left')) {
            const radians = (newRotation * Math.PI) / 180;
            newPosition.x -= Math.cos(radians) * value;
            newPosition.y -= Math.sin(radians) * value;
          } else if (instr.includes('Turn Right')) {
            newRotation += value;
          } else if (instr.includes('Turn Left')) {
            newRotation -= value;
          } else if (instr.includes('Go to')) {
            const [x, y] = matches ? matches.map(Number) : [0, 0];
            newPosition = { x, y };
          }
  
          // Normalize rotation to be between 0 and 359 degrees
          newRotation = ((newRotation % 360) + 360) % 360;
  
          // Round position to avoid floating point imprecision
          newPosition.x = Math.round(newPosition.x * 100) / 100;
          newPosition.y = Math.round(newPosition.y * 100) / 100;
  
          setCats((prevCats) => {
            const updatedCats = prevCats.map(c => 
              c.id === cat.id ? { ...c, position: newPosition, rotation: newRotation } : c
            );
            const collisions = checkCollisions(updatedCats);
            collisions.forEach(([cat1, cat2]) => {
              exchangeInstructions(cat1, cat2);
            });
            return updatedCats;
          });
  
          await delay(1000);
        }
      }
  
      return { position: newPosition, rotation: newRotation };
    };
  
    await Promise.all(cats.map(cat => executeInstructions(cat, cats)));
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between p-3">
        <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={handleAddCat}>Add Cat</button>
        <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={handlePlay}>Play</button>
      </div>
      <div className="border border-gray-300 h-full">
        {cats.map((cat) => (
          <div key={cat.id} style={{ transform: `translate(${cat.position.x}px, ${cat.position.y}px) rotate(${cat.rotation}deg)` }}>
            <CatSprite />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewArea;