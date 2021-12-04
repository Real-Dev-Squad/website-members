import NewMemberListItem from '@components/new-member-list-item';
import React from 'react';
import classNames from '@components/new-member-list/new-member-list.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/searchbox/searchMember-context';

const NewMemberList = () => {
  const {
    state: { newMembersArr },
  } = membersContext();
  const { searchTerm } = searchMemberContext();
  if (newMembersArr) {
    return (
      <div className={classNames.container}>
        {newMembersArr.length > 0 &&
          newMembersArr
            .filter(
              (member) =>
                member.first_name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()) ||
                member.last_name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
            )
            .map((member) => (
              <React.Fragment key={member.id}>
                {(member.first_name || member.username) && (
                  <NewMemberListItem newMemberDetails={member} />
                )}
              </React.Fragment>
            ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;
