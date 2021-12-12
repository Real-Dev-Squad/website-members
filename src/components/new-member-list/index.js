import NewMemberListItem from '@components/new-member-list-item';
import React from 'react';
import classNames from '@components/new-member-list/new-member-list.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMember-context';
import { searchMembers } from '@helper-functions/search-members';

const NewMemberList = () => {
  const {
    state: { newMembersArr },
  } = membersContext();
  const { searchTerm } = searchMemberContext();
  const filterMembers = searchMembers(newMembersArr, searchTerm);
  if (newMembersArr) {
    return (
      <div className={classNames.container}>
        {filterMembers.length > 0 &&
          filterMembers.map((member) => (
            <React.Fragment key={member.id}>
              <NewMemberListItem newMemberDetails={member} />
            </React.Fragment>
          ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;
