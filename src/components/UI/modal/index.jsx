import React from 'react';
import PropTypes from 'prop-types';
import classes from 'components/UI/modal/modal.module.scss';
import Backdrop from 'components/UI/backdrop';

const Modal = ({ show, modalClosed, children }) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}>
      <span className={classes.crossIcon}>
        <i className="fa fa-times" aria-hidden="true" onClick={modalClosed} />
      </span>
      {children}
    </div>
  </>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
