import { getDataURL, getImgURL } from 'helper-functions/urls';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from './member-profile.module.scss';
import useFetch from 'custom-hooks/useFetch';

const Profile = (props) => {
  const imgLink = getImgURL(props.id);
  const { data } = useFetch(getDataURL(props.id));
  return (
    <>
      <img src={imgLink} className={classNames.profilePic} alt="profile" />
      <div className={classNames.memberName}>
        {data ? `${data['first_name']} ${data['last_name']} ` : `${props.id}`}
      </div>
    </>
  );
};

Profile.propTypes = {
  id: PropTypes.string
};

Profile.defaultProps = {
  id: ''
};

export default Profile;
