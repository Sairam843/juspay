// src/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cats, setCats] = useState([{ id: 1, instructions: [], position: { x: 0, y: 0 }, rotation: 0 }]);
  const [activeCat, setActiveCat] = useState(1);

  return (
    <AppContext.Provider value={{ cats, setCats, activeCat, setActiveCat }}>
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