/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useContext, useMemo } from 'react';

const SearchMemberContext = createContext();

export const SearchMemberProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const initialSearchMemberContext = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
    }),
    [searchTerm]
  );

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
