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
import { useState, useEffect } from 'react';
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

  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const [isOptionKey, setIsOptionKey] = useState(false);
  const [newMembers, setNewMembers] = useState([]);

  let scrollCount = 1;
  const membersToShow = 20;

  const fetchNewMembers = () => {
    const noOfMembersToShow = scrollCount * membersToShow;
    const slicedNewMembersList = newMembersList.slice(0, noOfMembersToShow);
    setNewMembers(slicedNewMembersList);
  };

  const handleScroll = () => {
    const userScrollHeight = window.innerHeight + window.scrollY;
    const windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight) {
      scrollCount += 1;
      fetchNewMembers();
    }
  };

  useEffect(() => {
    fetchNewMembers();
    window.addEventListener('scroll', handleScroll);
  }, [newMembersList]);

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
    </div>
  );
};

export default Home;
