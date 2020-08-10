import PropTypes from 'prop-types';
import React from 'react';
import classNames from './member-profile.module.scss';

const Profile = (props) => {
  const memberName = `${props.membersData.first_name || '--'} ${
    props.membersData.last_name || '--'
  }`;
  return (
    <>
      <img src={props.imageLink} className={classNames.profilePic} alt="profile" />
      <div className={classNames.memberName}>{memberName}</div>
    </>
  );
};

Profile.propTypes = {
  imageLink: PropTypes.string
};

Profile.propTypes = {
  membersData: PropTypes.object
};

Profile.defaultProps = {
  imageLink: ''
};

export default Profile;
