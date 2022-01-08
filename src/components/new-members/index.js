import React from 'react';
import { membersContext } from '@store/members/members-context';
import Card from '@components/member-card';

import styles from '@components/new-members/new-members.module.scss';

// returns card which shows details of new member
const renderNewMember = (newMember) => (
  <div className={styles.containerForNewMember}>
    <Card developerInfo={newMember} isMember={false} />
  </div>
);

const NewMemberList = () => {
  const {
    state: { newMembers },
  } = membersContext();

  if (newMembers) {
    return (
      <div className={styles.container}>
        {newMembers.map((newMember) => (
          <React.Fragment key={newMember.id}>
            {renderNewMember(newMember)}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;
