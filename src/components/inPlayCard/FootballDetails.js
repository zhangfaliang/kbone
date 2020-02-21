import React from 'react';
import styles from './FootballDetails.less';
import { CommonInPlayCard } from './CommonInPlayCard';

export class FootballDetails extends React.Component {
  render() {
    return (
      <div className={styles['wrapper']}>
        <CommonInPlayCard {...this.props} />
      </div>
    );
  }
}
