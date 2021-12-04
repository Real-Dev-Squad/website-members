import { useRouter } from 'next/router';
import MemberList from '@components/members-list';
import classNames from '@components/pages/home-page.module.scss';
import NewMemberList from '@components/new-member-list';
import UserProfile from '@components/user-profile';
import MemberRoleUpdate from '@components/member-role-update';
import SearchBox from '@components/UI/search-box/index';
import { userContext } from '@store/user/user-context';

const HomePage = () => {
  const { showMemberRoleUpdateModal, isSuperUserMode } = userContext();
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;

  return (
    <div className={classNames.container}>
      {dev && <SearchBox />}
      {dev && <UserProfile />}
      <img
        className={classNames.img}
        src="/images/Real-Dev-Squad@1x.png"
        alt="real-dev squad"
      />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
      {isSuperUserMode && (
        <div id="memberRoleUpdateModal">
          {showMemberRoleUpdateModal && <MemberRoleUpdate />}
        </div>
      )}
      <MemberList />
      <h1 className={classNames.heading}>New Members</h1>
      <NewMemberList />
    </div>
  );
};

export default HomePage;
