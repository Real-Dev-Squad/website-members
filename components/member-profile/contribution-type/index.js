import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from './contributions-type.module.scss';
import Contribution from '../contribution/';
import { INIT_CONTRIBUTIONS } from '../../../constants/contributions';

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

const ContributionType = (props) => {
  const { fullName, type, imageLink, contributions, devUser } = props;

  const [showMoreContent, setShowMoreContent] = useState(true);
  const [count, setCount] = useState(INIT_CONTRIBUTIONS);

  const showMoreContentHandler = () => {
    setCount(INIT_CONTRIBUTIONS);
    setShowMoreContent((prevstate) => !prevstate);
  };

  const loadMoreHandler = () => {
    setCount((prevCount) => prevCount + INIT_CONTRIBUTIONS);
  };

  const showMoreContentClass = showMoreContent ? classNames.showContent : classNames.hideContent;
  const arrowWithDirection = showMoreContent
    ? `${classNames.arrow} ${classNames.arrowDown}`
    : `${classNames.arrow} ${classNames.arrowRight}`;
  return (
    <div className={classNames.container}>
      <h2
        className={classNames.pointerCursor}
        onClick={showMoreContentHandler}
        onKeyPress={showMoreContentHandler}
        role="presentation">
        {type} contributions
        <div className={arrowWithDirection}></div>
      </h2>
      <div className={showMoreContentClass}>
        {renderContributions(contributions.slice(0, count), fullName, imageLink, devUser)}
        {count <= contributions.length && (
          <div className={classNames.loadDiv}>
            <button className={classNames.loadButton} onClick={loadMoreHandler}>
              Load more
            </button>
          </div>
        )}
      </div>
      <hr className={classNames.hrLine}></hr>
    </div>
  );
};

ContributionType.propTypes = {
  imageLink: PropTypes.string,
  type: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  contributions: PropTypes.array,
  devUser: PropTypes.bool
};

ContributionType.defaultProps = {
  imageLink: '',
  type: '',
  contributions: [],
  devUser: false
};

export default ContributionType;
