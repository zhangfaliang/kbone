import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import IconFont from '../iconFont';

class LabelRight extends Component {
  static COMPONENT_NAME = 'LABELRIGHT';
  constructor(props) {
    super(props);
    this.state = {
      activerightIcon: props.defaultActiverightIcon,
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.activerightIcon !== this.props.activerightIcon) {
      this.setState({
        activerightIcon: nextProps.activerightIcon,
      });
    }
    return true;
  }
  handleClickRightIcon = e => {
    const { disabled } = this.props;
    if (disabled) return;
    e.stopPropagation();
    this.setState(
      {
        activerightIcon: !this.state.activerightIcon,
      },
      () => {
        this.props.handleRightIcon({ activerightIcon: this.state.activerightIcon });
      }
    );
  };

  render() {
    const {
      prefixCls,
      arrayText,
      showIcon,
      iconType,
      rightText,
      activeIconType,
      disabled,
    } = this.props;
    const clsNameStr = `${prefixCls || 'default'}-right-table`;
    const { activerightIcon } = this.state;
    const rightIcon = classnames({
      [styles.icon]: true,
      [styles.activeIcon]: !disabled && activerightIcon,
    });
    return (
      <div className={styles[clsNameStr]}>
        {rightText && <span className={styles.rightText}>{rightText}</span>}
        {showIcon && (
          <div onClick={this.handleClickRightIcon} className={rightIcon}>
            <IconFont type={activerightIcon ? activeIconType : iconType} />
          </div>
        )}
        {arrayText &&
          arrayText.map(text => {
            return (
              <span key={text} className={styles.table}>
                {text}
              </span>
            );
          })}
      </div>
    );
  }
}
LabelRight.defaultProps = {
  prefixCls: 'default',
  arrayText: [],
  showIcon: false,
  iconType: '',
  activeIconType: '', //'mycopy1',
  rightText: '',
  activerightIcon: false,
  defaultActiverightIcon: false,
  disabled: true,
  handleRightIcon: params => {
    console.log(params + '-----handleRightIcon');
    return 'chandleClickIcon';
  },
};

export default LabelRight;
