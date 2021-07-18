import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from './modal.module.scss';

const Modal = ({ show, hide, color, children }) => {
  useEffect(() => {
    show ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
  }, [show]);

  return (
    <>
      {show ? (
        <div
          className={classNames.overlay}
          style={{ backgroundColor: color }}
          onClick={hide}
          role="button"
          aria-hidden="true"></div>
      ) : (
        ' '
      )}
      <div className={classNames.container}>
        <div
          className={classNames.modal}
          style={{
            opacity: show ? 1 : 0
          }}>
          {children}
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  hide: PropTypes.func,
  color: PropTypes.string,
  children: PropTypes.array.isRequired
};

export default Modal;
