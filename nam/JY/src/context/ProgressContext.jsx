// src/context/ProgressContext.js
import React, { createContext, useState } from "react";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(1);
  const totalSteps = 5;

  return (
    <ProgressContext.Provider value={{ progress, setProgress, totalSteps }}>
      {children}
    </ProgressContext.Provider>
  );
};
