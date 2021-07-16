import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/member-card';
import { containerForNewMember } from 'components/member-card/card.module.scss';

const NewMemberListItem = ({ newMemberDetails }) => {
  return (
    <div className={containerForNewMember}>
      <Card developerInfo={newMemberDetails} />
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
