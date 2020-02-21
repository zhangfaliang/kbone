import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

class Spin extends Component {
  render() {
    const { spinning, isThirdparty, children } = this.props;

    const wrapCls = classnames({
      [styles.wrap]: true,
      [styles.thirdparty]: isThirdparty,
    });
    return spinning ? (
      <div className={wrapCls}>
        <img src={require('../../assets/loading.gif')} alt="" />
      </div>
    ) : (
      children
    );
  }
}

export default Spin;
