import React from 'react';
import classNames from './modal.module.scss';
import PropTypes from 'prop-types';
import Register from './Register/register.component';
import Header from './shared/Header/header.component';

const Modalcomp = (props) => {
  if (!props.modalIsOpen) {
    return null;
  }
  return (
    <span className={classNames.modal}>
      <span
        className={classNames['modal-content']}
        onMouseDown={(e) => e.stopPropagation()}
        aria-hidden="true">
        <span className={classNames['modal-header']}>
          <Header />
        </span>
        <span className={classNames['modal-body']}>
          <Register rdsusername={props.rdsusername} />
        </span>
        <span className={classNames['modal-footer']}>
          <button onClick={props.onClose} className={classNames.closeButton}>
            &times;
          </button>
        </span>
      </span>
    </span>
  );
};

export default Modalcomp;

Modalcomp.propTypes = {
  onClose: PropTypes.func,
  rdsusername: PropTypes.string,
  modalIsOpen: PropTypes.bool
};
