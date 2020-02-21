import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import LeaguesScreenTitle from './leaguesScreenTitle';
import LeaguesNameBtnGroup from './leaguesNameBtnGroup';

class LeaguesScreenWrap extends Component {
  render() {
    const { children, handleSoemAreaAllChoose, handleLeageueBtn, className } = this.props;
    const leaguesScreenWrapCls = classnames(className, {
      [styles.warp]: true,
    });
    const options = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'LEAGUES_TITLE') {
        return <LeaguesScreenTitle {...other} handleallAreaChoose={handleSoemAreaAllChoose} />;
      } else if (option.type.COMPONENT_NAME === 'DISPLAY_BTN_GROUP') {
        return <LeaguesNameBtnGroup {...other} handleLeageueBtn={handleLeageueBtn} />;
      }
    });
    return <div className={leaguesScreenWrapCls}>{options}</div>;
  }
}
LeaguesScreenWrap.defaultProps = {
  className: '',
  handleSoemAreaAllChoose: () => {},
  handleLeageueBtn: () => {},
};
export default LeaguesScreenWrap;
