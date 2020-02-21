import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import Radio from './radio';

class RadioGroup extends Component {
  static Radio = Radio;

  static defaultProps = {
    vertical: true,
    hiddenDot: false,
  };
  render() {
    const {
      children,
      isEdit,
      onHandleEdit,
      renderFooter,
      renderHeader,
      bordered,
      size,
      value,
      vertical,
      onChange,
      hiddenDot,
      className,
      noFtop,
    } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        bordered,
        onChange,
        defalutValue: value,
        size,
        isEdit,
        onHandleEdit,
        vertical,
        hiddenDot,
      })
    );

    const wrapCls = classnames(className, {
      [styles.wrap]: true,
    });

    const fhCls = classnames({
      [styles.fh]: true,
      [styles[size]]: true,
      [styles.hbom]: renderHeader,
      [styles.ftop]: renderFooter,
      [styles.noFtop]: noFtop,
    });

    const listCls = classnames({
      [styles.list]: true,
      [styles.vertical]: vertical,
    });

    return (
      <div className={wrapCls}>
        {renderHeader && <div className={fhCls}>{renderHeader}</div>}
        <div className={listCls}>{childrenWithProps}</div>
        {renderFooter && <div className={fhCls}>{renderFooter}</div>}
      </div>
    );
  }
}

export default RadioGroup;
