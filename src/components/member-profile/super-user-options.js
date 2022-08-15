import React from 'react';
import classNames from '@components/member-profile/member-profile.module.scss';
import { userContext } from '../../store/user/user-context';

const SuperUserOptions = ({ showSettings, isNoteworthy, TaskId }) => {
  const {
    isSuperUserMode,
    showMemberTaskUpdateModal,
    setshowMemberTaskUpdateModal,
    setTaskId,
    setIsnoteWorthy,
  } = userContext();

  const showModal = (e) => {
    e.stopPropagation();
    setshowMemberTaskUpdateModal(!showMemberTaskUpdateModal);
    setTaskId(TaskId);
    setIsnoteWorthy(isNoteworthy);
  };

  const showSuperUserOptions = () => {
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
  return <>{isSuperUserMode && showSuperUserOptions()}</>;
};

export default SuperUserOptions;
