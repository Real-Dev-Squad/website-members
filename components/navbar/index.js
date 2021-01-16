import React from 'react';
import PropTypes from 'prop-types';
import classNames from './navbar.module.scss';

const Navbar = ({ drawerToggleClicked }) => {
  return (
    <div className={classNames.infoNavbar}>
      <nav>
        <div className={classNames.DrawerToggle} onClick={drawerToggleClicked}>
          <span />
          <span />
          <span />
        </div>
        <ul>
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
            <a href="https://members.realdevsquad.com/" style={{ color: '#87D870' }}>
              Members
            </a>
          </li>
          <li>
            <a href="https://crypto.realdevsquad.com/">Crypto</a>
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
