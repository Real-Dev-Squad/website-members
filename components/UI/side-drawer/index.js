import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from './side-drawer.module.scss';
import Backdrop from '../backdrop/';
// import StatusModal from '../../modal/Status';

const SideDrawer = ({ open, close }) => {
  let attachedClasses = [classNames.SideDrawer, classNames.Close];
  if (open) {
    attachedClasses = [classNames.SideDrawer, classNames.Open];
  }
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);

  const showHandler = () => {
    console.log('Click!!');
    setShow((prevState) => !prevState);
  };

  return (
    <>
      <Backdrop show={open} clicked={close} />
      <div className={attachedClasses.join(' ')}>
        <div className="brandname">
          <h2 className={classNames.logoName}>
            <span
              className={classNames.saltire}
              tabIndex={0}
              role="button"
              onKeyDown={close}
              onClick={close}>
              &#9747;
            </span>
            Real Dev Squad
          </h2>
        </div>
        <nav>
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
                onClick={() => showHandler()}>
                <span role="img" aria-label="Settings Icon" title="Show Status Icon">
                  ⚙️
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* TODO: Show the setting icon when the trigger is clicked} */}
    </>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default SideDrawer;
