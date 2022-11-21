import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchAllTodos } from './redux/slices/todoSlice.js';

import styles from './less/main.less';

import Header from './components/header';
import AddTodoButton from './components/AddTodoButton/index.jsx';
import TodoList from './components/todoList';
import MyModal from './components/modals/Modal.jsx';

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllTodos());
  });

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.add}>
          <AddTodoButton />
        </div>
        <div className={styles.todos}>
          <TodoList />
        </div>
      </div>
      <MyModal />
    </div>
  );
};

export default App;
