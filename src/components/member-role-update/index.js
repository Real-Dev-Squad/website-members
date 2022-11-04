import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@components/UI/modal/index';
import { userContext } from '@store/user/user-context';
import Spinner from '@components/UI/spinner';
import classNames from './member-role-update.module.scss';
import {
  archiveMember,
  moveToMember,
} from '../../helper-functions/action-handlers';

const MemberRoleUpdate = () => {
  const {
    showMemberRoleUpdateModal,
    setShowMemberRoleUpdateModal,
    selectedMember,
    isUserMember,
  } = userContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const promoteToMember = async (user) => {
    setIsUpdating(true);
    const { status } = await moveToMember(user);
    setIsUpdating(false);
    if (status === 204) {
      setUpdateStatus('User moved to member');
    } else {
      setUpdateStatus('Some error occured, please contact admin');
    }
  };
  const archiveTheMember = async (user) => {
    setIsUpdating(true);
    const { status } = await archiveMember(user);
    setIsUpdating(false);
    if (status === 204) {
      setUpdateStatus('User archived!');
    } else {
      setUpdateStatus('Some error occured, please contact admin');
    }
  };

  const renderPromoteButton = () => {
    if (isUserMember) {
      return (
        <>
          <button
            className={classNames.moveToMember}
            type="button"
            onClick={() => archiveTheMember(selectedMember)}
          >
            Archive Member
          </button>
          <br />
          <p>{updateStatus}</p>
        </>
      );
    }

    return (
      <>
        <button
          className={classNames.moveToMember}
          type="button"
          onClick={() => promoteToMember(selectedMember)}
        >
          Promote to Member
        </button>

        <button
          className={classNames.moveToMember}
          type="button"
          onClick={() => archiveTheMember(selectedMember)}
        >
          Archive Member
        </button>
        <br />
        <p>{updateStatus}</p>
      </>
    );
  };

  return ReactDOM.createPortal(
    <>
      <Modal
        show={showMemberRoleUpdateModal}
        closeModal={(e) => {
          e.preventDefault();
          setShowMemberRoleUpdateModal(false);
        }}
      >
        {isUpdating ? <Spinner /> : renderPromoteButton()}
      </Modal>
    </>,
    document.getElementById('memberRoleUpdateModal')
  );
};

export default MemberRoleUpdate;
