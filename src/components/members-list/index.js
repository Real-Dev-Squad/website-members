import React from 'react';
import MemberListItem from '@components/member-list-item';
import classNames from '@components/members-list/member-list.module.scss';
import { membersContext } from '@store/members/members-context';

const MembersList = ({ searchTerm }) => {
  const {
    state: { membersArr },
  } = membersContext();
  if (membersArr) {
    return (
      <div className={classNames.container}>
        {membersArr.length > 0 &&
          membersArr
            .filter(
              (ele) =>
                ele.first_name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()) ||
                ele.last_name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
            )
            .map((ele) => (
              <React.Fragment key={ele.id}>
                {(ele.first_name || ele.username) && (
                  <MemberListItem memberDetails={ele} />
                )}
              </React.Fragment>
            ))}
      </div>
    );
  }

  return null;
};

export default MembersList;
