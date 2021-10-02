import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@components/UI/modal/index';
import UserContext from '@store/user/user-context';
import Spinner from '@components/UI/spinner';
import classNames from './member-role-update.module.scss';
import { fetch } from '../../helper-functions/fetch';
import { getAddMemberRoleURL } from '../../helper-functions/urls';

const MemberRoleUpdate = () => {
  const {
    showMemberRoleUpdateModal,
    setShowMemberRoleUpdateModal,
    selectedMember,
  } = useContext(UserContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const promoteToMember = async (user) => {
    setIsUpdating(true);
    const { status } = await fetch(
      getAddMemberRoleURL(user),
      'patch',
      null,
      null,
      null,
      {
        withCredentials: true,
      }
    );
    setIsUpdating(false);
    if (status === 204) {
      setUpdateStatus('User moved to member');
    } else {
      setUpdateStatus('Some error occured, please contact admin');
    }
  };

  const renderPromoteButton = () => {
    return (
      <>
        <button
          className={classNames.moveToMember}
          type="button"
          onClick={() => promoteToMember(selectedMember)}
        >
          Promote to Member
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
