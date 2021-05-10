import React from 'react';
import classNames from './modal.module.scss';
import PropTypes from 'prop-types';
import Register from './Register';
import Header from './Header';

const Modal = (props) => {
  const { showModal, onClose, rdsUserName, setShowModal } = props;
  if (showModal) {
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
              <Register rdsUserName={rdsUserName} setShowModal={setShowModal} />
            </div>
            <div className={classNames['modal-footer']}>
              <button onClick={onClose} className={classNames.closeButton}>
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  rdsUserName: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};
