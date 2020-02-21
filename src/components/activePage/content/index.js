import React, { Component } from 'react';
import styles from './index.less';
class Content extends Component {
  render() {
    return (
      <div className={styles.content}>
        <div>
          <div>
            <div className={styles.text}>
              <div>1</div>
              <div>优惠期限为北京时间</div>
            </div>
            <div className={styles.date}>
              <div>2019/10/1/ 12:00:00 </div>
              <div>至</div>
              <div>2019/12/31/ 23:59:00</div>
            </div>
            <div className={styles.text}>
              <div>2</div>
              <div>适用于所有人民币会员。</div>
            </div>
            <div className={styles.text}>
              <div>3</div>
              <div>优惠期间，完成账号注册后第一笔成功存款。</div>
            </div>
            <div className={styles.text}>
              <div>4</div>
              <div>点击“立即加入”参加此优惠</div>
            </div>
            <div className={styles.textLast}>
              <div>5</div>
              <div>红利将在申请后48个工作小时内注入会员账户</div>
            </div>
            <div className={styles.textLast}>
              <div>6</div>
              <div>
                在提现前，用于申请红利的存款金额和红利至少需要完成12倍有效投注额或账户余额低于5元；
              </div>
            </div>
          </div>
          <div className={styles.calculationRule}>
            <div>
              <div />
              <div />
            </div>
            <div>
              <div>存款金额4000元</div>
              <div>优惠红利=4000X20%=封顶红利500元</div>
              <div>用于申请红利的存款额=500/20%=2500元</div>
              <div>未用于申请红利的存款额=4000-2500=1500元</div>
              <div>红利提款前最低投注额=（500+2500）X12=36000元</div>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Content;
