import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import LeaguesNameBtn from './leaguesNameBtn';
class LeaguesNameBtnGroup extends Component {
  static COMPONENT_NAME = 'DISPLAY_BTN_GROUP';
  render() {
    const { children, isAllChoose, className, handleLeageueBtn } = this.props;
    const leaguesNameGroupCls = classnames(className, {
      [styles.leaguesNameGroup]: true,
    });
    const options = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'DISPLAY_BTN') {
        return <LeaguesNameBtn {...other} handleLeageueBtn={handleLeageueBtn} />;
      }
    });
    return <div className={leaguesNameGroupCls}>{options}</div>;
  }
}
LeaguesNameBtnGroup.defaultProps = {
  isAllChoose: false,
  handleLeageueBtn: () => {},
  className: '',
};
export default LeaguesNameBtnGroup;
