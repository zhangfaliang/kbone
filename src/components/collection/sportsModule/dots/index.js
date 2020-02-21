import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
class Dots extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps) {
    const { changeMove } = nextProps;
    const updateBetArryChecked = changeMove === this.props.num;
    return updateBetArryChecked;
  }
  render() {
    const { leftDot, rightDot } = this.props;
    const leftCkeckedCls = classnames({
      [styles.leftDot]: leftDot,
    });
    const rightCkeckedCls = classnames({
      [styles.rightDot]: rightDot,
    });
    return (
      <div className={styles.dots}>
        <span className={leftCkeckedCls} />
        <span className={rightCkeckedCls} />
      </div>
    );
  }
}
export default Dots;
