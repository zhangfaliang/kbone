import React, { Component } from 'react';
import classnames from 'classnames';
import { Loading } from '@/components/loading';
import { BetPanel, QuickBetInfo, InputPanel, KeyboardPanel } from './panel';
import styles from './index.less';

class QuickBetPanel extends Component {
  static BetPanel = BetPanel;
  static QuickBetInfo = QuickBetInfo;
  static InputPanel = InputPanel;
  static KeyboardPanel = KeyboardPanel;
  render() {
    const { visabled, isOpenQuickBetKeyboard, formatQuickBetLoading } = this.props;
    const wrapCls = classnames({
      [styles.wrap]: true,
      [styles.selectd]: visabled,
      [styles.openKeyboard]: isOpenQuickBetKeyboard,
    });
    if (formatQuickBetLoading) {
      return <Loading isShow={formatQuickBetLoading} />;
    }
    return (
      <>
        {visabled && <div className={styles.mark} />}
        <div className={wrapCls}>{this.props.children}</div>
      </>
    );
  }
}

export default QuickBetPanel;
