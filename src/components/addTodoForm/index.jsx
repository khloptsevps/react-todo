import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { addTodo } from '../../redux/slices/todoSlice';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const dateNow = dayjs(Date.now()).format('YYYY-MM-DD');

  const [touched, setIsTouched] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(dateNow);
  const [isDisabled, setIsDisabled] = useState(false);
  const [files, setFiles] = useState([]);

  const input = useRef(null);

  useEffect(() => {
    if (!touched) {
      input.current?.focus();
      setIsTouched(true);
    }
  }, [touched]);

  const handleForm = (e) => {
    e.preventDefault();
    const dueDate = dayjs(date).format('YYYY-MM-DD');
    const createdAt = new Date(Date.now()).toString();
    const formData = {
      title,
      description,
      dueDate,
      complete: false,
      createdAt,
      files,
    };
    setIsDisabled(true);
    dispatch(addTodo(formData));
  };

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleDescInput = (e) => setDescription(e.target.value);
  const handleDateInput = (e) => setDate(e.target.value);

  const handleFilesInput = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const { name } = e.target.files[i];
      setFiles((prev) => [...prev, { name, file: e.target.files[i] }]);
    }
  };

  return (
    <Form onSubmit={handleForm}>
      <Form.Group className="mb-3" controlId="form-title">
        <Form.Label>Название</Form.Label>
        <Form.Control
          ref={input}
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
          min={dateNow}
          onChange={handleDateInput}
          placeholder="Дата выполнения"
          disabled={isDisabled}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form-date">
        <Form.Label>Загрузить файлы</Form.Label>
        <Form.Control
          multiple
          onChange={handleFilesInput}
          type="file"
          disabled={isDisabled}
        />
      </Form.Group>
      <Button disabled={isDisabled} variant="primary" type="submit">
        Добавить задачу
      </Button>
    </Form>
  );
};

export default AddTodoForm;
