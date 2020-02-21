import React from 'react';
import IconFont from '../iconFont';
import styles from './index.less';

const Back = ({
  prefixCls = 'default',
  onClickBack = () => {
    console.log('onClickBack');
    return 'onClickBack';
  },
}) => {
  return (
    <div onClick={onClickBack} className={styles[`${prefixCls}-back`]}>
      <IconFont type="mycopy" />
    </div>
  );
};
Back.COMPONENT_NAME = 'BACK';
export default Back;
