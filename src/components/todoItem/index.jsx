import React from 'react';
import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';

import { openModal } from '../../redux/slices/modalSlice';

import styles from './TodoItem.module.less';
import Checkbox from '../checkbox';

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  const dueDate = dayjs(item.dueDate);

  const formattedDueDate = new Date(dueDate.format('YYYY-MM-DD'));
  const currentDate = new Date(dayjs(Date.now()).format('YYYY-MM-DD'));

  const isExpired = currentDate > formattedDueDate ? styles.expired : null;

  const liClasses = item.complete
    ? `${styles.root} ${styles.complete}`
    : `${styles.root}`;

  const handleRemoveButton = () => {
    dispatch(
      openModal({ type: 'removeTodo', isOpened: true, extra: { id: item.id } }),
    );
  };

  const handleViewButton = () => {
    dispatch(
      openModal({ type: 'viewTodo', isOpened: true, extra: { id: item.id } }),
    );
  };
  const handleEditButton = () => {
    dispatch(
      openModal({ type: 'editTodo', isOpened: true, extra: { id: item.id } }),
    );
  };

  return (
    <li key={item.id} className={liClasses}>
      <div className={styles.checkbox}>
        <Checkbox complete={item.complete} id={item.id} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.description}>{item.description}</p>
        <div className={`${styles.duedate} ${isExpired} mb-4`}>
          {dueDate.format('DD.MM.YYYY')}
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={handleViewButton}
          type="button"
          className="btn btn-outline-primary me-2"
        >
          Просмотр
        </button>
        <button
          disabled={item.complete}
          type="button"
          className="btn btn-outline-primary me-2"
          onClick={handleEditButton}
        >
          Редактировать
        </button>
        <button
          onClick={handleRemoveButton}
          type="button"
          className="btn btn-danger"
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
