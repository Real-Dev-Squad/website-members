import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SocialMediaIcon from '../social-media-icon';
import getBadges from './mock/get-badges';
import classNames from './member-profile.module.scss';
import ContributionType from './contribution-type/';
import { motion } from 'framer-motion';
import Modal from 'components/modal';
import Showskills from '../member-card/showskills';

const renderBadgeImages = (badges) =>
  badges.map((badge) => (
    <img src={badge.img} className={classNames.badge} alt={badge.title} key={badge.title} />
  ));

const CONTRIBUTIONTYPE = ['Noteworthy', 'Active tasks', 'All'];

const renderContributionsTypes = (contributions, fullName, imageLink, devUser, tasks) => {
  const { noteworthy, all } = contributions;
  return CONTRIBUTIONTYPE.map((type, index) => (
    <ContributionType
      type={type}
      key={index}
      contributions={type !== 'All' ? noteworthy : all}
      fullName={fullName}
      imageLink={imageLink}
      devUser={devUser}
      tasks={tasks}
    />
  ));
};

const renderSocialMediaIcons = (socialMedia, membersData) =>
  socialMedia.map(
    (ele) => membersData[ele] && <SocialMediaIcon id={membersData[ele]} type={ele} key={ele} />
  );
const Profile = (props) => {
  const {
    membersData: { username, first_name, last_name, company, designation },
    imageLink,
    contributions,
    devUser,
    tasks
  } = props;
  const { membersData } = props;
  const socialMedia = ['twitter_id', 'github_id', 'linkedin_id', 'instagram_id'];

  const fullName = `${first_name} ${last_name}`;
  const memberName = fullName.trim() || '--';
  const rdsUserName = `@${username}`;

  const badges = getBadges(username);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={classNames.container}>
      <div className={(classNames.sidebar, classNames.column)}>
        <div className={classNames.memberDetails}>
          <motion.img
            layoutId={username}
            src={imageLink}
            className={classNames.profilePic}
            alt="ProfilePicture"
          />
          <div className={classNames.personalInfo}>
            <h1 className={classNames.profileName}>{memberName}</h1>
            <p className={classNames.userName}>{rdsUserName}</p>
            <p className={classNames.workDetails}>
              {designation}
              <br />
              <span className={classNames.userName}>{company}</span>
            </p>
          </div>
          <div className={classNames.iconsContainer}>
            {membersData && (
              <div className={classNames.iconsContainer}>
                {renderSocialMediaIcons(socialMedia, membersData)}
              </div>
            )}
            <Showskills />
            <div>
              <button
                type="button"
                className={classNames.getIntroButton}
                onMouseDown={() => setShowModal(true)}>
                Get Intro
              </button>
              <span className={classNames.modalWindow} isOpen={showModal}>
                <Modal
                  showModal={showModal}
                  rdsUserName={rdsUserName}
                  setShowModal={setShowModal}
                  onClose={() => setShowModal(false)}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.content}>
        {devUser && (
          <div className={(classNames.section, classNames.card)}>
            <h2>Badges</h2>
            <div className={classNames.badgeContainer}>{badges && renderBadgeImages(badges)}</div>
          </div>
        )}

        <div className={(classNames.section, classNames.card)}>
          {renderContributionsTypes(contributions, fullName, imageLink, devUser, tasks)}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  imageLink: PropTypes.string,
  membersData: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    company: PropTypes.string,
    designation: PropTypes.string
  }),
  contributions: PropTypes.shape({
    noteworthy: PropTypes.array,
    all: PropTypes.array
  }),
  devUser: PropTypes.bool,
  tasks: PropTypes.array
};

Profile.defaultProps = {
  imageLink: '',
  membersData: {
    username: '',
    first_name: '',
    last_name: '',
    company: '',
    designation: ''
  },
  contributions: {
    noteworthy: [],
    all: []
  },
  devUser: false,
  tasks: []
};

export default Profile;
