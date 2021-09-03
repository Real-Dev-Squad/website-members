import NewMemberListItem from 'components/new-member-list-item';
import React from 'react';
import classNames from 'components/new-member-list/new-member-list.module.scss';
import { membersContext } from 'store/members/members-context';

const NewMemberList = () => {
  const {
    state: { newMembersArr },
  } = membersContext();
  if (newMembersArr) {
    return (
      <div className={classNames.container}>
        {newMembersArr.map((ele) => (
          <React.Fragment key={ele.id}>
            {(ele.first_name || ele.username) && (
              <NewMemberListItem newMemberDetails={ele} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;
