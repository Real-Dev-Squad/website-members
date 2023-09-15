import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@components/UI/modal/index';
import { userContext } from '@store/user/user-context';
import Spinner from '@components/UI/spinner';
import MemberTagAssign from '@components/member-tag-assign';
import { BASE_API_URL } from '@constants/AppConstants';
import useFetch from '@custom-hooks/useFetch';
import { useRouter } from 'next/router';
import classNames from './member-role-update.module.scss';
import { memberRoleUpdate } from '../../helper-functions/action-handlers';

const MemberRoleUpdate = () => {
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const isDev = Boolean(dev);
  const {
    showMemberRoleUpdateModal,
    setShowMemberRoleUpdateModal,
    selectedMember,
  } = userContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [validateError, setvalidateError] = useState('');
  const [reasonText, setReasonText] = useState('');
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

  const archiveUnArchiveTheMember = async (id, reason) => {
    setIsUpdating(true);
    let body = {};
    if (archived) {
      body = {
        archived: false,
      };
    } else if (!reason && !archived) {
      body = {
        archived: true,
      };
    } else {
      body = {
        archived: true,
        reason,
      };
    }
    try {
      const { status } = await memberRoleUpdate(id, body);
      setIsUpdating(false);
      if (status === 200) {
        setUpdateStatus(archived ? 'User unarchived!' : 'User archived!');
      }
    } catch (error) {
      setUpdateStatus('Some error occured, please contact admin');
    }
  };

  const memberRoleUpdateButton = (
    <button
      data-testid="promoteDemoteButton"
      className={classNames.moveToMember}
      type="button"
      onClick={() => promoteDemoteAMember(userId)}
    >
      {member ? 'Demote Member' : 'Promote to Member'}
    </button>
  );
  const handleValidReason = (id, reason) => {
    const isEmptyReason = !reason.length;
    const isReasonEmptyOrWhitespace = /^\s*$/.test(reason); // check for empty or multiple whitespaces
    const isMoreThan99Words = reason.split(' ').length > 99;
    const isMoreThan50Characters = reason.length <= 25;
    switch (!archived) {
      case isEmptyReason:
        setvalidateError('Reason cannot be empty!');
        break;
      case isReasonEmptyOrWhitespace:
        setvalidateError('Reason cannot be empty or multiple whitespaces!');
        break;
      case isMoreThan99Words:
        setvalidateError('Reason cannot be more than 99 words!');
        break;
      case isMoreThan50Characters:
        setvalidateError('Reason should have more than 25 characters!');
        break;
      default:
        setvalidateError('');
    }
    const isValid =
      !isEmptyReason &&
      !isReasonEmptyOrWhitespace &&
      !isMoreThan99Words &&
      !isMoreThan50Characters;
    if (isValid || archived) {
      archiveUnArchiveTheMember(id, reason);
    }
  };
  const memeberArchiveUnArchiveButton = (
    <button
      className={classNames.moveToMember}
      type="button"
      data-testid="archiveUnArchiveButton"
      onClick={() =>
        !isDev
          ? archiveUnArchiveTheMember(userId)
          : handleValidReason(userId, reasonText)
      }
    >
      {archived ? 'Unarchive Member' : 'Archive Member'}
    </button>
  );

  const archiveReasonTextBox = (
    <div className={classNames.archiveUser}>
      <p className={classNames.archiveUser__error}>{validateError}</p>
      <label htmlFor="archiveReason" data-testid="reasonInputLabel">
        Reason:
        <textarea
          className={classNames.archiveUser__textArea}
          id="archiveReason"
          name="archiveReason"
          data-testid="reasonTextBox"
          rows="10"
          cols="20"
          onChange={(e) => setReasonText(e.target.value)}
          placeholder="Enter the reason for archiving the user"
          required
        />
      </label>
    </div>
  );
  const renderPromoteButton = () => {
    return (
      <>
        {isDev && !archived ? archiveReasonTextBox : null}

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

        <p className={classNames.archiveUser__success}>{updateStatus}</p>
      </>
    );
  };

  return ReactDOM.createPortal(
    <>
      <Modal
        data-testid="modalUpdateRoles"
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
