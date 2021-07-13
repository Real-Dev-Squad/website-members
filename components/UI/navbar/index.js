import React from 'react';
import PropTypes from 'prop-types';
import classNames from './navbar.module.scss';

const Navbar = ({ drawerToggleClicked }) => {
  return (
    <div className={classNames.infoNavbar}>
      <nav>
        <div
          className={classNames.DrawerToggle}
          role="button"
          tabIndex="0"
          onClick={drawerToggleClicked}
          onKeyPress={drawerToggleClicked}>
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
          <li>
            <button
              className={classNames.statusIcon}
              aria-label="Settings Icon"
              title="Show Modal"
              onClick={() => console.log('Icon Clicked!!')}>
              <span role="img" aria-label="Settings Icon" title="Show Status Icon">
                ⚙️
              </span>
            </button>
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
