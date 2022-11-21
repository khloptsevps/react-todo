/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Checkbox.module.less';

import { setComplete } from '../../redux/slices/todoSlice.js';

const Checkbox = ({ complete, id }) => {
  const dispatch = useDispatch();

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
