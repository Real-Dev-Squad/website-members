import PropTypes from 'prop-types';
import classNames from './SideDrawer.module.scss';

const SideDrawer = ({ open }) => {
  let attachedClasses = [classNames.SideDrawer, classNames.Close];
  if (open) {
    attachedClasses = [classNames.SideDrawer, classNames.Open];
  }
  return (
    <div className={attachedClasses.join(' ')}>
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
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired
};

export default SideDrawer;
