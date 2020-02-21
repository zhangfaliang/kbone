import React, { memo, useState, useEffect } from 'react';
import values from 'lodash/values';
import { formatMessage } from 'umi/locale';
import { get, groupBy, isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';
import { makeSelectPassInfo, selectLoadingEffects } from '../../../../../../selector/passList';
import Item from './item';

import styles from './index.less';

import { connect } from 'dva';
import withRouter from 'umi/withRouter';

const mapStateToProps = createStructuredSelector({
  passInfo: makeSelectPassInfo(),
  loadingEffects: selectLoadingEffects,
});
const mapDispatchToProps = dispatch => ({
  setData: payload => dispatch({ type: 'global_pass/setDataKey', payload }),
  onSetValue: payload => dispatch({ type: 'global_pass/onSetValue', payload }),
  onSetIsEW: payload => dispatch({ type: 'global_pass/onSetIsEW', payload }),
  onSet: payload => dispatch({ type: 'global_pass/set', payload }),
  onChangeKeyboard: (key, isOpenKeyboard, source) =>
    dispatch({ type: 'global_pass/onChangeKeyboard', key, isOpenKeyboard, source }),
  onEffectPassListAmount: () => dispatch({ type: 'global_pass/onEffectPassListAmount' }),
});

const PassList = props => {
  const {
    set,
    passInfo,
    toReturnText,
    onSet,
    onSetValue,
    onSetIsEW,
    onChangeKeyboard,
    groupType,
    loadingEffects,
    onEffectPassListAmount,
    minBetLimitTxt,
    minBetAmount,
    currencySymbol,
    getStatus,
    isGlHight,
    betUnit,
    orderMaxPayment,
    onSetRepeat,
  } = props;
  const [showAll, setShowAll] = useState(false);
  const { passGroup, pendingWS, groupPassList, betSlipGroup } = passInfo;

  if (isEmpty(passGroup)) {
    return <RepeatCls onSetRepeat={onSetRepeat} show={false} />;
  }

  const passMList = values(passGroup[groupType]);
  const dataSource = get(groupPassList, groupType, []);
  if (isEmpty(dataSource)) {
    return <RepeatCls onSetRepeat={onSetRepeat} show={false} />;
  }

  const isHasNoPassConf = betSlipGroup[groupType].findIndex(v => v.passStatus === 0) > -1;

  const transfromOnePassMlist = [].concat.apply([], passMList);

  const filterM = passMList.length;

  if (filterM === 1) {
    return null;
  }

  const passHeaderCls = classnames({
    [styles.passHeader]: true,
    [styles.passHeaderH]: showAll,
  });

  const showLocales = [
    {
      groupType: 1,
      code: 'Wiki.0115',
    },
    {
      groupType: 2,
      code: 'Wiki.0117',
    },
    {
      groupType: 3,
      code: 'Wiki.0119',
    },
  ];

  const hideLocalesUS = [
    {
      groupType: 1,
      code: 'Wiki.0116',
    },
    {
      groupType: 2,
      code: 'Wiki.0118',
    },
    {
      groupType: 3,
      code: 'Wiki.0120',
    },
  ];

  function useLocalesText(groupType) {
    return formatMessage({
      id: !showAll
        ? showLocales.find(v => v.groupType === +groupType).code
        : hideLocalesUS.find(v => v.groupType === +groupType).code,
    });
  }

  const result = dataSource.filter(v => +v.passType !== 1000);

  const repeatStatusArr = isEmpty(result) || [
    ...new Set(transfromOnePassMlist.map(v => +v.split('_')[5] === 1)),
  ];
  const noRepeatStatus = repeatStatusArr.length === 1 && !repeatStatusArr[0];

  const effectPassL = result.filter(v => filterM >= v.abbrName.split('X')[0]);

  const hasShowRepeatCls = isHasNoPassConf || !noRepeatStatus;

  return isEmpty(repeatStatusArr) ? null : (
    <div className={styles.passConCLs}>
      {/* {(isHasNoPassConf || !noRepeatStatus) && (
        <div className={styles.repeatCls}>
          <div>{formatMessage({ id: 'Wiki.0126' })}</div>
        </div>
      )} */}
      <div
        onClick={() => {
          setShowAll(!showAll);
        }}
        className={passHeaderCls}
      >
        {useLocalesText(groupType)}{' '}
        <img src={require('../../../../../../assets/s02/xl.png')} alt="" />
      </div>
      <div className={styles.content}>
        {effectPassL.map((v, k) => {
          const isSingles = +v.passType === 1000;
          const passN = v.abbrName.split('X')[1];
          const passM = v.abbrName.split('X')[0];
          const filterMIndex = result.findIndex(v => v.abbrName === `${filterM}X1`);
          const isHasFilterM = filterMIndex > -1;
          return (
            <Item
              orderMaxPayment={orderMaxPayment}
              passDetail={v.passDetail}
              forderId={v.bettingSlipId}
              name={getStatus('passType', v.passType.toString())}
              minBetLimitTxt={minBetLimitTxt}
              onChangeKeyboard={onChangeKeyboard}
              onSetValue={onSetValue}
              currencySymbol={currencySymbol}
              key={k}
              isOneLight={
                isHasFilterM ? `${filterM}X1` !== v.abbrName : result[0].abbrName !== v.abbrName
              }
              betUnit={betUnit}
              filterM={filterM}
              showAll={showAll}
              onSet={onSet}
              onEffectPassListAmount={onEffectPassListAmount}
              betSlipGroup={betSlipGroup}
              value={v.amount}
              passMList={passMList}
              groupType={groupType}
              passN={passN}
              onSetIsEW={onSetIsEW}
              passM={passM}
              currentKey={`dataSource.${groupType}.${k}`}
              abbrName={v.abbrName}
              isSingles={isSingles}
              isEW={v.isEW}
              toReturnText={toReturnText}
              noteCount={v.noteCount}
              effectiveAmount={v.effectiveAmount}
              isOpenKeyboard={v.isOpenKeyboard}
              minBetAmount={minBetAmount}
            />
          );
        })}
      </div>
      <RepeatCls onSetRepeat={onSetRepeat} show={hasShowRepeatCls} />
    </div>
  );
};

const RepeatCls = ({ show, onSetRepeat }) => {
  useEffect(
    () => {
      onSetRepeat(show);
    },
    [show]
  );
  return null;
};

export default memo(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(PassList)
  )
);
