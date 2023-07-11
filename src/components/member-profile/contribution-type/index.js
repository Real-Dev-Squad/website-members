/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from '@components/member-profile/contribution-type/contributions-type.module.scss';
import Contribution from '@components/member-profile/contribution/';
import ActiveTask from '@components/member-profile/active-task';

const ASSIGNED = 'ASSIGNED';

const renderContributions = (contributions, fullName, imageLink, devUser) => {
  const allContributions = contributions.filter(
    ({ task }) => task.status !== ASSIGNED
  );

  return allContributions.map((noteWorthyContribution, index) => (
    <Contribution
      contribution={noteWorthyContribution}
      key={index}
      fullName={fullName}
      imageLink={imageLink}
      devUser={devUser}
    />
  ));
};

const renderActiveTasks = (tasks) => {
  return (
    tasks &&
    tasks.map((task, index) => {
      return <ActiveTask key={index} taskDetails={task} />;
    })
  );
};

const ContributionType = (props) => {
  const { fullName, type, imageLink, contributions, devUser, tasks } = props;
  const [showMoreContent, setShowMoreContent] = useState(false);
  const isContribution = type === 'Noteworthy' || type === 'All';

  useEffect(() => {
    if (isContribution) {
      setShowMoreContent(contributions.length > 0);
      return;
    }
    setShowMoreContent(tasks.length > 0);
  }, [tasks.length, contributions.length]);

  const showMoreContentHandler = () => {
    if (isContribution) {
      if (contributions.length > 0) {
        setShowMoreContent(!showMoreContent);
      }
    }
    if (tasks.length > 0) {
      setShowMoreContent(!showMoreContent);
    }
  };

  const showMoreContentClass = showMoreContent
    ? classNames.showContent
    : classNames.hideContent;
  const arrowWithDirection = showMoreContent
    ? `${classNames.arrow} ${classNames.arrowDown}`
    : `${classNames.arrow} ${classNames.arrowRight}`;
  return (
    <div className={classNames.container}>
      <h2
        className={classNames.pointerCursor}
        onClick={showMoreContentHandler}
        onKeyPress={showMoreContentHandler}
        role="presentation"
      >
        {type} {type !== 'Active tasks' ? 'contributions' : null}
        <div className={arrowWithDirection} />
      </h2>
      <div className={showMoreContentClass}>
        {type !== 'Active tasks' ? (
          <div>
            {renderContributions(contributions, fullName, imageLink, devUser)}
          </div>
        ) : (
          <div>{renderActiveTasks(tasks)}</div>
        )}
      </div>
      <hr className={classNames.hrLine} />
    </div>
  );
};

ContributionType.propTypes = {
  imageLink: PropTypes.string,
  type: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  contributions: PropTypes.instanceOf(Array),
  devUser: PropTypes.bool,
  tasks: PropTypes.instanceOf(Array),
};

ContributionType.defaultProps = {
  imageLink: '',
  type: '',
  contributions: [],
  devUser: false,
  tasks: [],
};

export default ContributionType;
