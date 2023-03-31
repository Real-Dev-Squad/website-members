import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ALT_KEY } from '@constants/AppConstants';

const KeyboardContext = createContext();

function isOptionKey(e) {
  return e.key === ALT_KEY;
}

export const KeyboardProvider = ({ children }) => {
  const [isOptionKeyPressed, setIsOptionKeyPressed] = useState(false);
  const divRef = useRef(null);

  const initialValue = {
    isOptionKeyPressed,
  };

  useEffect(() => {
    if (!divRef) return;
    divRef.current.focus();
  }, []);

  return (
    <KeyboardContext.Provider value={initialValue}>
      <div
        tabIndex={-1}
        role="presentation"
        ref={divRef}
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
