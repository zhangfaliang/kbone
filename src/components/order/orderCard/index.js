import React, { Component } from 'react';
import Item from './item';
import styles from './index.less';

class OrderCard extends Component {
  static Item = Item;
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.label}>{this.props.label}</div>
        <div className={styles.list}>{this.props.children}</div>
      </div>
    );
  }
}

export default OrderCard;
