/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SocialMediaIcon from '@components/social-media-icon';
import getBadges from '@components/member-profile/mock/get-badges';
import classNames from '@components/member-profile/member-profile.module.scss';
import ContributionType from '@components/member-profile/contribution-type/';
import { motion } from 'framer-motion';
import Modal from '@components/modal';
import ShowSkills from '@components/member-card/show-skills';

const renderBadgeImages = (badges) =>
  badges.map((badge) => (
    <img
      src={badge.img}
      className={classNames.badge}
      alt={badge.title}
      key={badge.title}
    />
  ));

const CONTRIBUTIONTYPE = ['Noteworthy', 'Active tasks', 'All'];

const renderContributionsTypes = (
  contributions,
  fullName,
  imageLink,
  devUser,
  tasks
) => {
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
    (ele) =>
      membersData[ele] && (
        <SocialMediaIcon id={membersData[ele]} type={ele} key={ele} />
      )
  );
const Profile = (props) => {
  const {
    membersData: { username, first_name, last_name, company, designation },
    imageLink,
    contributions,
    devUser,
    tasks,
  } = props;
  const { membersData } = props;
  const socialMedia = [
    'twitter_id',
    'github_id',
    'linkedin_id',
    'instagram_id',
  ];

  const fullName = `${first_name} ${last_name}`;
  const memberName = fullName.trim() || '--';
  const rdsUserName = `@${username}`;

  const badges = getBadges(username);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={classNames.container}>
      {showModal &&
        <Modal
          rdsUserName={rdsUserName}
          showModal={showModal}
          setShowModal={setShowModal}
          onClose={() => setShowModal(false)}
        />
      }
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
            {devUser && 
              <div>
                <ShowSkills show />
                <div>
                  <button
                    type="button"
                    className={classNames.getIntroButton}
                    onMouseDown={() => setShowModal(true)}
                  >
                    Get Intro
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <div className={classNames.content}>
        {devUser && (
          <div className={(classNames.section, classNames.card)}>
            <h2>Badges</h2>
            <div className={classNames.badgeContainer}>
              {badges && renderBadgeImages(badges)}
            </div>
          </div>
        )}

        <div className={(classNames.section, classNames.card)}>
          {renderContributionsTypes(
            contributions,
            fullName,
            imageLink,
            devUser,
            tasks
          )}
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
    designation: PropTypes.string,
  }),
  contributions: PropTypes.shape({
    noteworthy: PropTypes.instanceOf(Array),
    all: PropTypes.instanceOf(Array),
  }),
  devUser: PropTypes.bool,
  tasks: PropTypes.instanceOf(Array),
};

Profile.defaultProps = {
  imageLink: '',
  membersData: {
    username: '',
    first_name: '',
    last_name: '',
    company: '',
    designation: '',
  },
  contributions: {
    noteworthy: [],
    all: [],
  },
  devUser: false,
  tasks: [],
};

export default Profile;
