import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
class IconFont extends Component {
  render() {
    const { type } = this.props;
    const iconFontCls = classnames({
      [styles.iconfont]: true,
      [styles[`icon-${type}`]]: type,
    });
    return <span className={iconFontCls} />;
  }
}
IconFont.defaultProps = {
  type: '',
};
export default IconFont;
