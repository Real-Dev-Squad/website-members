import { createContext, useContext, useState } from 'react';

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [isOptionKeyPressed, setIsOptionKeyPressed] = useState(false);

  const initialvalue = {
    isOptionKeyPressed,
  };

  return (
    <KeyboardContext.Provider value={initialvalue}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Alt') {
            setIsOptionKeyPressed(true);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Alt') {
            setIsOptionKeyPressed(false);
          }
        }}
      >
        {children}
      </div>
    </KeyboardContext.Provider>
  );
};

export const useKeyboardContext = () => {
  const context = useContext(KeyboardContext);
  if (!context)
    throw new Error(`keyboardcontext context can only  
        be used in a component wrapped with keyboardcontext`);
  return context;
};
