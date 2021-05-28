import React from 'react';
import PropTypes from 'prop-types';
import classNames from './active-task.module.scss';
import { timeWas } from '../../../helper-functions/time-was';
const ActiveTask = (props) => {
  const taskDetails = props.taskDetails;
  let completedDate = '';
  completedDate = timeWas(taskDetails.startedOn * 1000, false, taskDetails.endsOn * 1000);
  return (
    <div className={classNames.container}>
      <div className={classNames.taskSection}>
        <h3 className={classNames.featureTitle}>{taskDetails.title}</h3>
        <p className={classNames.prDescription}>{taskDetails.purpose}</p>
        <div className={classNames.completedData}>
          <span>Estimated Completion in </span>
          <p className={classNames.completedDate}>{completedDate}</p>
        </div>
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
