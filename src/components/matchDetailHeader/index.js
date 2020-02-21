import React, { Component } from 'react';
import classnames from 'classnames';
import IconFont from '../iconFont';
import styles from './index.less';

class MatchDetailHeater extends Component {
  static COMPONENT_NAME = 'MATCHDETAILHEADER';
  constructor(props) {
    super(props);
    this.state = {
      activeRightIconName: props.defaultActiveRightIconName,
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.activeRightIconName !== this.props.activeRightIconName) {
      this.setState({
        activeRightIconName: nextProps.activeRightIconName,
      });
    }
    return true;
  }
  handleRightIcn = activeIconName => {
    const { handelHappeningIcon, handelVSIcon } = this.props;
    this.setState(
      {
        activeRightIconName: activeIconName,
      },
      () => {
        if (activeIconName === 'VSIcon') {
          handelVSIcon();
        } else if (activeIconName === 'happeningIcon') {
          handelHappeningIcon();
        }
      }
    );
  };

  render() {
    const {
      prefixCls,
      leftText,
      centerText,
      showVSIcon,
      showHappeningIcon,
      handelBackIcon,
    } = this.props;
    const clsName = styles[`${prefixCls}-match-detail-header`];
    const { activeRightIconName } = this.state;

    const vsIconCls = classnames({
      [styles.rigthIcon]: true,
      [styles.activeIcon]: activeRightIconName === 'VSIcon',
    });
    const happeningIcon = classnames({
      [styles.rigthIcon]: true,
      [styles.activeIcon]: activeRightIconName === 'happeningIcon',
    });
    return (
      <div className={clsName}>
        <div className={styles.left}>
          <span className={styles.leftIcon} onClick={handelBackIcon}>
            <IconFont type="mycopy" />
          </span>
          <span className={styles.leftText}>{leftText}</span>
        </div>
        {centerText && <span className={styles.center}>{centerText}</span>}
        <div className={styles.right}>
          {showVSIcon && (
            <span
              className={vsIconCls}
              onClick={() => {
                this.handleRightIcn('VSIcon');
              }}
            >
              <IconFont type="bisaixinxi" />
            </span>
          )}

          {showHappeningIcon && (
            <span
              className={happeningIcon}
              onClick={() => {
                this.handleRightIcn('happeningIcon');
              }}
            >
              <IconFont type="shikuangxinxicopy" />
            </span>
          )}
        </div>
      </div>
    );
  }
}
MatchDetailHeater.defaultProps = {
  prefixCls: 'default',
  leftText: 'NBA',
  centerText: '',
  showVSIcon: true,
  showHappeningIcon: true,
  defaultActiveRightIconName: 'VSIcon', // VSIcon  happeningIcon
  activeRightIconName: '', // VSIcon  happeningIcon
  handelVSIcon: () => {
    console.log('handelVSIcon');
    return 'handelVSIcon';
  },
  handelHappeningIcon: () => {
    console.log('handelHappeningIcon');
    return 'handelHappeningIcon';
  },
  handelBackIcon: () => {
    console.log('handelBackIcon');
    return 'handelBackIcon';
  },
};

export default MatchDetailHeater;
