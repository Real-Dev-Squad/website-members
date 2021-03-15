/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classNames from './modal.module.scss';
import Register from './Register/register.component';
import Header from './shared/Header/header.component';

const Modalcomp = (props) => {
  // eslint-disable-next-line react/prop-types
  if (!props.modalIsOpen) {
    return null;
  }
  return (
    <span className={classNames.modal}>
      <span className={classNames['modal-content']} onMouseDown={(e) => e.stopPropagation()}>
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
