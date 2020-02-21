import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: props.activeKey };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.activeKey !== state.activeKey) {
      return { activeKey: props.activeKey };
    }
    return null;
  }

  handleTab = activeKey => {
    this.setState({ activeKey: activeKey }, () => {
      this.props.onClickTab(activeKey);
    });
  };
  render() {
    const { children, tabs, prefixCls } = this.props;
    return (
      <div className={styles[`${prefixCls}-tabs`]}>
        <div className={styles.tab}>
          {tabs.map(tab => {
            const tabClsStr = classnames({
              [styles.tabText]: true,
              [styles.isActive]: tab.key == this.state.activeKey,
            });
            return (
              <span
                className={tabClsStr}
                onClick={() => {
                  this.handleTab(tab.key);
                }}
                key={tab.key}
              >
                {tab.value}
              </span>
            );
          })}
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    );
  }
}
Tabs.defaultProps = {
  prefixCls: 'default',
  tabs: [
    { key: 'single', value: 'win' },
    { key: 'foreCast', value: 'foreCast' },
    { key: 'triCast', value: 'triCast' },
  ],
  activeKey: 'single',
  onClickTab: key => {
    console.log(key);
  },
};

export default Tabs;
