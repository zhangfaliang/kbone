import React from 'react';
import styles from './index.less';

const Ranking = ({ prefixCls = 'default', rankingText = '1st' }) => {
  return <span className={styles[`${prefixCls}-ranking`]}>{rankingText}</span>;
};

export default Ranking;
