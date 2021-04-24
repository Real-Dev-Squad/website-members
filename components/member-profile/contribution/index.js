import PropTypes from 'prop-types';
import classNames from './contribution.module.scss';
import PRLink from './pr-link/';
import { timeWas } from '../../../helper-functions/time-was';

const renderPRLinks = (prList) =>
  prList.map(({ url }, index) => {
    return <PRLink link={url} key={index} />;
  });

const Contribution = ({ contribution }) => {
  const {
    task: { title, startedOn, endsOn, status },
    prList
  } = contribution;
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
      completedText = <span className={classNames.completedText}>Completed in </span>;
      featurLiveDate = timeWas(updatedAt, true);
      featureLiveOnText = `Feature live on ${featurLiveDate}`;
    }
  }

  return (
    <div className={classNames.mainSection}>
      <div className={classNames.contributionContainer}>
        <div className={classNames.leftSection}>
          <h3 className={classNames.featureTitle}>{isTaskAvailable ? title : prList[0].title}</h3>
          <div className={classNames.completedData}>
            {completedText}
            <p className={classNames.completedDate}>{completedDate}</p>
          </div>
          <div className={classNames.featureLiveOnText}>{featureLiveOnText}</div>
        </div>
        <div className={classNames.rightSection}>
          <div className={classNames.prLink}>{renderPRLinks(prList)}</div>
        </div>
      </div>
      <div className={classNames.featureLink}>
        <a href="!#"> Check out this feature in action</a>
      </div>
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
  imageLink: PropTypes.string.isRequired
};

export default Contribution;
