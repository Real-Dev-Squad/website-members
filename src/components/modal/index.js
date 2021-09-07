import React from 'react';
import PropTypes from 'prop-types';
import Register from '@components/modal/Register';
import Header from '@components/modal/Header';
import UIModal from '@components/UI/modal';

const Modal = (props) => {
  const { showModal, onClose, rdsUserName, setShowModal } = props;
  const modalStyle = {
    top: '6%',
    overflowY: 'auto',
    maxHeight: '90vh'
  };
  const modalChildren = (
    <div style={{margin: '0 0.5rem'}}>
      <Header />
      <Register rdsUserName={rdsUserName} setShowModal={setShowModal} />
    </div>
  );
  return <UIModal style={modalStyle} show={showModal} closeModal={onClose} children={modalChildren} /> 
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  rdsUserName: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
