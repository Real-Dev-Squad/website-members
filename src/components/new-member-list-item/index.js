import React, { useRef } from 'react';
import Link from 'next/link';
import Card from '@components/member-card';
import { containerForNewMember } from '@components/member-card/card.module.scss';
import { useRouter } from 'next/router';
import { userContext } from '@store/user/user-context';
import { TIMEOUT } from '@constants/AppConstants';

const NewMemberListItem = ({ newMemberDetails, optionKey }) => {
  const { username, first_name, last_name } = newMemberDetails;
  const divref = useRef(null);
  const cardRef = useRef(null);
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const { isSuperUserMode } = userContext();

  let timer = 0;

  const mouseEnter = () => {
    timer = setTimeout(() => {
      divref.current.style.display = 'flex';
      divref.current.style.height = `${cardRef.current.offsetHeight}px`;
      divref.current.style.width = `${cardRef.current.offsetWidth}px`;
    }, TIMEOUT);
  };

  const mouseLeave = () => {
    divref.current.style.display = 'none';
    clearTimeout(timer);
  };
  return isSuperUserMode && optionKey ? (
    <Link
      prefetch={false}
      href={{
        pathname: '/[id]',
        query: {
          first_name: `${newMemberDetails ? first_name : ''}`,
          last_name: `${newMemberDetails ? last_name : ''}`,
        },
      }}
      as={`/${username}`}
      key={username}
    >
      <div
        className={containerForNewMember}
        onMouseEnter={dev && mouseEnter}
        onMouseLeave={dev && mouseLeave}
      >
        <Card developerInfo={newMemberDetails} optionKey={optionKey} />
      </div>
    </Link>
  ) : (
    <div
      className={containerForNewMember}
      onMouseEnter={dev && mouseEnter}
      onMouseLeave={dev && mouseLeave}
    >
      <Card developerInfo={newMemberDetails} />
    </div>
  );
};

export default NewMemberListItem;
