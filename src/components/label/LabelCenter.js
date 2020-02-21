import React, { Component } from 'react';
import styles from './index.less';
const LabelCenter = ({ prefixCls = 'default', centext = 'Race 1' }) => {
  const clsName = styles[`${prefixCls}-label-center`];

  return <div className={clsName}>{centext}</div>;
};
LabelCenter.COMPONENT_NAME = 'LABLEDCENTER';

export default LabelCenter;
