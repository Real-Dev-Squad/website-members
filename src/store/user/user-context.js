/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useContext, useCallback } from 'react';
import { UserData } from '../../api/UserDataApi';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [showMemberRoleUpdateModal, setShowMemberRoleUpdateModal] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [userApiCalled, setUserApiCalled] = useState(false);
  const [isUserMember, setIsUserMember] = useState(true);

  const setUserPrivileges = useCallback(async () => {
    setIsLoading(true);
    const userData = await UserData.get();
    setUserApiCalled(true);
    setUser(userData);
    setIsSuperUser(Boolean(userData?.roles?.super_user));
    setIsLoading(false);
  }, [setUserApiCalled, setIsSuperUser, setUser]);

  const initialUserContext = {
    user,
    isSuperUser,
    selectedMember,
    showMemberRoleUpdateModal,
    isLoading,
    setIsSuperUser,
    setUser,
    setSelectedMember,
    setShowMemberRoleUpdateModal,
    userApiCalled,
    setUserApiCalled,
    setUserPrivileges,
    setIsLoading,
    isUserMember,
    setIsUserMember,
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
