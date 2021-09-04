import MemberList from '@components/members-list';
import classNames from '@components/pages/home-page.module.scss';
import NewMemberList from '@components/new-member-list';

const HomePage = () => {
  return (
    <div className={classNames.container}>
      <img
        className={classNames.img}
        src="/images/Real-Dev-Squad@1x.png"
        alt="real-dev squad"
      />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
      <MemberList />
      <h1 className={classNames.heading}>New Members</h1>
      <NewMemberList />
    </div>
  );
};

export default HomePage;
