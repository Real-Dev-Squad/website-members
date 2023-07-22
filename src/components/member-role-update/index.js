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

  const member = userData?.user.roles.member;
  const archived = userData?.user.roles.archived;
  const userId = userData?.user.id;
  const { data: tagData } = useFetch(`${BASE_API_URL}/tags`);
  const { data: levelData } = useFetch(`${BASE_API_URL}/levels`);

  const promoteToMember = async (id) => {
    setIsUpdating(true);
    const role = {
      member: true,
    };
    const { status } = await memberRoleUpdate(id, role);
    setIsUpdating(false);
    if (status === 200) {
      setUpdateStatus('user promoted to a member');
    } else {
      setUpdateStatus('some error occured, please contact admin');
    }
  };

  const demoteFromMember = async (id) => {
    setIsUpdating(true);
    const role = {
      member: false,
    };
    const { status } = await memberRoleUpdate(id, role);
    setIsUpdating(false);
    if (status === 200) {
      setUpdateStatus('user deomoted from member');
    } else {
      setUpdateStatus('some error occured, please contact admin');
    }
  };

  const archiveTheMember = async (id) => {
    setIsUpdating(true);
    const role = {
      archived: true,
    };
    const { status } = await memberRoleUpdate(id, role);
    setIsUpdating(false);
    if (status === 200) {
      setUpdateStatus('user archived!');
    } else {
      setUpdateStatus('Some error occured, please contact admin');
    }
  };

  const unArchiveMember = async (id) => {
    setIsUpdating(true);
    const role = {
      archived: false,
    };
    const { status } = await memberRoleUpdate(id, role);
    setIsUpdating(false);
    if (status === 200) {
      setUpdateStatus('user un-archived!');
    } else {
      setUpdateStatus('Some error occured, please contact admin');
    }
  };

  const memberRoleUpdateButton = member ? (
    <button
      className={classNames.moveToMember}
      type="button"
      onClick={() => demoteFromMember(userId)}
    >
      Demote Member
    </button>
  ) : (
    <button
      className={classNames.moveToMember}
      type="button"
      onClick={() => promoteToMember(userId)}
    >
      Promote to Member
    </button>
  );

  const memeberArchiveUnArchiveButton = archived ? (
    <button
      className={classNames.moveToMember}
      type="button"
      onClick={() => unArchiveMember(userId)}
    >
      Unarchive Member
    </button>
  ) : (
    <button
      className={classNames.moveToMember}
      type="button"
      onClick={() => archiveTheMember(userId)}
    >
      Archive Member
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
