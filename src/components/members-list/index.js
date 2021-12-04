import React from 'react';
import MemberListItem from '@components/member-list-item';
import classNames from '@components/members-list/member-list.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/searchbox/searchMember-context';

const MembersList = () => {
  const {
    state: { membersArr },
  } = membersContext();
  const { searchTerm } = searchMemberContext();
  if (membersArr) {
    return (
      <div className={classNames.container}>
        {membersArr.length > 0 &&
          membersArr
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
