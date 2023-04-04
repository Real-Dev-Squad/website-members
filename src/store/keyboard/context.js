import { createContext, useContext, useState } from 'react';

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [isOptionKeyPressed, setIsOptionKeyPressed] = useState(false);

  const initialValue = {
    isOptionKeyPressed,
    setIsOptionKeyPressed,
  };

  return (
    <KeyboardContext.Provider value={initialValue}>
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
