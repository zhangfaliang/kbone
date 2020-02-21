import React from 'react';
import styles from './index.less';

function Badge({ count, text, onClick }) {
  return (
    <div onClick={onClick} className={styles.wrap}>
      <div className={styles.count}>
        <span>{count}</span>项
      </div>
      <div className={styles.text}>
        {text}
        <img src={require('../../../../assets/s02/jr.png')} alt="" />
      </div>
    </div>
  );
}

Badge.defaultProps = {
  count: 0,
  text: '',
  onClick: () => {},
};

export default Badge;
