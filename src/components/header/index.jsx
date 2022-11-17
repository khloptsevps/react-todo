import React from 'react';

import styles from './Header.module.less';

const Header = () => (
  <header className={styles.root}>
    <h1 className={styles.title}>Todo</h1>
    <div className="count">
      <span className="text">
        Active Todo:
        <span className={styles.counter}> 3</span>
      </span>
    </div>
  </header>
);

export default Header;
