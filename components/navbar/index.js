import React, {useState} from 'react';
import classNames from './navbar.module.scss';

const Navbar = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <div className={classNames.infoNavbar}>
      <nav className={classNames.navbar}>
        <div className = {classNames.hamburger} onClick = {() => setToggle(!toggle)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div> 
        <ul className = {
          toggle ? classNames.navbarShow : classNames.navbarHide
        }>
          <li >
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

export default Navbar;
