import React from 'react';
import PreviewContainer from '@components/preview-container';
import { membersContext } from '@store/members/members-context';

import styles from '@components/members/members.module.scss';

const Members = ({ optionKey }) => {
  const {
    state: { members },
  } = membersContext();

  if (members) {
    return (
      <div className={styles.container}>
        {members.map((member) => (
          <React.Fragment key={member.id}>
            <PreviewContainer optionKey={optionKey} memberDetails={member} />
          </React.Fragment>
        ))}
      </div>
    );
  }

  return null;
};

export default Members;
