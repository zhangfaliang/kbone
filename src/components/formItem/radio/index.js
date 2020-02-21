import React from 'react';
// import { Radio as AntDefaultRadio } from 'antd';
import AntDefaultRadio from 'antd/lib/radio';
import styles from './index.less';

class Radio extends React.Component {
  onClick = e => {
    // console.log(e.target);
    e.target.click();
  };
  render() {
    const { vertical, onClick, ...res } = this.props;
    return (
      <AntDefaultRadio
        className={`${styles.default} ${vertical && styles.vertical}`}
        {...res}
        onClick={onClick || this.onClick}
      >
        {this.props.children}
      </AntDefaultRadio>
    );
  }
}
const RadioGroup = (Radio.Group = AntDefaultRadio.Group);
Radio.defaultProps = {
  vertical: false,
};

export { Radio as default, Radio, RadioGroup };
