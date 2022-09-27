import React from 'react';
import { useKeyboardContext } from '@store/keyboard/context';
import { userContext } from '@store/user/user-context';
import SuperUserOptions from './super-user-options';

const ShowSuperUserOptionsContainer = ({
  showSettings,
  isNoteworthy,
  taskId,
}) => {
  const { isOptionKeyPressed } = useKeyboardContext();
  const { isSuperUser } = userContext();
  if (isOptionKeyPressed && isSuperUser) {
    return (
      <SuperUserOptions
        showSettings={showSettings}
        isNoteworthy={isNoteworthy}
        taskId={taskId}
      />
    );
  }
  return null;
};

export default ShowSuperUserOptionsContainer;
