import React from 'react';
import styles from './index.less';

const HorseNum = ({ horseCode = '', prefixCls = '' }) => {
  const clsStr = styles[`${prefixCls}-horse-num`];
  return <div className={clsStr}>{horseCode}</div>;
};

export default HorseNum;
