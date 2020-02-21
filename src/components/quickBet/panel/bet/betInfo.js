import React, { Component } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import contains from 'rc-util/lib/Dom/contains';
import { findDOMNode } from 'react-dom';
import styles from './index.less';

class BetInfoPanel extends Component {
  state = {
    value: false,
    changeOdds: false,
    odds: '',
    left: {},
    isChangeSP: false,
    isChangeHandicap: false,
  };
  static defaultProps = {
    title: '',
    odds: '',
    playName: '',
    matchInfo: '',
    isStateSP: false,
    onChangeEW: () => {},
    onChangeOdds: () => {},
    uiFromSlip: false,
    isOpenEW: false,
    isOpenChangeSP: false,
    isAcceptChange: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.odds === '') {
      return {
        odds: nextProps.isStateSP ? 'SP' : nextProps.odds,
      };
    }
    return null;
  }

  onShowOdds = e => {
    this.setState({
      changeOdds: !this.state.changeOdds,
    });
  };

  onDocumentClick(e) {
    let timemodal = findDOMNode(this.changeOddsRef);
    if (!contains(timemodal, e.target)) {
      this.setState({
        changeOdds: false,
      });
    }
  }

  onChangeOdds = v => {
    this.setState({
      odds: v,
    });
    this.props.onChangeOdds(v);
  };

  componentDidUpdate(props, state) {
    if (
      // props.title === this.props.title &&
      get(props, 'ishandicapChange', false) !== get(this.props, 'ishandicapChange', false)
    ) {
      if (get(this.props, 'ishandicapChange')) {
        this.setState({
          isChangeHandicap: true,
        });
      } else {
        this.setState({
          isChangeHandicap: false,
        });
      }
    }
    if (props.isStateSP !== this.props.isStateSP) {
      this.setState({
        odds: this.props.isStateSP ? 'SP' : this.props.odds,
      });
    }
    if (props.visabled !== this.props.visabled && this.props.visabled) {
      const left = !this.props.uiFromSlip && {
        left: `${this.mhref && this.mhref.clientWidth}px`,
      };
      this.setState({
        value: false,
        changeOdds: false,
        odds: '',
        left,
      });
    } else {
      if (this.clickOutsideHandle) {
        this.clickOutsideHandle.remove();
      }
    }
    if (state.changeOdds !== this.state.changeOdds && this.state.changeOdds) {
      this.clickOutsideHandle = addEventListener(
        document,
        'click',
        this.onDocumentClick.bind(this)
      );
    }
    if (
      props.title === this.props.title &&
      props.isOpenChangeSP === this.props.isOpenChangeSP &&
      props.odds !== this.props.odds
    ) {
      if (!this.props.isSP && this.props.odds !== 'SP') {
        this.setState({
          odds: this.props.odds,
          isChangeSP: true,
        });
        this.props.emitChangeSP(true);
      }
    }
    if (props.isAcceptChange !== this.props.isAcceptChange) {
      if (!this.props.isAcceptChange) {
        this.setState({
          isChangeSP: false,
        });
        this.props.emitChangeSP(false);
      }
    }
  }

  componentWillUnmount() {
    if (this.clickOutsideHandle) {
      this.clickOutsideHandle.remove();
    }
  }

  render() {
    const {
      title,
      odds: propsOdds,
      isSuspended,
      isOpenChangeSP,
      uiFromSlip,
      playName,
      matchInfo,
    } = this.props;
    const { odds, left, isChangeHandicap } = this.state;
    const oddCls = classnames({
      [styles.odds]: true,
      [styles.oddChange]: this.state.changeOdds,
    });

    const hCls = classnames({
      [styles.h]: true,
      [styles.slipH]: uiFromSlip,
    });

    const odsCls = classnames({
      [styles.ods]: true,
      [styles.isChangeSP]: this.state.isChangeSP && !this.props.isSP,
    });

    const infoCls = classnames({
      [styles.info]: true,
      [styles.isSuspended]: isSuspended,
    });

    const mhCls = classnames({
      [styles.mh]: true,
      [styles.changeHandicap]: isChangeHandicap,
    });

    return (
      <div className={infoCls}>
        <div className={hCls}>
          <div ref={ref => (this.mhref = ref)} className={mhCls}>
            <div className={styles.mh_title}>
              {title.map((v, k) => (
                <p key={k}>{v}</p>
              ))}
            </div>
            {!isSuspended && (
              <div
                style={!uiFromSlip ? left : {}}
                ref={ref => (this.changeOddsRef = ref)}
                onClick={isOpenChangeSP ? this.onShowOdds : undefined}
                className={oddCls}
              >
                <div className={odsCls}>
                  <span>{odds}</span>
                  {isOpenChangeSP && (
                    <div className={styles.hxl}>
                      <img src={require('../../../../assets/s02/xl.png')} alt="" />
                    </div>
                  )}
                </div>
                {isOpenChangeSP && (
                  <div className={styles.opts}>
                    {[propsOdds, 'SP'].map((v, k) => {
                      const optsItemCls = classnames({
                        [styles.opts_item_ac]: v === odds,
                      });
                      return (
                        <div
                          className={optsItemCls}
                          onClick={this.onChangeOdds.bind(this, v)}
                          key={`${v}_${k}`}
                        >
                          {v}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.p}>{playName}</div>
        <div className={styles.m}>{matchInfo}</div>
      </div>
    );
  }
}

export default BetInfoPanel;
