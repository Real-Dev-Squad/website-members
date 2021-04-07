import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from './contribution.module.scss';
import PRLink from './pr-link/';
import { timeWas } from '../../../helper-functions/time-was';

const renderPRLinks = (prList) =>
  prList.map(({ url }, index) => {
    return <PRLink link={url} key={index} />;
  });

const Contribution = ({ contribution, fullName, imageLink }) => {
  const {
    task: { title, startedOn, endsOn, purpose, featureUrl, status },
    prList
  } = contribution;
  const [showMoreContent, setShowMoreContent] = useState(true);

  const showMoreContentHandler = () => {
    setShowMoreContent((prevstate) => !prevstate);
  };

  const showText = showMoreContent ? 'Show less' : 'Show more';
  const showMoreContentClass = showMoreContent ? classNames.showContent : classNames.hideContent;

  const isTaskAvailable = title ? true : false;

  let completedText = '';
  let completedDate = '';
  let featureLiveOnText = '';
  let featurLiveDate = '';

  if (isTaskAvailable) {
    if (status === 'Active') {
      completedText = <span>Estimated Completion: </span>;
      completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);
    } else {
      completedDate = timeWas(endsOn * 1000);
      completedText = <span>Completed in: </span>;
      featurLiveDate = timeWas(endsOn * 1000, true);
      featureLiveOnText = `Feature live on ${featurLiveDate}`;
    }
  } else {
    const createdAt = +new Date(prList[0]['createdAt']);
    const updatedAt = +new Date(prList[0]['updatedAt']);
    if (prList[0]['state'] === 'closed') {
      completedDate = timeWas(createdAt, false, updatedAt);
      completedText = <span>Completed in: </span>;
      featurLiveDate = timeWas(updatedAt, true);
      featureLiveOnText = `Feature live on ${featurLiveDate}`;
    }
  }

  return (
    <div className={classNames.contributionContainer}>
      <section className={classNames.heading}>
        <span className={classNames.featureTitle}>{isTaskAvailable ? title : prList[0].title}</span>
        <div className={classNames.prLink}>{renderPRLinks(prList)}</div>
      </section>
      {isTaskAvailable && (
        <div className={showMoreContentClass}>
          <p className={classNames.featureDescription}>{purpose}</p>
          <p className={classNames.userIcon}>
            <img src={imageLink} className={classNames.participantIcon} alt="participantsIcon" />
            <span>{fullName}</span>
          </p>
          <p className={classNames.featureLink}>
            <a href={featureUrl} target="_blank" rel="noreferrer">
              Click here to checkout this feature
            </a>
          </p>
        </div>
      )}
      <p>
        {completedText} {completedDate}
      </p>
      <div className={classNames.featureBottomContainer}>
        <div>{featureLiveOnText}</div>
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
