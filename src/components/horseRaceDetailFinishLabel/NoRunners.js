import React from 'react';
import styles from './index.less';

const NoRunners = ({ prefixCls = 'default', noRunText = '', noRunners = [''] }) => {
  return (
    <div className={styles[`${prefixCls}-no-runners`]}>
      <span className={styles.noRunText}>{noRunText}</span>
      {noRunners.map(noRunner => (
        <span key={noRunner} className={styles.noRunner}>
          {noRunner}
        </span>
      ))}
    </div>
  );
};

NoRunners.COMPONENT_NAME = 'NORUNNERS';

export default NoRunners;
