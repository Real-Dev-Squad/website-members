import React from 'react';
import PropTypes from 'prop-types';
import classNames from './new-member-list-item.module.scss';
import { motion } from 'framer-motion';

const NewMemberListItem = ({ newMemberDetails }) => {
  const { username } = newMemberDetails;
  const fullName = `${newMemberDetails.first_name + ' ' + newMemberDetails.last_name}`;

  const brokenImageHandler = (e) => {
    e.target.src = '/images/Avatar.png';
  };

  return (
    <div className={classNames.container}>
      <motion.img
        layoutId={username}
        src={newMemberDetails.img_url + `?${Math.random() * 100}`}
        onError={brokenImageHandler}
        className={classNames.imgContainer}
        alt={username}
      />
      <h2 className={classNames.nameOfPerson}>
        {fullName.length > 1
          ? `${newMemberDetails['first_name']} ${newMemberDetails['last_name']}`
          : username}
      </h2>
    </div>
  );
};

NewMemberListItem.propTypes = {
  newMemberDetails: PropTypes.object
};

NewMemberListItem.defaultProps = {
  newMemberDetails: {}
};

export default NewMemberListItem;
