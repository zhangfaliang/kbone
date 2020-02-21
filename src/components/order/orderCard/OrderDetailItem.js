import React from 'react';
import classnames from 'classnames';
import IconFont from '../../iconFont';
import styles from './order.less';

const OrderDetailItem = ({
  prefixCls = 'default',
  leftNode = '',
  rightNode = '',
  iconType = '',
}) => {
  const clsStr = classnames({
    [styles[`${prefixCls}-detail-item`]]: true,
  });
  return (
    <div className={clsStr}>
      <div className={styles.left}>
        {iconType && (
          <span className={styles.icon}>
            <IconFont type={iconType} />
          </span>
        )}
        {leftNode && <span className={styles.leftText}>{leftNode}</span>}
      </div>
      {rightNode && <span className={styles.right}>{rightNode}</span>}
    </div>
  );
};

OrderDetailItem.COMPONENT_NAME = 'ORDERDETAILITEM';
export default OrderDetailItem;
