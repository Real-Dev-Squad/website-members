import NewMemberListItem from 'components/new-member-list-item';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'components/new-member-list/new-member-list.module.scss';
import { membersContext } from 'store/members/members-context';

const NewMemberList = ({ searchTerm }) => {
  const {
    state: { newMembersArr }
  } = membersContext();
  if (newMembersArr) {
    return (
      <div className={classNames.container}>
        {newMembersArr.length > 0 &&
          newMembersArr
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
                {(ele.first_name || ele.username) && <NewMemberListItem newMemberDetails={ele} />}
              </React.Fragment>
            ))}
      </div>
    );
  }
  return null;
};

NewMemberList.propTypes = {
  newMembersArr: PropTypes.array,
  searchTerm: PropTypes.string
};

NewMemberList.defaultProps = {
  newMembersArr: []
};

export default NewMemberList;
