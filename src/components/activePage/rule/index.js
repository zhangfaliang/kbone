import React, { Component } from 'react';
import styles from './index.less';
class Rule extends Component {
  onHandleRule = () => {
    this.props.onHandleRule(true);
  };
  render() {
    return <div className={styles.rule} onClick={() => this.onHandleRule()} />;
  }
}
Rule.defaultProps = {
  onHandleRule: () => {
    return false;
  },
};

export default Rule;
