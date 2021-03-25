import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from './contributions-type.module.scss';
import Contribution from '../contribution/';

const renderContributions = (contributions, fullName, imageLink) =>
  contributions.map((noteWorthyContribution, index) => (
    <Contribution
      contribution={noteWorthyContribution}
      key={index}
      fullName={fullName}
      imageLink={imageLink}
    />
  ));

const ContributionType = (props) => {
  const {
    membersData: { first_name, last_name },
    type,
    imageLink,
    contributions
  } = props;

  const fullName = `${first_name} ${last_name}`;

  const [showMoreContent, setShowMoreContent] = useState(true);

  const showMoreContentHandler = () => {
    setShowMoreContent((prevstate) => !prevstate);
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
        {renderContributions(contributions, fullName, imageLink)}
      </div>
      <hr className={classNames.hrLine}></hr>
    </div>
  );
};

ContributionType.propTypes = {
  imageLink: PropTypes.string,
  type: PropTypes.string,
  membersData: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }),
  contributions: PropTypes.array
};

ContributionType.defaultProps = {
  imageLink: '',
  type: '',
  membersData: {
    first_name: '',
    last_name: ''
  },
  contributions: []
};

export default ContributionType;
