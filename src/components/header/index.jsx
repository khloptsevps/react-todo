import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Header.module.less';

const Header = () => {
  const selector = useSelector((state) => state.todosState);
  const { todos } = selector;
  const notCompletedTodos = todos.filter((todo) => !todo.complete);
  const completedTodos = todos.filter((todo) => todo.complete);
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>Todo</h1>
      <div className="count">
        <div className="text">
          Всего задач:
          <span className={styles.counter}> {todos.length}</span>
        </div>
        <div className="text">
          Активные:
          <span className={styles.counter}> {notCompletedTodos.length}</span>
        </div>
        <div className="text text-success">
          Завершенные:
          <span className={styles.counter}> {completedTodos.length}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
