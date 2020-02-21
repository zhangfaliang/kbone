import React, { Component } from 'react';
import styles from './index.less';
import BetModule from '../betModule';
import { isEmpty } from 'lodash';
class BetContentModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isActive: true,
    };
  }
  shouldComponentUpdate(nextProps, nextstate) {
    const update = JSON.stringify(nextProps.data) === JSON.stringify(this.props.data);
    const updateBetArryChecked =
      JSON.stringify(nextProps.betArryChecked) === JSON.stringify(this.props.betArryChecked);
    return !update || !updateBetArryChecked;
  }
  quickBet = e => {
    this.props.quickBet(e);
  };
  setChecked = (betArry, itemValue) => {
    if (isEmpty(betArry)) {
      return false;
    }
    let a = betArry.some(
      v => v.optionId === itemValue.optionId && v.matchId * 1 === itemValue.matchId * 1
    );
    return a;
  };
  render() {
    const { data, betArryChecked } = this.props;
    return (
      <>
        {/* {data.map((v, i) => {
          return (
            <div className={styles.table} key={JSON.stringify(v) + i}>
              <BetModule
                data={v.playing}
                betArryChecked={betArryChecked}
                quickBet={this.quickBet}
              />
            </div>
          );
        })} */}
        {/* 
         FIXME: 待处理.
         -----1: 如果通过map遍历 子组件 shouldComponentUpdate时，取不到(nextProps)无法进行业务逻辑判断
        */}
        <div className={styles.table}>
          <BetModule
            data={data[0].playing}
            betArryChecked={betArryChecked}
            quickBet={this.quickBet}
          />
        </div>
        <div className={styles.table}>
          <BetModule
            data={data[1].playing}
            betArryChecked={betArryChecked}
            quickBet={this.quickBet}
          />
        </div>
        <div className={styles.table}>
          <BetModule
            data={data[2].playing}
            betArryChecked={betArryChecked}
            quickBet={this.quickBet}
          />
        </div>
      </>
    );
  }
}
BetContentModule.defaultProps = {
  prefixCls: 'default',
  betArryChecked: [],
  data: [],
  quickBet: key => {
    console.log(key, '尚未传入执行事件');
  },
};
export default BetContentModule;
