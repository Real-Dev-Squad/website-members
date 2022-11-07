/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import classNames from '@components/member-profile/load-more-btn/load-more-btn.module.scss';

const LoadMoreButton = (props) => {
  const { loadMoreHandler } = props;

  return (
    <div className={classNames.loadDiv}>
      <button className={classNames.loadButton} onClick={loadMoreHandler}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;
