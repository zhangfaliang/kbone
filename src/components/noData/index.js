import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

export const NoData = ({ logo, texts = [], marginTop, topCls }) => {
  const noDataCls = classnames({
    [styles['no-data-wrapper']]: true,
  });
  return (
    <div className={noDataCls}>
      <div className={`${styles.top} ${topCls}`} />
      <div className={styles.imgWrap}>
        <img style={{ marginTop: marginTop }} src={logo} alt="no-data-order-list" />
        {texts.map((value, index) => (
          <div key={`${value}-${index}`}>{value}</div>
        ))}
      </div>
    </div>
  );
};

// HOW TO USE
// WARNING: 使用的时候注意样式是否会受到Header的影响，可能需要额外设置 padding-top: 88px 来处理
