import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
class LeaguesBtn extends Component {
  static COMPONENT_NAME = 'DISPLAY_BTN';
  state = {
    isActive: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.isActive !== state.isActive) {
      return { isActive: props.isActive };
    }
    return null;
  }
  handleLeageueBtn = () => {
    const { leaguesName, leaguesCode, handleLeageueBtn, location } = this.props;
    handleLeageueBtn({
      leaguesName,
      leaguesCode,
      location,
      isActive: !this.state.isActive,
    });
    this.setState({ isActive: !this.state.isActive });
  };
  render() {
    const { leaguesName, className } = this.props;
    const { isActive } = this.state;
    const leaguesNameCls = classnames({
      [styles.leaguesNameBtn]: true,
      [styles.active]: isActive,
    });
    return (
      <div onClick={this.handleLeageueBtn} className={leaguesNameCls}>
        {leaguesName}
      </div>
    );
  }
}
LeaguesBtn.defaultProps = {
  leaguesName: '亚足联冠军联赛亚足联冠军联赛',
  leaguesCode: '',
  className: '',
  handleLeageueBtn: () => {},
};
export default LeaguesBtn;
