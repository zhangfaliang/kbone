import React, { PureComponent } from 'react';
import styles from './order.less';

class Radius extends PureComponent {
  render() {
    const { prefixCls } = this.props;
    return (
      <div className={styles[`${prefixCls}-order-detail-list-radius`]}>
        <div />
      </div>
    );
  }
}
Radius.defaultProps = {
  prefixCls: 'default',
};

export default Radius;
