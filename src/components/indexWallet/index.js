import React, { Component } from 'react';
import classnames from 'classnames';
import router from 'umi/router';
import WalletDes from './operationWallet';
import styles from './index.less';
import { get } from 'lodash';
import withdrawal from '../../assets/game/index/withdrawal.png';
import luckdraw from '../../assets/game/index/luckdraw.png';
import deposit from '../../assets/game/index/deposit.png';

class IndexWallet extends Component {
  handleDeposit = () => {
    this.props.onCheckPathWithdrawAnddeposit(1);
  };
  handleWithdrawal = () => {
    this.props.onCheckPathWithdrawAnddeposit(2);
  };
  handleluckdraw = () => {
    console.log('luckdraw');
  };
  handlefishBallAcquisition = () => {
    console.log('fishBallAcquisition');
  };
  handuleBalance = () => {
    const { isLogin } = this.props;
    if (!isLogin) {
      router.push({
        pathname: '/login/index',
        query: {
          returnTo: `${window.location.pathname}${window.location.search}`,
        },
      });
      return;
    }
  };
  onHandleClcik = () => {
    const { initConfig } = this.props;
    const origin = window.location.origin;
    const host = origin.match(/\.?\w{1,}.\w{1,}$/)[0].replace(/^\./, '');
    const callCenterUrl = initConfig.callCenterUrl.replace(/\{host\}/, host);
    window.open(callCenterUrl);
  };
  render() {
    const { className, cashBalance, currencyDesc, appConfig } = this.props;
    const walletCls = classnames(className, {
      [styles.walletWrap]: true,
    });
    const walletClsIcon = classnames(className, {
      [styles.right]: true,
      [styles.oneRight]: false,
    });
    const vipStatus = get(appConfig, 'payEntryConfigMap.1');
    return (
      <div className={walletCls}>
        <div className={styles.wallet}>
          <div className={styles.left} onClick={this.handuleBalance}>
            <span className={styles.money}> {cashBalance} </span>
            <span className={styles.text}>{currencyDesc} </span>
          </div>
          {/* 
            TODO: 根据后台数据配置
          */}
          <div className={walletClsIcon}>
            {vipStatus &&
              vipStatus.map((v, i) => {
                let dom = '';
                if (i > 1) {
                  return false;
                }
                if (v === 1) {
                  dom = (
                    <WalletDes
                      key="deposit"
                      handuleOperationWallet={this.handleDeposit}
                      imgUrl={deposit}
                      text="充值"
                    />
                  );
                }
                if (v === 2) {
                  dom = (
                    <WalletDes
                      key="withdrawal"
                      handuleOperationWallet={this.handleWithdrawal}
                      imgUrl={withdrawal}
                      text="提现"
                    />
                  );
                }
                if (v === 3) {
                  dom = (
                    <WalletDes
                      key="fishBallAcquisition"
                      handuleOperationWallet={this.handlefishBallAcquisition}
                      imgUrl={deposit}
                      text="鱼丸获取"
                    />
                  );
                }
                if (v === 4) {
                  dom = (
                    <WalletDes
                      key="luckdraw"
                      handuleOperationWallet={this.handleluckdraw}
                      imgUrl={luckdraw}
                      text="鱼丸抽奖"
                    />
                  );
                }
                return dom;
              })}

            {/* <WalletDes
              key="withdrawal"
              handuleOperationWallet={this.handleWithdrawal}
              imgUrl={withdrawal}
              text="提现"
            /> */}
            {/* <WalletDes
              key="fishBallAcquisition"
              handuleOperationWallet={this.handlefishBallAcquisition}
              imgUrl={deposit}
              text="鱼丸获取"
            />
            <WalletDes
              key="luckdraw"
              handuleOperationWallet={this.handleluckdraw}
              imgUrl={luckdraw}
              text="鱼丸抽奖"
            /> */}
          </div>
          <div className={styles.customerService} onClick={() => this.onHandleClcik()} />
        </div>
      </div>
    );
  }
}

export default IndexWallet;
