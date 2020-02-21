import React, { Component } from 'react';
import classnames from 'classnames';
import { formatMessage } from 'umi/locale';
import styles from './index.less';
import NP from 'number-precision';
import { Button } from '@/components/form';
import { Label, Bet } from './components';

class SlipPanel extends Component {
  state = {
    changeSP: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.visible) {
      document.getElementById('root').style.overflow = 'hidden';
    } else {
      document.getElementById('root').style.overflow = '';
    }
  }

  renderRemoveAll = () => {
    return (
      <div
        className={styles.remoAll}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          this.props.onRemoveAll();
        }}
      >
        {formatMessage({ id: 'Wiki.0111' })}
      </div>
    );
  };

  render() {
    const {
      visible,
      onClose,
      onSetDataSource,
      dataSource,
      betSlipsDisabledBet,
      betSlipsAoumt,
      isLogin,
      loginRender,
      noLoginRender,
      currencyType,
      onRemoveItem,
      onChangeEdit,
      isEdit,
      isAcceptChange,
      onAcceptChange,
      onBetSlipBet,
      minBetAmount,
      minBetLimitTxt,
      spChangeTxt,
      toReturnText,
      betText,
      betSlipsBetRenturnAmount,
      onTestBet,
      currencySymbol,
      passSlipsAmount,
      pendingWS,
      processPassLoading,
      passListDataSource,
      getStatus,
      prePassBetLimit,
      loaddingEffect,
      passDisabledBet,
      processBetSlips,
      onSetAcceptChange,
      betUnit,
      orderMaxPayment,
      isChangeOdds,
      onSetIsChangeOdds,
      onSetRepeat,
      passRepeat,
    } = this.props;

    // 投注单盘口添加提示语
    const ishandicapChange = dataSource.findIndex(v => v.ishandicapChange) > -1;

    const popCls = classnames({
      [styles.popupCls]: true,
      [styles.visible]: visible,
    });

    const markCls = classnames({
      [styles.mark]: true,
      [styles.visible]: visible,
    });

    const amountResult = parseFloat(
      NP.strip(parseFloat(betSlipsAoumt) + parseFloat(passSlipsAmount || '0'))
    );

    return processBetSlips && pendingWS ? null : (
      <div className={popCls}>
        <div className={markCls} />
        <div className={styles.modalBody}>
          {visible && (
            <div className={styles.doc}>
              <Label
                isEdit={isEdit}
                className={styles.label}
                title={formatMessage({ id: 'Wiki.0097' })}
                desc={
                  isEdit ? (
                    <>
                      {this.renderRemoveAll()}
                      {formatMessage({ id: 'Wiki.0101' })}
                    </>
                  ) : (
                    formatMessage({ id: 'Wiki.0112' })
                  )
                }
                onChangeEdit={isEdit => {
                  onChangeEdit(isEdit);
                }}
                betCount={dataSource.length}
                isLogin={isLogin}
                loginRender={loginRender}
                noLoginRender={noLoginRender}
                onClose={onClose}
              />
              <div className={styles.content}>
                <Bet
                  onSetRepeat={onSetRepeat}
                  orderMaxPayment={orderMaxPayment}
                  loaddingEffect={loaddingEffect}
                  prePassBetLimit={prePassBetLimit}
                  getStatus={getStatus}
                  passListDataSource={passListDataSource}
                  processPassLoading={processPassLoading}
                  currencySymbol={currencySymbol}
                  onTestBet={onTestBet}
                  minBetAmount={minBetAmount}
                  minBetLimitTxt={minBetLimitTxt}
                  toReturnText={toReturnText}
                  isAcceptChange={isAcceptChange}
                  isEdit={isEdit}
                  dataSource={dataSource}
                  onSetDataSource={onSetDataSource}
                  onDelete={v => {
                    onRemoveItem(v);
                  }}
                  betUnit={betUnit}
                  onEmitChangeSP={change => {
                    onSetIsChangeOdds(change);
                    onSetAcceptChange(change);
                  }}
                />
              </div>
              <div className={styles.footer}>
                {passRepeat && (
                  <div className={styles.repeatCls}>
                    <span />
                    <div>{formatMessage({ id: 'Wiki.0126' })}</div>
                  </div>
                )}
                {(isChangeOdds || ishandicapChange) && (
                  <div className={styles.warning}>{spChangeTxt}</div>
                )}
                <div className={styles.footer_btn}>
                  {isAcceptChange ? (
                    <Button onClick={onAcceptChange.bind(this, 'removeBatch')} shape="square">
                      {formatMessage({ id: 'Wiki.0104' })}
                    </Button>
                  ) : (
                    <Button
                      onClick={onBetSlipBet}
                      disabled={
                        processBetSlips ||
                        (parseFloat(minBetAmount) > parseFloat(amountResult) ||
                          (betSlipsDisabledBet || passDisabledBet))
                      }
                      shape="square"
                      disabledCls={styles.disabled}
                    >
                      <div className={styles.btnCls}>{betText}</div>
                      {!processBetSlips && parseFloat(amountResult) !== 0 && (
                        <>
                          <span>
                            {currencySymbol}
                            {amountResult.toFixed(2)}
                          </span>
                        </>
                      )}
                      {/* {isBetSlipNotSp && !betSlipsDisabledBet && (
                      <div>
                        {toReturnText}
                        <span>{betSlipsBetRenturnAmount}</span>
                      </div>
                    )} */}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SlipPanel;
