import { createContext, useContext } from 'react';

const keyboardContext = createContext();

export const KeyboardContextProvider = ({ children, value }) => {
  return (
    <keyboardContext.Provider value={value}>
      {children}
    </keyboardContext.Provider>
  );
};

export const useKeyboardContext = () => {
  const context = useContext(keyboardContext);
  if (!context)
    throw new Error(`keyboardcontext context can only  
        be used in a component wrapped with keyboardcontext`);
  return context;
};
