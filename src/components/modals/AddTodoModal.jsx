import React from 'react';
import { Modal } from 'react-bootstrap';
import AddTodoForm from '../addTodoForm';

const AddTodoModal = () => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Добавить задачу</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <AddTodoForm />
    </Modal.Body>
  </>
);

export default AddTodoModal;
