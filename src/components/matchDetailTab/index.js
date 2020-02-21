import React, { Component } from 'react';
import classname from 'classnames';
import { isArray } from 'lodash';
import styles from './index.less';
class MatchDetailTab extends Component {
  render() {
    const { tabs, activeKey, handleDetailTab } = this.props;
    return (
      <div className={styles['detail-tab-wrap']}>
        {isArray(tabs) &&
          tabs.map(({ key, tabName }) => {
            return (
              <span
                onClick={handleDetailTab.bind(this, key)}
                key={key}
                className={activeKey === key ? styles.active : ''}
              >
                {tabName}
              </span>
            );
          })}
      </div>
    );
  }
}
MatchDetailTab.defaultProps = {
  tabs: [{ key: 'game', tabName: '比赛' }, { key: 'set', tabName: '盘' }],
  activeKey: 'game',
  handleDetailTab: () => {},
};
export default MatchDetailTab;
