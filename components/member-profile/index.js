import PropTypes from 'prop-types';
import classNames from './member-profile.module.scss';

const Profile = (props) => {
  const {
    membersData: { first_name, last_name },
    imageLink
  } = props;
  const memberName = `${first_name || ''} ${last_name || ''}`;
  return (
    <>
      <img src={imageLink} className={classNames.profilePic} alt="profile" />
      <div className={classNames.memberName}>{memberName.trim() || '--'}</div>
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
