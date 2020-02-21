import React from 'react';
import styles from './index.less';

const Title = ({ prefixCls = 'default', name = '', srcImg = '' }) => {
  return (
    <div className={styles[`${prefixCls}-title`]}>
      <span>
        <img src={srcImg} alt="" />
      </span>
      <span>{name}</span>
    </div>
  );
};

export default Title;
