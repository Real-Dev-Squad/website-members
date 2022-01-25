import React from 'react';
import PreviewContainer from '@components/preview-container';
import designersMockJSON from '@components/designers/mock-data';

import styles from '@components/members/members.module.scss';

const Designers = () => {
  const { designers } = designersMockJSON;
  return (
    <div className={styles.container}>
      {designers.map((designer) => (
        <React.Fragment key={designer.id}>
          <PreviewContainer memberDetails={designer} designer />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Designers;
