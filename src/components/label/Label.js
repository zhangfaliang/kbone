import React, { Component } from 'react';
import LeftTitle from './LeftTitle';
import LabelRight from './LabelRight';
import LabelCenter from './LabelCenter';
import LeftInPlay from './LeftInPlay';
import ResultImg from '../order/orderCard/ResultImg';
import styles from './index.less';
import classnames from 'classnames';
class Label extends Component {
  static COMPONENT_NAME = 'LABEL';
  handelClickTitleText = e => {
    e.preventDefault();

    const { clickTitleText, labelType, disabled } = this.props;

    this.props.clickTitleText && !disabled && clickTitleText(labelType);
  };
  render() {
    const {
      children,
      prefixCls,
      leftNode,
      rightNode,
      showTBBorder,
      clickTitleText,
      bkgdColorCls,
    } = this.props;
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'LEFTNODE') {
        return <LeftTitle {...other} clickLeftTitleText={this.props.clickLeftTitleText} />;
      } else if (option.type.COMPONENT_NAME === 'LABLEDCENTER') {
        return <LabelCenter {...other} />;
      } else if (option.type.COMPONENT_NAME === 'LABELRIGHT') {
        return <LabelRight {...other} handleRightIcon={this.props.handleRightIcon} />;
      } else if (option.type.COMPONENT_NAME === 'LEFTINPLAY') {
        return <LeftInPlay {...other} />;
      } else if (option.type.COMPONENT_NAME === 'RESULTIMG') {
        return <ResultImg {...other} />;
      }
    });

    const clsNameStr = `${prefixCls || 'default'}-label`;
    const claName = classnames({
      [styles[clsNameStr]]: true,
      [styles['showTBBorder']]: showTBBorder,
      [styles[`${bkgdColorCls}`]]: bkgdColorCls ? true : false,
    });
    return (
      <div onClick={this.handelClickTitleText} className={claName}>
        {childrens}
      </div>
    );
  }
}
Label.defaultProps = {
  prefixCls: 'default',
  clickLeftTitleText: params => {
    console.log('clickLeftTitleText');
    return 'clickLeftTitleText';
  },
  showTBBorder: false,
  clickTitleText: params => {
    console.log('clickTitleText');
    return 'clickTitleText';
  },
  handleRightIcon: () => {
    console.log('handleRightIcon');
    return 'handleRightIcon';
  },
  labelType: '电竞',
  disabled: false,
};
export default Label;
