import React from 'react';
import HorseRaceInfoGroupTitle from './title';
import HorseRaceInfoCell from '../../components/horseRaceInfoCell';
import styles from './index.less';
import { NoRunners } from '../horseRaceDetailFinishLabel';

class HorseRaceInfoGroup extends React.Component {
  static COMPONENT_NAME = 'HORSERACEINFOGROUP';
  selectBetBtn = betInfo => {
    const {
      selectBetBtn,
      horseRaceType,
      sportName,
      leagueName,
      sportType,
      matchId,
      matchName,
      matchTime,
      matchExt,
      matchType,
    } = this.props;

    selectBetBtn &&
      selectBetBtn({
        ...betInfo,
        horseRaceType,
        sportName,
        leagueName,
        sportType,
        matchId,
        matchName,
        matchTime,
        matchExt,
        matchType,
      });
  };
  render() {
    const { children, prefixCls } = this.props;
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (!option.type) {
        return '';
      } else if (option.type.COMPONENT_NAME === 'HORSERACEINFOGROUPTITLE') {
        return <HorseRaceInfoGroupTitle {...other} />;
      } else if (option.type.COMPONENT_NAME === 'HORSERACEINFOCELL') {
        return <HorseRaceInfoCell {...other} selectBetBtn={this.selectBetBtn} />;
      } else if (option.type.COMPONENT_NAME === 'NORUNNERS') {
        return <NoRunners {...other} />;
      }
    });
    const clsStr = styles[`${prefixCls}-horse-race-info-group`];
    return <div className={clsStr}>{childrens}</div>;
  }
}
HorseRaceInfoGroup.defaultProps = {
  prefixCls: 'default',
  selectBetBtn: betInfo => {
    console.log(betInfo);
  },
  horseRaceType: '',
  sportName: '',
  leagueName: '',
  sportType: '',
  matchId: '',
  matchName: '',
  matchTime: '',
  matchType: '',
};

export default HorseRaceInfoGroup;
