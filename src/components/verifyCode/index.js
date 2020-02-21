import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/form';
import classnames from 'classnames';
import styles from './index.less';

export class VerifyCode extends Component {
  state = {
    value: '',
  };

  static propTypes = {
    onChange: PropTypes.func,
    smsCodeLength: PropTypes.number,
    isFristFocus: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    smsCodeLength: 6,
    isFristFocus: true,
  };

  componentDidMount() {
    const { isFristFocus } = this.props;
    if (isFristFocus) {
      this.inputRef.focus();
    }
  }

  render() {
    const { smsCodeLength, onChange } = this.props;
    return (
      <div className={styles.verifyCodeWrap}>
        <div
          onClick={() => {
            if (this.inputRef) {
              this.inputRef.focus();
            }
          }}
          className={styles.codeCls}
        >
          {new Array(smsCodeLength)
            .join(' ')
            .split(' ')
            .map((v, k) => {
              const lineCls = classnames({
                [styles.line]: true,
                [styles.animated]: this.state.value.split('').length === k,
              });
              return (
                <div key={k} className={lineCls}>
                  {this.state.value.split('')[k]}
                </div>
              );
            })}
        </div>
        <Input
          className={styles.input}
          type="text"
          unselectable="on"
          ref={ref => (this.inputRef = ref)}
          pattern="[0-9]*"
          maxLength={smsCodeLength}
          onChange={async e => {
            const value = e.target.value;
            this.setState({
              value,
            });
            onChange(value);
          }}
        />
      </div>
    );
  }
}

export default VerifyCode;
