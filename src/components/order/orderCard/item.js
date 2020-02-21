import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

class Item extends Component {
  static defaultProps = {
    noPadding: false,
    children: <></>,
    size: 'large',
    itemIsVerticalCenter: true,
  };

  render() {
    const { noPadding, extra, children, onClick, size, itemIsVerticalCenter } = this.props;
    const itemCls = classnames({
      [styles.item]: true,
      [styles.noPadding]: noPadding,
      [styles[size]]: size,
      [styles.itemIsVerticalCenter]: itemIsVerticalCenter,
    });
    return (
      <div onClick={onClick} className={itemCls}>
        {extra && <div className={styles.item_L}>{extra}</div>}
        <div className={styles.item_R}>{children}</div>
      </div>
    );
  }
}

export default Item;
