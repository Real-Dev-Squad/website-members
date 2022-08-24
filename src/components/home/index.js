import { useRouter } from 'next/router';
import Members from '@components/members';
import NewMembers from '@components/new-members';
import UserProfile from '@components/user-profile';
import MemberRoleUpdate from '@components/member-role-update';
import Designers from '@components/designers';
import SearchBox from '@components/UI/search-box/index';
import styles from '@components/home/home.module.scss';
import { userContext } from '@store/user/user-context';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMembers-context';
import { searchMembers } from '@helper-functions/search-members';
import { useState, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';

import {
  BRAND_NAME,
  MEMBERS_TITLE,
  NEW_MEMBERS_TITLE,
} from '@constants/AppConstants';

const Home = () => {
  const { showMemberRoleUpdateModal, isSuperUserMode } = userContext();
  const {
    state: { newMembers: newMembersList },
  } = membersContext();
  const { searchTerm } = searchMemberContext();
  const filterMembersList = searchMembers(newMembersList, searchTerm);

  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const [isOptionKey, setIsOptionKey] = useState(false);
  const [newMembers, setNewMembers] = useState([]);
  const [scrollCount, setScrollCount] = useState(0);

  const membersToShow = 10;

  const fetchNewMembers = () => {
    const newMemberArr = searchTerm ? filterMembersList : newMembersList;
    const noOfMembersToShow = scrollCount * membersToShow;
    const slicedNewMembersList = newMemberArr.slice(0, noOfMembersToShow);
    setNewMembers(slicedNewMembersList);
    setScrollCount(scrollCount + 1);
  };

  useEffect(() => {
    fetchNewMembers();
  }, [newMembersList]);

  const loadMoreData = () => {
    fetchNewMembers();
  };

  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Alt') {
          setIsOptionKey(true);
        }
      }}
      onKeyUp={() => {
        setIsOptionKey(false);
      }}
    >
      <UserProfile />
      {dev && <SearchBox />}
      <h1 className={styles.heading}>Designers</h1>
      <Designers />
      <h1 className={styles.heading}>{`${BRAND_NAME} ${MEMBERS_TITLE}`}</h1>
      {isSuperUserMode && (
        <div id="memberRoleUpdateModal">
          {showMemberRoleUpdateModal && <MemberRoleUpdate />}
        </div>
      )}
      <Members isOptionKey={isOptionKey} />
      <h1 className={styles.heading}>{NEW_MEMBERS_TITLE}</h1>
      <NewMembers newMembers={newMembers} isOptionKey={isOptionKey} />
      {newMembers && <Waypoint onEnter={loadMoreData} />}
    </div>
  );
};

export default Home;
