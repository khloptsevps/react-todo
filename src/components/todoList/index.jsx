import React from 'react';

import TodoItem from '../todoItem';
import styles from './TodoList.module.less';

import db from '../../todos-db.json';

const TodoList = () => (
  <div className={styles.root}>
    <ul>
      {db.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  </div>
);

export default TodoList;
