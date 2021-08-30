import { useState } from 'react';
import PropTypes from 'prop-types';
import MemberList from 'components/members-list';
import classNames from 'components/pages/home-page.module.scss';
import NewMemberList from 'components/new-member-list';
import SearchMembers from 'components/search-members/index';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className={classNames.container}>
      <SearchMembers handleChange={(event) => setSearchTerm(event.target.value)} />
      <img className={classNames.img} src="/images/Real-Dev-Squad@1x.png" alt="real-dev squad" />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
      <MemberList searchTerm={searchTerm} />
      <h1 className={classNames.heading}>New Members</h1>
      <NewMemberList searchTerm={searchTerm} />
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
