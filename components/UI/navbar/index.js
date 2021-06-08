/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from './navbar.module.scss';

const Navbar = ({ drawerToggleClicked }) => {
  return (
    <div className={classNames.infoNavbar}>
      <nav>
        <div
          className={classNames.DrawerToggle}
          onClick={drawerToggleClicked}
          onKeyPress={drawerToggleClicked}>
          <span />
          <span />
          <span />
        </div>
        <ul>
          <li className="nav-logo-li">
            <a href="/" style={{ padding: '7px ' }}>
              <img src="./images/Real-Dev-Squad@1x.png" alt="home nav logo" width="42" />
            </a>
          </li>
          <li>
            <a href="https://www.realdevsquad.com/">Home</a>
          </li>
          <li>
            <a href="https://welcome.realdevsquad.com/">Welcome</a>
          </li>
          <li>
            <a href="https://www.realdevsquad.com/events.html">Events</a>
          </li>
          <li>
            <a href="https://members.realdevsquad.com/" style={{ color: '#87d870' }}>
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
  drawerToggleClicked: PropTypes.func.isRequired
};

export default Navbar;
