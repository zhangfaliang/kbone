import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CountDown from '@/components/countdown';
import styles from './index.less';

const Brief = ({
  children,
  type,
  mt,
  isHome,
  actived,
  end,
  showBackIcon,
  noRightBox,
  showDeleteIcon,
  deleteFun,
  setMarginRight,
}) => {
  const activeCls = classnames({
    [styles.active]: actived,
    [styles.ishome]: isHome,
    [styles[type]]: type,
    [styles.setMarginRight]: setMarginRight,
  });
  const briefCls = classnames({
    [styles.end]: end,
    [styles.brief]: true,
    [styles.noRightBox]: noRightBox,
    [styles.mt]: mt,
  });
  const handleDelete = () => {
    if (showDeleteIcon) {
      deleteFun();
    }
  };
  return (
    <div className={briefCls}>
      <span className={activeCls}>{children}</span>
      {showBackIcon && <img src={require('../../assets/s02/back.png')} alt="" />}
      {showDeleteIcon && (
        <>
          <div className={styles.wd16} />
          <div className={styles.unbound} onClick={() => handleDelete()}>
            <img src={require('../../assets/s02/user/Unbound.png')} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

Brief.defaultProps = {
  actived: false,
  end: false,
  showBackIcon: true,
  noRightBox: false,
  mt: false,
  isHome: false,
  setMarginRight: false,
};

Brief.propTypes = {
  type: PropTypes.oneOf(['success', 'pending', 'error', 'default']),
  actived: PropTypes.bool,
};

class Item extends Component {
  static Brief = Brief;
  static defaultProps = {
    noPadding: false,
    children: <div />,
    size: 'large',
    bordered: false,
    noDateValue: false,
    middleCenter: true,
    top24: false,
    icon: false,
    onClick: () => {},
    option: {
      type: '',
      opts: {},
    },
    hidden: false,
  };

  onClick = e => {
    e.preventDefault();
    this.props.onClick();
  };

  render() {
    const {
      noPadding,
      noDateValue,
      extra,
      option,
      children,
      size,
      middleCenter,
      bordered,
      className,
      hidden,
      icon,
      iconSrc,
      top24,
    } = this.props;
    const itemCls = classnames(className, {
      [styles.noDateValue]: noDateValue,
      [styles.item]: true,
      [styles.noPadding]: noPadding,
      [styles[size]]: size,
      [styles.bordered]: bordered,
      [styles.middleCenter]: !middleCenter,
      [styles.pd24]: true,
      [styles.top24]: top24,
    });
    return !hidden ? (
      <div onClick={this.onClick} className={itemCls}>
        {icon && (
          <div className={styles.icon}>
            <img src={iconSrc} alt="" />
          </div>
        )}
        {/* <div className={styles.icon}><img src={icon} alt="" /></div> */}
        {!noDateValue && extra && <div className={styles.item_L}>{extra}</div>}
        <div className={styles.item_R}>{children}</div>
        {option.type === 'verifyCode' && (
          <div className={styles.code}>
            <p />
            <CountDown
              {...Object.assign(option.opts, {
                className: styles.countDown,
                disabledCls: styles.disabledCls,
              })}
            />
          </div>
        )}
      </div>
    ) : (
      ''
    );
  }
}

export default Item;
