import PropTypes from 'prop-types';
import React from 'react';
import classNames from './member-profile.module.scss';

const Profile = (props) => {
  const { membersData, imageLink } = props;
  const memberName = `${membersData.first_name || '--'} ${membersData.last_name || '--'}`;
  return (
    <>
      <img src={imageLink} className={classNames.profilePic} alt="profile" />
      <div className={classNames.memberName}>{memberName}</div>
    </>
  );
};

Profile.propTypes = {
  imageLink: PropTypes.string,
  membersData: PropTypes.object
};

Profile.defaultProps = {
  imageLink: ''
};

export default Profile;
