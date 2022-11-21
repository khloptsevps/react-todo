import React from 'react';
import { Modal } from 'react-bootstrap';
// import renderModalContent from './renderModalContent.js';

import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../redux/slices/modalSlice.js';

import renderModal from './renderModal.js';

const MyModal = () => {
  const dispatch = useDispatch();
  const modalProperties = useSelector((state) => state.modalState);

  const handleClose = () => dispatch(closeModal());
  return (
    <Modal show={modalProperties.isOpened} onHide={handleClose} centered>
      {renderModal(modalProperties)}
    </Modal>
  );
};

export default MyModal;
