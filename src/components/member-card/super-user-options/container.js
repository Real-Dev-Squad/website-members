import React from 'react';
import { useKeyboardContext } from '@store/keyboard/context';
import { userContext } from '@store/user/user-context';
import SuperUserOptions from '.';

const ShowSuperUserOptionContainer = ({ showSettings, username, isMember }) => {
  const { isOptionKeyPressed } = useKeyboardContext();
  const { isSuperUser } = userContext();

  if (isOptionKeyPressed && isSuperUser) {
    return (
      <SuperUserOptions
        username={username}
        showSettings={showSettings}
        isMember={isMember}
      />
    );
  }
  return null;
};

export default ShowSuperUserOptionContainer;
