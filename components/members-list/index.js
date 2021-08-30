import React from 'react';
import PropTypes from 'prop-types';
import MemberListItem from 'components/member-list-item';
import classNames from 'components/members-list/member-list.module.scss';
import { membersContext } from 'store/members/members-context';

const MembersList = ({ searchTerm }) => {
  const {
    state: { membersArr }
  } = membersContext();
  if (membersArr) {
    console.log(membersArr);
    return (
      <div className={classNames.container}>
        {membersArr.length > 0 &&
          membersArr
            .filter((ele) => {
              if (searchTerm === '') {
                return ele;
              } else if (ele.first_name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                return ele;
              } else if (ele.last_name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                return ele;
              } else {
                return null;
              }
            })
            .map((ele) => (
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
  membersArr: PropTypes.array,
  searchTerm: PropTypes.string
};

MembersList.defaultProps = {
  membersArr: []
};

export default MembersList;
