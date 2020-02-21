import React, { Component } from 'react';
import styles from './index.less';
import { Label } from '../label';
import { BetMatchCell } from '../betMatchCell';
import BeforeMatchCellGroup from '../beforeMatchCellGroup';
import Button from '../button';

class BetMatchGroup extends Component {
  static COMPONENT_NAME = 'BETMATCHGROUP';
  render() {
    const { prefixCls, children } = this.props;
    const clsNameStr = `${prefixCls || 'default'}-bet-match-group`;
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'LABEL') {
        return <Label {...other} clickLeftTitleText={this.props.clickLeftTitleText} />;
      } else if (option.type.COMPONENT_NAME === 'BETMATCHCELL') {
        return (
          <BetMatchCell
            {...other}
            clickBetBtn={this.props.clickBetBtn}
            changeSp={this.props.changeSp}
            changeHandicap={this.props.changeHandicap}
            betNow={this.props.betNow}
          />
        );
      } else if (option.type.COMPONENT_NAME === 'BUTTON') {
        return <Button {...other} clickCheckBtn={this.props.clickCheckBtn} />;
      } else if (option.type.COMPONENT_NAME === 'BETBERFOREMATCHCELLGROUP') {
        return (
          <BeforeMatchCellGroup
            {...other}
            clickBetBtn={this.props.clickBetBtn}
            changeSp={this.props.changeSp}
            changeHandicap={this.props.changeHandicap}
            betNow={this.props.betNow}
          />
        );
      }

      return option;
    });
    return <div className={styles[clsNameStr]}>{childrens}</div>;
  }
}
BetMatchGroup.defaultProps = {
  prefixCls: 'default',
  betNow: () => {
    console.log('betNow - BetMatchGroup');
  },
  clickBetBtn: params => {
    console.log(params);
  },
  changeSp: () => {
    console.log('changeSp -BetMatchGroup');
  },
  changeHandicap: () => {
    console.log('changeHandicap-BetMatchGroup');
  },
  clickCheckBtn: () => {
    console.log('clickCheckBtn -BetMatchGroup');
  },
  clickLeftTitleText: params => {
    console.log('clickLeftTitleText');
  },
};
export default BetMatchGroup;
