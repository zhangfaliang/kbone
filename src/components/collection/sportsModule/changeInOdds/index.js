import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { isEmpty } from 'lodash';
class ChangeInOdds extends React.Component {
  constructor(props) {
    super(props);
    this.spanRef = React.createRef();
    this.state = {
      increased: false,
      reduced: false,
    };
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const update = JSON.stringify(prevProps.data.odds) === JSON.stringify(this.props.data.odds);
    const matchIdupdate =
      JSON.stringify(prevProps.data.matchId) === JSON.stringify(this.props.data.matchId);
    if (!update && matchIdupdate) {
      return true;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * TODO:
     * ---- 是否显示图标
     * ---- prevProps.odds * 1 > odds * 1 显示 ↓ 的图标
     * ---- prevProps.odds * 1 < odds * 1 显示 ↑ 的图标
     */
    if (snapshot !== null) {
      const { data } = this.props;
      if (isEmpty(prevProps.data.odds) || isEmpty(data.odds)) {
        return false;
      }
      if (prevProps.data.odds * 1 > data.odds * 1) {
        this.setOdds({ reduced: true });
      } else if (prevProps.data.odds * 1 < data.odds * 1) {
        this.setOdds({ increased: true });
      }
    }
  }
  setOdds = e => {
    /**
     * TODO:
     * 感觉可以优化
     * 2秒后清除 图标
     */
    const _this = this;
    this.setState(e, () => {
      setTimeout(() => {
        _this.setState({
          increased: false,
          reduced: false,
        });
      }, 2000);
    });
  };

  render() {
    const { increased, reduced } = this.state;
    const changeCls = classnames({
      [styles.increased]: increased,
      [styles.reduced]: reduced,
      [styles.default]: true,
    });
    return <span className={changeCls} ref={this.spanRef} />;
  }
}
export default ChangeInOdds;
