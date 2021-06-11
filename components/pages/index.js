import PropTypes from 'prop-types';
import MemberList from 'components/members-list';
import classNames from './home-page.module.scss';
import NewMemberList from 'components/new-member-list';

const HomePage = ({ membersArr, newMembersArr }) => {
  return (
    <div className={classNames.container}>
      <img className={classNames.img} src="/images/Real-Dev-Squad@1x.png" alt="real-dev squad" />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
      <MemberList membersArr={membersArr} />
      <h1 className={classNames.heading}>New Members</h1>
      <NewMemberList newMembersArr={newMembersArr} />
    </div>
  );
};

HomePage.propTypes = {
  membersArr: PropTypes.array,
  newMembersArr: PropTypes.array
};

HomePage.defaultProps = {
  membersArr: [],
  newMembersArr: []
};

export default HomePage;
