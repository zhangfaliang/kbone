import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './index.less';

OrderFilter2.defaultProps = {
  defaultKey: 0,
  dataSource: [{ type: 1, name: '已结算' }, { type: 0, name: '未结算' }],
  orderNum: '（1）',
  onChange: v => {},
};

function OrderFilter2({ defaultKey, onChange, dataSource, propsCurrentKeyKey, orderNum }) {
  // const [currentKey, setCurrentKey] = useState(defaultKey);
  return (
    <div className={styles.wrap}>
      {dataSource.map((v, k) => {
        const itemCls = classnames({
          [styles.item]: true,
          [styles.active]: k === propsCurrentKeyKey,
        });
        return (
          <div
            onClick={() => {
              onChange(v, k);
              // setCurrentKey(k);
            }}
            className={itemCls}
            key={`orderFileter2_${k}`}
          >
            {v.name}
          </div>
        );
      })}
    </div>
  );
}

export default OrderFilter2;
