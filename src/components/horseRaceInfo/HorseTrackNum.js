import React from 'react';
import styles from './index.less';

const HorseTrackNum = ({ horseTrack = '', prefixCls = 'single' }) => {
  const clsStr = styles[`${prefixCls}-horse-track-num`];
  return <div className={clsStr}>{horseTrack}</div>;
};
export default HorseTrackNum;
