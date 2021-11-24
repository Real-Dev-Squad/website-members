/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from '@components/UI/backdrop/backdrop.module.scss';

const Backdrop = ({ show, clicked }) =>
  show ? (
    <div className={classNames.Backdrop} tabIndex="-1" onClick={clicked} />
  ) : null;

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
