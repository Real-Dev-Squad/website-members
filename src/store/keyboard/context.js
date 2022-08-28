import { createContext, useContext } from 'react';

const KeyboardContext = createContext();

export const KeyboardContextProvider = ({ children, value }) => {
  return (
    <KeyboardContext.Provider value={value}>
      {children}
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
