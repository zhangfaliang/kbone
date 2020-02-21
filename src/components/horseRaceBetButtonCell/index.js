import React from 'react';
import HorseRaceBetButton from '../horseRaceBetButton';
import styles from './index.less';

class HorseRaceBetButtonCell extends React.Component {
  static COMPONENT_NAME = 'HORSERACEBETBTNCELL';

  selectBetBtn = betInfo => {
    const { selectBetBtn } = this.props;
    selectBetBtn && selectBetBtn({ ...betInfo });
  };

  render() {
    const { prefixCls, children } = this.props;
    const clsStr = styles[`${prefixCls}-horse-race-bet-btn-cell`];

    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'HORSERACEBETBTN') {
        return <HorseRaceBetButton {...other} selectBetBtn={this.selectBetBtn} />;
      }
    });
    return <div className={clsStr}>{childrens}</div>;
  }
}
HorseRaceBetButtonCell.defaultProps = {
  selectBetBtn: betInfo => {
    console.log(betInfo);
    return 'selectBetBtn';
  },
  prefixCls: 'default',
};

export default HorseRaceBetButtonCell;
