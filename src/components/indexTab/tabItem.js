import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
class TabItem extends Component {
  static COMPONENT_NAME = 'TAB_ITEM';
  state = {
    isActive: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.isActive !== undefined && props.isActive !== state.isActive) {
      return { isActive: props.isActive };
    }
    return null;
  }
  handleTabItem = () => {
    const { handleTabItem, itemId } = this.props;

    this.setState(
      {
        isActive: !this.state.isActive,
      },
      () => {
        handleTabItem({ itemId, isActive: this.state.isActive });
      }
    );
  };
  render() {
    const { className, text, countNum } = this.props;
    const { isActive } = this.state;
    const itemCls = classnames(
      {
        [styles.item]: true,
        [styles.active]: isActive,
      },
      className
    );
    return (
      <div className={itemCls} onClick={this.handleTabItem}>
        <span className={styles.text}>{text}</span>
        <span className={styles.countNum}>{countNum}</span>
      </div>
    );
  }
}

TabItem.defaultProps = {
  className: '',
  text: '收藏',
  countNum: 3,
  itemId: '',
  handleTabItem: () => {},
};

export default TabItem;
