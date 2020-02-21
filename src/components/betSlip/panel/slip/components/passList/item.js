import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi/locale';
import classnames from 'classnames';
import { reduce, isEmpty } from 'lodash';
import QuickBetPanel from '@/components/quickBet';
import NP from 'number-precision';
import Modal from './modal';
import { HORSE_SPORT_TYPE_REG } from '@/constants/game-config';

import styles from './index.less';

const { KeyboardPanel } = QuickBetPanel;

const Item = props => {
  const {
    name,
    onSetValue,
    betSlipGroup,
    groupType,
    value,
    passMList,
    noteCount,
    isOpenKeyboard: changeInputKeyword,
    onChangeKeyboard,
    abbrName,
    currentKey,
    isSingles,
    passN,
    passM,
    onSetIsEW,
    isEW,
    onSet,
    toReturnText,
    onEffectPassListAmount,
    showAll,
    isOneLight,
    filterM,
    effectiveAmount,
    minBetLimitTxt,
    currencySymbol,
    minBetAmount,
    forderId,
    passDetail,
    betUnit,
    orderMaxPayment,
  } = props;
  const [inputValue, setInputValue] = useState(value || 0);
  const [inputPrveValue, setInputPrveValue] = useState(value || 0);
  const [showMXN, setShowMXN] = useState(false);
  const newNoteCount = isEW ? NP.strip(+noteCount * 2) : noteCount;
  useEffect(
    () => {
      setInputPrveValue(inputValue);
      onEffectPassListAmount();
      return () => {
        setInputPrveValue(null);
      };
    },
    [noteCount]
  );

  const empty = !inputValue;
  // 是否展示placeholder
  const showPlaceholder = empty && !changeInputKeyword;
  const placeholder =
    +newNoteCount === 1 || isSingles
      ? formatMessage({ id: 'Wiki.0102' })
      : formatMessage({ id: 'Wiki.0094' });
  const emptyCls = changeInputKeyword && inputPrveValue === inputValue;

  // 计算串1的赔率
  const currentBetSlip = betSlipGroup[groupType];
  const isSP = currentBetSlip.findIndex(v => v.isSP) > -1;

  // 计算串1是否支持EW串关
  let isOpenEWBetSlips = currentBetSlip.filter(v => HORSE_SPORT_TYPE_REG.test(v.sportType));
  const isOpenEWSplis = [...new Set(isOpenEWBetSlips.map(v => !!v.ewContent))];
  let isSew = false;
  isOpenEWSplis.forEach(v => {
    if (v) {
      isSew = true;
      return;
    }
  });
  const isShowEW = !isEmpty(isOpenEWBetSlips) && isSew && +groupType === 1;
  const x1Odds = currentBetSlip.map(v => v.odds);

  const inputCls = classnames({
    [styles.input]: true,
    [styles.placeholder]: showPlaceholder,
    [styles.focus]: changeInputKeyword,
    [styles.empty]: emptyCls,
  });

  const activeClas = classnames({
    [styles.active]: isEW,
  });

  const isOpenModalMXN = noteCount > 1;
  let oddsTrans =
    (!isSP &&
      noteCount === 1 &&
      abbrName === `${passMList.length}X1` &&
      groupType === 1 &&
      reduce(passDetail[0].odds, (a, b) => NP.strip(a * b)) + '') ||
    '';

  const odds =
    oddsTrans.indexOf('.') > -1 ? oddsTrans.substring(0, oddsTrans.indexOf('.') + 3) : oddsTrans;

  const isOneShow = `${passMList}X1` === abbrName;

  const itemCls = classnames({
    [styles.item]: true,
    [styles.hide]: !showAll && (isOneShow ? !isOneShow : isOneLight),
    [styles.changeInputKeyword]: changeInputKeyword,
  });

  return (
    <>
      <div className={itemCls}>
        <div className={styles.item_info}>
          <div className={styles.info}>
            <div className={styles.info_top}>
              <div
                onClick={
                  !isOpenModalMXN
                    ? () => {}
                    : () => {
                        setShowMXN(!showMXN);
                      }
                }
                className={styles.info_top_title}
              >
                {name}
                {isOpenModalMXN && <span />}
              </div>
              <div className={styles.info_top_odds}>{odds || `${newNoteCount}X`}</div>
            </div>
            {!isSingles && isShowEW && (
              <div className={styles.info_bottom}>
                <div
                  onClick={() => {
                    onSetIsEW({
                      key: currentKey,
                      value: !isEW,
                      amount: NP.strip(inputValue * newNoteCount),
                    });
                  }}
                  className={styles.e}
                >
                  <span className={activeClas} /> E/W
                </div>
              </div>
            )}
          </div>
          <div>
            <div
              className={inputCls}
              data-value={!value ? '0.00' : parseFloat(value).toFixed(2)}
              onClick={() => {
                onChangeKeyboard(currentKey, !changeInputKeyword, 'input');
              }}
            >
              {showPlaceholder
                ? placeholder
                : !emptyCls && (!changeInputKeyword ? parseFloat(value).toFixed(2) : value)}
            </div>
            {odds && !isEW && (
              <div className={styles.returnCls}>
                {toReturnText}{' '}
                {parseFloat(orderMaxPayment) > parseFloat(NP.strip(value * newNoteCount * odds))
                  ? parseFloat(NP.strip(value * newNoteCount * odds).toFixed(2)) || '0.00'
                  : orderMaxPayment.toFixed(2)}
              </div>
            )}
          </div>
        </div>
        {value && +value !== 0 && parseFloat(value) < parseFloat(minBetAmount) ? (
          <div className={styles.minBetLimitTxt}>
            <img src={require('../../../../../../assets/horse/warning@3x.png')} alt="" />{' '}
            {minBetLimitTxt} {`${currencySymbol} ${parseFloat(minBetAmount).toFixed(2)}`}
          </div>
        ) : null}
        {changeInputKeyword && (
          <div className={styles.itemKeyword}>
            <KeyboardPanel
              type="simple"
              isFFF
              betUnit={betUnit}
              onChange={value => {
                onSetValue({
                  key: `${currentKey}`,
                  value: {
                    amount: value,
                    isSingles,
                    forderId,
                  },
                });
                setInputPrveValue(null);
                setInputValue(value);
              }}
              doneText={formatMessage({ id: 'Wiki.0101' })}
              // disabled={}
              onDoneFun={value => {
                onChangeKeyboard(currentKey, false, 'done');
              }}
            />
          </div>
        )}
      </div>
      {showMXN ? (
        <Modal
          visible={showMXN}
          title={`${formatMessage({ id: 'Wiki.0123' })} - ${name}`}
          passMList={passMList}
          passN={passN}
          passM={passM}
          onPress={() => {
            setShowMXN(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Item;
