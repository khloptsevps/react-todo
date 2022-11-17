import React from 'react';

import styles from './less/main.less';

import Header from './components/header';
import TodoList from './components/todoList';

const App = () => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.container}>
      <div className={styles.add}>
        <button type="button" className="btn btn-primary">
          Add TODO
        </button>
      </div>
      <div className={styles.todos}>
        <TodoList />
      </div>
    </div>
  </div>
);

export default App;
