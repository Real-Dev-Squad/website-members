import React from 'react';
import Card from 'components/member-card';
import { containerForNewMember } from 'components/member-card/card.module.scss';

const NewMemberListItem = ({ newMemberDetails }) => {
  return (
    <div className={containerForNewMember}>
      <Card developerInfo={newMemberDetails} />
    </div>
  );
};

export default NewMemberListItem;
