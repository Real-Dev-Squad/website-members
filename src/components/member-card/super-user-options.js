import React from 'react';
import classNames from '@components/member-card/card.module.scss';
import PropTypes from 'prop-types';
import { userContext } from '../../store/user/user-context';

const SuperUserOptions = ({ username }) => {
  const {
    isSuperUserMode,
    showMemberRoleUpdateModal,
    setShowMemberRoleUpdateModal,
    setSelectedMember,
  } = userContext();

  const showModal = (e) => {
    e.preventDefault();
    setShowMemberRoleUpdateModal(!showMemberRoleUpdateModal);
    setSelectedMember(username);
  };

  const shoeSuperUserOptions = () => {
    return (
      <div className={classNames.settingsContainer}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={classNames.settingsButton}
          onClick={showModal}
          role="button"
          tabIndex="0"
        >
          <img
            className={classNames.settingsIcon}
            src="/icons/settings.png"
            alt="setting"
          />
        </div>
      </div>
    );
  };

  return <>{isSuperUserMode && shoeSuperUserOptions()}</>;
};

SuperUserOptions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default SuperUserOptions;
