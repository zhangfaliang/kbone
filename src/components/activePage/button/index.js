import React, { Component } from 'react';
import styles from './index.less';
class Button extends Component {
  onHandleClick = () => {
    this.props.onHandleClick();
  };
  render() {
    return (
      <div className={styles.buttonParentContainer}>
        <div className={styles.button} onClick={() => this.onHandleClick()}>
          立即加入
        </div>
      </div>
    );
  }
}
Button.defaultporps = {
  onHandleClick: () => {
    return false;
  },
};
export default Button;
