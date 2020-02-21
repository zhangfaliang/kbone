import React, { Component } from 'react';
import classnames from 'classnames';
import { BetCountPanel, AddBetSlipPanel, BetSlipPanel, BetAction, BetSlipModal } from './panel';
import styles from './index.less';

class BetSlip extends Component {
  static BetCountPanel = BetCountPanel;
  static AddBetSlipPanel = AddBetSlipPanel;
  static BetSlipPanel = BetSlipPanel;
  static BetAction = BetAction;
  static BetSlipModal = BetSlipModal;

  render() {
    const { visabled, children } = this.props;
    const wrapCls = classnames({
      [styles.wrap]: true,
      [styles.selectd]: visabled,
    });
    return <div className={wrapCls}>{children}</div>;
  }
}

export default BetSlip;
