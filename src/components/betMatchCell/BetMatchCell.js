import React, { Component } from 'react';
import styles from './index.less';
import BetMatchInfo from '../betMatchInfo';
import BetButtonCell from '../betButtonCell';
import ProgressText from './ProgressText';
class BetMatchCell extends Component {
  static COMPONENT_NAME = 'BETMATCHCELL';
  handleBetBtn = betInfo => {
    const { matchTime, clickBetBtn } = this.props;
    clickBetBtn({ ...betInfo, matchTime });
  };
  render() {
    const { children, prefixCls } = this.props;
    const classNameStr = `${prefixCls || 'push-inplay'}-bet-cell`;
    const childrens = React.Children.map(children, option => {
      const { clickBetBtn, changeSp, changeHandicap, ...other } = option.props;

      if (option.type.COMPONENT_NAME === 'BETMATCHINFO') {
        return <BetMatchInfo {...other} />;
      } else if (option.type.COMPONENT_NAME === 'BETBUTTONCELL') {
        return (
          <BetButtonCell
            {...other}
            clickBetBtn={this.handleBetBtn}
            changeSp={this.props.changeSp}
            changeHandicap={this.props.changeHandicap}
          />
        );
      } else if (option.type.COMPONENT_NAME === 'PROGRESSTEXT') {
        //handleClick={this.props.betNow}
        return <ProgressText {...other} />;
      }
    });
    return <div className={styles[classNameStr]}>{childrens}</div>;
  }
}
BetMatchCell.defaultProps = {
  matchTime: '',
  betNow: () => {
    console.log('betNow');
  },
  clickBetBtn: params => {
    console.log(params);
  },
  changeSp: () => {
    console.log('changeSp');
  },
  changeHandicap: () => {
    console.log('changeHandicap');
  },
};

export default BetMatchCell;
