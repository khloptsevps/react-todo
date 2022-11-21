import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { editTodo } from '../../redux/slices/todoSlice';

const EditTodoForm = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todosState);
  const { extra } = useSelector((state) => state.modalState);

  const currentTodo = todos.find((todo) => todo.id === extra.id);

  const normalizeDueDate = dayjs(Date.now(currentTodo.dueDate)).format(
    'YYYY-MM-DD',
  );

  const [touched, setIsTouched] = useState(false);
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);
  const [date, setDate] = useState(normalizeDueDate);
  const [isDisabled, setIsDisabled] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!touched) {
      ref.current.select();
      setIsTouched(true);
    }
  }, [touched]);

  const handleForm = (e) => {
    e.preventDefault();
    const dueDate = new Date(date).toString();
    const formData = { ...currentTodo, title, description, dueDate };
    setIsDisabled(true);
    dispatch(editTodo(formData));
  };

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleDescInput = (e) => setDescription(e.target.value);
  const handleDateInput = (e) => setDate(e.target.value);

  return (
    <Form onSubmit={handleForm}>
      <Form.Group className="mb-3" controlId="form-title">
        <Form.Label>Название</Form.Label>
        <Form.Control
          ref={ref}
          onChange={handleTitleInput}
          value={title}
          type="text"
          placeholder="Название задачи"
          disabled={isDisabled}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form-desc">
        <Form.Label>Описание</Form.Label>
        <Form.Control
          type="text"
          onChange={handleDescInput}
          value={description}
          placeholder="Описание задачи"
          disabled={isDisabled}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form-date">
        <Form.Label>Дата выполнения</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={handleDateInput}
          placeholder="Дата выполнения"
          disabled={isDisabled}
          required
        />
      </Form.Group>
      <Button disabled={isDisabled} variant="primary" type="submit">
        Изменить задачу
      </Button>
    </Form>
  );
};

export default EditTodoForm;
