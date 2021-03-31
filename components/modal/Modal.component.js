import React from 'react';
import classNames from './modal.module.scss';
import PropTypes from 'prop-types';
import Register from './Register/register.component';
import Header from './shared/Header/header.component';

const Modalcomp = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={classNames.modal}>
      <div className={classNames.parentdiv}>
        <div
          className={classNames['modal-content']}
          onMouseDown={(e) => e.stopPropagation()}
          aria-hidden="true">
          <div className={classNames['modal-header']}>
            <Header />
          </div>
          <div className={classNames['modal-body']}>
            <Register rdsUserName={props.rdsUserName} />
          </div>
          <div className={classNames['modal-footer']}>
            <button onClick={props.onClose} className={classNames.closeButton}>
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modalcomp;

Modalcomp.propTypes = {
  onClose: PropTypes.func,
  rdsUserName: PropTypes.string,
  showModal: PropTypes.bool
};
