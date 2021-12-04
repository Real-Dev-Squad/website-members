/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useContext } from 'react';

const SearchMemberContext = createContext();

export const SearchMemberContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const initialSearchMemberContext = {
    searchTerm,
    setSearchTerm,
  };
  return (
    <SearchMemberContext.Provider value={initialSearchMemberContext}>
      {children}
    </SearchMemberContext.Provider>
  );
};

export const searchMemberContext = () => {
  const context = useContext(SearchMemberContext);
  if (!context)
    throw new Error(`searchMemberContext context can only  
        be used in a component wrapped with SearchMemberContext`);
  return context;
};
