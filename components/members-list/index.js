import React from 'react';
import MemberListItem from 'components/member-list-item';
import Loader from 'components/loader';

import useFetch from 'custom-hooks/useFetch';
import classNames from './member-list.module.scss';

const URL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/ids/mapping.json';

const MembersList = () => {
  let { loading, error, data } = useFetch(URL);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data) {
    let rdsIds = Object.keys(data);
    return (
      <div className={classNames.container}>
        {rdsIds.map((rdsId) => (
          <React.Fragment key={rdsId}>
            <MemberListItem rdsId={rdsId} />
          </React.Fragment>
        ))}
      </div>
    );
  }

  return null;
};

export default MembersList;
