import PropTypes from 'prop-types';
import { timeWas } from '../../../../helper-functions/time-was';

const Dates = (props) => {
  const { isTaskAvailable, startedOn, endsOn, status, what, allContributionObj } = props;
  let completedText = 'Completed in:';
  let completedDate = '';
  let featureLiveOnText = '';
  let featureLiveDate = '';

  if (isTaskAvailable) {
    if (status === 'Active') {
      completedText = 'Estimated Completion:';
      completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);
    } else {
      completedDate = timeWas(endsOn * 1000);
      featureLiveDate = timeWas(endsOn * 1000, true);
      featureLiveOnText = `Feature live on ${featureLiveDate}`;
    }
  } else {
    const createdAt = +new Date(allContributionObj['createdAt']);
    const updatedAt = +new Date(allContributionObj['updatedAt']);
    if (allContributionObj['state'] === 'closed') {
      completedDate = timeWas(createdAt, false, updatedAt);
      featureLiveDate = timeWas(updatedAt, true);
      featureLiveOnText = `Feature live on ${featureLiveDate}`;
    }
  }

  return what === 'completed' ? (
    <p>
      <span>{completedText}</span> {completedDate}
    </p>
  ) : (
    <div>{featureLiveOnText}</div>
  );
};

Dates.defaultProps = {
  isTaskAvailable: 'false',
  startedOn: '',
  endsOn: '',
  status: '',
  what: '',
  allContributionObj: {
    createdAt: '',
    updatedAt: '',
    state: ''
  }
};

Dates.propTypes = {
  isTaskAvailable: PropTypes.bool,
  startedOn: PropTypes.string,
  endsOn: PropTypes.string,
  status: PropTypes.string,
  what: PropTypes.string,
  allContributionObj: PropTypes.shape({
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    state: PropTypes.string
  })
};

export default Dates;
