import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

import withdrawal from '../../assets/game/index/withdrawal.png';
class OperationWallet extends Component {
  render() {
    const { imgUrl, text, handuleOperationWallet, className } = this.props;
    const operationWalletCls = classnames(className, {
      [styles.operationWallet]: true,
    });
    return (
      <div className={operationWalletCls} onClick={handuleOperationWallet}>
        <img className={styles.img} src={imgUrl} alt="" />
        <span>{text}</span>
      </div>
    );
  }
}
OperationWallet.defaultProps = {
  imgUrl: withdrawal,
  text: '取款',
  handuleOperationWallet: () => {},
  className: '',
};

export default OperationWallet;
