import { createContext, useContext, useState } from 'react';

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [isOptionKey, setIsOptionKey] = useState(false);

  const initialvalue = {
    isOptionKey,
    setIsOptionKey,
  };

  return (
    <KeyboardContext.Provider value={initialvalue}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.altKey) {
            setIsOptionKey(true);
          }
        }}
        onKeyUp={() => {
          setIsOptionKey(false);
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
