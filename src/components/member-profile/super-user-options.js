import React from 'react';
import classNames from '@components/member-profile/member-profile.module.scss';
import { userContext } from '../../store/user/user-context';

const SuperUserOptions = ({ showSettings, isNoteworthy, taskId }) => {
  const {
    isSuperUserMode,
    setShowMemberTaskUpdateModal,
    setTaskId,
    setIsNoteworthy,
  } = userContext();

  const showModal = (e) => {
    e.stopPropagation();
    setShowMemberTaskUpdateModal(true);
    setTaskId(taskId);
    setIsNoteworthy(isNoteworthy);
  };

  if (isNoteworthy === undefined) {
    return null;
  }

  if (isSuperUserMode) {
    return (
      <div
        className={`${classNames.settingsContainer} ${
          !showSettings && classNames.hidden
        }`}
      >
        <button
          className={classNames.settingsButton}
          type="button"
          onClick={showModal}
        >
          <img
            className={classNames.settingsIcon}
            src="/icons/settings.png"
            alt="setting"
          />
        </button>
      </div>
    );
  }
  return null;
};

export default SuperUserOptions;
