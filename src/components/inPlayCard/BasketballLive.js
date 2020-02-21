import React from 'react';
import classnames from 'classnames';
import { formatMessage } from 'umi/locale';
import SwitchBtn from './SwitchBtn';

import styles from './BasketballLive.less';

export class BasketballLive extends React.Component {
  render() {
    const topClass = classnames(styles['flex-block'], styles['bottom']);
    const middleClass = classnames(styles['flex-block'], styles['middle']);
    const bottomClass = classnames(styles['flex-block'], styles['bottom']);

    const { realTimeScore, handleSwitch, switchImgUrl, text, type } = this.props;
    const [awayRealTimeScore, homeRealTimeScore] = realTimeScore;

    return (
      <div className={styles['wrapper']}>
        <FlexBlock
          customStyle={topClass}
          dataSrc={[null, '第一节', '第二节', '半场', '第三节', '第四节']}
        />
        <FlexBlock
          customStyle={middleClass}
          dataSrc={[formatMessage({ id: 'Wiki.0077' }), ...awayRealTimeScore]}
        />
        <FlexBlock
          customStyle={bottomClass}
          dataSrc={[formatMessage({ id: 'Wiki.0076' }), ...homeRealTimeScore]}
        />
        <div className={styles.switchWrap}>
          <SwitchBtn
            className={styles.mg_t20}
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

const FlexBlock = ({ dataSrc, customStyle }) => (
  <div className={customStyle}>
    {dataSrc.map((x, index) => (
      <div key={index}>{x === undefined ? '-' : x}</div>
    ))}
  </div>
);
