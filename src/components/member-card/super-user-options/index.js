import React from 'react';
import classNames from '@components/member-card/card.module.scss';
import { userContext } from '@store/user/user-context';

const SuperUserOptions = ({ showSettings, username, isMember }) => {
  const { setShowMemberRoleUpdateModal, setSelectedMember, setIsUserMember } =
    userContext();

  const showModal = (e) => {
    e.preventDefault();
    setShowMemberRoleUpdateModal(true);
    setSelectedMember(username);
    setIsUserMember(isMember);
  };

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
