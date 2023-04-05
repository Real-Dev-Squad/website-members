import React from 'react';
import Card from '@components/member-card';
import styles from '@components/new-members/new-members.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMembers-context';
import { searchMembers } from '@helper-functions/search-members';
import { userContext } from '@store/user/user-context';
import { useRouter } from 'next/router';

// returns card which shows details of new member
const renderNewUserCard = (newMember) => {
  return (
    <div className={styles.containerForNewMember}>
      <Card developerInfo={newMember} isMember={false} />
    </div>
  );
};

const renderNewUser = (newMember, isSuperUser, handleNewMemberDetailsPage) => {
  if (isSuperUser) {
    return (
      <div
        role="button"
        tabIndex={-1}
        key={newMember.username}
        onClick={(e) => handleNewMemberDetailsPage(e, newMember.username)}
        aria-hidden="true"
      >
        {renderNewUserCard(newMember)}
      </div>
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
  const router = useRouter();
  const handleNewMemberDetailsPage = (e, newUserMember) => {
    e.preventDefault();
    if (e.altKey) {
      router.push(`/${newUserMember}`);
    }
    return null;
  };

  if (newMembers) {
    return (
      <div className={styles.container}>
        {filterMembers.map((newMember) => (
          <React.Fragment key={newMember.id}>
            {renderNewUser(newMember, isSuperUser, handleNewMemberDetailsPage)}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;
