import PropTypes from 'prop-types';
import classNames from 'components/member-profile/active-task/active-task.module.scss';
import { timeWas } from 'helper-functions/time-was';
import { percentageofDaysRemaining } from 'helper-functions/taskProgress';
import { estimatedDays } from 'helper-functions/estimated-days';
import { showProgressIndicatorColour } from 'helper-functions/showProgressIndicator';

const ActiveTask = ({ taskDetails }) => {
  const { title, purpose, startedOn, endsOn, percentCompleted } = taskDetails;
  const completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);
  const percentOfTaskLeft = 100 - percentCompleted;
  const percentageOfDaysRemaining = percentageofDaysRemaining(startedOn, endsOn, completedDate);
  const showEstimatedDay = estimatedDays(percentageOfDaysRemaining, percentOfTaskLeft, classNames);
  const showProgressIndicator = showProgressIndicatorColour(showEstimatedDay, classNames);

  return (
    <div className={classNames.container}>
      <div className={classNames.taskSection}>
        <h3 className={classNames.featureTitle}>{title}</h3>
        <p className={classNames.prDescription}>{purpose}</p>
        <div className={classNames.completedData}>
          <span>Estimated Completion in </span>
          <p className={showEstimatedDay}>{completedDate}</p>
        </div>
      </div>
      <div className={classNames.progressSection}>
        <div className={classNames.progressText}>
          {percentCompleted > 0 && 'This is in progress'}
        </div>
        <div className={classNames.progressBar}>
          <div className={showProgressIndicator} style={{ width: `${percentCompleted}%` }}></div>
        </div>
        <span
          className={classNames.showPercentCompletedText}>{`${percentCompleted}% complete`}</span>
      </div>
    </div>
  );
};

ActiveTask.propTypes = {
  taskDetails: PropTypes.object
};

ActiveTask.defaultProps = {
  taskDetails: {}
};

export default ActiveTask;
