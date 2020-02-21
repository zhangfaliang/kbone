import React, { Component } from 'react';
import classnames from 'classnames';
import { Button } from '../../../form';
import styles from './index.less';

class InputPanel extends Component {
  static defaultProps = {
    isShowBetMax: false,
    isEW: false,
    currencyType: '',
    value: 0,
    maxLength: 7,
    onOpenKeyboard: () => {},
    onResetValue: () => {},
  };

  state = {
    fbAmount: 0,
  };

  render() {
    const {
      isShowBetMax,
      isEW,
      onOpenKeyboard,
      isFocus,
      value,
      placeholder,
      spareValue,
      currencyType,
      toReturnText,
      maxLength,
      betSlipsDisabledBet,
      betSlipsAoumt,
      onSetDataSource,
      isShowBetReturn,
      betTotalReturn,
      amount: currentAmount,
      minBetAmount,
      minBetLimitTxt,
      isAcceptChange,
      onAcceptChange,
      spChangeTxt,
      onBetSlipBet,
      changeSP,
      isSuspended,
      betText,
      acceptChangeText,
      noteCount,
      input,
      currencySymbol,
      totalStakeText,
      isSP,
      ishandicapChange,
    } = this.props;
    // 是否展示placeholder
    const showPlaceholder = (input === '' || +input === 0) && !isFocus;
    let showValueMark = false;
    if (isFocus) {
      if (input === '' || input === 0) {
        showValueMark = true;
      } else {
        if (spareValue === input) {
          showValueMark = true;
        }
      }
    }

    const amount = showValueMark ? null : !isFocus ? (+input).toFixed(2) : input;

    const inputCls = classnames({
      [styles.input]: true,
      [styles.focus]: isFocus,
      [styles.placeholder]: showPlaceholder,
      [styles.valueMark]: showValueMark,
      // [styles.maxl]: (amount && amount.length >= maxLength) || spareValue.length >= maxLength,
    });

    const isShowMinBet = +input && +input !== 0 && +input < minBetAmount;

    return (
      <>
        {(changeSP || ishandicapChange) && <div className={styles.warnCls}>{spChangeTxt}</div>}
        <div className={styles.wrap}>
          <div
            className={styles.inputWrap}
            onClick={
              isSuspended
                ? () => {}
                : () => {
                    onOpenKeyboard();
                  }
            }
          >
            <span className={styles.symbol}>{!showPlaceholder && currencySymbol}</span>
            <div
              className={inputCls}
              data-value={isNaN(+spareValue) ? '0.00' : (+spareValue).toFixed(2)}
            >
              {!showPlaceholder ? (isNaN(amount) ? '0.00' : amount) : placeholder}
            </div>
            <div className={styles.exec}>
              {isEW && <div className={styles.x2}>X{noteCount}</div>}
            </div>
          </div>
          {isShowBetMax && (
            <Button
              onClick={() => {
                onSetDataSource('0.input', this.props.maxAmount);
                this.setState({
                  fbAmount: 0,
                });
              }}
              disabled={isSuspended || +value === +this.props.maxAmount}
              disabledCls={styles.disabled}
              className={styles.ew}
            >
              最大
            </Button>
          )}
          {isAcceptChange ? (
            <Button onClick={onAcceptChange} shape="square" className={styles.button}>
              {acceptChangeText}
            </Button>
          ) : (
            <Button
              onClick={onBetSlipBet}
              disabled={
                betSlipsDisabledBet ||
                parseFloat(currentAmount) === 0 ||
                currentAmount === 'NaN' ||
                parseFloat(input || 0) <= 0 ||
                isShowMinBet
              }
              className={styles.button}
              disabledCls={styles.disabled}
              activeClassName
            >
              <div>{betText}</div>
              {/* 勾选EW全部显示总金额， 不勾选EW 选择SP什么都不展示， 选择赔率显示预计返还 */}
              {isShowMinBet ||
              +currentAmount === 0 ||
              currentAmount === 'NaN' ? null : +currentAmount !== 0 && !isEW ? (
                isSP ? null : (
                  <div className={styles.r}>
                    {toReturnText} {betTotalReturn}
                  </div>
                )
              ) : (
                <div className={styles.r}>
                  {totalStakeText} {currentAmount}
                </div>
              )}
            </Button>
          )}
        </div>
        {isShowMinBet ? (
          <div className={styles.isMinBetCls}>
            {minBetLimitTxt}
            {` ${currencySymbol || ''} ${(+minBetAmount).toFixed(2)}`}
          </div>
        ) : (
          ''
        )}
        <div className={styles.fb_amount}>
          {[100, 200, 500, 1000, 2000, 5000].map((v, k) => {
            let fbAmountActionCls = classnames({
              [styles.active]: this.state.fbAmount === v,
            });
            return (
              <span
                className={fbAmountActionCls}
                onClick={() => {
                  this.setState({
                    fbAmount: v,
                  });
                  onSetDataSource('0.input', v);
                }}
                key={`fb_amount${k}`}
              >
                {currencySymbol}
                {v}
              </span>
            );
          })}
        </div>
      </>
    );
  }
}

export default InputPanel;
