import React from 'react';
import { membersContext } from '@store/members/members-context';
import Card from '@components/member-card';
import { useRouter } from 'next/router';
import { userContext } from '@store/user/user-context';
import Link from 'next/link';

import styles from '@components/new-members/new-members.module.scss';

// returns card which shows details of new member
const RenderNewMemberCard = (newMember, optionKey) => (
  <div className={styles.containerForNewMember}>
    <Card optionKey={optionKey} developerInfo={newMember} isMember={false} />
  </div>
);

const RenderNewMember = (newMember, optionKey) => {
  const { username, first_name, last_name } = newMember;
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const { isSuperUserMode } = userContext();
  return isSuperUserMode && dev && optionKey ? (
    <Link
      prefetch={false}
      href={{
        pathname: '/[id]',
        query: {
          first_name: `${newMember ? first_name : ''}`,
          last_name: `${newMember ? last_name : ''}`,
        },
      }}
      as={`/${username}`}
      key={username}
    >
      {RenderNewMemberCard(newMember, optionKey)}
    </Link>
  ) : (
    RenderNewMemberCard(newMember, optionKey)
  );
};

const NewMemberList = ({ optionKey }) => {
  const {
    state: { newMembers },
  } = membersContext();

  if (newMembers) {
    return (
      <div className={styles.container}>
        {newMembers.map((newMember) => (
          <React.Fragment key={newMember.id}>
            {RenderNewMember(newMember, optionKey)}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;
