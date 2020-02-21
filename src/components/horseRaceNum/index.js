import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import styles from './index.less';

class HorseRaceNum extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: props.activeKey };
    this.raceNum = React.createRef();
    this.maxNum = 6;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeKey !== state.activeKey) {
      return { activeKey: props.activeKey };
    }
    return null;
  }

  handleRaceNum = ({ matchId, matchTime, sportType, raceNum }) => {
    this.props.onClickRaceNum({ matchId, matchTime, sportType, raceNum });
    this.setState({ activeKey: raceNum });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const raceNum = this.raceNum.current;
    if (this.state.activeKey > this.maxNum) {
      if (raceNum.scrollLeft <= 0) {
        return raceNum.children[0].clientWidth * (this.props.activeKey - this.maxNum);
      }
      return null;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const raceNum = this.raceNum.current;
      raceNum.scrollLeft = snapshot;
    }
  }

  componentDidMount() {
    const raceNum = this.raceNum.current;
    if (this.props.activeKey > this.maxNum && raceNum.scrollLeft <= 0) {
      raceNum.scrollLeft = raceNum.children[0].clientWidth * (this.props.activeKey - this.maxNum);
    }
    return null;
  }

  render() {
    const { raceList, prefixCls, activeKey } = this.props;

    return (
      <div ref={this.raceNum} className={styles[`${prefixCls}-horse-race-num`]}>
        {raceList.map((raceNumObj, index) => {
          const { matchExt, matchId, matchTime, sportType } = raceNumObj;
          const raceNum = get(matchExt, 'raceNum', 1);
          const clsStr = classnames({
            [styles.num]: true,
            [styles.active]: this.state.activeKey == raceNum,
          });
          return (
            <span
              className={clsStr}
              onClick={() => {
                this.handleRaceNum({ matchId, matchTime, sportType, raceNum });
              }}
              key={index}
            >
              {raceNum}
            </span>
          );
        })}
      </div>
    );
  }
}
HorseRaceNum.defaultProps = {
  prefixCls: 'default',
  raceList: [],
  activeKey: '',
  onClickRaceNum: key => {
    console.log(key);
    return 'onClickRaceNum';
  },
};
export default HorseRaceNum;
