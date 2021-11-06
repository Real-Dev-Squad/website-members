import PropTypes from 'prop-types';
import classNames from '@components/UI/side-drawer/side-drawer.module.scss';
import Backdrop from '@components/UI/backdrop/';
import {
  HOST_NAME,
  WELCOME_LINK,
  EVENTS_LINK,
  MEMBERS_LINK,
  CRYPTO_LINK,
  STATUS_LINK,
} from '@constants/AppConstants';
import Image from 'next/image';

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
              onClick={close}
            >
              &#9747;
            </span>
            <a className={classNames.logo} href={HOST_NAME}>
              <Image
                width="110px"
                height="110px"
                src="/images/Real-Dev-Squad@1x.png"
                alt="real-dev squad"
              />
            </a>
          </h2>
        </div>
        <nav>
          <ul>
            <li>
              <a href={HOST_NAME}>Home</a>
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
    </div>
  );
};
SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SideDrawer;
