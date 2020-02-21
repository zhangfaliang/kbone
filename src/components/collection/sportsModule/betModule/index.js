import React, { Component } from 'react';
import Item from './item';
import { isEmpty } from 'lodash';
class BetModule extends Component {
  shouldComponentUpdate(nextProps) {
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
        {/* {data.map((child, index) => {
          const checkedCls = classnames({
            [styles.cellBet]: true, // 默认
            [styles.bgcolor]: this.setChecked(betArryChecked, child), // 选中
          });
          return (
            <React.Fragment key={JSON.stringify(child) + '' + index}>
              <div className={checkedCls}>
                <div onClick={() => this.handBet(child)}>
                  <div>
                    {child.odds}
                    <ChangeInOdds odds={child.odds} />
                  </div>
                  <div>{child.downText}</div>
                </div>
              </div>
            </React.Fragment>
          );
        })} */}
        {/* 
         FIXME: 待处理.
         -----1: 如果通过map遍历 子组件 shouldComponentUpdate时，取不到(nextProps)无法进行业务逻辑判断
        */}

        <Item data={data[0]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
        <Item data={data[1]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
        <Item data={data[2]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
        {/* {data.length === 6 && (
          <>
            <Item data={data[3]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
            <Item data={data[4]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
            <Item data={data[5]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
          </>
        )} */}

        {data.length > 3 && (
          <Item data={data[3]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
        )}
        {data.length > 4 && (
          <Item data={data[4]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
        )}
        {data.length > 5 && (
          <Item data={data[5]} betArryChecked={betArryChecked} quickBet={this.quickBet} />
        )}
      </>
      // </div>
    );
  }
}
BetModule.defaultProps = {
  prefixCls: 'default',
  betArryChecked: [],
  quickBet: key => {
    console.log(key, '尚未传入执行事件');
    // return 'click';
  },
};
export default BetModule;
