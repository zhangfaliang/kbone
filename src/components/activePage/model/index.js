import React, { Component } from 'react';
import styles from './index.less';
import classnames from 'classnames';
class Model extends Component {
  onHandleClose = () => {
    this.props.onHandleClose(false);
  };
  render() {
    const { showModel } = this.props;
    const ModelCls = classnames({
      [styles.Model]: true,
      [styles.hideModel]: !showModel,
      [styles.showModel]: showModel,
    });
    return (
      <div className={ModelCls}>
        <div>
          <div className={styles.header}>
            <div className={styles.close} onClick={() => this.onHandleClose()} />
          </div>
          <div className={styles.body}>
            <div>
              <div className={styles.textLast}>
                <div>1</div>
                <div>本优惠适用于2019年10月1日12:00:00或之后注册账号的新会员。</div>
              </div>
              <div className={styles.textLast}>
                <div>2</div>
                <div>本优惠适用于完成账号注册后的第一笔成功存款。</div>
              </div>
              <div className={styles.textLast}>
                <div>3</div>
                <div>
                  登录网站，进入优惠界面，点击特定的优惠规则与条款，在上面点击“立即加入”即可。
                </div>
              </div>
              <div className={styles.textLast}>
                <div>4</div>
                <div>符合资格的会员将会获得一次首存红利，最高红利金额500元。</div>
              </div>
              <div className={styles.table}>
                <div>
                  <div>优惠%</div>
                  <div>20%</div>
                </div>
                <div>
                  <div>最低投注倍数</div>
                  <div>12倍</div>
                </div>
                <div>
                  <div>最高红利</div>
                  <div>500元</div>
                </div>
              </div>
              <div className={styles.textLast}>
                <div>5</div>
                <div>红利将在申请通过后48个工作小时内注入会员账户。</div>
              </div>
              <div className={styles.textLast}>
                <div>6</div>
                <div>
                  在提现前，用于申请红利的存款金额和红利至少需要完成12倍投注额；
                  <br />
                  例如：符合资格的会员A优惠期间首次成功的存款金额是4000元。会员A将获得优惠红利，
                  <br />
                  计算如下：
                  <br />
                  优惠红利=4000X20%=封顶红利500元
                  <br />
                  用于申请红利的存款额=500/20%=2500元
                  <br />
                  未用于申请红利的存款额=4000-2500=1500元
                  <br />
                  红利提款前最低投注额=（500+2500）X12=36000元
                </div>
              </div>
              <div className={styles.textLast}>
                <div>7</div>
                <div>
                  优惠红利注入后，符合资格的会员将不能申请取消，或账户金额低于5元，且注单均已为结算状态时自动退出活动提款规则。后续充值适用于一般提款规则，完成一倍流水即可提现。
                </div>
              </div>
              <div className={styles.textLast}>
                <div>8</div>
                <div>申请参加活动后，才会开始计算优惠指定的投注额。</div>
              </div>
              <div className={styles.textLast}>
                <div>9</div>
                <div>
                  有效投注额仅计算产生投谁赢结果的注单。注单取消或本金退还，任何赔率低于1.20的注单及在同一局游戏中同时投注对等盘口，将不计算为有效投注额内。
                </div>
              </div>
              <div className={styles.textLast}>
                <div>10</div>
                <div>优惠结束于北京时间2019年12月31日23:59:00，且在此期限后无法再申领。</div>
              </div>
              <div className={styles.textLast}>
                <div>11</div>
                <div>
                  无论是个人或是组合中的一员，如有任何违反优惠或推广活动条款的行为，或有任何证据表明单独会员或一组会员所进行的一系列投注来源于额外支付、免费投注、无风险投注、红利或任何其他推广优惠，无论结果如何，只要导致会员获得保证的利润，本公司可索回此类相关优惠中的额外支付、免费投注、无风险投注或红利和/或取消任何使用免费投注或红利进行的投注。此外，若有证据表明存在该行为，本公司可向会员收取手续费（手续费的上限等值于红利、免费投注、无风险投注或额外支付），以弥补检测该行为和对其采取措施而产生的行政管理费用。
                </div>
              </div>
              <div className={styles.textLast}>
                <div>12</div>
                <div>本公司可索回错误添加的奖金金额、免费投注、红利或额外支付。</div>
              </div>
              <div className={styles.textLast}>
                <div>13</div>
                <div>
                  每位会员仅可享受一项本公司所提供的优惠。如果本公司有理由怀疑同一个会员、同一组会员不止一次申领奖金或优惠，本公司可随时收回任何会员或会员组的任何或全部优惠，并/或取消任何使用奖金或优惠进行的投注和因这些投注而产生的彩金。
                </div>
              </div>
              <div className={styles.textLast}>
                <div>14</div>
                <div>
                  本公司可能随时对此优惠进行微改以更正笔误、提高用语清晰度或提升会员体验，并且可能随时因法律或法规要求取消此优惠。
                </div>
              </div>
              <div className={styles.textLast}>
                <div>15</div>
                <div>
                  本公司的雇员、办公人员及管理人员﹑相关促销代理﹑授权者和被授权者、服务提供商及其他相关人员或合作机构都不得参加此活动。此规定亦适用于以上人员的直系亲属。
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {this.props.children} */}
      </div>
    );
  }
}
Model.defaultProps = {
  showModel: false,
};
export default Model;
