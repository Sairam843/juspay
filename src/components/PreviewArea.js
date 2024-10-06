// components/PreviewArea.js
import React from 'react';
import { useAppContext } from './AppContext';
import CatSprite from './CatSprite';

const PreviewArea = () => {
  const { cats } = useAppContext();

  return (
    <div className="w-full h-full">
  <div className="border border-gray-300 h-full relative"> {/* Use relative positioning here */}
    {cats.map((cat) => (
      cat.visibility !== false && (
        <div 
          key={cat.id} 
          style={{ 
            position: 'absolute', // Use absolute positioning
            transform: `translate(${cat.position.x}px, ${cat.position.y}px) rotate(${cat.rotation}deg)` 
          }}
        >
          <CatSprite />
          {cat.message && (
            <div 
            style={{
              position: 'absolute',
              left: '100%', // Position it directly to the right of the cat
              top: '50%', // Center vertically relative to the cat
              transform: 'translateY(-50%)', // Adjust for centering
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid black',
              whiteSpace: 'nowrap',
              marginLeft: '5px' // Add some space
            }}
          >
            {cat.message}
          </div>
          )}
          {/* Add "Hello" message just to the right of each cat */}

        </div>
      )
    ))}
  </div>
</div>

  );
};

export default PreviewArea;