import PropTypes from 'prop-types';
import classNames from '@components/UI/side-drawer/side-drawer.module.scss';
import Backdrop from '@components/UI/backdrop/';
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
            <a className={classNames.logo} href="https://realdevsquad.com">
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
            <li>
              <a href="https://status.realdevsquad.com/">Status</a>
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
