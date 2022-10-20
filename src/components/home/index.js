import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Members from '@components/members';
import NewMembers from '@components/new-members';
import MemberRoleUpdate from '@components/member-role-update';
import Designers from '@components/designers';
import SearchBox from '@components/UI/search-box/index';
import styles from '@components/home/home.module.scss';
import { userContext } from '@store/user/user-context';
import {
  BRAND_NAME,
  MEMBERS_TITLE,
  NEW_MEMBERS_TITLE,
} from '@constants/AppConstants';

const Home = () => {
  const { showMemberRoleUpdateModal, isSuperUser, setUserPrivileges } =
    userContext();
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;

  const memoizeUserPrivilege = useCallback(async () => {
    await setUserPrivileges();
  }, [setUserPrivileges]);

  useEffect(() => {
    memoizeUserPrivilege();
  }, [memoizeUserPrivilege]);

  return (
    <div className={styles.container}>
      {dev && <SearchBox />}
      <h1 className={styles.heading}>Designers</h1>
      <Designers />
      <h1 className={styles.heading}>{`${BRAND_NAME} ${MEMBERS_TITLE}`}</h1>
      {isSuperUser && (
        <div id="memberRoleUpdateModal">
          {showMemberRoleUpdateModal && <MemberRoleUpdate />}
        </div>
      )}
      <Members />
      <h1 className={styles.heading}>{NEW_MEMBERS_TITLE}</h1>
      <NewMembers />
    </div>
  );
};

export default Home;
