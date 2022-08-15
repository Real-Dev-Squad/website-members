import { useState } from 'react';
import Modal from '@components/UI/modal/index';
import { userContext } from '@store/user/user-context';
import Spinner from '@components/UI/spinner';
import classNames from './member-task-update.module.scss';
import { moveTask } from '../../helper-functions/action-handlers';

const MemberTaskUpdate = () => {
  const {
    showMemberTaskUpdateModal,
    setshowMemberTaskUpdateModal,
    isnoteworthy,
    taskId,
  } = userContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const changeTaskType = async (taskid) => {
    setIsUpdating(true);
    const data = { isNoteworthy: !isnoteworthy };
    const res = await moveTask(taskid, data);
    setIsUpdating(false);
    if (res.status === 204) {
      setUpdateStatus(
        `Task changed to ${
          isnoteworthy ? 'other contribution' : 'noteworthy'
        }! reloading...`
      );
      window.location.reload();
    } else {
      setUpdateStatus(`There was an error while changing the task`);
    }
  };

  const renderTaskUpdateButtton = () => {
    const task = isnoteworthy ? 'Other contribution' : 'noteworthy';

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
          setshowMemberTaskUpdateModal(false);
        }}
      >
        {isUpdating ? <Spinner /> : renderTaskUpdateButtton()}
      </Modal>
    </>
  );
};

export default MemberTaskUpdate;
