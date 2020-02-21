import React from 'react';
import styles from './index.less';

//todo 马名：黑色字体为马名，最多显示22位，超过部分用“..."显示。
const HorseName = ({ shortName = '', prefixCls = '' }) => {
  const clsStr = styles[`${prefixCls}-horse-name`];
  return <div className={clsStr}>{shortName}</div>;
};

export default HorseName;
