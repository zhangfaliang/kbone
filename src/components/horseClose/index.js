import React from 'react';
import styles from './index.less';

const HorseClose = ({ text = '' }) => {
  return <div className={styles.text}>{text}</div>;
};

export default HorseClose;
