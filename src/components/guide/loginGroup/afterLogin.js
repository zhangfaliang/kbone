import React from 'react';
import { formatMessage } from 'umi/locale';
import Button from '@/components/button';
import { formatMoney } from '@/utils/commonFn';
import styles from './index.less';

const AfterLogin = ({ cashBalance, onCheckToPath }) => (
  <div className={styles.afterLogin}>
    <div className={styles.afterLoginLeft}>
      <div>账户余额</div>
      <div>
        {cashBalance ? formatMoney(cashBalance) : '0.00'} <span>元</span>
      </div>
    </div>
    <div className={styles.afterLoginRight}>
      <Button
        btnText={formatMessage({ id: 'Wiki.5099' })}
        clickCheckBtn={onCheckToPath.bind(this, 1)}
      />
      <Button
        btnText={formatMessage({ id: 'Wiki.5100' })}
        clickCheckBtn={onCheckToPath.bind(this, 2)}
      />
    </div>
  </div>
);

export default AfterLogin;
