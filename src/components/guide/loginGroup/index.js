import React from 'react';
import BeforeLogin from './beforeLogin';
import AftereLogin from './afterLogin';
import styles from './index.less';

const LogonGroup = ({ isLogin, userInfo, onCheckToPath, router }) => (
  <div className={styles.wrapper}>
    <h2 className={`${styles.title} ${isLogin ? '' : styles.titleBeforeLogin}`}>
      {isLogin ? `您好，${userInfo.username}` : '未登录'}
    </h2>
    {isLogin ? (
      <AftereLogin cashBalance={userInfo.cashBalance} onCheckToPath={onCheckToPath} />
    ) : (
      <BeforeLogin router={router} />
    )}
  </div>
);

export default LogonGroup;
