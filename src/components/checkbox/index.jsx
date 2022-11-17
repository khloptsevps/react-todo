import React from 'react';

import styles from './Checkbox.module.less';

const Checkbox = ({ complete, id }) => {
  const [isComplete, setIsComplete] = React.useState(complete);
  const handleCheckbox = () => {
    setIsComplete(!isComplete);
  };
  return (
    <div>
      <input
        className={styles.root}
        onChange={handleCheckbox}
        type="checkbox"
        name="checkbox"
        id={id}
        checked={isComplete}
      />
      <label htmlFor={id}> </label>
    </div>
  );
};

export default Checkbox;
