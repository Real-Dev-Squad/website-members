/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from '@components/member-profile/contribution-type/contributions-type.module.scss';
import Contribution from '@components/member-profile/contribution/';
import ActiveTask from '@components/member-profile/active-task';
import LoadMoreButton from '@components/member-profile/load-more-btn';

const INIT_CONTRIBUTIONS = 3;

const renderContributions = (contributions, fullName, imageLink, devUser) =>
  contributions.map((noteWorthyContribution, index) => (
    <Contribution
      contribution={noteWorthyContribution}
      key={index}
      fullName={fullName}
      imageLink={imageLink}
      devUser={devUser}
    />
  ));

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
  const initCount =
    devUser === true ? INIT_CONTRIBUTIONS : contributions.length;

  const [showMoreContent, setShowMoreContent] = useState(true);
  const [count, setCount] = useState(initCount);

  const showMoreContentClass = showMoreContent
    ? classNames.showContent
    : classNames.hideContent;

  const arrowWithDirection = showMoreContent
    ? `${classNames.arrow} ${classNames.arrowDown}`
    : `${classNames.arrow} ${classNames.arrowRight}`;

  const contributionInformation = renderContributions(
    contributions.slice(0, count),
    fullName,
    imageLink,
    devUser
  );

  const showMoreContentHandler = () => {
    setCount(initCount);
    setShowMoreContent((prevstate) => !prevstate);
  };

  const loadMoreHandler = () =>
    setCount((prevCount) => prevCount + INIT_CONTRIBUTIONS);

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
            {contributionInformation}
            {count <= contributions.length && devUser && (
              <LoadMoreButton loadMoreHandler={loadMoreHandler} />
            )}
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
