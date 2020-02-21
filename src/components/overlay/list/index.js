import React, { Component } from 'react';
import styles from './index.less';

class List extends Component {
  render() {
    const { dataSource, itemHandle } = this.props;
    return dataSource.map((v, k) => {
      return (
        <div
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            itemHandle.call(this, v);
          }}
          key={k}
          className={styles.item}
        >
          <div>
            <img src={v.icon} alt="" />
          </div>
          <div>{v.name}</div>
          <div>{v.count}</div>
        </div>
      );
    });
  }
}

export default List;
