import React from 'react';
import PropTypes from 'prop-types';
import SocialMediaIcon from '../social-media-icon';
import getBadges from './mock/get-badges';
import classNames from './member-profile.module.scss';
import Contribution from './contribution/';
import { motion } from 'framer-motion';

const renderBadgeImages = (badges) =>
  badges.map((badge) => (
    <img src={badge.img} className={classNames.badge} alt={badge.title} key={badge.title} />
  ));

const renderContributions = (contributions, fullName, imageLink) =>
  contributions.map((noteWorthyContribution, index) => (
    <Contribution
      contribution={noteWorthyContribution}
      key={index}
      fullName={fullName}
      imageLink={imageLink}
    />
  ));

const renderSocialMediaIcons = (socialMedia, membersData) =>
  socialMedia.map(
    (ele) => membersData[ele] && <SocialMediaIcon id={membersData[ele]} type={ele} key={ele} />
  );
const Profile = (props) => {
  const {
    membersData: { id, first_name, last_name, company, designation },
    imageLink,
    contributions
  } = props;
  const { membersData } = props;
  const { noteworthy, all } = contributions;
  const socialMedia = ['twitter_id', 'github_id', 'linkedin_id', 'instagram_id'];

  const fullName = `${first_name} ${last_name}`;
  const memberName = fullName.trim() || '--';
  const rdsUserName = `@${id}`;

  const badges = getBadges(id);

  return (
    <div className={classNames.container}>
      <div className={(classNames.sidebar, classNames.column)}>
        <div className={classNames.memberDetails}>
          <motion.img
            layoutId={id}
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
          </div>
        </div>
      </div>

      <div className={(classNames.content, classNames.column)}>
        <div className={(classNames.section, classNames.card)}>
          <h2>Badges</h2>
          <div className={classNames.badgeContainer}>{badges && renderBadgeImages(badges)}</div>
        </div>

        <div className={(classNames.section, classNames.card)}>
          <h2>Noteworthy Contributions</h2>
          {renderContributions(noteworthy, fullName, imageLink)}
          <h2>All Contributions</h2>
          {renderContributions(all, fullName, imageLink)}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  imageLink: PropTypes.string,
  membersData: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    company: PropTypes.string,
    designation: PropTypes.string
  }),
  contributions: PropTypes.shape({
    noteworthy: PropTypes.array,
    all: PropTypes.array
  })
};

Profile.defaultProps = {
  imageLink: '',
  membersData: {
    id: '',
    first_name: '',
    last_name: '',
    company: '',
    designation: ''
  },
  contributions: {
    noteworthy: [],
    all: []
  }
};

export default Profile;
