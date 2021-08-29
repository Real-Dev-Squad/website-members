import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'components/member-profile/contribution/contribution.module.scss';
import PRLink from 'components/member-profile/contribution/pr-link';
import { timeWas } from 'helper-functions/time-was';
import { HOST_NAME } from 'constants/AppConstants';

const renderPRLinks = (prList) =>
  prList.map(({ url }, index) => {
    return <PRLink link={url} key={index} />;
  });

const Contribution = ({ contribution, fullName, imageLink, devUser }) => {
  const {
    task: { featureUrl },
    prList
  } = contribution;
  const url = featureUrl || prList[0]['url'];
  const gotoUrl = () => url && window.open(url, '_blank');
  const urlObj = url && new URL(url);
  const contributionCard = () => (
    <ContributionCard
      contribution={contribution}
      fullName={fullName}
      imageLink={imageLink}
      devUser={devUser}
      url={url}
      urlObj={urlObj}
    />
  );
  const renderFeatureCard = () => {
    if (urlObj?.host === HOST_NAME) {
      return (
        <Link href={urlObj.pathname}>
          <div className={url && classNames.contributionCard}>{contributionCard()}</div>
        </Link>
      );
    }
    return (
      <div
        className={url && classNames.contributionCard}
        onClick={gotoUrl}
        onKeyDown={gotoUrl}
        aria-hidden="true">
        {contributionCard()}
      </div>
    );
  };

  return renderFeatureCard();
};

const ContributionCard = ({ contribution, fullName, imageLink, devUser, url, urlObj }) => {
  const {
    task: { title, startedOn, endsOn, status, purpose },
    prList
  } = contribution;
  const isTitleAvailable = title ? true : false;
  const featureTitle = isTitleAvailable ? title : prList[0].title;

  const renderFeatureUrl = (url, urlObj) => {
    if (urlObj.host === HOST_NAME) {
      return (
        <Link href={urlObj.pathname} onClick={(e) => e.stopPropagation()}>
          Check out this feature in action
        </Link>
      );
    }
    return (
      <a href={url} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer">
        Check out this feature in action
      </a>
    );
  };
  let completedText = '';
  let completedDate = '';
  let featureLiveOnText = '';
  let featurLiveDate = '';

  if (isTitleAvailable) {
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
      completedText = <span className={classNames.completedText}>Completed in </span>;
      featurLiveDate = timeWas(updatedAt, true);
      featureLiveOnText = `Feature live on ${featurLiveDate}`;
    }
  }
  return (
    <div>
      <div className={classNames.contributionContainer}>
        <div className={classNames.leftSection}>
          <h3 className={classNames.featureTitle}>{featureTitle}</h3>
          <p className={classNames.prDescription}>{purpose}</p>
          <div className={classNames.completedData}>
            {completedText}
            <p className={classNames.completedDate}>{completedDate}</p>
          </div>
          <div className={classNames.featureLiveOnText}>{featureLiveOnText}</div>
        </div>
        <div className={classNames.rightSection}>
          <div className={classNames.prLink}>{renderPRLinks(prList)}</div>
          <div className={classNames.userIcon}>
            <img src={imageLink} alt="participantsIcon" />
            <span>{fullName}</span>
          </div>
          {devUser && (
            <div className={classNames.tags}>
              <button type="button">DX</button>
              <button type="button">NodeJS</button>
            </div>
          )}
        </div>
      </div>
      {url && <div className={classNames.featureLink}>{renderFeatureUrl(url, urlObj)}</div>}
      <hr className={classNames.line}></hr>
    </div>
  );
};

Contribution.propTypes = {
  contribution: PropTypes.shape({
    prList: PropTypes.array,
    task: PropTypes.object
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  devUser: PropTypes.bool
};

ContributionCard.propTypes = {
  contribution: PropTypes.shape({
    prList: PropTypes.array,
    task: PropTypes.object
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  devUser: PropTypes.bool,
  url: PropTypes.string.isRequired,
  urlObj: PropTypes.object.isRequired
};

export default Contribution;
