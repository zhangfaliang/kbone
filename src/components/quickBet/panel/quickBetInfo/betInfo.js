import React, { Component } from 'react';
import classnames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import contains from 'rc-util/lib/Dom/contains';
import { findDOMNode } from 'react-dom';
import styles from './index.less';

class QuickBetInfo extends Component {
  state = {
    value: false,
    changeOdds: false,
    odds: '',
    isChangeSP: false,
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
    if (props.isStateSP !== this.props.isStateSP) {
      this.setState({
        odds: this.props.isStateSP ? 'SP' : this.props.odds,
      });
    }
    if (props.visabled !== this.props.visabled && this.props.visabled) {
      this.setState({
        value: false,
        changeOdds: false,
        odds: '',
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
      props.originalContent === this.props.originalContent &&
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
      onDelete,
      isEW,
      odds: propsOdds,
      title,
      onChangeEW,
      isOpenChangeSP,
      playName,
      isOpenEW,
      EWInfo,
      isSP,
      matchInfo,
      isSuspended,
      isShowBetReturn,
      betTotalReturn,
      ishandicapChange,
    } = this.props;
    const { odds } = this.state;
    const activeClas = classnames({
      [styles.active]: isEW,
    });

    const oddCls = classnames({
      [styles.oddChCls]: true,
      [styles.oddChange]: this.state.changeOdds,
    });

    const odsCls = classnames({
      [styles.ods]: true,
      [styles.isChangeSP]: this.state.isChangeSP && !isSP,
    });

    const wrap_infoCls = classnames({
      [styles.wrap_info]: true,
      [styles.isSuspended]: isSuspended,
    });

    const titleCls = classnames({
      [styles.title]: true,
      [styles.handicapChange]: ishandicapChange,
    });

    return (
      <>
        <div className={styles.wrap_content}>
          <div className={wrap_infoCls}>
            <div className={styles.wrap_info_title}>
              <div className={titleCls}>{title.map(v => v)}</div>
              {!isSuspended && (
                <div
                  ref={ref => (this.changeOddsRef = ref)}
                  onClick={isOpenChangeSP ? this.onShowOdds : undefined}
                  className={styles.odds}
                >
                  <div className={oddCls}>
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
                        {[propsOdds, 'SP'].map((vv, kk) => {
                          const optsItemCls = classnames({
                            [styles.opts_item_ac]: vv === odds,
                          });
                          return (
                            <div
                              onClick={this.onChangeOdds.bind(this, vv)}
                              className={optsItemCls}
                              key={kk}
                            >
                              {vv}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className={styles.clear} />
            </div>
            <div className={styles.wrap_info_playName}>{playName}</div>
            <div className={styles.wrap_info_matchInfo}>{matchInfo}</div>
          </div>
          {!isSuspended ? (
            <div
              className={styles.close}
              onClick={() => {
                onDelete(this, this.props);
              }}
            >
              <img src={require('../../../../assets/s02/fb-close.png')} alt="" />
            </div>
          ) : (
            'Suspend'
          )}
        </div>
        {!isSuspended && isOpenEW && (
          <div className={styles.EwCls}>
            <div
              onClick={() => {
                // this.setState({
                //   value: !this.state.value,
                // });
                onChangeEW(!isEW);
              }}
              className={styles.EwshowCls}
            >
              <span className={activeClas} />
              E/W {EWInfo}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default QuickBetInfo;
