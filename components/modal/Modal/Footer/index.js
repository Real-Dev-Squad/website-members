import classNames from '../modal.module.scss';
import PropTypes from 'prop-types';

const Footer = ({ children }) => {
  return <div className={classNames.footer}>{children}</div>;
};

Footer.propTypes = {
  children: PropTypes.string
};

export default Footer;
