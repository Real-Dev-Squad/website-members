import { useState, useEffect } from 'react';
import { userContext } from '@store/user/user-context';
import classNames from '@components/user-profile/user-profile.module.scss';
import { getUserProfileSelf } from '../../helper-functions/urls';
import { fetch } from '../../helper-functions/fetch';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    setUser,
    isSuperUser,
    setIsSuperUser,
    isSuperUserMode,
    setIsSuperUserMode,
  } = userContext();

  useEffect(() => {
    async function getUSerProfile() {
      const { data } = await fetch(
        getUserProfileSelf,
        'get',
        null,
        null,
        null,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      setUser(data);
      if (data) {
        setIsSuperUser(data.roles.member);
      }
    }
    getUSerProfile();
  }, [setUser, setIsSuperUser]);

  const showSuperUserOptions = () => {
    return (
      <>
        <input
          type="checkbox"
          defaultChecked={isSuperUserMode}
          onChange={() => setIsSuperUserMode(!isSuperUserMode)}
        />
        <span> Show super user options</span>
      </>
    );
  };

  if (!isLoading && user)
    return (
      <div className={classNames.superUserOptions}>
        <p>
          Hello {user.first_name} {user.last_name}
        </p>
        {isSuperUser && showSuperUserOptions()}
      </div>
    );
  return <div />;
};

export default UserProfile;
