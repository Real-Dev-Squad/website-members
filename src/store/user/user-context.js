/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useContext, useCallback } from 'react';
import { UserData } from '../../api/UserDataApi';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [showMemberRoleUpdateModal, setShowMemberRoleUpdateModal] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [userApiCalled, setUserApiCalled] = useState(false);

  const setUserPrivileges = useCallback(async () => {
    const userData = await UserData.get();
    setUserApiCalled(true);
    setUser(userData);
    setIsSuperUser(Boolean(userData?.roles?.super_user));
  }, [setUserApiCalled, setIsSuperUser, setUser]);

  const initialUserContext = {
    user,
    isSuperUser,
    selectedMember,
    showMemberRoleUpdateModal,
    setIsSuperUser,
    setUser,
    setSelectedMember,
    setShowMemberRoleUpdateModal,
    userApiCalled,
    setUserApiCalled,
    setUserPrivileges,
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
