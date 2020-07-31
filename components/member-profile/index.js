import React from 'react';
import { getDataURL, getImgURL } from 'helper-functions/urls';
import classNames from './member-profile.module.scss';
import useFetch from 'custom-hooks/useFetch';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const { id } = props;
  const imgLink = getImgURL(id);
  const { data } = useFetch(getDataURL(id));
  return (
    <>
      <img src={imgLink} alt="" className={classNames.profilePic} />
      <div className={classNames.memberName}>
        {data ? `${data['first_name']} ${data['last_name']} ` : `${id}`}
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
