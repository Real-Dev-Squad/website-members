import React from 'react';
import PropTypes from 'prop-types';
import classNames from './new-member-list-item.module.scss';
import { motion } from 'framer-motion';

const NewMemberListItem = ({ newMemberDetails }) => {
  const { first_name, username, img_url } = newMemberDetails;

  return (
    <div className={classNames.container}>
      <motion.img
        layoutId={username}
        src={img_url}
        className={classNames.imgContainer}
        alt={username}
      />
      <h2 className={classNames.nameOfPerson}>{newMemberDetails && first_name}</h2>
    </div>
  );
};

NewMemberListItem.propTypes = {
  newMemberDetails: PropTypes.array
};

NewMemberListItem.defaultProps = {
  newMemberDetails: []
};

export default NewMemberListItem;
