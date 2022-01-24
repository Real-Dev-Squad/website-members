import React from 'react';
import PropTypes from 'prop-types';
import classNames from '@components/UI/backdrop/backdrop.module.scss';

const Backdrop = ({ show, clicked }) =>
  show ? (
    <div
      className={classNames.backdrop}
      onClick={clicked}
      onKeyDown={clicked}
      aria-hidden
    />
  ) : null;

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
