/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useContext } from 'react';

const DarkModeContext = createContext({});

export const DarkModeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };
  const themeToggler = () => {
    const toggle = theme === 'light' ? setMode('dark') : setMode('light');
    return toggle;
  };
  const initialDarkModeContext = {
    theme,
    setTheme,
    themeToggler,
  };

  return (
    <DarkModeContext.Provider value={initialDarkModeContext}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const darkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error(`darkModeContext context can only  
        be used in a component wrapped with DarkModeContext`);
  return context;
};
