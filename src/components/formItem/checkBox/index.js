import React from 'react';
import { Radio } from '../radio/';
// import styles from './index.less';

class CheckBox extends React.Component {
  state = {
    hasCkecked: this.props.defaultChecked,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.defaultChecked !== state.hasCkecked) {
      return { isOhasCkeckedpen: props.defaultChecked };
    }
    return null;
  }
  onClick = e => {
    const { onClick } = this.props;
    this.setState(
      prevState => ({
        hasCkecked: !prevState.hasCkecked,
      }),
      () => {
        const { hasCkecked } = this.state;
        if (onClick && typeof onClick === 'function') {
          onClick(hasCkecked);
        }
      }
    );
  };
  render() {
    const { hasCkecked } = this.state;

    return (
      <Radio checked={hasCkecked} onClick={this.onClick}>
        {this.props.children}
      </Radio>
    );
  }
}

export { CheckBox as default, CheckBox };
