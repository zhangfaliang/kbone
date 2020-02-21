import React from 'react';
import styles from './index.less';
const Line = ({ prefixCls = 'row' }) => {
  const lineClsStr = `${prefixCls || 'row'}-line`;
  return <div className={styles[lineClsStr]} />;
};
Line.COMPONENT_NAME = 'LINE';
export default Line;
