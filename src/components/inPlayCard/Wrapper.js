import React from 'react';
import styles from './Wrapper.less';

export class Wrapper extends React.Component {
  render() {
    return <div className={styles['wrapper']}>{this.props.children}</div>;
  }
}
