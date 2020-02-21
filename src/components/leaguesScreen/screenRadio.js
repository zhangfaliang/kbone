import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

class ScreenRadio extends Component {
  state = {
    isActive: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.isActive !== state.isActive) {
      return { isActive: props.isActive };
    }
    return null;
  }
  handleRadio = () => {
    this.props.handleRadio(!this.state.isActive);
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  render() {
    const { radioText, className } = this.props;

    const radioWrapCls = classnames(className, {
      [styles.radioWrap]: true,
      [styles.active]: this.state.isActive,
    });
    return (
      <div className={radioWrapCls} onClick={this.handleRadio}>
        <span className={styles.radio} />
        <span className={styles.radioText}>{radioText}</span>
      </div>
    );
  }
}
ScreenRadio.defaultProps = {
  isActive: false,
  radioText: '全选',
  className: '',
  handleRadio: () => {},
};

export default ScreenRadio;
