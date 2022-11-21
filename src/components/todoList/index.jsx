import React from 'react';
import { useSelector } from 'react-redux';

import TodoItem from '../todoItem';
// import styles from './TodoList.module.less';

const TodoList = () => {
  const todos = useSelector((state) => state.todosState.todos);
  return (
    <div className="todo-list">
      <ul>
        {todos.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
