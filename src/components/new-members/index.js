import React from 'react';
import Card from '@components/member-card';
import PropTypes from 'prop-types';
import styles from '@components/new-members/new-members.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMembers-context';
import { searchMembers } from '@helper-functions/search-members';

const cardColorArray = [
  { color_primary: '#DB1212', color_secondary: '#F88181' },
  { color_primary: '#E9C46A', color_secondary: '#FFE094' },
  { color_primary: '#F4A261', color_secondary: '#FFBF8C' },
  { color_primary: '#2A9D8F', color_secondary: '#42E0CD' },
  { color_primary: '#165692', color_secondary: '#3D8BD3' },
  { color_primary: '#264653', color_secondary: '#387892' },
];
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
  // console.log(filterMembers);
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
