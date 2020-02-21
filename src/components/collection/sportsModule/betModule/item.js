import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import ChangeInOdds from '../changeInOdds';
import { isEmpty, get } from 'lodash';
class Item extends Component {
  constructor(props) {
    super(props);
    this.number = 1;
    this.state = {};
  }
  shouldComponentUpdate(nextProps) {
    const { data, betArryChecked } = nextProps;
    const update = JSON.stringify(data) === JSON.stringify(this.props.data);
    const updateBetArryChecked =
      JSON.stringify(betArryChecked) === JSON.stringify(this.props.betArryChecked);
    if (!updateBetArryChecked && !this.setChecked(betArryChecked, data)) {
      this.number = 1;
    }
    return !update || !updateBetArryChecked;
  }
  handBet = (e, betArry, noBet) => {
    if (isEmpty(e.odds) || noBet) {
      return false;
    }
    // if (noBet) {
    //   return false;
    // }
    const value = {
      ...e,
      isActive: true,
    };
    let a = betArry.find(v => v.optionId === e.optionId && v.matchId * 1 === e.matchId * 1);
    if (!isEmpty(a)) {
      value.bettingSlipId = a.bettingSlipId;
      value.isActive = false;
      this.number = 1;
    } else {
      if (this.number !== 1) {
        return false;
      }
      this.number = 2;
    }
    this.props.quickBet(value);
  };
  setChecked = (betArry, itemValue) => {
    if (isEmpty(betArry)) {
      return false;
    }
    // console.log(betArry[0].optionId, itemValue.optionId)
    // console.log(betArry[0].matchId, itemValue.matchId)
    // console.log(betArry[0].alternative, itemValue.alternative)
    let a = betArry.some(
      v =>
        v.optionId === itemValue.optionId &&
        v.matchId * 1 === itemValue.matchId * 1 &&
        v.alternative * 1 === itemValue.alternative
    );
    return a;
  };
  render() {
    const { data, betArryChecked } = this.props;
    // TODO: 玩法暂停和 odds 小于1.01 时
    const noBet = data.odds.length > 0 && (get(data, 'paused') === 1 || data.odds < 1.01);
    const checkedCls = classnames({
      [styles.cellBet]: true, // 默认
      [styles.bgcolor]: this.setChecked(betArryChecked, data) && !noBet, // 选中
    });
    return (
      <div className={checkedCls}>
        {noBet ? (
          <div className={styles.noBet}>-</div>
        ) : (
          <div onClick={() => this.handBet(data, betArryChecked, noBet)}>
            <div>
              {data.odds}
              <ChangeInOdds odds={data.odds} data={{ odds: data.odds, matchId: data.matchId }} />
            </div>
            <div>{data.downText}</div>
          </div>
        )}
      </div>
    );
  }
}
export default Item;
