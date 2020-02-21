import React, { Component } from 'react';
import { BetMatchCell } from '../betMatchCell';
import { Label } from '../label';
import styles from './index.less';
class BeforeMatchCellGroup extends Component {
  static COMPONENT_NAME = 'BETBERFOREMATCHCELLGROUP';

  render() {
    const { children, prefixCls } = this.props;
    const clsNameStr = `${prefixCls}-match-cell-group`;
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
      }

      return option;
    });
    return <div className={styles[clsNameStr]}>{childrens}</div>;
  }
}
BeforeMatchCellGroup.defaultProps = {
  prefixCls: 'before',
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
};
export default BeforeMatchCellGroup;
