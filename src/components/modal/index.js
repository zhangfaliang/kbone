import React, { Component } from 'react';
import Modal from 'antd-mobile/lib/modal';
import classnames from 'classnames';
import 'antd-mobile/lib/modal/style/index';
import styles from './index.less';

class Index extends Component {
  render() {
    const { className } = this.props;
    const wrapCls = classnames(className, {
      [styles.wrap]: true,
    });
    return (
      <Modal {...this.props} className={wrapCls}>
        {this.props.children}
      </Modal>
    );
  }
}

export default Index;
