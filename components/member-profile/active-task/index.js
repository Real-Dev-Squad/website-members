import PropTypes from 'prop-types';
import classNames from './active-task.module.scss';
import { timeWas } from '../../../helper-functions/time-was';
import { percentageofDaysRemaining } from '../../../helper-functions/taskProgress';

const ActiveTask = ({ taskDetails }) => {
  const { title, purpose, startedOn, endsOn, percentCompleted } = taskDetails;
  let completedDate = '';
  completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);

  let percentOfTaskLeft = 100 - percentCompleted;

  let daysRemaining = '';
  daysRemaining = percentageofDaysRemaining(startedOn, endsOn, completedDate);

  function estimatedDaysText() {
    if (daysRemaining >= percentOfTaskLeft) {
      return classNames.showTextGreen;
    } else if (daysRemaining < 50 && percentOfTaskLeft > 75) {
      return classNames.showTextOrange;
    } else if (daysRemaining < 25 && percentOfTaskLeft > 35) {
      return classNames.showTextRed;
    }
    return classNames.showTextYellow;
  }
  function showProgressIndicatorColour() {
    const indicator = estimatedDaysText();
    if (indicator === classNames.showTextGreen) {
      return classNames.showProgressGreen;
    } else if (indicator === classNames.showTextOrange) {
      return classNames.showProgressOrange;
    } else if (indicator === classNames.showTextRed) {
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
          <p className={estimatedDaysText()}>{completedDate}</p>
        </div>
      </div>
      <div className={classNames.progressSection}>
        <div className={classNames.progressText}>
          {percentCompleted > 0 ? 'This is in progress' : null}
        </div>
        <div className={classNames.progressBar}>
          <div
            className={showProgressIndicatorColour()}
            style={{ width: `${percentCompleted}` }}></div>
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
