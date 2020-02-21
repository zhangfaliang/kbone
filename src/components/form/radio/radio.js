import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const Brief = ({ children }) => {
  return <div>{children}</div>;
};
class Group extends Component {
  static Brief = Brief;

  static defaultProps = {
    disabled: false,
    children: <div />,
    bordered: true,
    size: 'large',
    icon: undefined,
    extra: undefined,
    hiddenDot: false,
  };

  onHandleItem = value => {
    this.props.onChange(value);
  };

  render() {
    const {
      children,
      icon,
      value,
      isEdit,
      size,
      onHandleEdit,
      extra,
      defalutValue,
      bordered,
      disabled,
      vertical,
      className,
      color,
      hiddenDot,
      riBack,
      isBack,
    } = this.props;
    const itemCls = classnames(className, {
      [styles.item]: true,
      [styles.isBack]: isBack,
      [styles[size]]: true,
      [styles.bordered]: bordered,
      [styles.disabled]: disabled && !isEdit,
      [styles.checked]: defalutValue === value,
    });

    const nameCls = classnames({
      [styles.middr]: !extra,
    });

    return (
      <div onClick={disabled ? undefined : this.onHandleItem.bind(this, value)} className={itemCls}>
        <div className={styles.body}>
          <div className={styles.icon}>
            {vertical && icon && <img src={icon} alt="" />}
            {!vertical && <div className={styles.pac} />}
          </div>
          <div className={nameCls}>
            <div style={{ color }} className={styles.name}>
              {children}
            </div>
            {extra && <div className={styles.extra}>{extra}</div>}
          </div>
        </div>
        {isEdit ? (
          <div
            onClick={() => {
              onHandleEdit(value);
            }}
            className={styles.dac}
          />
        ) : (
          vertical && !hiddenDot && <div className={styles.pac} />
        )}

        {isBack && riBack}
      </div>
    );
  }
}

export default Group;
