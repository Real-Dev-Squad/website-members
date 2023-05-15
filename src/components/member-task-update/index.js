import { useState } from 'react';
import Modal from '@components/UI/modal/index';
import Spinner from '@components/UI/spinner';
import { TASK_TYPE, TASK_VIEW } from '@constants/AppConstants';
import { useTaskContext } from '@store/tasks/tasks-context';
import { useRouter } from 'next/router';
import classNames from './member-task-update.module.scss';
import { moveTask } from '../../helper-functions/action-handlers';

const MemberTaskUpdate = () => {
  const {
    showMemberTaskUpdateModal,
    setShowMemberTaskUpdateModal,
    isNoteworthy,
    isCollapsed,
    taskId,
  } = useTaskContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [collapsedState, setCollapsedState] = useState(false);
  const [taskType, setTaskType] = useState('');
  const { query, replace, asPath } = useRouter() || { query: { dev: false } };
  const { dev } = query;

  const changeTaskType = async (taskid) => {
    setIsUpdating(true);
    const data = { isNoteworthy: !isNoteworthy };
    const res = await moveTask(taskid, data);
    setIsUpdating(false);
    if (res.status === 204) {
      setUpdateStatus(
        `Task moved to ${
          isNoteworthy ? TASK_TYPE.OTHER : TASK_TYPE.NOTEWORTHY
        }! reloading...`
      );
      await replace(asPath);
      setShowMemberTaskUpdateModal(false);
    } else {
      setUpdateStatus(`There was an error while updating the task`);
    }
  };

  const collapseTask = async (taskid) => {
    try {
      setCollapsedState(true);
      const data = { isCollapsed: !isCollapsed };
      const res = await moveTask(taskid, data);
      setCollapsedState(false);
      if (res.status === 204) {
        setTaskType(
          `Task ${
            isCollapsed ? TASK_VIEW.EXPANDED : TASK_VIEW.COLLAPSED
          }! reloading...`
        );
        await replace(asPath);
        setShowMemberTaskUpdateModal(false);
      } else {
        setTaskType(`There was an error while updating the task`);
      }
    } catch (error) {
      console.error('Error while collapsing task', error);
    }
  };

  const renderTaskUpdateButtton = () => {
    const task = isNoteworthy ? TASK_TYPE.OTHER : TASK_TYPE.NOTEWORTHY;
    const taskLook = isCollapsed ? TASK_VIEW.EXPANDED : TASK_VIEW.COLLAPSED;

    if (updateStatus === '' && taskType === '') {
      return (
        <div>
          <button
            className={classNames.changeTaskType}
            type="button"
            onClick={() => changeTaskType(taskId)}
          >
            Move Task to {task}
          </button>
          {dev && (
            <button
              className={classNames.changeTaskType}
              type="button"
              onClick={() => collapseTask(taskId)}
            >
              {taskLook} Task
            </button>
          )}
        </div>
      );
    }
    return <p className={classNames.updateText}>{updateStatus || taskType}</p>;
  };

  return (
    <>
      <Modal
        show={showMemberTaskUpdateModal}
        closeModal={() => {
          setShowMemberTaskUpdateModal(false);
        }}
      >
        {isUpdating || collapsedState ? <Spinner /> : renderTaskUpdateButtton()}
      </Modal>
    </>
  );
};

export default MemberTaskUpdate;
