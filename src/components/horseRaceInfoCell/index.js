import React from 'react';
import styles from './index.less';
import { SingleHorseInfo, ForeCastOrTriCast, SPInfo } from '../horseRaceInfo';
import HorseRaceBetButtonCell from '../horseRaceBetButtonCell';
import { FinishLabel } from '../horseRaceDetailFinishLabel';

class HorseRaceInfoCell extends React.Component {
  static COMPONENT_NAME = 'HORSERACEINFOCELL';

  selectBetBtn = betInfo => {
    const {
      selectBetBtn,
      teamExt,
      matchExt,
      teamId,
      shortName,
      handicapType,
      passStatus,
    } = this.props;
    selectBetBtn &&
      selectBetBtn({
        ...betInfo,
        teamExt,
        matchExt,
        teamId,
        shortName,
        handicapType,
        passStatus,
      });
  };
  render() {
    const { children, prefixCls } = this.props;
    const clsStr = styles[`${prefixCls}-horse-race-info-cell`];
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'SINGLEHORSERACEINFO') {
        return <SingleHorseInfo {...other} />;
      } else if (option.type.COMPONENT_NAME === 'HORSERACEBETBTNCELL') {
        return <HorseRaceBetButtonCell {...other} selectBetBtn={this.selectBetBtn} />;
      } else if (option.type.COMPONENT_NAME === 'FORECASTORTRICAST') {
        return <ForeCastOrTriCast {...other} />;
      } else if (option.type.COMPONENT_NAME === 'FINISHLABEL') {
        return <FinishLabel {...other} />;
      } else if (option.type.COMPONENT_NAME === 'SPINFO') {
        return <SPInfo {...other} />;
      }
    });

    return <div className={clsStr}>{childrens}</div>;
  }
}
HorseRaceInfoCell.defaultProps = {
  prefixCls: 'single',
  selectBetBtn: betInfo => {
    console.log(betInfo);
  },
  teamExt: {},
  shortName: '',
  handicapType: '',
};

export default HorseRaceInfoCell;
