/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import classNames from '@components/member-card/card.module.scss';
import { motion } from 'framer-motion';
import SocialMediaIcon from '@components/social-media-icon';
import PropTypes from 'prop-types';
import ShowSkills from '@components/member-card/show-skills';
import UserContext from '@store/user/user-context';

const Card = ({ developerInfo }) => {
  const {
    isSuperUserMode,
    showMemberRoleUpdateModal,
    setShowMemberRoleUpdateModal,
    setSelectedMember,
  } = useContext(UserContext);

  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const { username, first_name, last_name, img_url, isMember } = developerInfo;
  const socialMedia = [
    'twitter_id',
    'github_id',
    'linkedin_id',
    'instagram_id',
  ];
  const fullName = `${`${first_name} ${last_name}`}`;

  const brokenImageHandler = (e) => {
    e.target.src = '/images/Avatar.png';
  };

  const renderName = (userFullName, userName) =>
    userFullName.length > 20 ? userName : userFullName;

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

  return (
    <div>
      {!isMember && isSuperUserMode && shoeSuperUserOptions()}
      <motion.img
        layoutId={username}
        src={`${img_url}?${Math.random() * 100}`}
        onError={brokenImageHandler}
        className={
          isMember ? classNames.imgContainer : classNames.imgContainerNewMember
        }
        alt={username}
      />
      <h2
        className={
          isMember
            ? classNames.nameOfPerson
            : classNames.nameOfPersonForNewMember
        }
      >
        {fullName.length > 1 &&
          last_name !== undefined &&
          renderName(fullName, username)}
      </h2>
      {isMember && dev && <ShowSkills show={false} />}
      {isMember && (
        <div className={classNames.iconsContainer}>
          {socialMedia.map(
            (ele) =>
              developerInfo[ele] && (
                <React.Fragment key={ele}>
                  <SocialMediaIcon id={developerInfo[ele]} type={ele} />
                </React.Fragment>
              )
          )}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  developerInfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    isMember: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Card;
