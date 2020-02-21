import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.less';
import TouchFeedback from 'rmc-feedback';

class Button extends Component {
  static defaultProps = {
    size: 'large',
    inline: false,
    disabled: false,
    loading: false,
    activeStyle: {},
    shape: 'oval',
  };

  static propTypes = {
    shape: PropTypes.oneOf(['oval', 'square', 'half-radius']),
  };

  render() {
    const {
      children,
      className,
      type,
      size,
      inline,
      disabled,
      icon,
      loading,
      activeStyle,
      activeClassName,
      onClick,
      disabledCls,
      shape,
      id,
      ...restProps
    } = this.props;
    const wrapCls = classnames(className, {
      [styles.wrap]: true,
      [styles[type]]: type,
      [styles.small]: size === 'small',
      [styles.inline]: inline,
      [styles.disabled]: disabled,
      [styles.loading]: loading,
      [disabledCls]: disabled,
      [styles[shape]]: shape,
    });

    return (
      <TouchFeedback
        activeClassName={activeClassName || (activeStyle ? styles.active : undefined)}
        disabled={disabled}
        activeStyle={activeStyle}
      >
        <a id={id} className={wrapCls} onClick={disabled ? undefined : onClick} {...restProps}>
          {children}
        </a>
      </TouchFeedback>
    );
  }
}

export default Button;
