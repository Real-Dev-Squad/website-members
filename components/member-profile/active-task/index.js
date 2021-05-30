import React from 'react';
import PropTypes from 'prop-types';
import classNames from './active-task.module.scss';
import { timeWas } from '../../../helper-functions/time-was';
const ActiveTask = ({ taskDetails }) => {
  const { title, purpose, startedOn, endsOn } = taskDetails;
  let completedDate = '';
  completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);
  return (
    <div className={classNames.container}>
      <div className={classNames.taskSection}>
        <h3 className={classNames.featureTitle}>{title}</h3>
        <p className={classNames.prDescription}>{purpose}</p>
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
