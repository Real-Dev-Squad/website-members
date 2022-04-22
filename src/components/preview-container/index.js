import React from 'react';
import PropTypes from 'prop-types';
import Card from '@components/member-card';
import MemberPreview from '@components/preview-container/preview-member';

import styles from '@components/preview-container/preview-container.module.scss';

const PreviewContainer = ({ memberDetails, designer, isOptionKey }) => {
  return (
    <>
      {designer ? (
        <div className={styles.designerContainer}>
          <Card developerInfo={memberDetails} />
        </div>
      ) : (
        <MemberPreview
          isOptionKey={isOptionKey}
          memberDetails={memberDetails}
        />
      )}
    </>
  );
};

PreviewContainer.propTypes = {
  memberDetails: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    isOptionKey: PropTypes.bool,
  }),
  designer: PropTypes.bool,
};
PreviewContainer.defaultProps = {
  memberDetails: {},
  designer: false,
};

export default PreviewContainer;
