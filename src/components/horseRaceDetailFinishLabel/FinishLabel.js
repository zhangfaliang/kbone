import React from 'react';
import { HorseImg, HorseName, HorseNum } from '../horseRaceInfo';
import Ranking from './Ranking';
import styles from './index.less';

const FinishLabel = ({
  prefixCls = 'finish',
  odds = '5.6',
  favText = '',
  rankNum = '',
  rankingText = '',
  picUrl,
  shortName = '',
  horseCode = '',
  noEntry = '',
}) => {
  return (
    <div className={styles[`${prefixCls}-label`]}>
      <div className={styles.left}>
        {rankingText && <Ranking prefixCls={prefixCls} rankingText={rankingText} />}
        {picUrl !== undefined && <HorseImg prefixCls={prefixCls} picUrl={picUrl} />}
        {HorseNum && <HorseNum prefixCls={prefixCls} horseCode={horseCode} />}
        {HorseName && <HorseName prefixCls={prefixCls} shortName={shortName} />}
      </div>
      {rankNum && <span className={styles.center}>{rankNum}</span>}
      <div className={styles.right}>
        {odds && <span>{odds} </span>}
        {favText && <span>{favText}</span>}
        {noEntry && <span className={styles.noEntry}>{noEntry} </span>}
      </div>
    </div>
  );
};

FinishLabel.COMPONENT_NAME = 'FINISHLABEL';

export default FinishLabel;
