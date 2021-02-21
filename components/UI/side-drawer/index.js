import PropTypes from 'prop-types';
import classNames from './side-drawer.module.scss';
import Backdrop from '../backdrop/';

const SideDrawer = ({ open, close }) => {
  let attachedClasses = [classNames.SideDrawer, classNames.Close];
  if (open) {
    attachedClasses = [classNames.SideDrawer, classNames.Open];
  }
  return (
    <div>
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default SideDrawer;
