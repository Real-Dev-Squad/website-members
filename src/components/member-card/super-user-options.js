/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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

  const shoeSuperUserOptions = () => {
    return (
      <div className={classNames.settingsContainer}>
        <div
          role="button"
          className={classNames.settingsButton}
          onClick={(e) => {
            e.preventDefault();
            setShowMemberRoleUpdateModal(!showMemberRoleUpdateModal);
            setSelectedMember(username);
          }}
        >
          <img
            className={classNames.settingsImg}
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
