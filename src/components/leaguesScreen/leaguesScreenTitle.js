import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

class LeaguesScreenTitle extends Component {
  static COMPONENT_NAME = 'LEAGUES_TITLE';

  state = {
    allAreaChoose: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.allAreaChoose !== state.allAreaChoose) {
      return { allAreaChoose: props.allAreaChoose };
    }
    return null;
  }
  handleallAreaChoose = () => {
    const { areaCode, areaName } = this.props;
    this.props.handleallAreaChoose({
      isallAreaChoose: !this.state.allAreaChoose,
      areaCode,
      areaName,
    });
    this.setState({
      allAreaChoose: !this.state.allAreaChoose,
    });
  };
  render() {
    const { areaName, className } = this.props;
    const { allAreaChoose } = this.state;
    const titleCls = classnames(className, {
      [styles.title]: true,
    });
    const iconCls = classnames(className, {
      [styles.icon]: true,
      [styles.activeIcon]: allAreaChoose,
    });
    return (
      <div onClick={this.handleallAreaChoose} className={titleCls}>
        <span className={styles.text}>{areaName}</span>
        <span className={iconCls} />
      </div>
    );
  }
}
LeaguesScreenTitle.defaultProps = {
  areaName: '亚洲',
  areaCode: '',
  className: '',
  allAreaChoose: false,
  handleallAreaChoose: () => {},
};

export default LeaguesScreenTitle;
