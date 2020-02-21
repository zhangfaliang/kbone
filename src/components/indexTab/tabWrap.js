import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import TabTitle from './title';
import Card from './card';

class TabWrap extends Component {
  render() {
    const { children, className, handleTabItem, handleCard } = this.props;
    const wrapCls = classnames(
      {
        [styles.warp]: true,
      },
      className
    );
    const options = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'TAB_TITLE') {
        return (
          <div className={styles.titleWrap}>
            <TabTitle {...other} handleTabItem={handleTabItem} />
          </div>
        );
      } else if (option.type.COMPONENT_NAME === 'CARD') {
        return <Card {...other} handleCard={handleCard} />;
      }
    });

    return <div className={wrapCls}>{options}</div>;
  }
}
TabWrap.defaultProps = {
  className: '',
  handleCard: () => {},
};
export default TabWrap;
