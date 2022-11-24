import React from 'react';
import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';

import { openModal } from '../../redux/slices/modalSlice';

import styles from './TodoItem.module.less';
import Checkbox from '../checkbox';
import FilesList from '../filesList/FilesList';

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  const dueDate = dayjs(item.dueDate);

  const formattedDueDate = new Date(dueDate.format('YYYY-MM-DD'));
  const currentDate = new Date(dayjs(Date.now()).format('YYYY-MM-DD'));

  const isCompleted = item.complete ? `${styles.complete}` : '';
  const isExpired =
    currentDate > formattedDueDate && !item.complete ? `${styles.expired}` : '';

  const handleRemoveButton = () => {
    dispatch(
      openModal({
        type: 'removeTodo',
        isOpened: true,
        extra: { id: item.id, files: item.files },
      }),
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
    <li key={item.id} className={`${styles.root} ${isCompleted}`}>
      <div className={styles.checkbox}>
        <Checkbox complete={item.complete} id={item.id} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.description}>{item.description}</p>
        <p className={`${isExpired}`}>{dueDate.format('DD.MM.YYYY')}</p>
        {isExpired && (
          <p className={`${isExpired} mb-2`}>Задача не выполнена в срок!</p>
        )}
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
      {item.files.length > 0 && (
        <div className={styles.files}>
          <FilesList item={item} />
        </div>
      )}
    </li>
  );
};

export default TodoItem;
