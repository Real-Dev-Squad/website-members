/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import classNames from '@components/UI/navbar/navbar.module.scss';

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
            <a href="https://realdevsquad.com">
              <Image
                width="45px"
                height="45px"
                src="/images/Real-Dev-Squad@1x.png"
                alt="real-dev squad"
              />
            </a>
          </li>
          <li>
            <a href="https://welcome.realdevsquad.com/">Welcome</a>
          </li>
          <li>
            <a href="https://www.realdevsquad.com/events.html">Events</a>
          </li>
          <li>
            <a
              href="https://members.realdevsquad.com/"
              style={{ color: '#87D870' }}
            >
              Members
            </a>
          </li>
          <li>
            <a href="https://crypto.realdevsquad.com/">Crypto</a>
          </li>
          <li>
            <a href="https://status.realdevsquad.com/">Status</a>
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
