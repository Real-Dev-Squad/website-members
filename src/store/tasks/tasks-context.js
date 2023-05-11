import { createContext, useState, useContext, useMemo } from 'react';

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [showMemberTaskUpdateModal, setShowMemberTaskUpdateModal] =
    useState(false);
  const [isNoteworthy, setIsNoteworthy] = useState(false);
  const [taskId, setTaskId] = useState('');

  const initialTaskContext = useMemo(
    () => ({
      showMemberTaskUpdateModal,
      isNoteworthy,
      taskId,
      setShowMemberTaskUpdateModal,
      setIsNoteworthy,
      setTaskId,
    }),
    [taskId, showMemberTaskUpdateModal, isNoteworthy]
  );

  return (
    <TaskContext.Provider value={initialTaskContext}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error(`taskContext context can only  
        be used in a component wrapped with taskContext`);
  return context;
};
