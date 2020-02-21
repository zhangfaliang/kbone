import React from 'react';
import { formatMessage } from 'umi/locale';
import SwitchBtn from './SwitchBtn';

import styles from './FootballLive.less';

export class FootballLive extends React.Component {
  render() {
    const { footballEvents, teams, handleSwitch, switchImgUrl, text, type } = this.props;
    return (
      <div className={styles['wrapper']}>
        <div className={styles['inifo']}>
          <div>{teams[0]}</div>
          <div className={styles['events']}>
            {footballEvents.map((x, index) => {
              const isLast = index === footballEvents.length - 1;
              if (x.teamFlag === 1) return <HomeEventBlock key={index} {...x} isLast={isLast} />;
              if (x.teamFlag === 2) return <AwayEventBlock key={index} {...x} isLast={isLast} />;
              return <NeutralEventBlock key={index} {...x} isLast={isLast} />;
            })}
          </div>
          <div>{teams[1]}</div>
        </div>
        <div className={styles.switchWrap}>
          <SwitchBtn
            handleSwitch={handleSwitch}
            switchImgUrl={switchImgUrl}
            text={text}
            type={type}
          />
        </div>
      </div>
    );
  }
}

const NeutralEventBlock = ({ eventPic, eventTime, isLast }) => (
  <div className={styles['block-with-right-line']}>
    <img className={styles.img} src={eventPic} alt="" />
    {!isLast && <Line />}
    <div className={styles['neutral-top']}>{eventTime === `0'` ? '' : eventTime}</div>
  </div>
);

const AwayEventBlock = ({ eventPic, isLast, eventTime }) => (
  <div className={styles['block-with-right-line']}>
    <div className={styles['away']}>
      <img className={styles.img} src={eventPic} alt="" />
      <div className={styles['eventTime']}>{eventTime}</div>
    </div>
    {!isLast && <Line />}
  </div>
);

const HomeEventBlock = ({ eventPic, isLast, eventTime }) => (
  <div className={styles['block-with-right-line']}>
    <div className={styles['home']}>
      <div className={styles['eventTime']}>{eventTime}</div>
      <img className={styles.img} src={eventPic} alt="" />
    </div>
    {!isLast && <Line />}
  </div>
);

const Line = () => <div className={styles['line']} />;
