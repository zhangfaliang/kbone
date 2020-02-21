import React from 'react';
import styles from './index.less';
import LOADING_IMG from '../../assets/s02/S02-loading6.gif';

export const Loading = ({ isShow = true, texts = [] }) =>
  isShow && (
    <div className={styles['loading-wrapper']}>
      <img src={LOADING_IMG} alt="loading" />
      {texts.map(x => (
        <div key={x}>{x}</div>
      ))}
    </div>
  );
