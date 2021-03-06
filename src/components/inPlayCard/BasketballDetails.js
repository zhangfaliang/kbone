import React from 'react';
import styles from './BasketballDetails.less';
import { CommonInPlayCard } from './CommonInPlayCard';

export class BasketballDetails extends React.Component {
  render() {
    return (
      <div className={styles['wrapper']}>
        <CommonInPlayCard {...this.props} />
      </div>
    );
  }
}
