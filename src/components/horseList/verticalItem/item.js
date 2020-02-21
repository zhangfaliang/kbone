import React, { PureComponent } from 'react';
import styles from './style.less';
import { get } from 'lodash';
import classnames from 'classnames';
const defaultHorseTeam = require('../../../assets/horse/defaultHorseTeam.png');
const refenceValue = {
  odds: 1.01,
  nopause: 0,
  paused: 1,
};
export default class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      imgUrl: true,
    };
  }
  componentDidMount() {
    this.setCheckedBet();
  }
  onClick = (va, da) => {
    const { keys, forceNoHighlighting } = this.props;
    if (
      (va.paused !== refenceValue.nopause || va[keys['odds']] >= refenceValue.odds) &&
      get(va, 'teamExt.result') !== -1 // -1 退赛 0 无名次 1-5 比赛排名
    ) {
      // if (va.paused === refenceValue.nopause || va[keys['odds']] >= refenceValue.odds ) {
      // paused 0 不停表 1 停表
      this.props.quickBet(va, da, { isActive: !this.state.isActive });
      this.setState((state, props) => {
        return state.isActive ? { isActive: false } : { isActive: !forceNoHighlighting };
      });
    }
  };
  setCheckedBet = () => {
    const { val } = this.props;
    if (val.bettingSlipId) {
      this.setState({
        isActive: true,
      });
    }
  };
  onError = () => {
    this.setState({
      imgUrl: false,
    });
  };
  render() {
    const { data, val, keys } = this.props;
    const { isActive, imgUrl } = this.state;
    const { paused } = val;
    const statusCls = classnames({
      [styles.paused]:
        paused === refenceValue.paused ||
        val[keys['odds']] < refenceValue.odds ||
        get(val, 'teamExt.result') === -1, //
      [styles.checked]:
        isActive && paused === refenceValue.nopause && val[keys['odds']] >= refenceValue.odds, // 选中
      [styles.nochecked]:
        !isActive && paused === refenceValue.nopause && val[keys['odds']] >= refenceValue.odds,
    });
    const imgCls = classnames({
      [styles.defaultImg]: true,
      [styles.horsemenIcon]: !imgUrl, //
      [styles.backgroundColor]: imgUrl, //
    });
    return (
      <div className={styles.item}>
        <div className={imgCls}>
          <img
            src={val[keys['playerLogo']] || defaultHorseTeam}
            alt="Player Logo"
            onError={this.onError}
          />
        </div>
        <div>
          <div>{val[keys['horseName']]}</div>
          <div>{val[keys['riderName']]}</div>
        </div>
        <div onClick={() => this.onClick(val, data)} className={statusCls}>
          {val[keys['odds']] < refenceValue.odds ? '--' : val[keys['odds']]}
        </div>
      </div>
    );
  }
}
