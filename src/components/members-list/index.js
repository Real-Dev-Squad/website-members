import React from 'react';
import MemberListItem from '@components/member-list-item';
import classNames from '@components/members-list/member-list.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMember-context';
import { searchMembers } from '@helper-functions/search-members';

const MembersList = () => {
  const {
    state: { membersArr },
  } = membersContext();
  const { searchTerm } = searchMemberContext();
  const filterMembers = searchMembers(membersArr, searchTerm);
  if (membersArr) {
    return (
      <div className={classNames.container}>
        {filterMembers.length > 0 &&
          filterMembers.map((member) => (
            <React.Fragment key={member.id}>
              {(member.first_name || member.username) && (
                <MemberListItem memberDetails={member} />
              )}
            </React.Fragment>
          ))}
      </div>
    );
  }

  return null;
};

export default MembersList;
