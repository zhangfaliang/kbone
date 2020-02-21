import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

class DetailTop extends Component {
  render() {
    const { prefixCls, children, isFooterBall, sportType } = this.props;
    const detailTopCls = classnames({
      [styles[`${prefixCls || 's02'}-detail-top`]]: true,
      [styles[`${prefixCls || 's02'}-footerball-detail-top`]]: sportType === 1,
      [styles[`${prefixCls || 's02'}-tennis-detail-top`]]: sportType === 4,
    });
    return <div className={detailTopCls}>{children}</div>;
  }
}
DetailTop.defaultProps = {
  prefixCls: 's02',
};
export default DetailTop;
