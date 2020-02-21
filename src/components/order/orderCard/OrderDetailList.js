import React, { PureComponent } from 'react';
import OrderDetailItem from './OrderDetailItem';
import OrderDetailTitle from './OrderDetailTitle';
import classnames from 'classnames';
import styles from './order.less';

class OrderDetailList extends PureComponent {
  handelItemClick = orderInfo => {
    this.props.handelTitleClick(orderInfo);
  };
  render() {
    const { prefixCls, borderBottom, children } = this.props;
    const clsStr = classnames({
      [styles[`${prefixCls}-order-detail-list`]]: true,
      // [styles.borderBottom]: borderBottom,
    });
    // const { , prefixCls } = this.props;
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'ORDERDETAILITEM') {
        return <OrderDetailItem {...other} />;
      }
      if (option.type.COMPONENT_NAME === 'ORDERDETAILTITLE') {
        return <OrderDetailTitle {...other} handelTitleClick={this.handelItemClick} />;
      }
    });

    return (
      <>
        <div className={clsStr}>{childrens}</div>
        {borderBottom && <div className={styles.borderBottom} />}
      </>
    );
  }
}
OrderDetailList.defaultProps = {
  prefixCls: 'default',
  handelTitleClick: orderInfo => {
    console.log(orderInfo);
  },
};

export default OrderDetailList;
