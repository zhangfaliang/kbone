import React, { Component } from 'react';
import classnames from 'classnames';
import { formatMoney } from '@/utils/commonFn';
import styles from './index.less';

class Input extends Component {
  static defaultProps = {
    maxLength: 24,
  };

  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
      value: this.normalizeValue(props.value || props.defaultValue),
    };
  }

  componentDidMount() {
    if (this.props.type === 'money') {
      this.inputRef.setAttribute('type', 'text');
    }

    if (this.props.type === 'select') {
      document.activeElement.blur();
    }
  }
  onInputBlur = e => {
    const value = e.target.value;
    if (this.props.onBlur) {
      this.props.onBlur(value);
    }
  };

  onInputFocus = e => {
    if (this.props.type === 'select') {
      return document.activeElement.blur();
    }
    const value = e.target.value;
    if (this.props.onFocus) {
      this.focus();
      this.props.onFocus(value);
    }
  };

  focus = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  onClearValue = () => {
    if (this.inputRef) {
      this.inputRef.value = '';
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  componentDidUpdate = (prevProp, prevState) => {
    if (prevProp.value !== this.props.value) {
      this.onInputChange(this.props.value);
      this.setState({
        value: this.props.value,
      });
    }
  };

  normalizeValue = value => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value + '';
  };

  setCaretPosition = (ctrl, pos) => {
    //设置光标位置函数
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  onInputChange = e => {
    let value = e.target ? e.target.value : e;
    const { type } = this.props;
    let newValue = value;
    switch (type) {
      case 'bankCard':
        if (e.target) {
          console.warn(`input不支持${type}类型，请使用状态组件`);
        }
        newValue = value.replace(/\s+/g, '').replace(/(....)(?=.)/g, '$1 ');
        break;
      case 'money':
        // if (e.target) {
        //   console.warn(`input不支持${type}类型，请使用状态组件`);
        // }
        // if (newValue) {
        //   newValue = newValue.replace(/,/g, '');
        //   newValue = formatMoney(newValue);
        //   this.setCaretPosition(this.inputRef, newValue.length - 3);
        // }

        newValue = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

        break;
      case 'phone':
        if (e.target) {
          console.warn(`input不支持${type}类型，请使用状态组件`);
        }
        newValue = value.replace(/\D/g, '').substring(0, 11);
        const valueLen = newValue.length;
        if (valueLen > 3 && valueLen < 8) {
          newValue = `${newValue.substr(0, 3)} ${newValue.substr(3)}`;
        } else if (valueLen >= 8) {
          newValue = `${newValue.substr(0, 3)} ${newValue.substr(3, 4)} ${newValue.substr(7)}`;
        }
        break;
      case 'number':
        newValue = value.replace(/\D/g, '');
        break;
      case 'expiry':
        newValue = value.replace(/\D/g, '').replace(/^(..)(?=.)/g, '$1 - ');
        break;
      case 'birthday':
        newValue = value.replace(/\D/g, '').substring(0, 8);
        break;
      case 'text':
      case 'password':
      default:
        break;
    }
    this.handleOnChange(newValue, newValue !== value);
  };

  handleOnChange = (value, isMutated = false) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    } else {
      this.setState({ value: this.props.value });
    }
    if (onChange) {
      isMutated ? setTimeout(() => onChange(value)) : onChange(value);
    }
  };

  render() {
    const {
      onBlur,
      size,
      disabled,
      onFocus,
      placeholder,
      maxLength,
      extraCls,
      className,
      onSelectTo,
      type,
      extra,
      mode,
      leftExtra,
      placeholderLeft,
      border,
      radiusCls,
      ...restProps
    } = this.props;
    const wrapCCls = classnames(className, {
      [styles.wrap]: true,
      [styles.radiusCls]: radiusCls,
    });
    const wrapCls = classnames(className, {
      [styles.input]: true,
      [styles[size]]: true,
      [styles.disabled]: disabled,
      [styles.select]: type === 'select',
      [styles.date]: mode === 'date',
      [styles.placeholderLeft]: placeholderLeft,
      [styles.border]: border,
    });
    const extraWrapCls = classnames(extraCls, {
      [styles.extra]: true,
    });
    return (
      <div className={wrapCCls} onClick={type === 'select' ? onSelectTo : undefined}>
        {leftExtra && <div className={styles.leftExtra}>{leftExtra}</div>}
        <input
          className={wrapCls}
          ref={el => (this.inputRef = el)}
          onBlur={this.onInputBlur}
          onFocus={this.onInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={type === 'select'}
          onChange={this.onInputChange}
          maxLength={maxLength}
          {...restProps}
        />
        {extra && <div className={extraWrapCls}>{extra}</div>}
      </div>
    );
  }
}

export default Input;
