import React from 'react';
import PropTypes from 'prop-types';
import MemberListItem from 'components/member-list-item';
import classNames from 'components/members-list/member-list.module.scss';
import { useMembers } from 'store/members/members-context';

const MembersList = () => {
  const {
    state: { membersArr }
  } = useMembers();
  if (membersArr) {
    return (
      <div className={classNames.container}>
        {membersArr.map((ele) => (
          <React.Fragment key={ele['id']}>
            <MemberListItem memberDetails={ele} />
          </React.Fragment>
        ))}
      </div>
    );
  }

  return null;
};

MembersList.propTypes = {
  membersArr: PropTypes.array
};

MembersList.defaultProps = {
  membersArr: []
};

export default MembersList;
