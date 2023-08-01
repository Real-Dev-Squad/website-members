import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@components/UI/modal/index';
import { userContext } from '@store/user/user-context';
import Spinner from '@components/UI/spinner';
import MemberTagAssign from '@components/member-tag-assign';
import { BASE_API_URL } from '@constants/AppConstants';
import useFetch from '@custom-hooks/useFetch';
import classNames from './member-role-update.module.scss';
import { memberRoleUpdate } from '../../helper-functions/action-handlers';

const MemberRoleUpdate = () => {
  const {
    showMemberRoleUpdateModal,
    setShowMemberRoleUpdateModal,
    selectedMember,
  } = userContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const { data: userData } = useFetch(
    `${BASE_API_URL}/users/${selectedMember}`
  );

  const member = userData?.user?.roles.member;
  const archived = userData?.user?.roles.archived;
  const userId = userData?.user.id;
  const { data: tagData } = useFetch(`${BASE_API_URL}/tags`);
  const { data: levelData } = useFetch(`${BASE_API_URL}/levels`);

  const promoteDemoteAMember = async (id) => {
    let memberRole = null;
    setIsUpdating(true);
    if (member) {
      memberRole = false;
    } else {
      memberRole = true;
    }
    const role = {
      member: memberRole,
    };
    try {
      const { status } = await memberRoleUpdate(id, role);
      setIsUpdating(false);
      if (status === 200) {
        setUpdateStatus('user promoted to a member');
      }
    } catch (error) {
      setUpdateStatus('some error occured, please contact admin');
    }
  };

  const archiveUnArchiveTheMember = async (id) => {
    let archiveRole = null;
    setIsUpdating(true);
    if (archived) {
      archiveRole = false;
    } else {
      archiveRole = true;
    }
    const role = {
      archived: archiveRole,
    };
    try {
      const { status } = await memberRoleUpdate(id, role);
      setIsUpdating(false);
      if (status === 200) {
        setUpdateStatus('user archived!');
      }
    } catch (error) {
      setUpdateStatus('Some error occured, please contact admin');
    }
  };

  const memberRoleUpdateButton = (
    <button
      className={classNames.moveToMember}
      type="button"
      onClick={() => promoteDemoteAMember(userId)}
    >
      {member ? 'Demote Member' : 'Promote to Member'}
    </button>
  );

  const memeberArchiveUnArchiveButton = (
    <button
      className={classNames.moveToMember}
      type="button"
      onClick={() => archiveUnArchiveTheMember(userId)}
    >
      {archived ? 'Unarchive Member' : 'Archive Member'}
    </button>
  );

  const renderPromoteButton = () => {
    return (
      <>
        {memberRoleUpdateButton}
        {memeberArchiveUnArchiveButton}

        <br />

        {userData && tagData && levelData && (
          <MemberTagAssign
            userId={userData.user.id}
            tags={tagData.tags}
            levels={levelData.levels}
          />
        )}

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
