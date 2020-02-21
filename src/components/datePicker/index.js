import React, { Component } from 'react';
import DatePicker from 'antd-mobile/lib/date-picker';
import List from '@/components/list';
import 'antd-mobile/lib/date-picker/style';
import styles from './index.less';

class DatePickerWrap extends Component {
  render() {
    return (
      <DatePicker {...this.props} className={styles.datePickerCls}>
        <List.Item noDateValue>{this.props.children}</List.Item>
      </DatePicker>
    );
  }
}

export default DatePickerWrap;
