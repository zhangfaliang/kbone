import React from 'react';
// import { Input as AntDefaultInput } from 'antd';
import AntDefaultInput from 'antd/lib/input';
import PasswordInput from './passwordInput';
import styles from './index.less';

class Input extends React.Component {
  render() {
    return <AntDefaultInput className={styles.default} {...this.props} />;
  }
}
Input.defaultProps = {
  placeholder: 'Basic usage',
};

export { Input, PasswordInput };
