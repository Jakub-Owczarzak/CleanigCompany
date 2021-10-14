import React from 'react';

import styles from './linkitembutton.module.scss';

const LinkItemButton = ({ action, text }) => {
  return (
    <span className={action ? `${styles.span} ${styles.action}` : styles.span}>
      {text}
    </span>
  );
};

export default LinkItemButton;
