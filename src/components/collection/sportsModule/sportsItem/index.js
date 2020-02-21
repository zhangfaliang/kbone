import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Border from '../../border';
import LeftModule from '../leftModule';
import Dots from '../dots';
import Time from '../../timer';

import styles from './index.less';
import live from '@/assets/favorites/s02/live.png';
import { isFunction } from 'lodash';
class SportItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leftDot: true,
      rightDot: false,
    };
  }
  quickBet = value => {
    this.props.quickBet(value);
  };
  handleMore = e => {
    this.props.handleMore(e);
  };
  setDots = value => {
    this.setState(value);
  };
  render() {
    const {
      statusJson,
      listChild,
      favoritesItem,
      betArryChecked,
      setFirstTitleBg,
      setFirstTitleBgYollow,
    } = this.props;
    const { leftDot, rightDot, changeMove } = this.state;
    return (
      <>
        {listChild.map((value, index) => {
          return (
            <div key={index} className={styles.sportsDetail}>
              {index === 0 && !setFirstTitleBgYollow && <Border prefixCls={'sports'} />}
              <div className={styles.sportsContents}>
                <div>
                  {value.listChildrens.map((v, i) => {
                    // TODO: 待优化,有点复杂
                    const teamInformationCls = classnames({
                      [styles.teamInformationfirst]: i === 0,
                      [styles.teamInformation]: i !== 0,
                    });
                    const leagueNameCls = classnames({
                      [styles.leagueName]: true,
                      [styles.firstTitieNoBg]: index === 0 && setFirstTitleBg,
                      [styles.firstTitleBgYollow]: index === 0 && setFirstTitleBgYollow,
                    });
                    return (
                      <React.Fragment key={i}>
                        {i === 0 && (
                          <div className={leagueNameCls}>
                            <div>
                              <div>{v.leagueName}</div>
                            </div>
                          </div>
                        )}
                        {i !== 0 && <Border prefixCls={'sports'} />}
                        <div className={teamInformationCls}>
                          {v.listItem.map((va, ind, arr) => {
                            return (
                              <React.Fragment key={ind}>
                                {/^[0-1]$/.test(ind) && (
                                  <div
                                    className={styles.item}
                                    key={ind}
                                    onClick={() => this.handleMore(arr[2])}
                                  >
                                    <div>{va.teamName}</div>
                                    <div>{va.score}</div>
                                  </div>
                                )}
                                {/^[2]$/.test(ind) && (
                                  <div className={styles.itemHandle}>
                                    <div onClick={() => this.handleMore(va)}>
                                      <span>{va.live && <img src={live} alt="" />} </span>
                                      <span className={styles.times}>
                                        <Time {...va} nowTime={v.nowTime} statusJson={statusJson} />
                                      </span>
                                    </div>
                                    <div>{isFunction(favoritesItem) && favoritesItem(va)}</div>
                                    <div>
                                      <span
                                        className={styles.more}
                                        onClick={() => this.handleMore(va)}
                                      >
                                        {/* 更多玩法 */}
                                      </span>
                                    </div>
                                    {v.sportType === 1 && (
                                      <Dots
                                        num={index}
                                        changeMove={changeMove}
                                        leftDot={leftDot}
                                        rightDot={rightDot}
                                      />
                                    )}
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className={styles.left}>
                  <LeftModule
                    data={value.listChildrens}
                    quickBet={this.quickBet}
                    betArryChecked={betArryChecked}
                    setDots={this.setDots}
                    num={index}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
SportItem.defaultProps = {
  prefixCls: 'default',
  betArryChecked: [],
  setFirstTitleBg: true,
  setFirstTitleBgYollow: false,
  handleMore: e => {
    console.log(e, '尚未传入执行事件');
    return false;
  },
  favoritesItem: '',
};
export default SportItem;
