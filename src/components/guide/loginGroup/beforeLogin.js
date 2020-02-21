import React from 'react';
import { formatMessage } from 'umi/locale';
import Button from '@/components/button';
import styles from './index.less';

const BeforeLogin = ({ router }) => (
  <div className={styles.beforeLogin}>
    <Button
      btnText={formatMessage({ id: 'Wiki.5001' })}
      clickCheckBtn={() => router.push('/login/index?returnTo=/guide/index')}
    />
    <Button
      btnText={formatMessage({ id: 'Wiki.5003' })}
      clickCheckBtn={() => router.push('/sign/chooseCurrency?returnTo=/guide/index')}
    />
  </div>
);

export default BeforeLogin;
