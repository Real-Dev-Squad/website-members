import NewMemberListItem from 'components/new-member-list-item';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from './new-member-list.module.scss';

const NewMemberList = ({ newMembersArr }) => {
  if (newMembersArr) {
    return (
      <div className={classNames.container}>
        {newMembersArr.map((ele) => (
          <React.Fragment key={ele.img_url}>
            <NewMemberListItem newMemberDetails={ele} />
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

NewMemberList.propTypes = {
  newMembersArr: PropTypes.array
};

NewMemberList.defaultProps = {
  newMembersArr: []
};

export default NewMemberList;
