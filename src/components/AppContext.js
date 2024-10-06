// src/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeCat, setActiveCat] = useState(1);
  const [cats, setCats] = useState([
    {
      id: 1,
      instructions: [],
      position: { x: 0, y: 0 },
      rotation: 0,
      visibility: true,
      message: null
    }
  ]);  
  const handleAddCat = () => {
    const newCatId = cats.length + 1;
    const catSize = 50; // Adjust based on your cat size
    const spacing = 120; // Space between cats
    const catsPerRow = 3; // Number of cats per row
  
    // Calculate the new cat's position
    const row = Math.floor((newCatId - 1) / catsPerRow);
    const col = (newCatId - 1) % catsPerRow;
  
    const newPosition = {
      x: col * (catSize + spacing),
      y: row * (catSize + spacing)
    };
  
    setCats((prevCats) => [
      ...prevCats, 
      { 
        id: newCatId, 
        instructions: [], 
        position: newPosition, 
        rotation: 0 
      }
    ]);
  };

  const handlePlay = async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
    const checkCollisions = (cats) => {
      const collisions = [];
      for (let i = 0; i < cats.length; i++) {
        for (let j = i + 1; j < cats.length; j++) {
          const distance = Math.sqrt(
            Math.pow(cats[i].position.x - cats[j].position.x, 2) +
            Math.pow(cats[i].position.y - cats[j].position.y, 2)
          );
          // console.log(distance,"distance")
          if (distance < 60) { // Collision threshold
            collisions.push([cats[i].id, cats[j].id]);
          }
        }
      }
      return collisions;
    };
  
    const executeInstruction = (cat, instr) => {
      let newPosition = { ...cat.position };
      let newRotation = cat.rotation;
      let newMessage = null;
      let newVisibility = cat.visibility;
    
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
      } else if (instr.includes('Say Hello')) {
        newMessage = 'Hello';
      } else if (instr === 'Show') {
        newVisibility = true;
      } else if (instr === 'Hide') {
        newVisibility = false;
      }
    
      newRotation = ((newRotation % 360) + 360) % 360;
      newPosition.x = Math.round(newPosition.x * 100) / 100;
      newPosition.y = Math.round(newPosition.y * 100) / 100;
    
      return { 
        ...cat, 
        position: newPosition, 
        rotation: newRotation,
        message: newMessage,
        visibility: newVisibility
      };
    };
  
    const executeInstructions = async (cats) => {
      let updatedCats = [...cats];
      let collisionOccurred = false;
      let collisionPair = null;

      const maxInstructions = Math.max(...cats.map(cat => cat.instructions.length));

      for (let i = 0; i < maxInstructions; i++) {
        const catUpdates = updatedCats.map(async (cat) => {
          if (i < cat.instructions.length) {
            const instr = cat.instructions[i];
            
            if (instr.startsWith('Repeat')) {
              const repeatCount = parseInt(instr.match(/\d+/)[0], 10);
              const previousInstructions = cat.instructions.slice(0, i);
              for (let j = 0; j < repeatCount; j++) {
                for (const prevInstr of previousInstructions) {
                  cat = executeInstruction(cat, prevInstr);
                }
              }
            } else {
              cat = executeInstruction(cat, instr);
            }
          }
          return cat;
        });

        updatedCats = await Promise.all(catUpdates);

        const collisions = checkCollisions(updatedCats);
        if (collisions.length > 0) {
          collisionOccurred = true;
          collisionPair = collisions[0];
          break;
        }

        setCats(updatedCats);
        await delay(1000);

        if (collisionOccurred) break;
      }

      if (collisionOccurred) {
        alert(`Collision occurred! Cat ${collisionPair[0]} collided with Cat ${collisionPair[1]}. Instructions will be exchanged.`);
        
        const cat1Index = updatedCats.findIndex(cat => cat.id === collisionPair[0]);
        const cat2Index = updatedCats.findIndex(cat => cat.id === collisionPair[1]);
        const tempInstructions = updatedCats[cat1Index].instructions;
        updatedCats[cat1Index].instructions = updatedCats[cat2Index].instructions;
        updatedCats[cat2Index].instructions = tempInstructions;

        setCats(updatedCats);
      }
    };
  
    await executeInstructions(cats);
  };

  return (
    <AppContext.Provider value={{ cats, setCats, activeCat, setActiveCat,handleAddCat,handlePlay }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};