import { useState, useEffect } from 'react';
import { userContext } from '@store/user/user-context';
import classNames from '@components/user-profile/user-profile.module.scss';
import { getUserSelf } from '../../helper-functions/action-handlers';

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
    async function getUserProfile() {
      const { data } = await getUserSelf();
      setIsLoading(false);
      setUser(data);
      if (data) {
        setIsSuperUser(data.roles.super_user);
      }
    }
    getUserProfile();
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

  if (!isLoading && isSuperUser && user)
    return (
      <div className={classNames.superUserOptions}>
        <p>
          Hello {user.first_name} {user.last_name}
        </p>
        {showSuperUserOptions()}
      </div>
    );
  return <div />;
};

export default UserProfile;
