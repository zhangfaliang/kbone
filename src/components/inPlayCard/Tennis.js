import React from 'react';
import styles from './Tennis.less';
import { CommonInPlayCard } from './CommonInPlayCard';

export class TennisInPlayCard extends React.Component {
  render() {
    return (
      <div className={styles['wrapper']}>
        <CommonInPlayCard {...this.props} />
      </div>
    );
  }
}
