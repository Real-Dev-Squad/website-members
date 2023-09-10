import { createContext, useContext, useState } from 'react';

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children, initialValue }) => {
  const [isOptionKeyPressed, setIsOptionKeyPressed] = useState(false);

  const value = {
    isOptionKeyPressed,
    setIsOptionKeyPressed,
  };

  return (
    <KeyboardContext.Provider value={initialValue || value}>
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboardContext = () => {
  const context = useContext(KeyboardContext);
  if (!context)
    throw new Error(`keyboardContext context can only  
        be used in a component wrapped with keyboardContext`);
  return context;
};
