import React, { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from '@components/member-card/card.module.scss';
import { motion } from 'framer-motion';
import SocialMediaIcon from '@components/social-media-icon';
import PropTypes from 'prop-types';
import ShowSkills from '@components/member-card/show-skills';
import SuperUserOptions from '@components/member-card/super-user-options';

const Card = ({ developerInfo, isOptionKey }) => {
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

  const [showSettings, setShowSettings] = useState(false);
  const handleSettingsButton = () => {
    if (isOptionKey) {
      setShowSettings(true);
    }
  };

  const brokenImageHandler = (e) => {
    e.target.src = '/images/Avatar.png';
  };

  const renderName = (userFullName, userName) =>
    userFullName.length > 20 ? userName : userFullName;

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={handleSettingsButton}
      onMouseLeave={() => {
        setShowSettings(false);
      }}
    >
      {dev && (
        <SuperUserOptions username={username} showSettings={showSettings} />
      )}
      <motion.img
        layoutId={username}
        src={isMember ? `${img_url}` : '/images/Avatar.png'}
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
  isOptionKey: PropTypes.bool,
};
Card.defaultProps = {
  isOptionKey: false,
};

export default Card;
