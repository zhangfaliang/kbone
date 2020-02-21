import React, { Component } from 'react';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import 'antd-mobile/lib/pull-to-refresh/style';
import styles from './index.less';
class Wrap extends Component {
  render() {
    const loading = <img src={require('../../assets/v1/下拉loading.gif')} alt="" />;
    return (
      <PullToRefresh
        {...this.props}
        indicator={{
          activate: loading,
          // deactivate: loading,
          deactivate: <></>,
          release: loading,
          // finish: loading,
          finish: <></>,
        }}
      >
        {this.props.children}
      </PullToRefresh>
    );
  }
}

export default Wrap;
