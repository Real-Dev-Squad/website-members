import React from 'react';
import MemberListItem from 'components/member-list-item';
import classNames from 'components/members-list/member-list.module.scss';
import { membersContext } from 'store/members/members-context';

const MembersList = () => {
  const {
    state: { membersArr },
  } = membersContext();
  if (membersArr) {
    return (
      <div className={classNames.container}>
        {membersArr.map((ele) => (
          <React.Fragment key={ele.id}>
            <MemberListItem memberDetails={ele} />
          </React.Fragment>
        ))}
      </div>
    );
  }

  return null;
};

export default MembersList;
