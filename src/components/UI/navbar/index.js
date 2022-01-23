/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  PATHS,
  LOGIN_URL,
  USER_DATA_URL,
  USER_PROFILE_URL,
  NAVMENU,
} from '@constants/AppConstants';
import Link from 'next/link';

import styles from './navbar.module.scss';

const GenericClosePopUp = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

const Navbar = () => {
  const GITHUB_LOGO = '/icons/github.png';
  const DEFAULT_AVATAR = '/images/Avatar.png';
  const [userData, setUserData] = useState({});
  const [toggle, setToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mountedComponent, setMountedComponent] = useState(false);
  const navbarRef = useRef();
  GenericClosePopUp(navbarRef, () => {
    setToggle(false);
  });
  useEffect(() => {
    const fetchData = async () => {
      await fetch(USER_DATA_URL, { credentials: 'include' })
        .then((response) => {
          if (!response.ok) {
            setIsLoggedIn(false);
            throw new Error(`${response.status} (${response.statusText})`);
          }
          return response.json();
        })
        .then((responseJson) => {
          if (!responseJson.incompleteUserDetails) {
            setIsLoggedIn(true);
            setUserData({
              userName: responseJson.username,
              firstName: responseJson.first_name,
              profilePicture: responseJson.picture.url?.DEFAULT_AVATAR,
            });
          }
          return window.open('https://my.realdevsquad.com/signup');
        })
        .catch((err) => {
          return err;
        });
      setMountedComponent(true);
    };

    fetchData();
  }, []);
  const sidebarToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className={styles.wrapper}>
      <>
        <nav className={styles.navBar}>
          <div
            className={styles.hamburger}
            ref={navbarRef}
            onClick={sidebarToggle}
            onKeyDown={sidebarToggle}
          >
            <img
              className={styles.icon}
              src="/icons/ham.png"
              alt="hamburger_logo"
            />
          </div>
          <div
            className={
              mountedComponent
                ? `${styles.navBarLogin}`
                : `${styles.navBarLogin} d-none`
            }
          >
            <Link href={LOGIN_URL}>
              <a className={`${styles.btnLogin}${isLoggedIn ? 'd-none' : ''}`}>
                <button type="button" className={styles.btnLoginText}>
                  Sign In
                  <img
                    className={styles.githubLogo}
                    src={GITHUB_LOGO}
                    alt="GitHub Icon"
                    height="15px"
                    width="15px"
                  />
                </button>
              </a>
            </Link>
            <div className={`${styles.userGreet}${isLoggedIn ? 'd-none' : ''}`}>
              <Link href={USER_PROFILE_URL}>
                <a>
                  <div className={styles.userGreetMsg}>
                    {isLoggedIn
                      ? `Hello, ${userData.firstName}!`
                      : `Hello, User!`}
                  </div>
                  <img
                    className={styles.userProfilePic}
                    src={
                      isLoggedIn
                        ? `${userData.profilePicture}`
                        : `${DEFAULT_AVATAR}`
                    }
                    alt="Profile pic"
                  />
                </a>
              </Link>
            </div>
          </div>
          <ul
            className={`${styles.navBarMenu} ${
              toggle ? `${styles.active}` : ''
            }`}
          >
            <li className={styles.navBarLogoLi}>
              <a href={PATHS.HOME}>
                <Image
                  width="50px"
                  height="50px"
                  src="/images/Real-Dev-Squad@1x.png"
                  alt="real-dev-squad"
                />
              </a>
            </li>
            {NAVMENU.map((nav) => {
              return (
                <li
                  className={nav.name === 'Home' ? `${styles.homes}` : null}
                  key={nav.id}
                >
                  <Link href={nav.path}>
                    <a
                      className={
                        nav.name === 'Members' ? `${styles.activeTab}` : null
                      }
                    >
                      {nav.name}
                    </a>
                  </Link>
                </li>
              );
            })}
            <li
              className={
                mountedComponent
                  ? `${styles.navBarLoginLi}`
                  : `${styles.navBarLoginLi} d-none`
              }
            >
              <Link href={LOGIN_URL}>
                <a
                  className={`${styles.btnLogin}${isLoggedIn ? 'd-none' : ''}`}
                >
                  <button type="button" className={styles.btnLoginText}>
                    Sign In With GitHub
                    <img
                      className={styles.githubLogo}
                      src={GITHUB_LOGO}
                      alt="GitHub Icon"
                      height="15px"
                      width="15px"
                    />
                  </button>
                </a>
              </Link>
              <div
                className={
                  isLoggedIn
                    ? `${styles.userGreet}`
                    : `${styles.userGreet} d-none`
                }
              >
                <Link href={USER_PROFILE_URL}>
                  <a>
                    <div className={styles.userGreetMsg}>
                      {isLoggedIn
                        ? `Hello, ${userData.firstName}!`
                        : `Hello, User!`}
                    </div>
                    <img
                      className={styles.userProfilePic}
                      src={
                        isLoggedIn
                          ? `${userData.profilePicture}`
                          : `${DEFAULT_AVATAR}`
                      }
                      alt="Profile Pic"
                    />
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </>
    </div>
  );
};

export default Navbar;
