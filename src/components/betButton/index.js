import React, { Component } from 'react';
import classnames from 'classnames';
import IconFont from '../iconFont';
import styles from './index.less';
class BetButton extends Component {
  static COMPONENT_NAME = 'BETBUTTON';
  constructor(props) {
    super(props);
    this.upNode = React.createRef();
    this.downNode = React.createRef();
    this.state = {
      activeFlag: props.isActive,
    };
  }
  flickerSp = ({ node, oldClassName, newClassName }) => {
    //todo 暂时使用不太恰当的处理
    node.className = oldClassName;
    setTimeout(() => {
      node.className = newClassName;
    }, 80);
  };

  componentDidUpdate = (prevProp, prevState) => {
    const {
      changeSp,
      changeHandicap,
      optionId,
      odds,
      handicap,
      optionName,
      betLimit,
      betHandicap,
      isActive,
      alternative,
    } = this.props;
    const { up, down, flickerSp, default_chang_sp } = styles;

    if (prevProp.isActive !== this.props.isActive) {
      this.setState({ activeFlag: this.props.isActive });
    }
    if (
      prevProp.odds !== this.props.odds &&
      alternative === prevProp.alternative &&
      optionId === this.props.optionId
    ) {
      changeSp({
        optionId,
        odds,
        handicap,
        optionName,
        betLimit,
        betHandicap,
        isActive,
      });
      if (this.props.odds > prevProp.odds) {
        this.flickerSp({
          node: this.upNode.current,
          oldClassName: default_chang_sp,
          newClassName: `${up} ${flickerSp}`,
        });
      } else if (this.props.odds < prevProp.odds) {
        // 下降
        this.flickerSp({
          node: this.downNode.current,
          oldClassName: default_chang_sp,
          newClassName: `${down} ${flickerSp}`,
        });
      }
    }
    if (prevProp.handicap !== this.props.handicap)
      changeHandicap({
        optionId,
        odds,
        handicap,
        optionName,
        betLimit,
        betHandicap,
        isActive,
      });
  };

  handleBetBtn = event => {
    event.preventDefault();
    const target = event.target;
    const {
      clickBetBtn,
      betHandicap,
      odds,
      optionId,
      disabled,
      optionName,
      betLimit,
      bettingSlipId,
      forceNoHighlighting,
      handicap,
      alternative,
    } = this.props;
    if (!disabled) {
      if (forceNoHighlighting) {
        clickBetBtn({
          optionId,
          odds,
          betHandicap,
          optionName,
          betLimit,
          bettingSlipId,
          isActive: !this.state.activeFlag,
          handicap,
          alternative,
        });
      } else {
        this.setState({ activeFlag: !this.state.activeFlag }, () => {
          clickBetBtn({
            optionId,
            odds,
            betHandicap,
            optionName,
            betLimit,
            bettingSlipId,
            isActive: this.state.activeFlag,
            alternative,
            handicap,
          });
        });
      }
    }
  };

  render() {
    const { odds, prefixCls, disabled, optionName, handicap, isDetail } = this.props;
    const betBtnClsStr = `${prefixCls || 'default'}-bet-button`;
    const betBtnCls = classnames({
      [styles[betBtnClsStr]]: true,
      [styles['disabled']]: disabled,
      [styles['active']]: this.state.activeFlag,
    });
    return (
      <div className={betBtnCls} onClick={this.handleBetBtn}>
        <span ref={this.upNode} className={styles.up}>
          <IconFont type="sheng" />
        </span>
        <span ref={this.downNode} className={styles.down}>
          <IconFont type="jiang" />
        </span>
        {optionName && isDetail && (
          <div className={styles.wrapOptionName}>
            <span className={styles.optionName}>{optionName}</span>
          </div>
        )}
        {handicap && !isDetail ? (
          <div className={styles.wrapHandicap}>
            <span>{handicap}</span>
          </div>
        ) : (
          ''
        )}
        <div className={styles.wrapSp}>
          {disabled ? (
            <span className={styles.lock}>
              {' '}
              <IconFont type="lock" />
            </span>
          ) : (
            <span className={styles.sp}>{odds}</span>
          )}
        </div>
      </div>
    );
  }
}
BetButton.defaultProps = {
  prefixCls: 'default', // css 前缀  目前 default detail medium small large
  disabled: false,
  optionId: '',
  defaultActive: false,
  isActive: false,
  handicap: '',
  odds: '',
  optionName: '',
  betHandicap: '',
  isDetail: true,
  betLimit: 0,
  bettingSlipId: '',
  forceNoHighlighting: false,
  clickBetBtn: params => {
    return 'clickBetBtn';
  },
  changeSp: () => {
    console.log('changeSp');
  },
  changeHandicap: () => {
    console.log('changeHandicap');
  },
  timeout: 1000,
  stopTime: 5000,
};
export default BetButton;
