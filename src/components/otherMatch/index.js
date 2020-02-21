import React, { Component } from 'react';
import styles from './index.less';
import { Label } from '../label';
class OtherMatch extends Component {
  render() {
    const { children, clickTitleText, prefixCls } = this.props;
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'LABEL') {
        return (
          <Label
            {...other}
            clickTitleText={clickTitleText}
            clickLeftTitleText={this.props.clickLeftTitleText}
          />
        );
      }
    });
    const clsNameStr = `${prefixCls || 'default'}-other-match`;

    return <div className={styles[clsNameStr]}>{childrens}</div>;
  }
}
OtherMatch.defaultProps = {
  prefixCls: 'default',
  clickLeftTitleText: params => {
    console.log('clickLeftTitleText');
    return 'clickLeftTitleText';
  },
  clickTitleText: params => {
    console.log('clickTitleText');
    return 'clickTitleText';
  },
};
export default OtherMatch;
