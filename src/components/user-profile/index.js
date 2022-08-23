import { useState, useEffect } from 'react';
import { userContext } from '@store/user/user-context';
import classNames from '@components/user-profile/user-profile.module.scss';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    isSuperUser,
    isSuperUserMode,
    setIsSuperUserMode,
    verifySuperUser,
  } = userContext();

  useEffect(() => {
    (async () => {
      await verifySuperUser();
      setIsLoading(false);
    })();
  }, [verifySuperUser]);

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
