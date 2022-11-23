/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { removeTodo } from '../../redux/slices/todoSlice';
import { closeModal } from '../../redux/slices/modalSlice';

const RemoveTodoModal = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.modalState);

  const { id, files } = selector.extra;

  const [isDisabled, setIsDisabled] = useState(false);
  const handleRemoveButton = () => {
    dispatch(removeTodo({ id, files }));
    setIsDisabled(!isDisabled);
  };
  const handleChancelButton = () => dispatch(closeModal());
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Удалить?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          onClick={handleRemoveButton}
          type="button"
          className="btn btn-danger me-2"
          disabled={isDisabled}
        >
          Удалить
        </Button>
        <Button
          onClick={handleChancelButton}
          type="button"
          className="btn btn-secondary"
          disabled={isDisabled}
        >
          Отменть
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveTodoModal;
