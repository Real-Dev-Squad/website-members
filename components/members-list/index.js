import React from 'react';
import PropTypes from 'prop-types';
import MemberListItem from 'components/member-list-item';
import classNames from './member-list.module.scss';

const MembersList = ({ membersKey }) => {
  if (membersKey) {
    const rdsIds = Object.keys(membersKey);
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

MembersList.propTypes = {
  membersKey: PropTypes.object
};

MembersList.defaultProps = {
  membersKey: ''
};

export default MembersList;
