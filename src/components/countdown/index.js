import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less';

class Counter extends Component {
  static propTypes = {
    onStep: PropTypes.func,
    onComplete: PropTypes.func,
    count: PropTypes.number,
    step: PropTypes.number,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    text: PropTypes.string,
    onRestart: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    prefixCls: 'prefix8w-ctd',
    text: 'Code',
  };

  constructor(props) {
    super(props);
    this.initValue = this.props.count || 10;
    this.state = {
      count: this.initValue,
      text: this.props.text,
      status: null,
    };
    this.interval = 0;
    this.step = this.props.step || 1;
  }

  stop() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    if (this.props.isStart) {
      this.start();
    }
  }

  start() {
    this.stop();
    if (this.props.onStep) {
      this.props.onStep(this.state.count);
    }
    this.setState({
      status: 'sending',
      text: `${this.state.count}s`,
    });
    this.interval = setInterval(() => {
      var count = this.state.count - this.step;
      if (this.props.onStep) {
        this.props.onStep(count);
      }
      if (count <= 0) {
        this.props.onComplete && this.props.onComplete();
        this.setState({
          count: this.initValue,
          text: this.props.text,
          status: 'complete',
        });
        this.stop();
      } else {
        this.setState({
          count,
          text: `${count}s`,
        });
      }
    }, 1000);
  }

  onRestart = async () => {
    this.stop();
    this.setState({
      count: this.initValue,
      text: this.props.text,
      status: 'complete',
    });
    await this.props.onRestart();
  };
  componentWillUnmount() {
    this.stop();
  }

  onClick = async e => {
    if (e) {
      e.stopPropagation();
    }
    try {
      if (this.state.status !== 'sending' && !this.props.disabled) {
        await this.props.onClick();
        this.start();
      }
    } catch (error) {}
  };

  render() {
    const { className, disabled, disabledCls, prefixCls } = this.props;
    const { status } = this.state;
    const wrapCls = classnames(prefixCls, className, {
      [disabledCls ? disabledCls : `${prefixCls}-disabled`]: disabled,
    });
    return (
      <span onClick={this.onClick} className={wrapCls}>
        {this.state.text}
      </span>
    );
  }
}

export default Counter;
