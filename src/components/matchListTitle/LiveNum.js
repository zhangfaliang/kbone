import React, { Fragment } from 'react';
import IconFont from '../iconFont';
import styles from './index.less';

const LiveNum = ({
  number = '',
  isShow = false,
  prefixCls = 'default',
  handleLive = () => {
    console.log('handleLiveNum');
  },
}) => {
  const clsNameStr = `${prefixCls || 'default'}-live-num`;
  const handleLiveNum = e => {
    e.preventDefault();
    handleLive && handleLive();
  };
  return (
    <Fragment>
      {isShow && (
        <div onClick={handleLiveNum} className={styles[clsNameStr]}>
          <span className={styles.liveImg} />
          <span className={styles.num}>{number}</span>
          <span className={styles.icon}>
            <IconFont type="mycopy" />
          </span>
        </div>
      )}
    </Fragment>
  );
};
LiveNum.COMPONENT_NAME = 'LIVENUM';
export default LiveNum;
