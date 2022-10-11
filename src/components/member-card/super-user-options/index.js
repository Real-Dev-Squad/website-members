import React from 'react';
import { userContext } from '@store/user/user-context';
import classNames from '@components/member-card/card.module.scss';

const SuperUserOptions = ({ showSettings, username }) => {
  const { setShowMemberRoleUpdateModal, setSelectedMember } = userContext();

  const showModal = (e) => {
    e.preventDefault();
    setShowMemberRoleUpdateModal(true);
    setSelectedMember(username);
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
