/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import DarkThemeIcon from '@components/dark-theme-icon/index';
import classNames from '@components/UI/navbar/navbar.module.scss';

const Navbar = ({ drawerToggleClicked, theme, themeToggler }) => {
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
            <a href="https://www.realdevsquad.com/">Home</a>
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
        </ul>
        <div className={classNames.darkTheme}>
          <DarkThemeIcon theme={theme} themeToggleHandler={themeToggler} />
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
};

export default Navbar;
