import React from 'react';
import Card from '@components/member-card';
import PropTypes from 'prop-types';
import styles from '@components/new-members/new-members.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMembers-context';
import { searchMembers } from '@helper-functions/search-members';
import { cardColorArray } from '@constants/member-constants.js';

let counter = 0;

// returns card which shows details of new member
const renderNewMember = (newMember, isOptionKey) => {
  const prev = counter;
  counter += 1;
  if (counter > cardColorArray.length - 1) counter = 0;
  return (
    <div className={styles.containerForNewMember}>
      {process.browser && (
        <Card
          developerInfo={newMember}
          isMember={false}
          isOptionKey={isOptionKey}
          colorCombination={cardColorArray[prev]}
        />
      )}
    </div>
  );
};

const NewMemberList = ({ isOptionKey }) => {
  const {
    state: { newMembers },
  } = membersContext();
  const { searchTerm } = searchMemberContext();
  const filterMembers = searchMembers(newMembers, searchTerm);

  if (newMembers) {
    return (
      <div className={styles.container}>
        {filterMembers.map((newMember) => (
          <React.Fragment key={newMember.id}>
            {renderNewMember(newMember, isOptionKey)}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;

NewMemberList.propTypes = {
  isOptionKey: PropTypes.bool,
};
NewMemberList.defaultProps = {
  isOptionKey: false,
};
