import { useContext } from 'react';
import MemberList from '@components/members-list';
import classNames from '@components/pages/home-page.module.scss';
import NewMemberList from '@components/new-member-list';
import UserProfile from '@components/user-profile';
import MemberRoleUpdate from '@components/member-role-update';
import UserContext from '@store/user/user-context';

const HomePage = () => {
  const { showMemberRoleUpdateModal } = useContext(UserContext);

  return (
    <div className={classNames.container}>
      <UserProfile />
      <img
        className={classNames.img}
        src="/images/Real-Dev-Squad@1x.png"
        alt="real-dev squad"
      />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
      <div id="memberRoleUpdateModal">
        {showMemberRoleUpdateModal && <MemberRoleUpdate />}
      </div>
      <MemberList />
      <h1 className={classNames.heading}>New Members</h1>
      <NewMemberList />
    </div>
  );
};

export default HomePage;
