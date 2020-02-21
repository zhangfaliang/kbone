import React, { Component } from 'react';
import classnames from 'classnames';
import IconFont from '../iconFont';
import styles from './index.less';
class MatchDetailPanel extends Component {
  static COMPONENT_NAME = 'MATCHDETAILPANEL';
  constructor(props) {
    super(props);
    this.state = {
      showPanel: props.accordion ? props.activeKeyId === props.keyId : '',
      isStick: props.activeStickKeyId === props.keyId,
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.accordion && nextProps.activeKeyId !== this.props.activeKeyId) {
      this.setState({
        showPanel: nextProps.activeKeyId === nextProps.keyId,
      });
    }
    if (nextProps.activeStickKeyId !== this.props.activeStickKeyId) {
      this.setState({
        isStick: nextProps.activeStickKeyId === nextProps.keyId,
      });
    }
    return true;
  }

  handlePanel = e => {
    e.stopPropagation();
    const { handlePanel, keyId, showFlod } = this.props;
    if (!showFlod) return;
    this.setState(
      {
        showPanel: !this.state.showPanel,
      },
      () => {
        handlePanel && handlePanel(this.state.showPanel ? keyId : '');
      }
    );
  };

  handleStickIcon = e => {
    e.stopPropagation();
    const { handleStickIcon, keyId } = this.props;
    handleStickIcon && handleStickIcon(keyId);

    // this.setState(
    //   {
    //     isStick: true,
    //   },
    //   () => {
    //   }
    // );
    return false;
  };
  handleHelpIcon = e => {
    e.stopPropagation();
    const { handleHelpIcon, keyId } = this.props;
    handleHelpIcon && handleHelpIcon(keyId);
  };
  render() {
    const {
      children,
      leftText,
      keyId,
      isOperateSelected,
      prefixCls,
      isShowHelpIcon,
      showFlod,
      style,
    } = this.props;
    const { showPanel, isStick } = this.state;
    const clsName = classnames({
      [styles[`${prefixCls}-detail-panel`]]: true,
      [styles.show]: showPanel,
    });
    const stickCls = classnames({
      [styles.stickIcon]: true,
      [styles.activeStickIcon]: isOperateSelected,
    });
    const foldCls = classnames({
      [styles.foldIcon]: true,
      [styles.activeFoldIcon]: showPanel,
    });
    const leftTextCls = classnames({
      [styles.leftText]: true,
      [styles.leftTextP12]: !isShowHelpIcon,
    });
    return (
      <div className={clsName} style={style}>
        <div className={styles.title} onClick={this.handlePanel}>
          <div className={styles.titleLife}>
            {isShowHelpIcon && (
              <span className={styles.leftIcon} onClick={this.handleHelpIcon}>
                {/* <IconFont type="bangzhushuoming" /> */}
              </span>
            )}
            <span className={leftTextCls}>{leftText}</span>
          </div>

          <div className={styles.titleRight}>
            <span className={stickCls} onClick={this.handleStickIcon}>
              {/* <IconFont type="zhiding" /> */}
            </span>
            {showFlod ? (
              <span onClick={this.handlePanel} className={foldCls}>
                {' '}
                <IconFont type="mycopy" />
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    );
  }
}
MatchDetailPanel.defaultProps = {
  prefixCls: 'default',
  keyId: 'basket',
  activeKeyId: 'basket',
  accordion: false,
  leftText: 'Primera división de Liga',
  isOperateSelected: false,
  isShowHelpIcon: false,
  showFlod: true,
  handlePanel: keyId => {
    console.log(keyId + 'handlePanel');
    return 'handlePanel';
  },
  handleStickIcon: keyId => {
    console.log(keyId + 'handleStickIcon');
    return 'handleStickIcon';
  },
  handleHelpIcon: keyId => {
    console.log(keyId + 'handleHelpIcon');
    return 'handleHelpIcon';
  },
};
export default MatchDetailPanel;
