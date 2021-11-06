/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import classNames from '@components/UI/navbar/navbar.module.scss';
import {
  HOST_NAME,
  WELCOME_LINK,
  EVENTS_LINK,
  MEMBERS_LINK,
  CRYPTO_LINK,
  STATUS_LINK,
} from '@constants/AppConstants';

const Navbar = ({ drawerToggleClicked }) => {
  return (
    <div className={classNames.infoNavbar}>
      <nav>
        <div
          className={classNames.DrawerToggle}
          onClick={drawerToggleClicked}
          onKeyPress={drawerToggleClicked}
        >
          <span />
          <span />
          <span />
        </div>
        <ul>
          <li>
            <a href={HOST_NAME}>
              <Image
                width="45px"
                height="45px"
                src="/images/Real-Dev-Squad@1x.png"
                alt="real-dev-squad"
              />
            </a>
          </li>
          <li>
            <a href={WELCOME_LINK}>Welcome</a>
          </li>
          <li>
            <a href={EVENTS_LINK}>Events</a>
          </li>
          <li>
            <a href={MEMBERS_LINK} style={{ color: '#87D870' }}>
              Members
            </a>
          </li>
          <li>
            <a href={CRYPTO_LINK}>Crypto</a>
          </li>
          <li>
            <a href={STATUS_LINK}>Status</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
};

export default Navbar;
