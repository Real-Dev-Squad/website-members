import PropTypes from 'prop-types';
import classNames from '@components/member-profile/active-task/active-task.module.scss';
import { timeWas } from '@helper-functions/time-was';
import { percentageofDaysRemaining } from '@helper-functions/taskProgress';
import { estimatedDays } from '@helper-functions/estimated-days';
import { progressIndicator } from '@helper-functions/progressIndicator';

const ActiveTask = ({ taskDetails, devUser }) => {
  const { title, purpose, startedOn, endsOn, percentCompleted } = taskDetails;
  const completedDate = timeWas(
    startedOn * 1000,
    false,
    endsOn * 1000,
    devUser
  );
  const percentOfTaskLeft = 100 - percentCompleted;
  const percentageOfDaysRemaining = percentageofDaysRemaining(
    startedOn,
    endsOn,
    completedDate,
    devUser
  );
  const showEstimatedDay = estimatedDays(
    percentageOfDaysRemaining,
    percentOfTaskLeft,
    classNames
  );
  const showProgressIndicator = progressIndicator(showEstimatedDay, classNames);

  return (
    <div className={classNames.container}>
      <div className={classNames.taskSection}>
        <h3 className={classNames.featureTitle}>{title}</h3>
        <p className={classNames.prDescription}>{purpose}</p>
        <div className={classNames.completedData}>
          <span>Estimated Completion in </span>
          <p data-testid="completeDate" className={showEstimatedDay}>
            {completedDate}
          </p>
        </div>
      </div>
      <div className={classNames.progressSection}>
        <div data-testid="progressText" className={classNames.progressText}>
          {percentCompleted > 0 && 'This is in progress'}
        </div>
        <div className={classNames.progressBar}>
          <div
            className={showProgressIndicator}
            style={{ width: `${percentCompleted}%` }}
            data-testid="progressIndicator"
          />
        </div>
        <span
          data-testid="percentageCompleted"
          className={classNames.showPercentCompletedText}
        >{`${percentCompleted}% complete`}</span>
      </div>
    </div>
  );
};

ActiveTask.propTypes = {
  taskDetails: PropTypes.shape({
    title: PropTypes.string,
    purpose: PropTypes.string,
    startedOn: PropTypes.string,
    endsOn: PropTypes.string,
    percentCompleted: PropTypes.number,
  }),
};

ActiveTask.defaultProps = {
  taskDetails: {},
};

export default ActiveTask;
