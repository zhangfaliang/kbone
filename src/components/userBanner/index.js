import React, { Component } from 'react';
import classnames from 'classnames';
import Button from '../button';
import styles from './index.less';
import Back from '../header/back';

class UserBanner extends Component {
  handleClick = () => {
    this.props.clickCheckBtn();
  };
  render() {
    const { text, btnText, className, showBack } = this.props;
    const userBannerCls = classnames(className, {
      [styles.banner]: true,
    });
    return (
      <div className={userBannerCls}>
        {showBack ? <Back title="" color="inherit" /> : ''}
        <span className={styles.text}>{text}</span>
        <Button prefixCls="user-banner" clickCheckBtn={this.handleClick} btnText={btnText} />
      </div>
    );
  }
}
UserBanner.defaultProps = {
  text: '注册',
  btnText: '去登录',
  className: '',
  showBack: true,
  clickCheckBtn: () => {},
};
export default UserBanner;
