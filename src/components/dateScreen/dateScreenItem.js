import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

class DateScreenItem extends Component {
  static COMPONENT_NAME = 'DATESCREEN_ITEN';
  state = {
    isActive: false,
  };
  // TODO: Use `static getDerivedStateFromProps` instead of `componentWillReceiveProps`
  static getDerivedStateFromProps(props, state) {
    if (props.isActive !== state.isActive) {
      return { isActive: props.isActive };
    }
    return null;
  }
  handleDateScreen = () => {
    const { handleDateScreen, time, week, dateTime, sportType, tabType } = this.props;
    handleDateScreen({
      isActive: !this.state.isActive,
      time,
      week,
      groupName: dateTime,
      sportType,
      tabType,
    });
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  render() {
    const { className, time, week } = this.props;
    const itemCls = classnames(className, {
      [styles.screenItem]: true,
      [styles.active]: this.state.isActive,
    });
    return (
      <div className={itemCls} onClick={this.handleDateScreen}>
        <span className={styles.top}> {time} </span>
        <span className={styles.bottom}> {week} </span>
      </div>
    );
  }
}
DateScreenItem.defaultProps = {
  className: '',
  time: '',
  week: '',
  dateTime: '',
  isActive: false,
  handleDateScreen: () => {},
};
export default DateScreenItem;
