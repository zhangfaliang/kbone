import React, { Component } from 'react';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import styles from './index.less';
import BetInfo from './betInfo';

class BetPanel extends Component {
  static BetInfo = BetInfo;
  state = {
    value: false,
    changeOdds: false,
    odds: '',
  };
  static defaultProps = {
    quickBetInfo: {},
    title: [],
    odds: '',
    playName: '',
    matchInfo: '',
    EWInfo: '',
    isOpenEW: false,
    onDelect: () => {},
    onChangeEW: () => {},
    onChangeOdds: () => {},
    visabled: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.odds === '') {
      return {
        odds: nextProps.odds,
      };
    }
    return null;
  }

  onShowOdds = e => {
    this.setState({
      changeOdds: !this.state.changeOdds,
    });
  };

  onChangeOdds = v => {
    this.setState({
      odds: v,
    });
    this.props.onChangeOdds(v);
  };

  componentDidUpdate(props) {
    if (props.visabled !== this.props.visabled && this.props.visabled) {
      this.setState({
        value: false,
        changeOdds: false,
        odds: '',
      });
    }
  }

  render() {
    const { EWInfo, onDelect, quickBetInfo } = this.props;
    const activeClas = classnames({
      [styles.active]: this.state.value,
    });
    return (
      <div className={styles.wrap}>
        <div className={styles.pa}>
          {!isEmpty(quickBetInfo) && <BetInfo {...quickBetInfo} />}
          <div className={styles.del}>
            <img
              onClick={onDelect}
              src={require('../../../../assets/horse/delete@3x.png')}
              alt=""
            />
          </div>
        </div>
        {EWInfo && (
          <div
            onClick={() => {
              this.setState(
                {
                  value: !this.state.value,
                },
                () => {
                  this.props.onChangeEW(this.state.value);
                }
              );
            }}
            className={styles.e}
          >
            <span className={activeClas} />
            E/W {EWInfo}
          </div>
        )}
      </div>
    );
  }
}

export default BetPanel;
