import React, { Component } from 'react';
import BetButton from '../betButton';
import Line from '../line';
import styles from './index.less';
class BetButtonCell extends Component {
  static COMPONENT_NAME = 'BETBUTTONCELL';
  clickBetBtn = betInfo => {
    const {
      homeName,
      awayName,
      clickBetBtn,
      playTypeName,
      playtypeCode,
      matchId,
      sportType,
      handicapType,
      leagueName,
      matchName,
      matchType,
      sportName,
      period,
      // handicap,
      passStatus,
    } = this.props;
    clickBetBtn({
      ...betInfo,
      handicapType,
      sportType,
      matchId,
      homeName,
      awayName,
      playTypeName,
      playtypeCode,
      leagueName,
      matchName,
      matchType,
      sportName,
      period,
      // handicap,
      passStatus,
    });
  };
  changeSp = betInfo => {
    const {
      homeName,
      awayName,
      playTypeName,
      playtypeCode,
      matchId,
      sportType,
      changeSp,
      handicapType,
      leagueName,
      matchName,
      matchType,
      sportName,
      passStatus,
    } = this.props;
    changeSp({
      ...betInfo,
      handicapType,
      sportType,
      matchId,
      homeName,
      awayName,
      playTypeName,
      playtypeCode,
      leagueName,
      matchName,
      matchType,
      sportName,
      passStatus,
    });
  };
  changeHandicap = betInfo => {
    const {
      homeName,
      awayName,
      playTypeName,
      playtypeCode,
      matchId,
      sportType,
      changeHandicap,
      handicapType,
      leagueName,
      matchName,
      matchType,
      sportName,
      passStatus,
    } = this.props;
    changeHandicap({
      ...betInfo,
      sportType,
      matchId,
      homeName,
      awayName,
      playTypeName,
      playtypeCode,
      handicapType,
      leagueName,
      matchName,
      matchType,
      sportName,
      passStatus,
    });
  };
  render() {
    const { children, prefixCls } = this.props;
    const classNameStr = `${prefixCls || 'push-inplay'}-betButtonCell`;
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'BETBUTTON') {
        return (
          <BetButton
            {...other}
            clickBetBtn={this.clickBetBtn}
            changeSp={this.changeSp}
            changeHandicap={this.changeHandicap}
          />
        );
      } else if (option.type.COMPONENT_NAME === 'LINE') {
        return <Line {...other} />;
      }
    });
    return <div className={styles[classNameStr]}>{childrens}</div>;
  }
}
BetButtonCell.defaultProps = {
  homeName: '',
  awayName: '',
  playTypeName: '',
  playTypeName: '',
  playtypeCode: '',
  matchId: '',
  sportType: '',
  clickBetBtn: betInfo => {
    //console.log(betInfo);
    return 'clickBetBtn';
  },
  changeSp: betInfo => {
    //console.log('changeSp',betInfo);
    return 'changeSp';
  },
  changeHandicap: betInfo => {
    // console.log('changeHandicap',betInfo);
    return 'changeHandicap';
  },
};
export default BetButtonCell;
