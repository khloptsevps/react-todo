/* eslint-disable no-unused-vars */
import React from 'react';

import styles from './FileList.module.less';

const FilesList = ({ item }) => (
  <div className={styles.root}>
    {item.files.length > 0 && <p className={styles.title}>Файлы</p>}
    <div className={styles.files}>
      {item.files.length > 0 &&
        item.files.map(({ name, link }) => (
          <a
            className={styles.links}
            key={link}
            href={link}
            style={{ display: 'block' }}
            target="_blank"
            rel="noreferrer"
          >
            {/* {link
            .toLowerCase()
            .trim()
            .match(/\.\w+\?/g)
            .join()
            .slice(0, -1)} */}
            {name}
          </a>
        ))}
    </div>
  </div>
);

export default FilesList;
