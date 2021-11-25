import React from 'react';
import MemberListItem from '@components/member-list-item';
import classNames from '@components/members-list/member-list.module.scss';
import designersMockJSON from '@components/designers/mock-data';

const Designers = () => {
  const { designers } = designersMockJSON;
  return (
    <div className={classNames.container}>
      {designers.map((ele) => (
        <React.Fragment key={ele.id}>
          <MemberListItem memberDetails={ele} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Designers;
