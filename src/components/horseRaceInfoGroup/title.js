import React from 'react';
import styles from './index.less';

const HorseRaceInfoGroupTitle = ({
  prefixCls = 'single',
  titleText = '',
  label = 'info',
  showEmpty = false,
}) => {
  const clsStr = styles[`${prefixCls}-horse-race-info-group-title`];
  return (
    <div className={clsStr}>
      {showEmpty && <span className={styles.empty} />}
      <span className={styles.label}>{label}</span>
      <span className={styles.text}>{titleText}</span>
    </div>
  );
};

HorseRaceInfoGroupTitle.COMPONENT_NAME = 'HORSERACEINFOGROUPTITLE';

export default HorseRaceInfoGroupTitle;
