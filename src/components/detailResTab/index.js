import React, { Component } from 'react';
import styles from './index.less';
class DetailResTab extends Component {
  render() {
    const { rightText, centerText, leftText } = this.props;
    return (
      <div className={styles.wrap}>
        <span>{leftText}</span>
        <span>{centerText}</span>
        <span>{rightText}</span>
      </div>
    );
  }
}
DetailResTab.defaultProps = {
  rightText: '2',
  centerText: '全场比分',
  leftText: '2',
};
export default DetailResTab;
