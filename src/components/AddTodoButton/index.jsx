import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { openModal } from '../../redux/slices/modalSlice.js';

const AddTodoButton = () => {
  const dispatch = useDispatch();

  const handleAddTodo = () =>
    dispatch(openModal({ type: 'addTodo', isOpened: true }));

  return (
    <Button onClick={handleAddTodo} type="button" className="btn btn-primary">
      Добавить задачу
    </Button>
  );
};

export default AddTodoButton;
