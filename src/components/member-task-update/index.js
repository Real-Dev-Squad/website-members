import { useState } from 'react';
import Modal from '@components/UI/modal/index';
import Spinner from '@components/UI/spinner';
import { ISNOTEWORTHY, OTHER } from '@constants/AppConstants';
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
        `Task changed to ${isNoteworthy ? OTHER : ISNOTEWORTHY}! reloading...`
      );
      window.location.reload();
    } else {
      setUpdateStatus(`There was an error while changing the task`);
    }
  };

  const renderTaskUpdateButtton = () => {
    const task = isNoteworthy ? OTHER : ISNOTEWORTHY;

    if (updateStatus === '') {
      return (
        <div>
          <button
            className={classNames.changeTaskType}
            type="button"
            onClick={() => changeTaskType(taskId)}
          >
            Change Task to {task}
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
