import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SocialMediaIcon from '../social-media-icon';
import { getPRsbyUser } from '../../helper-functions/getPRs';
import getBadges from './mock/get-badges';
import classNames from './member-profile.module.scss';

const Profile = (props) => {
  const {
    membersData: { id, first_name, last_name, company, designation },
    imageLink
  } = props;
  const { membersData } = props;
  const socialMedia = ['twitter_id', 'github_id', 'linkedin_id', 'instagram_id'];

  const fullName = `${first_name} ${last_name}`;
  const memberName = fullName.trim() || '--';
  const rdsUserName = `@${id}`;

  const [pullRequests, setPullRequests] = useState([]);
  useEffect(() => {
    getPRsbyUser(id).then((res) => setPullRequests(res));
  }, []);

  const badges = getBadges(id);

  const showPRdetails = pullRequests.map((obj) => {
    return (
      <div className={classNames.pullRequest} key={obj.url}>
        <svg
          className={classNames.prIcon}
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true">
          <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
        </svg>
        <a href={obj.url} className={obj.title} target="_blank" rel="noopener noreferrer">
          {obj.title}
        </a>
        <p className={classNames.description}>{obj.state}</p>
      </div>
    );
  });

  return (
    <div className={classNames.container}>
      <div className={(classNames.sidebar, classNames.column)}>
        <div className={classNames.memberDetails}>
          <img src={imageLink} className={classNames.profilePic} alt="ProfilePicture" />
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
                {socialMedia.map(
                  (ele) =>
                    membersData[ele] && (
                      <React.Fragment key={ele}>
                        <SocialMediaIcon id={membersData[ele]} type={ele} />
                      </React.Fragment>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={(classNames.content, classNames.column)}>
        <div className={(classNames.section, classNames.card)}>
          <h2>Badges</h2>
          <div className={classNames.badgeContainer}>
            {badges &&
              badges.map((badge) => (
                <img
                  src={badge.img}
                  className={classNames.badge}
                  alt={badge.title}
                  key={badge.title}
                />
              ))}
          </div>
        </div>

        <div className={(classNames.section, classNames.card)}>
          <h2>
            <img
              src="https://www.iconfinder.com/data/icons/octicons/1024/mark-github-128.png"
              className={classNames.icon}
              alt="GitHub logo"
            />
            Contributions
          </h2>
          <div>{showPRdetails}</div>
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
  }
};

export default Profile;
