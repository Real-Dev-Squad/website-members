import { useRouter } from 'next/router';
import MemberList from '@components/members-list';
import classNames from '@components/pages/home-page.module.scss';
import NewMemberList from '@components/new-member-list';
import UserProfile from '@components/user-profile';
import MemberRoleUpdate from '@components/member-role-update';
import Designers from '@components/designers';
import { userContext } from '@store/user/user-context';
import { useState } from 'react';

const HomePage = () => {
  const { showMemberRoleUpdateModal, isSuperUserMode } = userContext();

  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const [optionKey, setOptionKey] = useState(false);

  return (
    <div
      className={classNames.container}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Alt') {
          setOptionKey(true);
        }
      }}
      onKeyUp={() => {
        setOptionKey(false);
      }}
    >
      {dev && <UserProfile />}
      <img
        className={classNames.img}
        src="/images/Real-Dev-Squad@1x.png"
        alt="real-dev squad"
      />
      {dev && (
        <>
          <h1 className={classNames.heading}>Designers</h1>
          <Designers />
        </>
      )}
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
      {isSuperUserMode && (
        <div id="memberRoleUpdateModal">
          {showMemberRoleUpdateModal && <MemberRoleUpdate />}
        </div>
      )}
      <MemberList optionKey={optionKey} />
      <h1 className={classNames.heading}>New Members</h1>
      <NewMemberList optionKey={optionKey} />
    </div>
  );
};

export default HomePage;
