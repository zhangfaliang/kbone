import React from 'react';
import styles from './index.less';
const BetMatchInfo = ({
  homeName = 'Villacher Sv',
  awayName = 'Greifenburg',
  homeScore = '',
  awayScore = '',
  isShowScore = false,
  isLive = true,
  liveText = 'LIVE',
  time = `4th set 10'`,
  clickBetMatchInfo = () => {},
}) => {
  return (
    <div className={styles.wrap} onClick={clickBetMatchInfo}>
      <div className={styles.nameOrScore}>
        <span className={styles.name}>{homeName}</span>
        {isShowScore && <span className={styles.score}>{homeScore} </span>}
      </div>
      <div className={styles.nameOrScore}>
        <span className={styles.name}>{awayName}</span>
        {isShowScore && <span className={styles.score}>{awayScore}</span>}
      </div>
      <div className={styles.bottom}>
        {isLive && <span className={styles.live}>{liveText}</span>}
        {time && <span className={styles.time}>{time}</span>}
      </div>
    </div>
  );
};
BetMatchInfo.COMPONENT_NAME = 'BETMATCHINFO';
export default BetMatchInfo;
