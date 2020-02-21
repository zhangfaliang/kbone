import React from 'react';
import styles from './index.less';

const HistoricalRecord = ({ historyRecord = '', prefixCls = 'single' }) => {
  const clsStr = styles[`${prefixCls}-horse-historical-record`];
  return <div className={clsStr}>{historyRecord}</div>;
};

export default HistoricalRecord;
