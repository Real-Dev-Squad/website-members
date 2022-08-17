/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useContext } from 'react';
import { getUserSelf } from '@helper-functions/action-handlers';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isSuperUserMode, setIsSuperUserMode] = useState(false);
  const [showMemberRoleUpdateModal, setShowMemberRoleUpdateModal] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [apiCalledToVerifySuperUser, setApiCalledToVerifySuperUser] =
    useState(false);

  const makeApiCallToVerifySuperUser = async () => {
    const { data } = await getUserSelf();
    setUser(data);
    if (data) {
      setIsSuperUser(Boolean(data.roles?.super_user));
      setApiCalledToVerifySuperUser(true);
    }
  };

  const initialUserContext = {
    user,
    isSuperUser,
    isSuperUserMode,
    selectedMember,
    showMemberRoleUpdateModal,
    setIsSuperUser,
    setUser,
    setIsSuperUserMode,
    setSelectedMember,
    setShowMemberRoleUpdateModal,
    apiCalledToVerifySuperUser,
    setApiCalledToVerifySuperUser,
    makeApiCallToVerifySuperUser,
  };

  return (
    <UserContext.Provider value={initialUserContext}>
      {children}
    </UserContext.Provider>
  );
};

export const userContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error(`userContext context can only  
        be used in a component wrapped with UserContext`);
  return context;
};
