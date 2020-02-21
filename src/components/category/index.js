import React from 'react';
import styles from './index.less';

export function Category({ dataSets = [], handleClick }) {
  if (!Array.isArray(dataSets)) {
    throw new TypeError('dataSets should be a Array');
  }

  return (
    <div className={styles['container-wrapper']}>
      <div className={styles['container']}>
        {dataSets.map((v, index) => {
          const { iconUrl, preCount, displayName } = v;
          return (
            <div
              onClick={e => {
                typeof handleClick === 'function' && handleClick(v);
                e.preventDefault();
              }}
              className={styles['box']}
              key={`${displayName}-${index}`}
            >
              <div className={styles['count']}>{preCount === 0 ? '' : preCount}</div>
              <img src={iconUrl} alt="" />
              <div style={{ textTransform: 'capitalize', textAlign: 'center' }}>{displayName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
