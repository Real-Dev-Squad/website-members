/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isSuperUserMode, setIsSuperUserMode] = useState(false);
  const [showMemberRoleUpdateModal, setShowMemberRoleUpdateModal] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberTaskUpdateModal, setshowMemberTaskUpdateModal] =
    useState(false);
  const [isnoteworthy, setIsnoteWorthy] = useState(false);
  const [isOptionKey, setIsOptionKey] = useState(false);
  const [taskId, setTaskId] = useState('');
  const initialUserContext = {
    user,
    isSuperUser,
    isSuperUserMode,
    selectedMember,
    showMemberRoleUpdateModal,
    showMemberTaskUpdateModal,
    isnoteworthy,
    isOptionKey,
    taskId,
    setIsSuperUser,
    setUser,
    setIsSuperUserMode,
    setSelectedMember,
    setShowMemberRoleUpdateModal,
    setshowMemberTaskUpdateModal,
    setIsnoteWorthy,
    setIsOptionKey,
    setTaskId,
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
