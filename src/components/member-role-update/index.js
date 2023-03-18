import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@components/UI/modal/index';
import { userContext } from '@store/user/user-context';
import Spinner from '@components/UI/spinner';
import MemberTagAssign from '@components/member-tag-assign';
import { BASE_API_URL } from '@constants/AppConstants';
import useFetch from '@custom-hooks/useFetch';
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
  } = userContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const { data } = useFetch(`${BASE_API_URL}/users/${selectedMember}`);

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

        {data && <MemberTagAssign userId={data.user.id} />}

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
