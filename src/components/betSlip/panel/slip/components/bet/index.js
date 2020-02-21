import React, { Component } from 'react';
import classnames from 'classnames';
import { formatMessage } from 'umi/locale';
import { isEmpty, get } from 'lodash';

import BetInfo from './betInfo';
import styles from './index.less';
import PassList from '../passList';
import QuickBetPanel from '@/components/quickBet';
const { KeyboardPanel } = QuickBetPanel;

class Bet extends Component {
  static defaultProps = {
    dataSource: [],
    onDelete: () => {},
    isEdit: false,
  };

  onChangeJp = (k, isShowKeyboard) => {
    const curKey = !isShowKeyboard ? `betSlips.${k}.isShowKeyboard` : '';
    window.g_app._store.dispatch({ type: 'betSlip/setCurrentKeyboardKey', curKey });
    this.props.onSetDataSource(`${k}.isShowKeyboard`, !isShowKeyboard, 'keyboard');
  };

  onCloseJp = k => {
    const curKey = '';
    window.g_app._store.dispatch({ type: 'betSlip/setCurrentKeyboardKey', curKey });
    this.props.onSetDataSource(`${k}.isShowKeyboard`, false, 'keyboard');
  };

  render() {
    const {
      dataSource,
      isEdit,
      onEmitChangeSP,
      minBetAmount,
      minBetLimitTxt,
      isAcceptChange,
      onDelete,
      currencySymbol,
      onChangeKeyboard,
      toReturnText,
      processPassLoading,
      passListDataSource,
      getStatus,
      prePassBetLimit,
      loaddingEffect,
      betUnit,
      orderMaxPayment,
      onSetRepeat,
    } = this.props;

    const isOneGroup = [...new Set(dataSource.map(v => v.matchId))].length === 1;
    const mapDataKeyMatch = dataSource.map(v => `${v.matchId}`);
    return (
      <div className={styles.contw}>
        {dataSource.map((v, k) => {
          const wrapCls = classnames({
            [styles.wrap]: true,
            [styles.showDel]: isEdit,
            [styles.paddingBtm]: v.isShowKeyboard,
          });

          const isGlHight =
            (!isEmpty(passListDataSource[v.groupType]) && !isOneGroup && v.passStatus === 0) ||
            (!isEmpty(prePassBetLimit) &&
              !isAcceptChange &&
              (v.repeatStatus && +v.passStatus === 1) &&
              !isEmpty(passListDataSource[v.groupType]));

          const isShowMinBet = +v.input && +v.input !== 0 && +v.input < minBetAmount;
          return (
            <div className={wrapCls} key={v.bettingSlipId}>
              <div className={styles.con}>
                <div className="bein">
                  {/* 有串关的情况下 出现相同比赛或者不支持串关 */}
                  {!isEmpty(passListDataSource[v.groupType]) &&
                    (mapDataKeyMatch.filter(strMatchKey => strMatchKey === `${v.matchId}`).length >
                      1 ||
                      isGlHight) && <span className="bein_span" />}
                  <BetInfo
                    value={v}
                    onDelete={onDelete}
                    isEdit={isEdit}
                    isShowMinBet={isShowMinBet}
                    minBetLimitTxt={
                      <div className={styles.minBetLimitTxt}>
                        {minBetLimitTxt} {currencySymbol} {(+minBetAmount).toFixed(2)}
                      </div>
                    }
                    toReturnText={toReturnText}
                    onEmitChangeSP={onEmitChangeSP}
                    isAcceptChange={isAcceptChange}
                    placeholder={
                      +v.noteCount === 1
                        ? formatMessage({ id: 'Wiki.0102' })
                        : formatMessage({ id: 'Wiki.0094' })
                    }
                    onChangeEW={isEW => {
                      this.props.onSetDataSource(`${k}.isEW`, isEW);
                    }}
                    onChangeJp={this.onChangeJp.bind(this, k, v.isShowKeyboard)}
                    onChangeOdds={odds => {
                      this.props.onSetDataSource(`${k}.isSP`, odds === 'SP');
                    }}
                    {...v}
                  />
                  {v.isShowKeyboard && (
                    <KeyboardPanel
                      betUnit={betUnit}
                      type="simple"
                      onChange={value => {
                        this.props.onSetDataSource(`${k}.prevInput`, v.input);
                        this.props.onSetDataSource(`${k}.input`, value);
                      }}
                      doneText={formatMessage({ id: 'Wiki.0101' })}
                      disabled={v.inputDisabled}
                      onDoneFun={value => {
                        this.props.onSetDataSource(
                          `${k}.input`,
                          value ? (+value).toFixed(2) : v.input
                        );
                        this.onCloseJp(k);
                      }}
                    />
                  )}
                </div>
              </div>
              {isEmpty(prePassBetLimit) && isEmpty(passListDataSource[v.groupType])
                ? // || processPassLoading
                  null
                : +v.flag === 1 && (
                    <PassList
                      onSetRepeat={onSetRepeat}
                      orderMaxPayment={orderMaxPayment}
                      betUnit={betUnit}
                      isGlHight={isGlHight}
                      getStatus={getStatus}
                      minBetLimitTxt={minBetLimitTxt}
                      currencySymbol={currencySymbol}
                      toReturnText={toReturnText}
                      minBetAmount={minBetAmount}
                      groupType={v.groupType}
                    />
                  )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Bet;
