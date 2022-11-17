import React from 'react';
import dayjs from 'dayjs';
import styles from './TodoItem.module.less';
import Checkbox from '../checkbox';

const TodoItem = ({ item }) => {
  const dueDate = dayjs(item.dueDate);

  const formattedDueDate = new Date(dueDate.format('YYYY-MM-DD'));
  const currentDate = new Date(dayjs(Date.now()).format('YYYY-MM-DD'));

  const isExpired = currentDate > formattedDueDate ? styles.expired : null;

  return (
    <li key={item.id} className={styles.root}>
      <div className={styles.complete}>
        <Checkbox complete={item.complete} id={item.id} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.description}>{item.description}</p>
        <div className={`${styles.duedate} ${isExpired} mb-4`}>
          {dueDate.format('DD.MM.YYYY')}
        </div>
      </div>
      <div className="buttons">
        <button type="button" className="btn btn-outline-primary me-2">
          Редактировать
        </button>
        <button type="button" className="btn btn-danger">
          Удалить
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
