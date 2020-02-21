import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
class HorseRaceBetButton extends Component {
  static COMPONENT_NAME = 'HORSERACEBETBTN';

  state = {
    isActive: this.props.isActive,
    isErrorSelect: false,
  };
  // static getDerivedStateFromProps(props, state) {
  //   if(props.isActive!=state.isActive){
  //     console.log(props.isActive,state.isActive)
  //     return{
  //       isActive:props.isActive
  //     }
  //   }
  //   return null
  // }
  shouldComponentUpdate(nextProps) {
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isActive: nextProps.isActive,
      });
    }
    return true;
  }
  handleClick = () => {
    const {
      optionName,
      optionId,
      title,
      odds,
      selectBetBtn,
      betLimit,
      isAny,
      bettingSlipId,
      handicap,
      playtypeCode,
      playtypeName,
      forceNoHighlighting,
    } = this.props;
    if (forceNoHighlighting) {
      selectBetBtn({
        optionName,
        optionId,
        title,
        odds,
        betLimit,
        isActive: !this.state.isActive,
        isAny,
        bettingSlipId,
        handicap,
        playtypeCode,
        playtypeName,
      });
    } else {
      this.setState({ isActive: !this.state.isActive }, () => {
        selectBetBtn({
          optionName,
          optionId,
          title,
          odds,
          betLimit,
          isActive: this.state.isActive,
          isAny,
          bettingSlipId,
          handicap,
          playtypeCode,
          playtypeName,
        });
      });
    }
  };

  render() {
    const {
      className,
      historySp,
      prefixCls,
      title,
      odds,
      disabled,
      isHide,
      isErrorSelect,
      showOdds,
      showBetText,
    } = this.props;
    const clsStr = classnames(className, {
      [styles[`${prefixCls}-horse-race-bet-btn`]]: true,
      [styles.isActive]: this.state.isActive,
      [styles.disabled]: disabled,
      [styles.isHide]: isHide,
      [styles.isErrorSelect]: isErrorSelect,
    });
    return (
      <div className={clsStr} onClick={this.handleClick}>
        {showBetText && <span className={styles.betText}>{isHide ? '-' : title}</span>}
        {showOdds && <span className={styles.odds}>{!isHide && odds}</span>}
        {!isHide && historySp.length > 0 ? (
          <div className={styles.historySp}>
            {historySp.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
HorseRaceBetButton.defaultProps = {
  prefixCls: 'middle',
  className: '',
  optionName: '',
  optionId: '',
  playtypeCode: '',
  playtypeName: '',
  title: '',
  betLimit: '',
  odds: '',
  handicap: '',
  historySp: [],
  disabled: false,
  bettingSlipId: '',
  isErrorSelect: false,
  isHide: false,
  showOdds: true,
  showBetText: false,
  forceNoHighlighting: false,
  selectBetBtn: betInfo => {
    console.log(betInfo);
    return 'selectBetBtn';
  },
};

export default HorseRaceBetButton;
