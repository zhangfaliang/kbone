import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import TabItem from './tabItem';

class TabTitle extends Component {
  static COMPONENT_NAME = 'TAB_TITLE';

  render() {
    const { children, className, handleTabItem } = this.props;
    const titleCls = classnames(
      {
        [styles.title]: true,
      },
      className
    );
    const options = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'TAB_ITEM') {
        return <TabItem {...other} handleTabItem={handleTabItem} />;
      }
    });

    return <div className={titleCls}>{options}</div>;
  }
}
TabTitle.defaultProps = {
  className: '',
};
export default TabTitle;
