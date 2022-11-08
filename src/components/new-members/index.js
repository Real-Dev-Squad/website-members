import React from 'react';
import Card from '@components/member-card';
import styles from '@components/new-members/new-members.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMembers-context';
import { searchMembers } from '@helper-functions/search-members';
import Link from 'next/link';
import { userContext } from '@store/user/user-context';

// returns card which shows details of new member
const renderNewUserCard = (newMember) => {
  const { isSuperUser } = userContext();
  return (
    <div
      className={
        isSuperUser
          ? styles.superUserContainerForNewMember
          : styles.containerForNewMember
      }
    >
      <Card developerInfo={newMember} isMember={false} />
    </div>
  );
};

const renderNewUser = (newMember, isSuperUser) => {
  if (isSuperUser) {
    return (
      <Link
        prefetch={false}
        href={{
          pathname: '/[id]',
        }}
        as={`/${newMember.username}`}
        key={newMember.username}
      >
        {renderNewUserCard(newMember)}
      </Link>
    );
  }
  return <div className={styles.newUser}>{renderNewUserCard(newMember)}</div>;
};

const NewMemberList = () => {
  const {
    state: { newMembers },
  } = membersContext();
  const { isSuperUser } = userContext();
  const { searchTerm } = searchMemberContext();
  const filterMembers = searchMembers(newMembers, searchTerm);
  if (newMembers) {
    return (
      <div className={styles.container}>
        {filterMembers.map((newMember) => (
          <React.Fragment key={newMember.id}>
            {renderNewUser(newMember, isSuperUser)}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;
