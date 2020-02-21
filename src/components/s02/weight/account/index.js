import React from 'react';
import styles from './index.less';

const Account = () => {
  return (
    <div className={styles.acl}>
      <div className={styles.wrap}>
        <div className={styles.labelTxt}>
          未登录
          <span>体育钱包</span>
        </div>
        <div className={styles.labelAccount}>
          <span>
            <img src={require('../../../../assets/s02/ck.png')} alt="" />
            存款
          </span>
          <span>
            <img src={require('../../../../assets/s02/qk.png')} alt="" />
            取款
          </span>
        </div>
      </div>
    </div>
  );
};

export default Account;
