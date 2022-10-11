import { createContext, useContext, useState } from 'react';
import { ALT_KEY } from '../../constants/AppConstants';

const KeyboardContext = createContext();

function isOptionKey(e) {
  return e.key === ALT_KEY;
}

export const KeyboardProvider = ({ children }) => {
  const [isOptionKeyPressed, setIsOptionKeyPressed] = useState(false);

  const initialValue = {
    isOptionKeyPressed,
  };

  return (
    <KeyboardContext.Provider value={initialValue}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (isOptionKey(e)) {
            setIsOptionKeyPressed(true);
          }
        }}
        onKeyUp={(e) => {
          if (isOptionKey(e)) {
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
    throw new Error(`keyboardContext context can only  
        be used in a component wrapped with keyboardContext`);
  return context;
};
