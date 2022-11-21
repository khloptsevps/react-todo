/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Checkbox.module.less';

import { setComplete } from '../../redux/slices/todoSlice.js';

const Checkbox = ({ complete, id }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosState.todos);
  const currentTodo = todos.find((todo) => todo.id === id);
  const handleCheckbox = () => {
    dispatch(setComplete({ id, complete: !complete }));
  };
  return (
    <div>
      <input
        className={styles.root}
        onChange={handleCheckbox}
        type="checkbox"
        name="checkbox"
        id={id}
        checked={complete}
      />
      <label htmlFor={id}> </label>
    </div>
  );
};

export default Checkbox;
