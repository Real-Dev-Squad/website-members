import PropTypes from 'prop-types';
import classNames from './active-task.module.scss';
import { timeWas } from '../../../helper-functions/time-was';
import { percentageofDaysRemaining } from '../../../helper-functions/taskProgress';

const ActiveTask = ({ taskDetails }) => {
  const { title, purpose, startedOn, endsOn, percentCompleted } = taskDetails;
  let completedDate,
    percentageOfDaysRemaining = '';
  completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);

  let percentOfTaskLeft = 100 - percentCompleted;

  percentageOfDaysRemaining = percentageofDaysRemaining(startedOn, endsOn, completedDate);

  function estimatedDays() {
    if (percentageOfDaysRemaining >= percentOfTaskLeft) {
      return classNames.showTextGreen;
    } else if (percentageOfDaysRemaining < 50 && percentOfTaskLeft > 75) {
      return classNames.showTextOrange;
    } else if (percentageOfDaysRemaining < 25 && percentOfTaskLeft > 35) {
      return classNames.showTextRed;
    }
    return classNames.showTextYellow;
  }
  function showProgressIndicatorColour() {
    const estimatedDaysOfTaskComplete = estimatedDays();
    if (estimatedDaysOfTaskComplete === classNames.showTextGreen) {
      return classNames.showProgressGreen;
    } else if (estimatedDaysOfTaskComplete === classNames.showTextOrange) {
      return classNames.showProgressOrange;
    } else if (estimatedDaysOfTaskComplete === classNames.showTextRed) {
      return classNames.showProgressRed;
    } else {
      classNames.showProgressYellow;
    }
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.taskSection}>
        <h3 className={classNames.featureTitle}>{title}</h3>
        <p className={classNames.prDescription}>{purpose}</p>
        <div className={classNames.completedData}>
          <span>Estimated Completion in </span>
          <p className={estimatedDays()}>{completedDate}</p>
        </div>
      </div>
      <div className={classNames.progressSection}>
        <div className={classNames.progressText}>
          {percentCompleted > 0 ? 'This is in progress' : null}
        </div>
        <div className={classNames.progressBar}>
          <div
            className={showProgressIndicatorColour()}
            style={{ width: `${percentCompleted}%` }}></div>
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
