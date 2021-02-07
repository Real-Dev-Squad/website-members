import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from './contribution.module.scss';
import PRLink from './pr-link/';
import Dates from './dates/';

const renderPRLinks = (prList) =>
  prList.map(({ url }, index) => {
    return <PRLink link={url} key={index} />;
  });

const Contribution = ({ contribution, fullName, imageLink }) => {
  const {
    task: { title, startedOn, endsOn, purpose, featureUrl, status },
    prList
  } = contribution;
  const [showMoreContent, setShowMoreContent] = useState(false);

  const showMoreContentHandler = () => {
    setShowMoreContent((prevstate) => !prevstate);
  };

  const [allContributionObj] = prList;

  const showText = showMoreContent ? 'Show less' : 'Show more';
  const showMoreContentClass = showMoreContent ? classNames.showContent : classNames.hideContent;

  const isTaskAvailable = !!title;

  return (
    <div className={classNames.contributionContainer}>
      <section className={classNames.heading}>
        <span id={classNames.featureTitle}>
          {isTaskAvailable ? title : allContributionObj.title}
        </span>
        <div className={classNames.prLink}>{renderPRLinks(prList)}</div>
      </section>
      {isTaskAvailable && (
        <div className={showMoreContentClass}>
          <p className={classNames.featureDescription}>{purpose}</p>
          <p className={classNames.userIcon}>
            <img src={imageLink} className={classNames.participantIcon} alt="participantsIcon" />
            <span>{fullName}</span>
          </p>
          {featureUrl > '' && (
            <p id={classNames.featureLink}>
              <a href={featureUrl} target="_blank" rel="noreferrer" className={classNames.linkText}>
                Click here to checkout this feature
              </a>
            </p>
          )}
        </div>
      )}
      <Dates
        what="completed"
        isTaskAvailable={isTaskAvailable}
        startedOn={startedOn}
        endsOn={endsOn}
        status={status}
        allContributionObj={allContributionObj}
      />
      <div className={classNames.featureBottomContainer}>
        <Dates
          what="feature"
          isTaskAvailable={isTaskAvailable}
          startedOn={startedOn}
          endsOn={endsOn}
          status={status}
          allContributionObj={allContributionObj}
        />
        {isTaskAvailable && (
          <button onClick={showMoreContentHandler} onKeyPress={showMoreContentHandler}>
            {showText}
          </button>
        )}
      </div>
    </div>
  );
};

Contribution.propTypes = {
  contribution: PropTypes.shape({
    prList: PropTypes.array,
    task: PropTypes.object
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired
};

export default Contribution;
