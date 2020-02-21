import React from 'react';
import styles from './index.less';

const SPInfo = ({ textInfo = '', prefixCls = 'default' }) => {
  const clsStr = styles[`${prefixCls}-sp-info`];
  return <div className={clsStr}>{textInfo}</div>;
};

SPInfo.COMPONENT_NAME = 'SPINFO';
export default SPInfo;
