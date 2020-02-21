import React, { Component } from 'react';
import classnames from 'classnames';
import Button from '../button';
import styles from './index.less';

class BetInput extends Component {
  static COMPONENT_NAME = 'BETINPUT';
  constructor(props) {
    super(props);
  }

  handleAllIn = ({ activeFlag }) => {
    const { handleAllIn } = this.props;
    handleAllIn(activeFlag);
  };
  handleFillIn = ({ activeFlag }) => {
    const { handleFillIn } = this.props;
    handleFillIn(activeFlag);
  };
  handleBet = ({ activeFlag }) => {
    const { handleBet } = this.props;
    handleBet(activeFlag);
  };
  handleFocusInput = e => {
    e.stopPropagation();
    const { focusInput } = this.props;
    focusInput();
  };

  render() {
    const {
      perfixCls,
      betAmount,
      amountSuffix,
      possibleWin,
      betDisabled,
      focusInput,
      allAmount,
      allInDisabled,
      fillInDisabled,
      isAllInActive,
      isFillInActive,
      isBetBtnActive,
      fillAmount,
      possibleWinText,
      betText,
      bottomText,
      allInBetText,
      maxStakeBetText,
    } = this.props;
    const clsName = styles[`${perfixCls}-input`];
    const amountCls = classnames({
      [styles.betAmount]: true,
      [styles.amountDisabled]: betAmount == 0,
    });

    const fillAmountCls = classnames({
      [styles.maxstake]: true,
      [styles.fillAmountDisabled]: fillInDisabled,
    });

    return (
      <div
        className={clsName}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className={styles.inputWrap} onClick={this.handleFocusInput}>
          <div className={styles.input}>
            <span className={amountCls}>{betAmount}</span>
            <span className={styles.amountSuffix}>{amountSuffix}</span>
          </div>
          <div className={styles.possibleWinWrap}>
            <span>{possibleWinText}</span>
            <span>
              {possibleWin}
              {` ${amountSuffix}`}
            </span>
          </div>
        </div>
        {Number(allAmount) > Number(fillAmount) && (
          <div
            className={styles.fillAmount}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Button
              active={isFillInActive}
              disabled={fillInDisabled}
              type="Max Stake"
              clickCheckBtn={this.handleFillIn}
              btnText={maxStakeBetText}
              prefixCls="max-stake"
              bottomText={fillAmount}
            />
          </div>
        )}
        {Number(allAmount) <= Number(fillAmount) && (
          <Button
            active={isFillInActive}
            disabled={allInDisabled}
            type="All-in"
            clickCheckBtn={this.handleAllIn}
            btnText={allInBetText}
            prefixCls="all-in"
          />
        )}
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Button
            active={isBetBtnActive}
            disabled={betDisabled}
            type="Bet"
            clickCheckBtn={this.handleBet}
            btnText={betText}
            prefixCls="bet"
            bottomText={bottomText}
          />
        </div>
      </div>
    );
  }
}
BetInput.defaultProps = {
  perfixCls: 'default',
  betAmount: '0',
  amountSuffix: 'EUR',
  possibleWin: '0',
  allAmount: '0',
  fillAmount: '0',
  possibleWinText: '',
  allInBetText: '',
  maxStakeBetText: '',
  betText: '',
  bottomText: '',
  betDisabled: false,
  fillInDisabled: false,
  allInDisabled: false,
  isFillInActive: false,
  isAllInActive: false,
  isBetBtnActive: false,

  handleAllIn: () => {
    console.log('handleAllIn---');
    return 'handleAllIn';
  },
  handleFillIn: () => {
    console.log('handleFillIn---');
    return 'handleFillIn';
  },

  handleBet: betInfo => {
    console.log('handleBet---', betInfo);
    return 'handleBet';
  },
  focusInput: () => {
    console.log('focusInput---');
    return 'focusInput';
  },
  handleInputChange: value => {
    console.log('handleInputChange---', value);
    return 'handleInputChange';
  },
};
export default BetInput;
