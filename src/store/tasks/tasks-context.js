import { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [showMemberTaskUpdateModal, setShowMemberTaskUpdateModal] =
    useState(false);
  const [isNoteworthy, setIsNoteworthy] = useState(false);
  const [isOptionKey, setIsOptionKey] = useState(false);
  const [taskId, setTaskId] = useState('');

  const initialTaskContext = {
    showMemberTaskUpdateModal,
    isNoteworthy,
    isOptionKey,
    taskId,
    setShowMemberTaskUpdateModal,
    setIsNoteworthy,
    setIsOptionKey,
    setTaskId,
  };

  return (
    <TaskContext.Provider value={initialTaskContext}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error(`taskcontext context can only  
        be used in a component wrapped with taskcontext`);
  return context;
};
