import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './SwitchBtn.less';
import IconFont from '../iconFont';

class SwitchBtn extends Component {
  handleSwitch = () => {
    const { type, handleSwitch } = this.props;
    handleSwitch(type);
  };
  render() {
    const { handleSwitch, text, switchImgUrl, className, prefixCls, type } = this.props;
    const switchCls = classnames(className, {
      [styles[`${prefixCls || 'default'}-switch`]]: true,
    });
    return (
      <div className={switchCls} onClick={this.handleSwitch}>
        <img src={switchImgUrl} alt="" />
        <span className={styles.text}>{text}</span>
      </div>
    );
  }
}

SwitchBtn.defaultProps = {
  prefixCls: 'default',
  handleSwitch: () => {},
  switchImgUrl: '',
  text: '实况信息',
  className: '',
  type: 'shikuangxinxicopy', //bisaixinxi
};

export default SwitchBtn;
