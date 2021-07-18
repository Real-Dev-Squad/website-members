import classNames from '../modal.module.scss';
import PropTypes from 'prop-types';

const Header = ({ hide, children }) => {
  return (
    <div className={classNames.header}>
      <div className={classNames.title}>{children}</div>{' '}
      <button className={classNames.closedButton} onClick={hide} title="close">
        X
      </button>
    </div>
  );
};

Header.propTypes = {
  hide: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Header;
