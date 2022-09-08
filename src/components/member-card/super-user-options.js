import React from 'react';
import classNames from '@components/member-card/card.module.scss';
import PropTypes from 'prop-types';
import { userContext } from '../../store/user/user-context';

const SuperUserOptions = ({ username, showSettings }) => {
  const {
    isSuperUser,
    showMemberRoleUpdateModal,
    setShowMemberRoleUpdateModal,
    setSelectedMember,
  } = userContext();

  const showModal = (e) => {
    e.preventDefault();
    setShowMemberRoleUpdateModal(!showMemberRoleUpdateModal);
    setSelectedMember(username);
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

  return <>{isSuperUser && showSuperUserOptions()}</>;
};

SuperUserOptions.propTypes = {
  username: PropTypes.string.isRequired,
  showSettings: PropTypes.bool,
};
SuperUserOptions.defaultProps = {
  showSettings: false,
};

export default SuperUserOptions;
