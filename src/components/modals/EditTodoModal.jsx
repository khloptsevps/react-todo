import React from 'react';
import { Modal } from 'react-bootstrap';
import EditTodoForm from '../editTodoForm';

const EditTodoModal = () => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Изменить задачу</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <EditTodoForm />
    </Modal.Body>
  </>
);

export default EditTodoModal;
