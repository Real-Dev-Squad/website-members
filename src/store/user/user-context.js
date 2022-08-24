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
  const [userApiCalled, setUserApiCalled] = useState(false);

  const setUserPrivileges = async () => {
    let selfUser = null;
    let selfIsSuperUser = false;
    let selfUserApiCalled = false;
    try {
      const { data } = await getUserSelf();
      if (data) {
        selfUser = data;
        selfIsSuperUser = Boolean(data.roles?.super_user);
        selfUserApiCalled = true;
      }
    } catch {
      console.error(`couldn't fetch the user.Something went wrong.`);
    }
    setUser(selfUser);
    setIsSuperUser(selfIsSuperUser);
    setUserApiCalled(selfUserApiCalled);
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
