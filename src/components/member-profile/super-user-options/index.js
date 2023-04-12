import React from 'react';
import classNames from '@components/member-profile/member-profile.module.scss';
import { useTaskContext } from '@store/tasks/tasks-context';

const SuperUserOptions = ({ showSettings, isNoteworthy, taskId }) => {
  const { setShowMemberTaskUpdateModal, setTaskId, setIsNoteworthy } =
    useTaskContext();

  const showModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMemberTaskUpdateModal(true);
    setTaskId(taskId);
    setIsNoteworthy(isNoteworthy);
  };

  if (isNoteworthy === undefined) {
    return null;
  }

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
};

export default SuperUserOptions;
