import { useState } from 'react';
import Modal from '@components/UI/modal/index';
import Spinner from '@components/UI/spinner';
import { TASK_TYPE } from '@constants/AppConstants';
import { useTaskContext } from '@store/tasks/tasks-context';
import classNames from './member-task-update.module.scss';
import { moveTask } from '../../helper-functions/action-handlers';

const MemberTaskUpdate = () => {
  const {
    showMemberTaskUpdateModal,
    setShowMemberTaskUpdateModal,
    isNoteworthy,
    taskId,
  } = useTaskContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

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
      window.location.reload();
    } else {
      setUpdateStatus(`There was an error while updating the task`);
    }
  };

  const renderTaskUpdateButtton = () => {
    const task = isNoteworthy ? TASK_TYPE.OTHER : TASK_TYPE.NOTEWORTHY;

    if (updateStatus === '') {
      return (
        <div>
          <button
            className={classNames.changeTaskType}
            type="button"
            onClick={() => changeTaskType(taskId)}
          >
            Move Task to {task}
          </button>
        </div>
      );
    }
    return <p className={classNames.updateText}>{updateStatus}</p>;
  };

  return (
    <>
      <Modal
        show={showMemberTaskUpdateModal}
        closeModal={() => {
          setShowMemberTaskUpdateModal(false);
        }}
      >
        {isUpdating ? <Spinner /> : renderTaskUpdateButtton()}
      </Modal>
    </>
  );
};

export default MemberTaskUpdate;
