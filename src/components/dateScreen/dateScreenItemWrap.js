import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import DateScreenItem from './dateScreenItem';

class DateScreenItemWrap extends Component {
  render() {
    const { className, children, handleDateScreen } = this.props;
    const screenWrap = classnames(className, {
      [styles.screenWrap]: true,
    });
    const options = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'DATESCREEN_ITEN') {
        return <DateScreenItem {...other} handleDateScreen={handleDateScreen} />;
      }
    });
    return (
      <div className={screenWrap}>
        {options} <div className={styles.b20} />
      </div>
    );
  }
}
DateScreenItemWrap.defaultProps = {
  className: '',
  handleDateScreen: () => {},
};

export default DateScreenItemWrap;
