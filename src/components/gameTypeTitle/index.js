import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { SPORT_TYPE } from '@/constants/game-config';

const baseketball = require('../../assets/game/index/basketball.png');
const baseketballActive = require('../../assets/game/index/basketballActive.png');
const soccer = require('../../assets/game/index/Soccer.png');
const soccerActive = require('../../assets/game/index/SoccerActive.png');

class GameTypeTitle extends Component {
  static COMPONENT_NAME = 'GAMETYPETITLE';
  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.defaultActiveKey,
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    }
    return true;
  }
  handleGameType = key => {
    const { activeKey } = this.state;
    const { handleGameType } = this.props;
    this.setState(
      {
        activeKey: key,
      },
      () => {
        handleGameType && handleGameType(key);
      }
    );
  };
  render() {
    const { gameTypeArr, prefixCls } = this.props;
    const { activeKey } = this.state;
    const clsName = styles[`${prefixCls || 'default'}-game-type-title`];

    return (
      <div className={clsName}>
        {gameTypeArr &&
          gameTypeArr.map(item => {
            const { imgUrl, gameTypeText, key, activeImgUrl, gameTypeTextPrefix } = item;
            const gameTypeTextCls = classnames({
              [styles['typeText']]: true,
              [styles['activeTypeText']]: key === activeKey,
            });
            return (
              <div
                key={key}
                className={styles.items}
                onClick={() => {
                  this.handleGameType(key);
                }}
              >
                <img
                  className={styles.img}
                  src={key === activeKey ? activeImgUrl : imgUrl}
                  alt={key}
                />

                <span className={gameTypeTextCls}>
                  <span className={styles.gameTypeTextPrefix}>{gameTypeTextPrefix}</span>
                  {gameTypeText}
                </span>
              </div>
            );
          })}
      </div>
    );
  }
}
GameTypeTitle.defaultProps = {
  prefixCls: 'default',
  defaultActiveKey: SPORT_TYPE.FOOTER_BALL,
  activeKey: SPORT_TYPE.FOOTER_BALL,
  gameTypeArr: [
    {
      imgUrl: soccer,
      activeImgUrl: soccerActive,
      gameTypeText: 'Soccer (22)',
      key: SPORT_TYPE.FOOTER_BALL,
    },
    {
      imgUrl: baseketball,
      activeImgUrl: baseketballActive,
      gameTypeText: 'Basketball (22)',
      key: SPORT_TYPE.BASKET_BALL,
    },
  ],
  handleGameType: key => {
    console.log(key + 'handleGameType');
    return 'click';
  },
};
export default GameTypeTitle;
