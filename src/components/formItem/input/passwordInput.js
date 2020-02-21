import React from 'react';
import { Input } from './';
// import { Icon } from 'antd';
import Icon from 'antd/lib/icon';
import classnames from 'classnames';
import styles from './passwordInput.less';

// import loginPasswordHidePNG from '@/assets/login-password-hide.png'

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      text: props.value,
      // type: 'password',
      type: 'password',
      isShowDelete: true,
    };
  }

  emitEmpty = () => {
    const { onChange } = this.props;
    onChange && onChange('');
    this.setState({ text: '' });
  };

  onChangeUserName = e => {
    const { onChange } = this.props;
    onChange && onChange(e, e.target.value);
    const { value } = e.target;
    this.setState(state => {
      if (!state.isShowDelete) {
        return { text: value, isShowDelete: true };
      }
      return { text: value };
    });
  };
  clearPassWord = e => {
    const { onChange } = this.props;
    const { text } = this.state;
    if (text && text.length > 0) {
      onChange && onChange(e, '');
      this.setState({ text: '' });
      e.target.parentElement.parentElement.getElementsByTagName('input')[0].focus();
      this.setState({
        isShowDelete: false,
      });
    }
  };
  onTogglePassword = () => {
    this.setState(prevState => ({
      type: prevState.type === 'password' ? 'text' : 'password',
    }));
  };
  onFocus = () => {
    this.setState({
      isShowDelete: true,
    });
  };
  onBlur = e => {
    const _this = this;
    setTimeout(() => {
      _this.setState(state => {
        return {
          isShowDelete: false,
        };
      });
    }, 100);
  };
  render() {
    const { placeholder, inputType, ...res } = this.props;
    const clsName = classnames({
      [styles.default]: true,
      [styles.deleteClassname]: !inputType,
    });
    const { text, type, isShowDelete } = this.state;
    const suffix =
      isShowDelete && text ? (
        <i className={styles.loginPasswordDeletePNG} onClick={this.clearPassWord} />
      ) : null;
    return (
      // <div className={styles.default}>
      <div className={clsName}>
        <Input
          {...res}
          id={`passwordInput-${Math.random()}`}
          type={inputType ? type : 'text'}
          addonAfter={
            type === 'password' ? (
              <>
                {inputType && (
                  <i
                    className={styles.loginPasswordHidePNG}
                    // src={loginPasswordHidePNG}
                    // alt="closeEye"
                    onClick={this.onTogglePassword}
                  />
                )}
                {/* <i
                  className={styles.loginPasswordHidePNG}
                  // src={loginPasswordHidePNG}
                  // alt="closeEye"
                  onClick={this.onTogglePassword}
                /> */}
              </>
            ) : (
              // <Icon type={type === 'password' ? 'lock' : 'eye'} onClick={this.onTogglePassword} />

              <>
                {inputType && (
                  <i
                    className={styles.loginPasswordClosePNG}
                    // src={loginPasswordHidePNG}
                    // alt="closeEye"
                    onClick={this.onTogglePassword}
                  />
                )}
                {/* <i
                  className={styles.loginPasswordClosePNG}
                  // src={loginPasswordHidePNG}
                  // alt="closeEye"
                  onClick={this.onTogglePassword}
                /> */}
              </>
            )
          }
          suffix={suffix}
          value={text}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChangeUserName}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

PasswordInput.defaultProps = {
  placeholder: 'Enter your username',
  type: 'password',
};

export default PasswordInput;
