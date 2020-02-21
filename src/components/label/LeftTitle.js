import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import IconFont from '../iconFont';
import { DEFAULT_ENCODING } from 'crypto';
//TODO 需要添加fonticon 组件 现在等待fonticon添加
class LeftTitle extends Component {
  static COMPONENT_NAME = 'LEFTNODE';
  handelClickTitleText = e => {
    //e.stopPropagation();
    const { leftText, clickLeftTitleText, type } = this.props;
    clickLeftTitleText && clickLeftTitleText({ type, leftText });
  };

  render() {
    const {
      leftText,
      gameType,
      prefixCls,
      clickTitle,
      gameTypeImgUrl,
      gameTypeImgShow,
    } = this.props;
    const clsNameStr = `${prefixCls || 'default'}-left-title`;

    return (
      <div onClick={this.handelClickTitleText} className={styles[clsNameStr]}>
        {gameTypeImgShow && <img className={styles.gameTypeImg} src={gameTypeImgUrl} alt="" />}
        <span className={styles.titleText}>{leftText}</span>
      </div>
    );
  }
}
LeftTitle.defaultProps = {
  prefixCls: 'default',
  clickLeftTitleText: params => {
    console.log(params);
  },
  gameTypeImgShow: true,
  leftText: '',
  gameTypeImgUrl: 'https://avatars3.githubusercontent.com/u/17559536?s=40&v=4',
};

export default LeftTitle;
