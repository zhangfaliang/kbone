import React, { Component } from 'react';
import classnames from 'classnames';
import IconFont from '../iconFont';
import styles from './index.less';

const key = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'x'];
class Keyboard extends Component {
  static COMPONENT_NAME = 'KEYBOARD';
  constructor(props) {
    super(props);
    this.state = {
      value: String(props.defaultValue) || '',
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: String(nextProps.value),
      });
    }
    return true;
  }

  handleChange = value => {
    const deleteFlag = value === 'x';
    this.setState(
      {
        value: this.getVelue({ deleteFlag, currentValue: this.state.value, value }),
      },
      () => {
        const currentValue = !this.state.value ? '0' : this.state.value;
        this.props.handleChange(currentValue);
      }
    );
  };
  getVelue = ({ deleteFlag, currentValue, value }) => {
    if (deleteFlag) {
      return currentValue.slice(0, currentValue.length - 1);
    } else {
      if (!currentValue || /^0/.test(currentValue.replace(/ /, ''))) {
        if (/^0/.test(value)) {
          return '0';
        }
        return value;
      } else {
        return (currentValue += value);
      }
    }
  };
  render() {
    const { prefixCls, isShow } = this.props;
    const clsName = classnames({
      [styles[`${prefixCls}-keyboard`]]: true,
      [styles.isShow]: isShow,
    });

    return (
      <div
        className={clsName}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {key.map(item => {
          return (
            <a
              key={item}
              href="javascript:;"
              onClick={e => {
                e.stopPropagation();
                this.handleChange(item);
              }}
              className={styles.btnWrap}
            >
              <span className={styles.btn}>
                {' '}
                {item === 'x' ? <IconFont type="jisuanqishanchu" /> : item}
              </span>
            </a>
          );
        })}
      </div>
    );
  }
}
Keyboard.defaultProps = {
  prefixCls: 'default',
  defaultValue: '0',
  value: '',
  isShow: false,
  handleChange: value => {
    console.log(value);
  },
};
export default Keyboard;
