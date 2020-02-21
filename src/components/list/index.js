import React, { Component } from 'react';
import classnames from 'classnames';
import Item from './item';
import styles from './index.less';

class OrderCard extends Component {
  static Item = Item;
  render() {
    const { children, size, className, renderFooter, bordered } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { bordered, size })
    );

    const wrapCls = classnames(className, {
      [styles.wrap]: true,
    });
    return (
      <div className={wrapCls}>
        {this.props.label && <div className={styles.label}>{this.props.label}</div>}
        <div className={styles.list}>
          {childrenWithProps}
          {renderFooter && <div className={styles.footer}>{renderFooter}</div>}
        </div>
      </div>
    );
  }
}

export default OrderCard;
