import React, { useState } from 'react';
import classnames from 'classnames';
import { throttle } from 'lodash';
import { BetPanel } from '@/components/quickBet/panel';

import styles from './index.less';
const BetInfo = BetPanel.BetInfo;

BetInfoWrap.defaultProps = {
  maxLength: 10,
};

function BetInfoWrap({
  title,
  odds,
  isAcceptChange,
  onChangeJp,
  playName,
  matchInfo,
  onChangeOdds,
  EWInfo,
  isSP,
  onChangeEW,
  input,
  placeholder,
  isShowKeyboard,
  noteCount,
  maxLength,
  betTotalReturn,
  isEW,
  isOpenEW,
  isShowBetReturn,
  isStateSP,
  onDelete,
  isOpenChangeSP,
  isSuspended,
  onEmitChangeSP,
  toReturnText,
  handicap,
  ishandicapChange,
  isEdit,
  value,
  isShowMinBet,
  minBetLimitTxt,
}) {
  const activeClas = classnames({
    [styles.active]: isEW,
  });

  // 是否展示placeholder
  const showPlaceholder = input === '0.00' || (!input && !isShowKeyboard);
  // 是否展示注数
  const showNoteCount = noteCount && noteCount !== 1 && input;

  // 计算奖金
  const inputCls = classnames({
    [styles.input]: true,
    [styles.placeholder]: showPlaceholder,
    [styles.focus]: isShowKeyboard,
    [styles.empty]: !input && isShowKeyboard,
    [styles.maxl]: input && input.length >= maxLength,
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.a}>
        <BetInfo
          isAcceptChange={isAcceptChange}
          uiFromSlip
          title={title}
          odds={odds}
          playName={playName}
          matchInfo={matchInfo}
          onChangeOdds={onChangeOdds}
          isOpenChangeSP={isOpenChangeSP}
          isStateSP={isStateSP}
          handicap={handicap}
          isSP={isSP}
          isSuspended={isSuspended}
          emitChangeSP={onEmitChangeSP}
          ishandicapChange={ishandicapChange}
        />

        {isEdit ? (
          <div className={styles.del}>
            <img
              onClick={() => {
                onDelete(value);
              }}
              src={require('../../../../../../../assets/s02/delete.png')}
              alt=""
            />
          </div>
        ) : isSuspended ? (
          <div className={styles.isSuspended}>Suspend</div>
        ) : (
          <div className={styles.ia}>
            <div data-value="0.00" onClick={onChangeJp} className={inputCls}>
              {showPlaceholder ? placeholder : input}
              {showNoteCount && <span>{noteCount}X</span>}
            </div>
            {isShowMinBet
              ? minBetLimitTxt
              : isShowBetReturn && (
                  <div className={styles.r}>
                    {toReturnText} {betTotalReturn || '0.00'}
                  </div>
                )}
          </div>
        )}
      </div>
      {!isSuspended && isOpenEW && (
        <div className={styles.b}>
          <div
            onClick={() => {
              onChangeEW(!isEW);
            }}
            className={styles.e}
          >
            <span className={activeClas} /> E/W {EWInfo}
          </div>
        </div>
      )}
    </div>
  );
}

export default BetInfoWrap;
