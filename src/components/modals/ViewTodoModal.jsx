/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { closeModal } from '../../redux/slices/modalSlice';

import styles from './ViewTodoModal.module.less';

const ViewTodoModal = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.modalState);
  const { extra } = selector;
  const { todos } = useSelector((state) => state.todosState);

  const currentTodo = todos.find((todo) => todo.id === extra.id);

  const handleCloseButton = () => dispatch(closeModal());

  const todoDueDate = new Date(currentTodo.dueDate);
  const currentDate = new Date(dayjs(Date.now()).format('YYYY-MM-DD'));

  const isExpired = currentDate > todoDueDate;

  const formattedDueDate = dayjs(todoDueDate).format('DD.MM.YYYY');

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{currentTodo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        <div className={styles.wrapper}>
          <p>{currentTodo.description}</p>
          {isExpired && !currentTodo.complete && (
            <p className={`${styles.text} text-danger`}>
              <span>Задача не выполнена в срок!</span>
              <br />
              <span>Срок исполнения: {formattedDueDate}</span>
            </p>
          )}
          {currentTodo.complete && (
            <p className={`${styles.text} text-success`}>Задача завершена!</p>
          )}
          {!isExpired && !currentTodo.complete && (
            <p className={`${styles.text} text-success`}>
              <span>Завершить до: {formattedDueDate}</span>
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleCloseButton}
          type="button"
          className="btn btn-secondary"
        >
          Закрыть
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ViewTodoModal;
