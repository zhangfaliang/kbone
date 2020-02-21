import React from 'react';
import styles from './index.less';
import HorseNum from './HorseNum';
import HorseName from './HorseName';

const ForeCastOrTriCast = ({ horseCode = '', shortName = '', prefixCls = 'fore-or-tri' }) => {
  const clsStr = styles[`${prefixCls}-horse-info`];
  return (
    <div className={clsStr}>
      <HorseNum prefixCls={prefixCls} horseCode={horseCode} />
      <HorseName prefixCls={prefixCls} shortName={shortName} />
    </div>
  );
};

ForeCastOrTriCast.COMPONENT_NAME = 'FORECASTORTRICAST';
export default ForeCastOrTriCast;
