import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import IconFont from '../iconFont';
import { DEFAULT_ENCODING } from 'crypto';
//TODO 需要添加fonticon 组件 现在等待fonticon添加
class LeftInPlay extends Component {
  static COMPONENT_NAME = 'LEFTINPLAY';
  // handelClickTitleText = e => {
  //   e.stopPropagation();
  //   const { leftText, clickLeftTitleText, type } = this.props;
  //   clickLeftTitleText && clickLeftTitleText({ type, leftText });
  // };

  render() {
    const { liveText, inPlayTex, prefixCls } = this.props;
    const clsNameStr = `${prefixCls || 'default'}-left-title`;

    return (
      <div className={styles[clsNameStr]}>
        {liveText && <span className={styles.liveText}> {liveText}</span>}
        <span className={styles.inPlayTex}>{inPlayTex}</span>
      </div>
    );
  }
}
LeftInPlay.defaultProps = {
  prefixCls: 'live-inplay',
  liveText: '',
  inPlayTex: '',
};

export default LeftInPlay;
