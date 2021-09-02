import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/UI/modal/modal.module.scss';
import Backdrop from 'components/UI/backdrop';

const Modal = ({ show, closeModal, children }) => (
  <>
    <Backdrop show={show} clicked={closeModal} />
    <div
      className={styles.modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}>
      <span className={styles.crossIcon}>
        <i className="fa fa-times" aria-hidden="true" onClick={closeModal} />
      </span>
      {children}
    </div>
  </>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
