import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from './dropdown.module.scss';

const Dropdown = ({
  isLoggedIn,
  USER_PROFILE_URL,
  SIGN_OUT_URL,
  userData,
  DEFAULT_AVATAR,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const modalClose = useRef();

  const signOut = () => {
    fetch(SIGN_OUT_URL, {
      method: 'GET',
      credentials: 'include',
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    const handler = (event) => {
      if (!modalClose.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div className={styles.userGreet} ref={modalClose}>
      <div
        role="button"
        tabIndex={0}
        className={styles.dropdownHeader}
        onClick={toggleDropdown}
        onKeyDown={toggleDropdown}
      >
        <div className={styles.userGreetMsg}>
          {isLoggedIn ? `Hello, ${userData.firstName}!` : `Hello, User!`}
        </div>
        <img
          className={styles.userProfilePic}
          src={isLoggedIn ? `${userData.profilePicture}` : `${DEFAULT_AVATAR}`}
          alt="Profile Pic"
        />
      </div>

      <div
        className={` ${styles.dropDown} ${
          isOpen ? styles.dropDownOpen : styles.dropDownClose
        }`}
      >
        <div className={styles.dropdownContent}>
          <div className={styles.dropDownContentWrapper}>
            <div className={styles.myProfileWrapper}>
              <Link href={USER_PROFILE_URL}>
                <a className={styles.myProfile}>My profile</a>
              </Link>
            </div>
            <div className={styles.signOutWrapper}>
              <button
                type="submit"
                className={styles.signOut}
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
